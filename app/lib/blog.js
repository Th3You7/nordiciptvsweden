// Markdown blog engine. Posts live in content/blog as {slug}.{locale}.md — one
// file per locale, with the slug shared across translations so a post's other
// language resolves by slug and hreflang lines up.
//
// Ported from the Finland site's engine, with the gaps its own strategy doc
// flags closed here rather than copied:
//   - hreflang is derived from the locales a post actually exists in, so a
//     Swedish-only post never advertises an English URL that 404s
//   - headings get stable ids, so deep links and a table of contents work
//   - YAML dates are normalised (an unquoted date parses to a Date object, which
//     then sorts as a string like "Sat Sep 12 …")
//   - in-body images are routed through the image optimizer with srcset, sizes
//     and dimensions, instead of shipping raw <img> tags
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import { locales } from "../i18n/config";
import { ICONS } from "./data";
import { siteUrl } from "./site";
import { whatsappUrl } from "./whatsapp";

export const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const WORDS_PER_MINUTE = 200;

/* ------------------------------------------------------------------ *
 * Loading
 * ------------------------------------------------------------------ */

function listFiles() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const out = [];
  for (const file of fs.readdirSync(BLOG_DIR).sort()) {
    for (const locale of locales) {
      const suffix = `.${locale}.md`;
      if (file.endsWith(suffix)) {
        out.push({ slug: file.slice(0, -suffix.length), locale, file });
        break;
      }
    }
  }
  return out;
}

function isoDate(value) {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).trim();
}

function toArray(value) {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string" && value.trim()) return value.split(",").map((s) => s.trim());
  return [];
}

function toFaq(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => item && item.q && item.a)
    .map((item) => ({ q: String(item.q).trim(), a: String(item.a).trim() }));
}

// Shortcodes and image lines are not prose, so they are left out of the count.
function readingMinutes(content) {
  const prose = content.replace(/\[\[wa:[^\]]*\]\]/g, "").replace(/^!\[.*$/gm, "");
  const words = prose.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function toMeta(slug, locale, data, content) {
  return {
    slug,
    locale,
    title: data.title ? String(data.title) : slug,
    excerpt: data.excerpt ? String(data.excerpt) : "",
    date: isoDate(data.date),
    updateDate: isoDate(data.updateDate) || undefined,
    author: data.author ? String(data.author) : undefined,
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    tags: toArray(data.tags),
    featured: Boolean(data.featured),
    readingMinutes: readingMinutes(content),
    faq: toFaq(data.faq),
  };
}

function readRaw(slug, locale) {
  const file = path.join(BLOG_DIR, `${slug}.${locale}.md`);
  if (!fs.existsSync(file)) return null;
  return matter(fs.readFileSync(file, "utf8"));
}

/** Every locale/slug pair — feeds generateStaticParams for the post route. */
export function getAllPostParams() {
  return listFiles().map(({ slug, locale }) => ({ locale, slug }));
}

export function getPostSlugsForLocale(locale) {
  return listFiles()
    .filter((p) => p.locale === locale)
    .map((p) => p.slug);
}

/** slug -> the locales it exists in. Passed to the language switcher, which runs
 *  on the client and cannot read content/blog itself. */
export function getBlogLocaleMap() {
  const map = {};
  for (const { slug, locale } of listFiles()) (map[slug] ||= []).push(locale);
  return map;
}

/** The locales this slug has actually been published in. */
export function getTranslationLocales(slug) {
  return locales.filter((locale) => getPostSlugsForLocale(locale).includes(slug));
}

/** All posts in a locale, newest first. */
export async function getPostsForLocale(locale) {
  const posts = [];
  for (const { slug } of listFiles().filter((p) => p.locale === locale)) {
    const { data, content } = readRaw(slug, locale);
    posts.push(toMeta(slug, locale, data, content));
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

/* ------------------------------------------------------------------ *
 * Rendering
 * ------------------------------------------------------------------ */

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// "Så fungerar IPTV i Sverige" -> "sa-fungerar-iptv-i-sverige"
function slugify(text) {
  return text
    .replace(/<[^>]+>/g, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function addHeadingIds(html) {
  const seen = new Map();
  return html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level, inner) => {
    const base = slugify(inner) || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    const id = n ? `${base}-${n}` : base;
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

// Widths must exist in next.config's deviceSizes/imageSizes, or the optimizer
// rejects the request. The article column is 772px wide at most.
const IMAGE_WIDTHS = [640, 828, 1080, 1200];
const IMAGE_SIZES = "(max-width: 820px) calc(100vw - 48px), 772px";

function optimized(src, width) {
  return `/_next/image?url=${encodeURIComponent(src)}&amp;w=${width}&amp;q=75`;
}

// In-body images only. The hero is rendered by the post page from the `image`
// frontmatter field, as a banner above the title, so nothing here is treated as
// a hero. Body images are 16:9 by the strategy: the dimensions reserve space and
// prevent layout shift, and CSS keeps height:auto so a file that deviates still
// renders true.
function optimizeImages(html) {
  return html.replace(/<img\s+([^>]*?)\s*\/?>/g, (match, attrs) => {
    const src = /src="([^"]+)"/.exec(attrs)?.[1];
    if (!src || !src.startsWith("/")) return match;
    const alt = /alt="([^"]*)"/.exec(attrs)?.[1] ?? "";
    const srcset = IMAGE_WIDTHS.map((w) => `${optimized(src, w)} ${w}w`).join(", ");
    return (
      `<img src="${optimized(src, 1200)}" srcset="${srcset}" sizes="${IMAGE_SIZES}" ` +
      `alt="${alt}" width="1200" height="675" loading="lazy" decoding="async">`
    );
  });
}

function externalLinks(html) {
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, (match, href) =>
    href.startsWith(siteUrl) ? match : `<a href="${href}" target="_blank" rel="noopener noreferrer"`
  );
}

// remark-html strips raw HTML, so a post cannot embed a styled button. Authors
// write a token on its own line instead —
//   [[wa:Starta gratis test]]
//   [[wa:Starta gratis test|Inga kortuppgifter, ingen bindningstid.]]
// — and it is swapped here, after rendering, for a WhatsApp button with an
// optional supporting line. Markdown wraps a lone token in <p>, which is what
// the pattern matches.
const WA_SHORTCODE = /<p>\s*\[\[wa:\s*([^\]\n]+?)\s*\]\]\s*<\/p>/g;

function renderWhatsAppCtas(html, locale) {
  const href = escapeHtml(whatsappUrl("blog", locale));
  const icon =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" ' +
    `stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS.wa}</svg>`;

  return html.replace(WA_SHORTCODE, (_m, body) => {
    const [label, note] = body.split("|").map((part) => part.trim());
    const button =
      `<a class="au-wa-neon" href="${href}" target="_blank" rel="noopener noreferrer">` +
      `${icon}<span>${escapeHtml(label)}</span></a>`;
    const caption = note ? `<span class="au-wa-cta-note">${escapeHtml(note)}</span>` : "";
    return `<div class="au-wa-cta">${button}${caption}</div>`;
  });
}

// Comparison tables are wider than a phone. Wrapping them lets the table scroll
// sideways inside its own box instead of pushing the whole page wider.
function wrapTables(html) {
  return html.replace(/<table>/g, '<div class="au-table"><table>').replace(/<\/table>/g, "</table></div>");
}

export async function getPost(slug, locale) {
  const raw = readRaw(slug, locale);
  if (!raw) return null;

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(raw.content);
  let html = String(processed);
  html = addHeadingIds(html);
  html = optimizeImages(html);
  html = wrapTables(html);
  html = externalLinks(html);
  html = renderWhatsAppCtas(html, locale);

  return { ...toMeta(slug, locale, raw.data, raw.content), contentHtml: html };
}

/** The shape BlogCards and BlogList render. */
export function postCard(post, locale, minReadLabel) {
  return {
    slug: post.slug,
    tag: post.tags[0] || "",
    title: post.title,
    excerpt: post.excerpt,
    image: post.image,
    date: formatPostDate(post.date, locale),
    read: `${post.readingMinutes} ${minReadLabel}`,
  };
}

/* ------------------------------------------------------------------ *
 * Index helpers
 * ------------------------------------------------------------------ */

/** Other posts in the same locale, ranked by shared tags, then recency. */
export async function getRelatedPosts(slug, locale, limit = 3) {
  const posts = await getPostsForLocale(locale);
  const current = posts.find((p) => p.slug === slug);
  if (!current) return posts.slice(0, limit);

  return posts
    .filter((p) => p.slug !== slug)
    .map((post) => ({ post, shared: post.tags.filter((t) => current.tags.includes(t)).length }))
    .sort((a, b) => b.shared - a.shared || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map((entry) => entry.post);
}

/** Up to `limit` featured posts, topped up with the newest when fewer are flagged. */
export async function getFeaturedPosts(locale, limit = 3) {
  const posts = await getPostsForLocale(locale);
  const featured = posts.filter((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);
  return [...featured, ...rest].slice(0, limit);
}

export function formatPostDate(date, locale) {
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "sv" ? "sv-SE" : "en-GB", {
    dateStyle: "long",
    timeZone: "Europe/Stockholm",
  }).format(value);
}

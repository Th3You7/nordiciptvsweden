// Pre-publish gate for content/blog, enforcing STRATEGY_BLOG_SWEDEN.md.
//
// Errors are things that break the page, the structured data or the reader's
// path — a broken internal link, a missing image, a duplicate H1, raw HTML the
// renderer silently deletes. They fail `npm run verify`. Warnings are editorial
// targets (CTA count, link quota, word bands) that print but do not block.
//
// Run: npm run check:blog
import { existsSync, readdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { CLUSTER_TAGS, RULES } from "../app/lib/blog-taxonomy.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BLOG_DIR = join(root, "content", "blog");
const PUBLIC_DIR = join(root, "public");
const LOCALES = ["sv", "en"];
const STATIC_ROUTES = new Set(["", "pricing", "features", "devices", "faq", "blog", "contact", "terms", "privacy", "refund"]);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const errors = [];
const warnings = [];
const error = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

// Lines outside fenced code blocks, with inline code blanked, so example
// markup inside `code` is not mistaken for the real thing.
function proseLines(body) {
  const out = [];
  let fenced = false;
  for (const line of body.split("\n")) {
    if (/^\s*```/.test(line)) {
      fenced = !fenced;
      out.push("");
      continue;
    }
    out.push(fenced ? "" : line.replace(/`[^`]*`/g, "``"));
  }
  return out;
}

function asDate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value ? String(value).trim() : "";
}

// --- discover ---------------------------------------------------------------

const posts = [];
if (existsSync(BLOG_DIR)) {
  for (const file of readdirSync(BLOG_DIR).sort()) {
    const m = /^(.+)\.(sv|en)\.md$/.exec(file);
    if (!m) continue;
    posts.push({ file, slug: m[1], locale: m[2], ...matter(readFileSync(join(BLOG_DIR, file), "utf8")) });
  }
}

const slugsByLocale = Object.fromEntries(LOCALES.map((l) => [l, new Set(posts.filter((p) => p.locale === l).map((p) => p.slug))]));

// --- per post ---------------------------------------------------------------

for (const post of posts) {
  const { file, slug, locale, data, content } = post;
  const lines = proseLines(content);
  const prose = lines.join("\n");

  if (!SLUG_RE.test(slug)) error(file, `slug "${slug}" must be lowercase ASCII words joined by hyphens (å→a, ä→a, ö→o)`);

  // frontmatter
  if (!data.title) error(file, "missing title");

  if (!data.excerpt) error(file, "missing excerpt");
  else if (String(data.excerpt).length > RULES.excerptMax) error(file, `excerpt is ${String(data.excerpt).length} chars (max ${RULES.excerptMax})`);

  const date = asDate(data.date);
  if (data.date instanceof Date) warn(file, `quote the date — date: "${date}"`);
  if (!DATE_RE.test(date)) error(file, `date must be "YYYY-MM-DD", got "${date}"`);

  if (data.updateDate !== undefined) {
    const upd = asDate(data.updateDate);
    if (!DATE_RE.test(upd)) error(file, `updateDate must be "YYYY-MM-DD", got "${upd}"`);
    else if (DATE_RE.test(date) && upd < date) error(file, `updateDate ${upd} is before date ${date}`);
  }

  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
  const clusterTags = Object.values(CLUSTER_TAGS[locale]);
  if (tags.length < RULES.tagsMin || tags.length > RULES.tagsMax) error(file, `needs ${RULES.tagsMin}–${RULES.tagsMax} tags, has ${tags.length}`);
  if (tags[0] && !clusterTags.includes(tags[0])) error(file, `tags[0] "${tags[0]}" must be a ${locale} cluster tag: ${clusterTags.join(" | ")}`);

  const faq = Array.isArray(data.faq) ? data.faq : [];
  if (faq.length < RULES.faqMin || faq.length > RULES.faqMax) error(file, `needs ${RULES.faqMin}–${RULES.faqMax} faq items, has ${faq.length}`);
  faq.forEach((item, i) => {
    if (!item?.q || !item?.a) error(file, `faq[${i}] needs both q and a`);
    else if (/[<>]|\]\(|\*\*|`/.test(String(item.a))) error(file, `faq[${i}].a must be plain text — no markdown or HTML`);
  });

  if (data.image) {
    if (!existsSync(join(PUBLIC_DIR, String(data.image)))) error(file, `image ${data.image} does not exist in public/`);
    if (!String(data.image).startsWith("/assets/blog/")) warn(file, `image should live under /assets/blog/`);
  } else {
    warn(file, "no image — the social card falls back to the logo");
  }

  // body structure
  lines.forEach((line, i) => {
    if (/^#\s/.test(line)) error(file, `line ${i + 1}: H1 in body — the title is already the page <h1>, start at ##`);
    if (/<\/?[a-zA-Z][^>]*>/.test(line)) error(file, `line ${i + 1}: raw HTML is stripped by the renderer — use markdown or [[wa:…]]`);
  });

  const h2 = lines.filter((l) => /^##\s/.test(l)).length;
  if (h2 < 6) warn(file, `${h2} H2s (target 6–12)`);

  if (lines.some((l) => /^##+\s+(vanliga frågor|frequently asked questions|faq)\s*$/i.test(l))) {
    warn(file, "hand-written FAQ heading — the FAQ is rendered from frontmatter, so this duplicates it");
  }

  const firstLine = lines.find((l) => l.trim());
  if (!firstLine?.startsWith("![")) warn(file, "the hero image should be the first line of the body");

  const words = prose
    .replace(/\[\[wa:[^\]]*\]\]/g, "")
    .replace(/^!\[.*$/gm, "")
    .replace(/^\|?[\s:|-]+\|?$/gm, "")
    .split(/\s+/)
    .filter(Boolean).length;
  if (words < RULES.wordsFloor) error(file, `${words} words — below the ${RULES.wordsFloor}-word floor; fold it into another post`);

  // links and images
  const anchors = new Map();
  let internal = 0;
  let images = 0;
  for (const [, bang, text, href] of prose.matchAll(/(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    if (bang) {
      images += 1;
      if (!text.trim()) warn(file, `image ${href} has no alt text`);
      if (href.startsWith("/") && !existsSync(join(PUBLIC_DIR, href))) error(file, `image ${href} does not exist in public/`);
      continue;
    }
    if (href === "#" || !href) {
      error(file, `empty link for "${text}"`);
      continue;
    }
    if (!href.startsWith("/") || href.startsWith("/assets/")) continue;

    const m = /^\/(sv|en)(?:\/([^#?]*))?/.exec(href);
    if (!m) {
      error(file, `internal link ${href} has no locale prefix — use /${locale}/…`);
      continue;
    }
    internal += 1;
    if (m[1] !== locale) error(file, `link ${href} points at /${m[1]} from a .${locale}.md file`);

    const rest = (m[2] || "").replace(/\/+$/, "");
    if (rest.startsWith("blog/")) {
      const target = rest.slice(5);
      if (!slugsByLocale[m[1]]?.has(target)) error(file, `link ${href} — no post "${target}" in ${m[1]}`);
    } else if (!STATIC_ROUTES.has(rest)) {
      error(file, `link ${href} — no such page`);
    }

    const key = text.trim().toLowerCase();
    anchors.set(key, (anchors.get(key) || 0) + 1);
  }

  for (const [text, n] of anchors) if (n > 1) warn(file, `anchor text "${text}" used ${n} times`);
  if (internal < RULES.internalLinksMin || internal > RULES.internalLinksMax) {
    warn(file, `${internal} internal links (target ${RULES.internalLinksMin}–${RULES.internalLinksMax})`);
  }
  if (images !== RULES.images) warn(file, `${images} images (target ${RULES.images}: hero + 2 in-body)`);

  // WhatsApp CTAs
  const ctaLines = [];
  lines.forEach((line, i) => {
    const m = /^\s*\[\[wa:\s*([^\]|]+?)\s*(?:\|\s*([^\]]+?)\s*)?\]\]\s*$/.exec(line);
    if (m) ctaLines.push({ i, label: m[1], note: m[2] || "" });
  });
  if (ctaLines.length !== RULES.waCtas) warn(file, `${ctaLines.length} WhatsApp CTAs (target ${RULES.waCtas})`);
  const dup = (arr) => arr.filter((v, i) => v && arr.indexOf(v) !== i);
  for (const label of new Set(dup(ctaLines.map((c) => c.label)))) warn(file, `CTA label "${label}" repeated`);
  for (const note of new Set(dup(ctaLines.map((c) => c.note)))) warn(file, `CTA note repeated: "${note}"`);
  if (ctaLines.some((c) => !c.note)) warn(file, "a CTA has no note — each should answer the objection its section raised");
  for (let k = 1; k < ctaLines.length; k++) {
    const between = lines.slice(ctaLines[k - 1].i + 1, ctaLines[k].i);
    if (between.every((l) => !l.trim())) warn(file, `CTAs on lines ${ctaLines[k - 1].i + 1} and ${ctaLines[k].i + 1} are adjacent`);
  }

  post.words = words;
}

// --- across posts -----------------------------------------------------------

for (const locale of LOCALES) {
  const featured = posts.filter((p) => p.locale === locale && p.data.featured === true);
  if (featured.length > RULES.featuredMaxPerLocale) {
    errors.push(`${locale}: ${featured.length} featured posts (max ${RULES.featuredMaxPerLocale}) — ${featured.map((p) => p.slug).join(", ")}`);
  }
}

// --- report -----------------------------------------------------------------

for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  ERROR ${e}`);

const counts = LOCALES.map((l) => `${l}:${slugsByLocale[l].size}`).join(" ");
if (errors.length) {
  console.error(`\ncheck:blog FAILED — ${errors.length} error(s), ${warnings.length} warning(s) across ${posts.length} post file(s) (${counts}).`);
  process.exit(1);
}
console.log(`check:blog OK — ${posts.length} post file(s) (${counts}), ${warnings.length} warning(s).`);

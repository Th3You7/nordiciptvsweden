import { locales, defaultLocale } from "./i18n/config";
import { url } from "./lib/site";
import { LOGO } from "./lib/schema";
import { getPostsForLocale, getTranslationLocales } from "./lib/blog";

// Paths that exist under every locale, relative to /{locale}.
// Each entry is emitted once per locale with hreflang alternates.
const staticPaths = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "pricing", changeFrequency: "weekly", priority: 0.9 },
  { path: "features", changeFrequency: "monthly", priority: 0.8 },
  { path: "devices", changeFrequency: "monthly", priority: 0.8 },
  { path: "faq", changeFrequency: "monthly", priority: 0.8 },
  { path: "blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "refund", changeFrequency: "yearly", priority: 0.3 },
];

// Every locale variant of one path, plus x-default, for the sitemap's
// hreflang annotations. Mirrors the <link rel="alternate"> tags in the layout.
function alternatesFor(path) {
  const languages = {};
  for (const locale of locales) {
    languages[locale] = url(path ? `${locale}/${path}` : locale);
  }
  languages["x-default"] = url(path ? `${defaultLocale}/${path}` : defaultLocale);
  return { languages };
}

// A post lists only the locales it was actually published in, so a Swedish-only
// post never advertises an English URL that 404s. Matches postAlternates() in
// lib/metadata.js, which emits the same set in the page <head>.
function postAlternatesFor(slug) {
  const published = getTranslationLocales(slug);
  if (published.length < 2) return undefined;
  const languages = {};
  for (const locale of published) languages[locale] = url(`${locale}/blog/${slug}`);
  const fallback = published.includes(defaultLocale) ? defaultLocale : published[0];
  languages["x-default"] = url(`${fallback}/blog/${slug}`);
  return { languages };
}

function toDate(value, fallback) {
  const parsed = value ? new Date(value) : null;
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed : fallback;
}

export default async function sitemap() {
  // Build time. Pin a real date per path once content stops changing on deploy.
  const lastModified = new Date();

  const pages = locales.flatMap((locale) =>
    staticPaths.map(({ path, changeFrequency, priority }) => ({
      url: url(path ? `${locale}/${path}` : locale),
      lastModified,
      changeFrequency,
      priority,
      alternates: alternatesFor(path),
      // The logo listed on each locale home page, so crawlers discover the
      // image itself. Note this helps image indexing — what identifies it as
      // *the site logo* is Organization.logo in the JSON-LD.
      ...(path ? {} : { images: [url(LOGO.path)] }),
    }))
  );

  // Posts use `updateDate` over `date`, so a refreshed post signals its real
  // last-modified time instead of the build time.
  const posts = [];
  for (const locale of locales) {
    for (const post of await getPostsForLocale(locale)) {
      const alternates = postAlternatesFor(post.slug);
      posts.push({
        url: url(`${locale}/blog/${post.slug}`),
        lastModified: toDate(post.updateDate || post.date, lastModified),
        changeFrequency: "monthly",
        priority: post.featured ? 0.7 : 0.6,
        ...(alternates ? { alternates } : {}),
        ...(post.image ? { images: [url(post.image)] } : {}),
      });
    }
  }

  return [...pages, ...posts];
}

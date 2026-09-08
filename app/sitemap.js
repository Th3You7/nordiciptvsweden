import { locales, defaultLocale } from "./i18n/config";
import { url } from "./lib/site";

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

export default function sitemap() {
  // Build time. Pin a real date per path once content stops changing on deploy.
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    staticPaths.map(({ path, changeFrequency, priority }) => ({
      url: url(path ? `${locale}/${path}` : locale),
      lastModified,
      changeFrequency,
      priority,
      alternates: alternatesFor(path),
    }))
  );
}

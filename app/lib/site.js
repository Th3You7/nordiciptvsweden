// Single source of truth for the site origin. Set NEXT_PUBLIC_SITE_URL to the
// real domain before deploying — canonical, hreflang, Open Graph, the sitemap
// and every JSON-LD @id are resolved against it.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export function url(path) {
  if (!path) return siteUrl;
  return `${siteUrl}/${String(path).replace(/^\/+/, "")}`;
}

// The brand name, defined once. Everything user-facing outside the message
// catalogs reads from here, so renaming is a one-line change.
export const BRAND = "IPTV NORDIC";

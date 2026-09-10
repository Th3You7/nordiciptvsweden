// Single source of truth for the site origin: canonical, hreflang, Open Graph,
// the sitemap and every JSON-LD @id are resolved against it.
//
// The production domain is the default, so a build that forgets to set the
// environment variable still emits correct canonical, hreflang, Open Graph and
// sitemap URLs. NEXT_PUBLIC_SITE_URL overrides it for staging or previews.
//
// NOTE: this is inlined at BUILD time, not read at runtime — setting it only in
// a host's runtime environment has no effect. It must be present for `next build`.
const DEFAULT_SITE_URL = "https://www.nordiciptvsweden.com";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

export function url(path) {
  if (!path) return siteUrl;
  return `${siteUrl}/${String(path).replace(/^\/+/, "")}`;
}

// The brand name, defined once. Everything user-facing outside the message
// catalogs reads from here, so renaming is a one-line change.
export const BRAND = "IPTV NORDIC";

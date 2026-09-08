import { locales, defaultLocale } from "../i18n/config";

// Canonical + hreflang for one page, in every locale.
//
// Next replaces the whole `alternates` object when a page defines one, so a
// page that sets only `canonical` silently drops the layout's `languages` and
// ends up with no hreflang. Every page therefore builds the complete set here,
// and each alternate points at that page's own translation — not the homepage.
//
//   localeAlternates("sv", "pricing") ->
//     canonical /sv/pricing, hreflang en=/en/pricing sv=/sv/pricing
//
// Paths are relative; metadataBase in the locale layout makes them absolute.
export function localeAlternates(locale, path = "") {
  const seg = path ? `/${path.replace(/^\/+/, "")}` : "";
  const languages = {};
  for (const l of locales) languages[l] = `/${l}${seg}`;
  languages["x-default"] = `/${defaultLocale}${seg}`;

  return { canonical: `/${locale}${seg}`, languages };
}

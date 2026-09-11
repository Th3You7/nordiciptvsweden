// JSON-LD builders. Every value comes from the locale catalog or the real
// route table — nothing here asserts anything the page does not actually show.
import { siteUrl, url, BRAND } from "./site";

const ORG_ID = `${siteUrl}/#organization`;
const SITE_ID = `${siteUrl}/#website`;
const LOGO_ID = `${siteUrl}/#logo`;

// The site logo, as Google's Logo structured data expects it. Pointed at the
// raw asset rather than an /_next/image URL so it is directly crawlable, and
// well past the 112x112px minimum.
export const LOGO = {
  path: "assets/logo-flag.webp",
  width: 800,
  height: 505,
};

function bcp47(locale) {
  return locale === "sv" ? "sv-SE" : "en";
}

// Organization + WebSite: emitted once per page from the locale layout, as a
// @graph so the two nodes reference each other by @id instead of nesting.
export function siteGraph({ locale, t }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: BRAND,
        url: siteUrl,
        description: t.meta.description,
        logo: {
          "@type": "ImageObject",
          "@id": LOGO_ID,
          url: url(LOGO.path),
          contentUrl: url(LOGO.path),
          width: LOGO.width,
          height: LOGO.height,
          caption: BRAND,
        },
        image: { "@id": LOGO_ID },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        name: BRAND,
        url: url(locale),
        publisher: { "@id": ORG_ID },
        inLanguage: bcp47(locale),
      },
    ],
  };
}

// Home > {page}. `label` is already localised by the caller.
export function breadcrumb({ locale, t, slug, label }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t.nav.home,
        item: url(locale),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: url(`${locale}/${slug}`),
      },
    ],
  };
}

export function faqPage({ items }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

// "€15" -> "15". Returns null if a plan price is not parseable, so a bad value
// drops the offer rather than emitting a malformed price.
function parsePrice(raw) {
  const m = String(raw).match(/[\d]+(?:[.,][\d]+)?/);
  return m ? m[0].replace(",", ".") : null;
}

export function subscriptionProduct({ locale, t }) {
  const offers = t.pricing.plans
    .map((plan) => {
      const price = parsePrice(plan.price);
      if (!price) return null;
      return {
        "@type": "Offer",
        name: plan.name,
        price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: url(`${locale}/pricing`),
      };
    })
    .filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: BRAND,
    description: t.pricing.sub,
    brand: { "@type": "Brand", name: BRAND },
    category: "IPTV streaming subscription",
    offers,
  };
}

export function contactPage({ locale, t }) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t.contact.title,
    description: t.contact.sub,
    url: url(`${locale}/contact`),
    inLanguage: bcp47(locale),
    mainEntity: { "@id": ORG_ID },
  };
}

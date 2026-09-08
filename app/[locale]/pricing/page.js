import { locales } from "../../i18n/config";
import { getMessages } from "../../i18n/getMessages";
import { SectionHead, PricingCards } from "../../components/sections";
import { JsonLd } from "../../components/JsonLd";
import { breadcrumb, subscriptionProduct } from "../../lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  return {
    title: t.pricing.title,
    description: t.pricing.sub,
    alternates: { canonical: `/${locale}/pricing` },
  };
}

export default async function PricingPage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <section className="au-sec-page">
      <JsonLd schema={breadcrumb({ locale, t, slug: "pricing", label: t.nav.pricing })} />
      <JsonLd schema={subscriptionProduct({ locale, t })} />
      <SectionHead kicker={t.pricing.kicker} title={t.pricing.title} sub={t.pricing.sub} as="h1" wide />
      <PricingCards t={t} locale={locale} />
      <p className="au-price-note" data-reveal="1">
        {t.pricing.note}
      </p>
    </section>
  );
}

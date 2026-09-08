import { locales } from "../../i18n/config";
import { getMessages } from "../../i18n/getMessages";
import { SectionHead } from "../../components/sections";
import { FaqAccordion } from "../../components/client/FaqAccordion";
import { JsonLd } from "../../components/JsonLd";
import { breadcrumb, faqPage } from "../../lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  return {
    title: t.faqPage.title,
    description: t.faq.items[0]?.a,
    alternates: { canonical: `/${locale}/faq` },
  };
}

export default async function FaqPage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <section className="au-sec-page-sm">
      {/* Every question and answer is in the prerendered HTML, so the markup
          matches visible content — the condition for FAQ rich results. */}
      <JsonLd schema={breadcrumb({ locale, t, slug: "faq", label: t.nav.faq })} />
      <JsonLd schema={faqPage({ items: t.faq.items })} />
      <SectionHead kicker={t.faqPage.kicker} title={t.faqPage.title} as="h1" tight />
      <FaqAccordion items={t.faq.items} big />
    </section>
  );
}

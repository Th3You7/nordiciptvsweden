import { locales } from "../../i18n/config";
import { getMessages } from "../../i18n/getMessages";
import { LegalArticle } from "../../components/sections";
import { JsonLd } from "../../components/JsonLd";
import { breadcrumb } from "../../lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  return {
    title: t.terms.title,
    description: t.terms.intro,
    alternates: { canonical: `/${locale}/terms` },
  };
}

export default async function TermsPage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <section className="au-sec-page-sm">
      <JsonLd schema={breadcrumb({ locale, t, slug: "terms", label: t.terms.title })} />
      <LegalArticle t={t} doc={t.terms} locale={locale} />
    </section>
  );
}

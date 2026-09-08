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
    title: t.refund.title,
    description: t.refund.intro,
    alternates: { canonical: `/${locale}/refund` },
  };
}

export default async function RefundPage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <section className="au-sec-page-sm">
      <JsonLd schema={breadcrumb({ locale, t, slug: "refund", label: t.refund.title })} />
      <LegalArticle t={t} doc={t.refund} locale={locale} />
    </section>
  );
}

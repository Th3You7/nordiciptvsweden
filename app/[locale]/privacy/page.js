import { locales } from "../../i18n/config";
import { getMessages } from "../../i18n/getMessages";
import { localeAlternates } from "../../lib/metadata";
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
    title: t.privacy.title,
    description: t.privacy.intro,
    alternates: localeAlternates(locale, "privacy"),
  };
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <section className="au-sec-page-sm">
      <JsonLd schema={breadcrumb({ locale, t, slug: "privacy", label: t.privacy.title })} />
      <LegalArticle t={t} doc={t.privacy} locale={locale} />
    </section>
  );
}

import { locales } from "../../i18n/config";
import { getMessages } from "../../i18n/getMessages";
import { SectionHead, ContactCards } from "../../components/sections";
import { JsonLd } from "../../components/JsonLd";
import { breadcrumb, contactPage } from "../../lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  return {
    title: t.contact.title,
    description: t.contact.sub,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <section className="au-sec-page-contact">
      <JsonLd schema={breadcrumb({ locale, t, slug: "contact", label: t.nav.contact })} />
      <JsonLd schema={contactPage({ locale, t })} />
      <SectionHead kicker={t.contact.kicker} title={t.contact.title} sub={t.contact.sub} as="h1" />
      <ContactCards t={t} />
    </section>
  );
}

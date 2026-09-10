import { locales } from "../../i18n/config";
import { getMessages } from "../../i18n/getMessages";
import { localeAlternates } from "../../lib/metadata";
import { SectionHead, FeatureGrid, LibraryGrid, CtaBanner } from "../../components/sections";
import { JsonLd } from "../../components/JsonLd";
import { breadcrumb } from "../../lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  return {
    title: t.features.title,
    description: t.features.sub,
    alternates: localeAlternates(locale, "features"),
  };
}

export default async function FeaturesPage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <section className="au-sec-page">
      <JsonLd schema={breadcrumb({ locale, t, slug: "features", label: t.nav.features })} />
      <SectionHead kicker={t.features.kicker} title={t.features.title} sub={t.features.sub} as="h1" wide />
      <FeatureGrid items={t.features.items} />

      <div style={{ margin: "clamp(56px,7vw,90px) 0 40px" }}>
        <SectionHead kicker={t.library.kicker} title={t.library.title} />
      </div>
      <LibraryGrid items={t.library.items} />

      <CtaBanner title={t.cta.title} cta={t.hero.cta1} small />
    </section>
  );
}

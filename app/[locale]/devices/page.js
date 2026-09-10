import { locales } from "../../i18n/config";
import { getMessages } from "../../i18n/getMessages";
import { localeAlternates } from "../../lib/metadata";
import { SectionHead, DeviceGrid, Steps, CtaBanner } from "../../components/sections";
import { JsonLd } from "../../components/JsonLd";
import { breadcrumb } from "../../lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  return {
    title: t.devicesPage.title,
    description: t.devicesPage.sub,
    alternates: localeAlternates(locale, "devices"),
  };
}

export default async function DevicesPage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <section className="au-sec-page">
      <JsonLd schema={breadcrumb({ locale, t, slug: "devices", label: t.nav.devices })} />
      <SectionHead
        kicker={t.devicesPage.kicker}
        title={t.devicesPage.title}
        sub={t.devicesPage.sub}
        as="h1"
        wide
      />
      <DeviceGrid items={t.devices.items} large />

      <div style={{ marginTop: "clamp(56px,7vw,90px)", textAlign: "center" }} data-reveal="1">
        <h2 className="au-h2-sm" style={{ marginBottom: "44px" }}>
          {t.devicesPage.stepsTitle}
        </h2>
      </div>
      <Steps items={t.devicesPage.steps} />

      <CtaBanner title={t.devicesPage.ctaTitle} cta={t.hero.cta1} small />
    </section>
  );
}

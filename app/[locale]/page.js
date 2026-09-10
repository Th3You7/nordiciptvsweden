import Link from "next/link";
import { locales } from "../i18n/config";
import { getMessages } from "../i18n/getMessages";
import { localeAlternates } from "../lib/metadata";
import { FaqAccordion } from "../components/client/FaqAccordion";
import {
  SectionHead,
  Hero,
  StatsBar,
  FeatureGrid,
  LibraryGrid,
  ContentRows,
  Payments,
  DeviceGrid,
  Reviews,
  PricingCards,
  BlogCards,
  CtaBanner,
} from "../components/sections";
import { Icon } from "../components/ui";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Title and description are inherited from the locale layout; the canonical
// and hreflang set must be declared here, per page.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return { alternates: localeAlternates(locale) };
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <>
      <Hero t={t} locale={locale} />
      <StatsBar items={t.stats.bar} />

      <section className="au-sec">
        <SectionHead kicker={t.features.kicker} title={t.features.title} sub={t.features.sub} />
        <FeatureGrid items={t.features.items} />
      </section>

      <section className="au-sec">
        <SectionHead kicker={t.library.kicker} title={t.library.title} />
        <LibraryGrid items={t.library.items} />
      </section>

      <section className="au-sec-narrow">
        <SectionHead kicker={t.content.kicker} title={t.content.title} sub={t.content.sub} wide />
        <ContentRows rows={t.content.rows} />
        <Payments t={t} />
      </section>

      <section className="au-sec">
        <SectionHead kicker={t.devices.kicker} title={t.devices.title} />
        <DeviceGrid items={t.devices.items} />
      </section>

      <section className="au-sec">
        <SectionHead kicker={t.reviews.kicker} title={t.reviews.title} />
        <Reviews items={t.reviews.items} />
      </section>

      <section className="au-sec">
        <SectionHead kicker={t.pricing.kicker} title={t.pricing.title} sub={t.pricing.sub} wide />
        <PricingCards t={t} locale={locale} compact />
        <div style={{ textAlign: "center", margin: "38px 0 0" }} data-reveal="1">
          <Link href={`/${locale}/pricing`} className="au-btn au-btn-outline au-btn-md">
            {t.pricing.seeAll}
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>

      <section className="au-sec-faq">
        <SectionHead title={t.faq.title} tight />
        <FaqAccordion items={t.faq.items.slice(0, 7)} />
        <div style={{ textAlign: "center", margin: "30px 0 0" }} data-reveal="1">
          <Link href={`/${locale}/faq`} className="au-btn au-btn-outline au-btn-sm">
            {t.faq.seeAll}
            <Icon name="arrow" size={17} />
          </Link>
        </div>
      </section>

      <section className="au-sec">
        <SectionHead kicker={t.blog.kicker} title={t.blog.title} sub={t.blog.sub} wide />
        <BlogCards posts={t.blog.posts.slice(0, 3)} locale={locale} />
        <div style={{ textAlign: "center", margin: "38px 0 0" }} data-reveal="1">
          <Link href={`/${locale}/blog`} className="au-btn au-btn-outline au-btn-md">
            {t.blog.readAll}
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </section>

      <section className="au-sec au-sec-last">
        <CtaBanner title={t.cta.title} sub={t.cta.sub} cta={t.hero.cta1} />
      </section>
    </>
  );
}

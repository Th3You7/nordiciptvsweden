import { locales } from "../../i18n/config";
import { getMessages } from "../../i18n/getMessages";
import { SectionHead, BlogList } from "../../components/sections";
import { JsonLd } from "../../components/JsonLd";
import { breadcrumb } from "../../lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  return {
    title: t.blog.title,
    description: t.blog.sub,
    alternates: { canonical: `/${locale}/blog` },
  };
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);

  return (
    <section className="au-sec-page-md">
      {/* Breadcrumb only. No Blog/BlogPosting markup: the four cards are
          placeholders with no article pages behind them, and marking them up
          would assert content that does not exist. Add it with the articles. */}
      <JsonLd schema={breadcrumb({ locale, t, slug: "blog", label: t.nav.blog })} />
      <SectionHead kicker={t.blog.kicker} title={t.blog.title} sub={t.blog.sub} as="h1" />
      <BlogList posts={t.blog.posts} />
    </section>
  );
}

import { locales } from "../../i18n/config";
import { getMessages } from "../../i18n/getMessages";
import { localeAlternates } from "../../lib/metadata";
import { getPostsForLocale, postCard } from "../../lib/blog";
import { SectionHead, BlogList } from "../../components/sections";
import { JsonLd } from "../../components/JsonLd";
import { breadcrumb, blogItemList } from "../../lib/schema";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  return {
    title: t.blog.title,
    description: t.blog.sub,
    alternates: localeAlternates(locale, "blog"),
  };
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const t = await getMessages(locale);
  const posts = await getPostsForLocale(locale);

  // Real posts from content/blog as soon as any exist in this locale. Until
  // then the catalog's teaser cards stand in; they link nowhere and get no
  // structured data. Delete `blog.posts` from the catalogs once the first posts
  // ship (STRATEGY_BLOG_SWEDEN.md, pre-flight).
  const cards = posts.length ? posts.map((p) => postCard(p, locale, t.blogPost.minRead)) : t.blog.posts;

  return (
    <section className="au-sec-page-md">
      <JsonLd schema={breadcrumb({ locale, t, slug: "blog", label: t.nav.blog })} />
      {posts.length ? <JsonLd schema={blogItemList({ locale, posts })} /> : null}
      <SectionHead kicker={t.blog.kicker} title={t.blog.title} sub={t.blog.sub} as="h1" />
      <BlogList posts={cards} locale={locale} />
    </section>
  );
}

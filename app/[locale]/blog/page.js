import { locales } from "../../i18n/config";
import { getMessages } from "../../i18n/getMessages";
import { localeAlternates } from "../../lib/metadata";
import { getPostsForLocale, postCard } from "../../lib/blog";
import { SectionHead, BlogList } from "../../components/sections";
import { clusterOf, CLUSTER_ORDER } from "../../lib/blog-taxonomy";
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

  // Group the real posts into their clusters so the index reads as a hub rather
  // than a feed. A cluster with no posts is skipped, and anything whose tags[0]
  // somehow isn't a cluster tag falls through to `rest` instead of vanishing.
  const byCluster = posts.length
    ? CLUSTER_ORDER.map((letter) => ({
        letter,
        copy: t.blog.clusters[letter],
        items: posts
          .filter((p) => clusterOf(p, locale) === letter)
          .map((p) => postCard(p, locale, t.blogPost.minRead)),
      })).filter((g) => g.items.length && g.copy)
    : [];
  const grouped = new Set(byCluster.flatMap((g) => g.items.map((i) => i.slug)));
  const rest = cards.filter((c) => !grouped.has(c.slug));

  return (
    <section className="au-sec-page-md">
      <JsonLd schema={breadcrumb({ locale, t, slug: "blog", label: t.nav.blog })} />
      {posts.length ? <JsonLd schema={blogItemList({ locale, posts })} /> : null}
      <SectionHead kicker={t.blog.kicker} title={t.blog.title} sub={t.blog.sub} as="h1" />
      {byCluster.length ? (
        <>
          <p className="au-hub-intro" data-reveal="1">{t.blog.hubIntro}</p>
          {byCluster.map((g) => (
            <div key={g.letter} className="au-hub-group">
              <h2 className="au-hub-h" data-reveal="1">{g.copy.title}</h2>
              <p className="au-hub-x" data-reveal="1">{g.copy.intro}</p>
              <BlogList posts={g.items} locale={locale} titleAs="h3" />
            </div>
          ))}
          {rest.length ? <BlogList posts={rest} locale={locale} titleAs="h3" /> : null}
        </>
      ) : (
        <BlogList posts={cards} locale={locale} />
      )}
    </section>
  );
}

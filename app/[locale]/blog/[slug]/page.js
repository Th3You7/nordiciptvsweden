import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getMessages } from "../../../i18n/getMessages";
import {
  getAllPostParams,
  getPost,
  getRelatedPosts,
  getTranslationLocales,
  formatPostDate,
  postCard,
} from "../../../lib/blog";
import { postAlternates } from "../../../lib/metadata";
import { blogPosting, blogPostBreadcrumb, faqPage, LOGO } from "../../../lib/schema";
import { BRAND } from "../../../lib/site";
import { whatsappUrl } from "../../../lib/whatsapp";
import { JsonLd } from "../../../components/JsonLd";
import { BlogCards } from "../../../components/sections";
import { FaqAccordion } from "../../../components/client/FaqAccordion";

// Only posts that exist on disk are routes. Anything else is a 404 rather than
// an attempt to render a file that is not there.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostParams();
}

// Related cards sit three-across in the 772px article column.
const RELATED_SIZES = "(max-width: 640px) calc(100vw - 48px), 244px";

// The hero banner spans a 1104px container, wider than the 820px text column.
const HERO_SIZES = "(max-width: 1104px) calc(100vw - 48px), 1056px";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale);
  if (!post) return {};
  const t = await getMessages(locale);
  const image = post.image || `/${LOGO.path}`;

  // openGraph is replaced wholesale when a page defines it, so siteName and
  // locale are repeated here instead of being inherited from the layout.
  return {
    title: post.title,
    description: post.excerpt,
    alternates: postAlternates(locale, slug, getTranslationLocales(slug)),
    openGraph: {
      type: "article",
      siteName: BRAND,
      locale: t.meta.ogLocale,
      url: `/${locale}/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date || undefined,
      modifiedTime: post.updateDate || post.date || undefined,
      tags: post.tags,
      images: [{ url: image, alt: post.imageAlt || post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { locale, slug } = await params;
  const post = await getPost(slug, locale);
  if (!post) notFound();

  const t = await getMessages(locale);
  const L = t.blogPost;
  const related = await getRelatedPosts(slug, locale, 3);
  const updated = post.updateDate && post.updateDate !== post.date;

  return (
    <>
      {/* Hero banner from the `image` frontmatter field, above the title. It is
          the largest thing on screen, so it loads with priority. */}
      {post.image ? (
        <div className="au-article-hero-wrap">
          <div className="au-article-hero">
            <Image src={post.image} alt={post.imageAlt || post.title} fill priority fetchPriority="high" sizes={HERO_SIZES} />
          </div>
        </div>
      ) : null}

      <article className={`au-article${post.image ? " au-article-has-hero" : ""}`}>
        <JsonLd schema={blogPostBreadcrumb({ locale, t, post })} />
        <JsonLd schema={blogPosting({ locale, post })} />
        {post.faq.length ? <JsonLd schema={faqPage({ items: post.faq })} /> : null}

        <nav aria-label={L.breadcrumbLabel} className="au-crumbs">
          <Link href={`/${locale}`}>{t.nav.home}</Link>
          <span aria-hidden="true">›</span>
          <Link href={`/${locale}/blog`}>{t.nav.blog}</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{post.title}</span>
        </nav>

        <header className="au-article-head" data-reveal="1">
          {post.tags[0] ? <span className="au-post-tag">{post.tags[0]}</span> : null}
          <h1 className="au-article-h1">{post.title}</h1>
          {post.excerpt ? <p className="au-article-lead">{post.excerpt}</p> : null}
          <div className="au-post-meta au-article-meta">
            <span>{post.author || BRAND}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatPostDate(post.date, locale)}</time>
            <span aria-hidden="true">·</span>
            <span>
              {post.readingMinutes} {L.minRead}
            </span>
            {updated ? (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {L.updated} <time dateTime={post.updateDate}>{formatPostDate(post.updateDate, locale)}</time>
                </span>
              </>
            ) : null}
          </div>
        </header>

        {/* Rendered from markdown by lib/blog.js: raw HTML is stripped at render
            time, so the only markup here is what that pipeline itself emits. */}
        <div className="au-prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        {/* Written into frontmatter, not the body — so it is the single source of
            both this block and the FAQPage structured data above. */}
        {post.faq.length ? (
          <section className="au-article-faq" aria-labelledby="post-faq">
            <h2 id="post-faq" className="au-article-h2">
              {L.faqTitle}
            </h2>
            <FaqAccordion items={post.faq} />
          </section>
        ) : null}

        <div className="au-cta au-cta-sm" data-reveal="1">
          <div className="au-cta-glow" />
          <div className="au-cta-body">
            <h2 className="au-cta-h">{L.ctaTitle}</h2>
            <a
              href={whatsappUrl("blog", locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="au-btn au-btn-green au-btn-lg"
            >
              {t.hero.cta1}
            </a>
          </div>
        </div>

        {related.length ? (
          <section className="au-article-related" aria-labelledby="post-related">
            <h2 id="post-related" className="au-article-h2">
              {L.relatedTitle}
            </h2>
            <BlogCards
              posts={related.map((p) => postCard(p, locale, L.minRead))}
              locale={locale}
              sizes={RELATED_SIZES}
            />
          </section>
        ) : null}
      </article>
    </>
  );
}

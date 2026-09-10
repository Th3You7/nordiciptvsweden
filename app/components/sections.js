// Server components. No "use client" anywhere in this file — none of this
// markup is shipped to the browser as JavaScript.
import Link from "next/link";
import Image from "next/image";
import { Icon, LogoMark, Stars } from "./ui";
import { WA_LINK } from "../lib/data";
import { BRAND } from "../lib/site";

// `sizes` values describe the real rendered width at each breakpoint, so the
// optimizer picks the smallest adequate source. They must be kept in step with
// the grid breakpoints in globals.css.
const SIZES = {
  // .95fr of a two-column grid (48px gap) inside a 1240px container, minus the
  // 14px frame padding on each side. Caps at 515px once the container maxes out.
  heroScreen:
    "(max-width: 880px) calc(100vw - 76px), (max-width: 1288px) calc((100vw - 96px) * 0.475 - 28px), 515px",
  heroPhone: "118px",
  // 1 / 2 / 3 columns at 640px and 980px, 20px gaps, 1240px container.
  // Settles at exactly 384px — a width the optimizer can serve verbatim.
  feature:
    "(max-width: 640px) calc(100vw - 48px), (max-width: 980px) calc((100vw - 68px) / 2), (max-width: 1288px) calc((100vw - 88px) / 3), 384px",
  // Stacked below 820px, then two equal columns with a 48px gap in a 1180px
  // container.
  contentRow:
    "(max-width: 820px) calc(100vw - 48px), (max-width: 1228px) calc((100vw - 96px) / 2), 542px",
};

export function SectionHead({ kicker, title, sub, as: H = "h2", wide, tight }) {
  const cls = ["au-head", wide ? "au-head-wide" : "", tight ? "au-head-tight" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls} data-reveal="1">
      {kicker ? <span className="au-kicker">{kicker}</span> : null}
      <H className={H === "h1" ? "au-h1" : "au-h2"} style={!sub ? { marginBottom: 0 } : undefined}>
        {title}
      </H>
      {sub ? <p className="au-sub">{sub}</p> : null}
    </div>
  );
}

export function Hero({ t, locale }) {
  return (
    <section className="au-grid-hero">
      <div data-reveal="1">
        <span className="au-hero-badge">
          <span className="au-hero-dot" />
          {t.hero.badge}
        </span>
        <h1 className="au-hero-title">{t.hero.title}</h1>
        <p className="au-hero-sub">{t.hero.sub}</p>
        <div className="au-hero-ctas">
          {/* Free-trial CTAs open WhatsApp directly rather than routing through
              the contact page — one tap from the hero to a conversation. */}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="au-btn au-btn-green au-btn-lg"
          >
            {t.hero.cta1}
            <span style={{ display: "inline-flex" }}>
              <Icon name="arrow" size={18} />
            </span>
          </a>
          <Link href={`/${locale}/pricing`} className="au-btn au-btn-outline au-btn-lg">
            {t.hero.cta2}
          </Link>
        </div>
        <div className="au-hero-stats">
          {t.stats.hero.map((s) => (
            <div key={s.label}>
              <div className="au-hero-stat-v">{s.value}</div>
              <div className="au-hero-stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="au-hero-art" data-reveal="1">
        <div className="au-hero-frame">
          <div className="au-hero-screen">
            <Image
              src="/assets/bg-collage.jpg"
              alt=""
              fill
              sizes={SIZES.heroScreen}
              quality={50}
              priority
            />
            <div className="au-hero-screen-scrim" />
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                color: "var(--text2)",
              }}
            >
              <span className="au-hero-play">
                <Icon name="play" size={30} filled />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-heading), system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: ".16em",
                  color: "var(--text)",
                }}
              >
                ULTRA HD · 4K
              </span>
            </div>
          </div>
        </div>
        <div className="au-hero-phone">
          <div className="au-hero-phone-inner">
            <Image src="/assets/phone-app.webp" alt="" fill sizes={SIZES.heroPhone} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsBar({ items }) {
  return (
    <section className="au-wrap" style={{ marginTop: "20px" }}>
      <div className="au-grid-stats" data-reveal="1">
        {items.map((s) => (
          <div key={s.label} className="au-stat-cell">
            <div className="au-stat-v">{s.value}</div>
            <div className="au-stat-l">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FeatureGrid({ items }) {
  return (
    <div className="au-grid au-grid-feat">
      {items.map((f) => (
        <div key={f.title} className={`au-feat${f.bg ? " au-feat-bg" : ""}`} data-reveal="1">
          {f.bg ? (
            <>
              <div className={`au-feat-art${f.bgContain ? " au-feat-art-contain" : ""}`}>
                <Image src={f.bg} alt="" fill sizes={SIZES.feature} quality={40} />
              </div>
              <div className="au-feat-scrim" />
            </>
          ) : null}
          <div className="au-feat-body">
            <span className="au-ico-box">
              <Icon name={f.icon} size={26} />
            </span>
            <h3 className="au-h3">{f.title}</h3>
            <p className="au-body">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const LIB_POS = ["22% 18%", "78% 20%", "50% 26%", "24% 80%", "76% 74%", "52% 58%"];

export function LibraryGrid({ items }) {
  return (
    <div className="au-grid au-grid-lib">
      {items.map((c, i) => (
        <div key={c.title} data-reveal="1">
          <div
            className="au-lib"
            style={{
              background: `radial-gradient(115% 85% at ${LIB_POS[i % LIB_POS.length]},rgba(229,9,20,.32),transparent 58%),linear-gradient(160deg,#1c1c1c,#0b0b0b)`,
            }}
          >
            <div className="au-lib-ico">
              <span>
                <Icon name={c.icon} size={46} />
              </span>
            </div>
            <div className="au-lib-scrim" />
            <div className="au-lib-title">{c.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DeviceGrid({ items, large }) {
  return (
    <div className={`au-grid au-grid-dev${large ? " au-grid-dev-lg" : ""}`}>
      {items.map((d) => (
        <div key={d.title} className={`au-dev${large ? " au-dev-lg" : ""}`} data-reveal="1">
          <span className={large ? "au-ico-box au-ico-box-lg" : ""} style={large ? undefined : { color: "var(--accent)" }}>
            <Icon name={d.icon} size={large ? 32 : 30} />
          </span>
          <span className="au-dev-name">{d.title}</span>
        </div>
      ))}
    </div>
  );
}

export function ContentRows({ rows }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(36px,5vw,64px)" }}>
      {rows.map((r, i) => (
        <div key={r.title} className={`au-row${i % 2 === 1 ? " au-row-rev" : ""}`} data-reveal="1">
          <div className="au-row-col">
            <span className="au-tag">{r.tag}</span>
            <h3 className="au-row-h">{r.title}</h3>
            <p className="au-row-p">{r.desc}</p>
            <div className="au-bullets">
              {r.bullets.map((b) => (
                <div key={b} className="au-bullet">
                  <span className="au-bullet-ico">
                    <Icon name="check" size={17} />
                  </span>
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div className="au-row-col">
            <div className="au-row-art">
              <div className="au-row-img">
                <Image src={r.img} alt={r.title} fill sizes={SIZES.contentRow} />
              </div>
              <div className="au-row-img-scrim" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Payments({ t }) {
  return (
    <div className="au-pay" data-reveal="1">
      <div style={{ textAlign: "left" }}>
        <div className="au-pay-t">{t.payments.title}</div>
        <div className="au-pay-n">{t.payments.note}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {t.payments.methods.map((m) => (
          <span key={m} className="au-pay-chip">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Reviews({ items }) {
  return (
    <div className="au-grid au-grid-rev">
      {items.map((r) => (
        <div key={r.name} className="au-rev" data-reveal="1">
          <Stars />
          <p className="au-rev-q">{r.quote}</p>
          <div className="au-rev-who">
            <span className="au-rev-av">{r.initial}</span>
            <div>
              <div className="au-rev-n">{r.name}</div>
              <div className="au-rev-r">{r.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PricingCards({ t, locale, compact }) {
  return (
    <div className={`au-grid au-grid-price${compact ? " au-grid-price-home" : ""}`}>
      {t.pricing.plans.map((p) => (
        <div
          key={p.name}
          className={`au-plan${compact ? " au-plan-sm" : ""}${p.best ? " au-plan-best" : ""}`}
          data-reveal="1"
        >
          {p.best ? <span className="au-plan-badge">{p.badge}</span> : null}
          <div className="au-plan-n">{p.name}</div>
          <span className="au-plan-p">{p.price}</span>
          <div className="au-plan-per">{p.per}</div>
          <Link href={`/${locale}/contact`} className="au-plan-cta">
            {t.pricing.choose}
          </Link>
          <div className="au-plan-rule" />
          <div className="au-plan-feats">
            {p.features.map((f) => (
              <div key={f} className="au-plan-feat">
                <span className="au-bullet-ico">
                  <Icon name="check" size={17} />
                </span>
                {f}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function BlogCards({ posts, locale }) {
  return (
    <div className="au-grid au-grid-blog">
      {posts.map((b) => (
        <article key={b.title}>
          <Link href={`/${locale}/blog`} className="au-post" data-reveal="1">
            <div className="au-post-art">
              <div className="au-post-art-glow" />
              <span className="au-post-art-l">FEATURED · 16:9</span>
            </div>
            <div className="au-post-body">
              <span className="au-post-tag">{b.tag}</span>
              <h3 className="au-post-h">{b.title}</h3>
              <p className="au-post-x">{b.excerpt}</p>
              <div className="au-post-meta">
                <span>{b.date}</span>
                <span>·</span>
                <span>{b.read}</span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

export function BlogList({ posts }) {
  return (
    <div className="au-post-list">
      {posts.map((b) => (
        <article key={b.title} className="au-post-wide" data-reveal="1">
          <div className="au-post-wide-art">
            <div className="au-post-art-glow" />
            <span className="au-post-art-l">FEATURED · 16:9</span>
          </div>
          <div className="au-post-wide-body">
            <span className="au-post-tag">{b.tag}</span>
            <h2 className="au-post-wide-h">{b.title}</h2>
            <p className="au-post-wide-x">{b.excerpt}</p>
            <div className="au-post-meta" style={{ marginTop: 0, fontSize: "13px" }}>
              <span>{b.date}</span>
              <span>·</span>
              <span>{b.read}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Steps({ items }) {
  return (
    <div className="au-grid au-grid-steps">
      {items.map((s) => (
        <div key={s.n} className="au-step" data-reveal="1">
          <span className="au-step-n">{s.n}</span>
          <h3 className="au-step-h">{s.title}</h3>
          <p className="au-step-p">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

// Always labelled with the free-trial CTA, so it opens WhatsApp directly.
// No `locale` needed any more — the link leaves the site.
export function CtaBanner({ title, sub, cta, small }) {
  return (
    <div className={`au-cta${small ? " au-cta-sm" : ""}`} data-reveal="1">
      <div className="au-cta-glow" />
      <div className="au-cta-body">
        <h2 className="au-cta-h">{title}</h2>
        {sub ? <p className="au-cta-p">{sub}</p> : null}
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={`au-btn au-btn-green ${small ? "au-btn-lg" : "au-btn-xl"}`}
        >
          {cta}
        </a>
      </div>
    </div>
  );
}

export function ContactCards({ t }) {
  return (
    <div className="au-grid-contact">
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="au-contact au-contact-link"
        data-reveal="1"
      >
        <span className="au-ico-box au-ico-box-xl" style={{ background: "rgba(37,211,102,.12)", color: "var(--green)" }}>
          <Icon name="wa" size={30} />
        </span>
        <div>
          <div className="au-contact-h">{t.contact.wa}</div>
          <div className="au-contact-p">{t.contact.waDesc}</div>
        </div>
        <span className="au-contact-cta">
          {t.contact.waCta}
          <Icon name="arrow" size={18} />
        </span>
      </a>
      <div className="au-contact" data-reveal="1">
        <span className="au-ico-box au-ico-box-xl">
          <Icon name="headphones" size={30} />
        </span>
        <div>
          <div className="au-contact-h">{t.contact.support}</div>
          <div className="au-contact-p">{t.contact.supportDesc}</div>
        </div>
        <div className="au-contact-live">
          <span className="au-live-dot" />
          {t.contact.online}
        </div>
      </div>
    </div>
  );
}

// Shared layout for the three legal pages (terms, privacy, refund).
export function LegalArticle({ t, doc, locale }) {
  return (
    <article className="au-legal">
      <div className="au-head au-head-tight" data-reveal="1" style={{ textAlign: "left", maxWidth: "none" }}>
        <span className="au-kicker">{doc.kicker}</span>
        <h1 className="au-h1">{doc.title}</h1>
        <p className="au-sub">{doc.intro}</p>
        <dl className="au-legal-meta">
          <div>
            <dt>{t.legal.updatedLabel}</dt>
            <dd>
              <time dateTime={t.legal.updatedDate}>{t.legal.updatedDate}</time>
            </dd>
          </div>
          <div>
            <dt>{t.legal.operatorLabel}</dt>
            <dd>{t.legal.operator}</dd>
          </div>
        </dl>
      </div>

      {doc.sections.map((s) => (
        <section key={s.h} className="au-legal-sec" data-reveal="1">
          <h2 className="au-legal-h">{s.h}</h2>
          <p className="au-legal-p">{s.p}</p>
        </section>
      ))}

      <div className="au-legal-cta" data-reveal="1">
        <Link href={`/${locale}/contact`} className="au-btn au-btn-green au-btn-md">
          {t.legal.contactCta}
          <Icon name="arrow" size={18} />
        </Link>
      </div>
    </article>
  );
}

export function SiteFooter({ t, locale }) {
  const c = t.footer.cols;
  const cols = [
    { title: c.product, links: [["features", t.nav.features], ["pricing", t.nav.pricing], ["devices", t.nav.devices]] },
    { title: c.company, links: [["blog", t.nav.blog], ["contact", t.nav.contact], ["faq", t.nav.faq]] },
    { title: c.legal, links: [["terms", c.terms], ["privacy", c.privacy], ["refund", c.refunds]] },
  ];

  return (
    <footer className="au-foot">
      <div className="au-foot-in">
        <div className="au-grid-foot">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--text)" }}>
              <LogoMark />
              <span className="au-brand-name" style={{ fontSize: "20px" }}>
                {BRAND}
              </span>
            </div>
            <p className="au-foot-tag">{t.footer.tagline}</p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="au-foot-h">{col.title}</div>
              <div className="au-foot-links">
                {col.links.map(([slug, label], i) => (
                  <Link key={`${slug}-${i}`} href={`/${locale}/${slug}`}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="au-foot-rule" />
        <div className="au-foot-legal">
          <span>{t.footer.copy}</span>
          <span className="au-foot-disc">{t.footer.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}

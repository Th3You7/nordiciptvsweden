# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for **IPTV NORDIC** (`https://www.nordiciptvsweden.com`) — Next.js 16 App Router, React 19, plain JavaScript (no TypeScript), no CSS framework and no test runner. Two locales: `sv` (default, the market language) and `en`. Sales happen on WhatsApp only: there is no cart, checkout, account system or backend.

`README.md` is stale — it describes the pre-Next single-page template (English/Maltese, `localStorage` theme, one `page.js` with all views). Ignore it; the architecture below is current.

## Commands

```bash
npm run dev          # localhost:3000
npm run verify       # lint + check:i18n + check:blog + build + check:urls — the gate before shipping
npm run lint         # eslint --max-warnings 0
npm run check:i18n   # sv/en catalogs must match in key paths and array lengths
npm run check:blog   # per-post rules from STRATEGY_BLOG_SWEDEN.md; errors fail, warnings print
npm run check:urls   # scans build output for localhost URLs (reads .next, or CHECK_URLS_DIST)
```

There are no tests. `check:i18n`, `check:blog` and `check:urls` are the test suite.

### Verifying a build without touching the user's dev server

Never run `next build` into `.next` while `npm run dev` may be running. Instead: add `distDir: ".next-verify"` to `next.config.mjs`, build, `npx next start -p <port>`, probe with `fetch` scripts, run `CHECK_URLS_DIST=.next-verify node scripts/check-urls.mjs`, then remove the `distDir` line and `rm -rf .next-verify`.

Builds download Poppins and Inter through `next/font/google`, so a dropped network connection fails the build with "Error while requesting resource". Retry before investigating.

## Architecture

### Routing and i18n

Every page lives under `app/[locale]/`; `/` 307-redirects to `/sv`. `params` is async — always `await params`. Pages are server components that `await getMessages(locale)`; interactivity is isolated in `app/components/client/` (`SiteNav`, `FaqAccordion`, `Reveal`) plus `LanguageSwitcher`.

**All copy lives in `app/i18n/messages/{sv,en}.json`** (414 keys). `app/lib/data.js` holds only non-translatable things (icon paths, constants). The catalogs also carry prices, plan features and FAQ answers, so `check:i18n` enforces identical structure — a price changed in one catalog and not the other is a build failure, not a typo.

### Product facts have one source

Plans (€15/35/45/65), stream counts (2–5), channel/movie/series counts, speed guidance (15 Mbit/s HD · 25 Mbit/s 4K) and the 7-day guarantee appear on the pricing page, in `Offer`/`FAQPage` schema and in blog posts. They come from the catalogs. Never state a different number anywhere, including articles.

Resolution wording is standardised as **`8K / 4K Ultra HD ready`** (title, hero, features, pricing, articles). Speed guidance still says 4K, because no 8K figure is published — don't invent one.

### SEO surface

- `app/lib/site.js` — `siteUrl` (inlined at **build** time from `NEXT_PUBLIC_SITE_URL`; a runtime-only env var has no effect) and `BRAND`.
- `app/lib/metadata.js` — `localeAlternates()` for static pages, `postAlternates()` for posts. Next replaces the whole `alternates` object per page, so every page must build the complete canonical + hreflang set here; a page setting only `canonical` silently loses hreflang. Posts emit hreflang only for locales they exist in.
- `app/lib/schema.js` — JSON-LD builders rendered through `<JsonLd>`. The layout emits `Organization` + `WebSite`; each route adds its own (`BreadcrumbList`, `Product`/`Offer`, `FAQPage`, `BlogPosting`, `ItemList`). Schema must not claim anything the page doesn't show.
- `app/sitemap.js`, `app/robots.js` — static routes plus published posts, with `updateDate` as `lastmod`.

### Blog engine

`content/blog/{slug}.{sv|en}.md` → `app/lib/blog.js` (gray-matter + remark + remark-gfm + remark-html). After markdown rendering it adds heading ids, routes images through `/_next/image` with srcset, wraps tables for mobile scroll, hardens external links, and expands the `[[wa:Label|note]]` shortcode into a prefilled WhatsApp button.

Conventions worth knowing before editing a post or the engine:

- **Raw HTML in markdown is stripped silently.** `check:blog` fails on it. Markdown only.
- **No `#` H1 in the body** — the frontmatter title is the page `<h1>`.
- **The hero image is frontmatter only** (`image:` + `imageAlt:`), rendered as a banner above the title; repeating it in the body shows it twice. Body images are 16:9, lazy.
- **The FAQ block and its `FAQPage` schema come from the `faq:` frontmatter array** — never hand-write a FAQ heading. The closing CTA and related posts render automatically too.
- **Internal links must be root-relative and locale-matched** (`/sv/...` in `.sv.md`). There is no link rewriter, and `check:blog` fails dead links and locale mismatches.
- **Slugs are ASCII** (å→a, ä→a, ö→o). Translations share a slug; `getBlogLocaleMap()` feeds the language switcher so a single-locale post doesn't switch into a 404.

### Published posts (as of 2026-09-29)

| Slug | Locales | Covers | Featured |
|---|---|---|---|
| `iptv-nordic` | sv + en | Mediavision's spring-2026 piracy figures, streaming price rises, the terrestrial network emptying, the public service fee (en adds SINK for expats) | yes |
| `iptv-bolaget` | sv + en | Vetting the *company* behind a service: 2026 blocking orders, the PMB 4826-25 conviction, SOU 2025:100 and why viewer fines did **not** start on 1 July, ARN and the right to cancel | no |
| `ip-tv-kopa` | sv + en | The purchase itself (transactional): the withdrawal button and ban on manipulative checkouts in force since 19 June 2026, payment methods, binding periods, what to receive after paying | no |

Before proposing a topic, check both files and the sister site at `~/Desktop/iptv/websites/iptv-finland/content/blog/`. That site is the same business and publishes `iptv-nordic` in English already; per strategy §0.1 the two domains must not run the same article, so keep Sweden posts anchored to Swedish law, prices and institutions.

**Linking while the pillars don't exist.** The pillar guides (`iptv-sverige`, `iptv-sweden-guide`) are unwritten, so posts link to `/pricing`, `/contact` and the home page instead, plus each other — the three published slugs already cross-link in both locales. Add pillar links as soon as a pillar exists. When a post ships, link it from the existing posts and bump their `updateDate` (§10.3), and end the conclusion on `/pricing` rather than `/blog`.

**Sourcing.** Searches for these keywords return mostly IPTV affiliate SEO sites; don't cite them. Use primary sources — SVT, domstol.se, riksdagen.se, regeringen.se, Skatteverket, Konsumentverket, ARN — and verify a claim's current status before writing it. The one that matters most here: fines for viewers are still only a proposal.

**Images.** Supply three prompts (16:9 hero with the subject centred, since desktop crops it to 2:1, plus two in-body). Once the owner delivers the files, check they landed in `public/assets/blog/` — twice they arrived in the project root — then wire the hero into frontmatter and the other two above their sections. Anything over ~250 KB: re-encode with `sharp` at quality 80ish, which has held dimensions while cutting files by half or more.

`app/lib/blog-taxonomy.js` holds the fixed tag vocabulary and the numeric publishing limits that `scripts/check-blog.mjs` enforces. **`STRATEGY_BLOG_SWEDEN.md` is the editorial playbook** — read it before writing or auditing an article. `content/blog/README.md` is the short author guide.

### Favicon and logo

The favicon set lives in `app/` as Next file conventions, not in `public/`: `app/icon.png` (512), `app/favicon.ico` (48), `app/apple-icon.png` (180). Next emits the `<link rel="icon">` tags automatically — there is no `icons:` metadata block. All three are the round Swedish-flag mark the owner supplied.

`Organization.logo` is `public/assets/logo-icon.png` (512×512 square, the same mark), set by `LOGO` in `app/lib/schema.js`; the sitemap reads that constant. The navbar still uses the older rectangular `assets/logo-flag.webp`, which is also the social-image fallback for pages without their own — so two logo files coexist on purpose.

### Images

`next/image` everywhere. `next.config.mjs` pins `deviceSizes` (with extra 420–576 steps) and `qualities: [40, 50, 75]` — a `quality` outside that list throws at build. Blog art goes in `public/assets/blog/`, WebP, under ~250 KB.

## Working conventions

- Code comments explain *why* (the trap, the decision), not what the line does. Match that register.
- Do not create images. Supply prompts for them; the owner produces the files.
- Articles ship in both `sv` and `en`, with `en` adapted for internationals living in Sweden rather than translated.
- The owner commits and pushes; don't commit unless asked.

## Known open items

- No analytics of any kind, so WhatsApp click-through is unmeasured.
- Legal pages name no company entity by the owner's decision (`legal.operator` says "Digital Product & Support Provider"), while the `iptv-nordic` article tells readers a reputable seller publishes those details.
- **The teaser `blog.posts` entries are now due for deletion**: the threshold of three real posts per locale is met, yet 4 invented teasers per locale still feed `/blog` and the homepage.
- Neither pillar guide is written, so no post links "up" yet, and all three published slugs sit outside the §8.2 backlog.
- Open editorial items on `iptv-bolaget`, raised in review and not applied: both conclusions end on a `/blog` link rather than `/pricing` (§9.3), the Swedish post has no home-page link, it runs ~60 words under its band, and the English keyword density is 1.51% against a 1.0–1.5% target. `ip-tv-kopa` was written without those faults.
- The new favicon and square logo only reach Google after the live site is re-crawled; nothing in Search Console reports favicons.
- `legacy/` is the original standalone template, kept for reference — never built, served or linted.

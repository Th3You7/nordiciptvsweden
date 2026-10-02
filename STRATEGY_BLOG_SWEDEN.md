# STRATEGY_BLOG_SWEDEN — IPTV NORDIC blog & content playbook

> Blog strategy for **www.nordiciptvsweden.com** (`IPTV NORDIC`), adapted from the Finland site's playbook (`iptv-finland/STRATEGY_BLOG_FINLAND.md`) and written against *this* codebase.
> The Finland document is the model: its structure, cluster system, article spec and guardrails carry over. Where the two disagree, **this file wins for this project** — the engine here is not a copy of Finland's, and Sweden is not Finland.
>
> Items marked ⚠️ are market facts that change (rights, prices, agency names, figures). Verify them on the day you publish; never copy them into an article from this document.

---

## 0. HOW THIS WAS BUILT FROM THE FINLAND SITE

The Finland site runs a working content operation — 12 slugs, 24 post files, each ~2,800–3,900 words with 7–8 FAQ items, 5 WhatsApp CTAs, 9–14 internal links and 3 images. Its strategy has two layers, and both were applied here:

| Layer | Finland | This project |
|---|---|---|
| **Engine** | markdown loader, post pages, tag-based related posts, frontmatter FAQ → schema, `[[wa:…]]` CTA shortcode, sitemap integration | **Ported**, in plain JavaScript and the site's own CSS, with the defects Finland's own doc flags fixed rather than copied (§1.3) |
| **Editorial** | locale-as-audience, keyword families, entity bank, fixed tags, pillar + clusters, article spec, guardrails, calendar | **Adapted** for the Swedish market and language (§3–§13) |
| **Checklist** | a manual pre-publish checklist | **Automated** as `npm run check:blog`, wired into `npm run verify` (§15) |

### 0.1 Do not copy Finland's articles

Two sites operated by the same business, with near-identical brand names (`Nordic IPTV` in Finland, `IPTV NORDIC` here), must not publish the same article:

- **Duplicate content across domains.** A translated Finland post is still the same document to Google, and one of the two URLs gets filtered out.
- **Cannibalisation.** Finland already publishes `iptv-nordic` and `svensk-iptv` in English. An English Sweden post targeting "IPTV Nordic" would compete with it.

**Rule:** this site owns Swedish-language queries and English queries *about living in Sweden*. Finland owns Finnish queries and English queries about Finland. For a genuinely shared topic (Nordic sports rights), pick one site to own it and link to it from the other. Reuse Finland's *research method*, never its text.

---

## 1. PROJECT ANALYSIS — what the code actually is

### 1.1 Brand and market facts (single source of truth)

| Item | Value | Defined in |
|---|---|---|
| Brand | `IPTV NORDIC` | [app/lib/site.js](app/lib/site.js) |
| Domain | `https://www.nordiciptvsweden.com` (apex 308-redirects to www) | [app/lib/site.js](app/lib/site.js) |
| Locales | `sv` (default, primary) + `en` | [app/i18n/config.js](app/i18n/config.js) |
| hreflang codes | `sv`, `en`, `x-default` → `sv` | [app/lib/metadata.js](app/lib/metadata.js) |
| Sales channel | **WhatsApp only** — `+212 617-984899`, no cart, no checkout | [app/lib/data.js](app/lib/data.js) |
| Plans | €15 / 1 mån · €35 / 3 mån · €45 / 6 mån · €65 / 12 mån | `pricing.plans` in the catalogs |
| Streams per plan | 2 → 3 → 4 → 5 simultaneous | `faq.items` in the catalogs |
| Product claims | 18 000+ live channels · 40 000+ movies · 12 000+ series · EPG + catch-up · activation in about a minute · 24/7 WhatsApp support · 7-day money-back · no fixed term, no auto-renewal | [app/i18n/messages/sv.json](app/i18n/messages/sv.json) |
| Recommended speed | 15 Mbit/s HD · 25 Mbit/s 4K | `faq.items` |

**Never contradict these numbers in an article.** They appear on the pricing page, in FAQ schema and in `Offer` data; a post quoting a different channel count or device limit creates an inconsistency that Google and customers both notice.

Two claims articles repeat — write them exactly this way:

- ✅ **Resolution: `8K / 4K Ultra HD ready`.** Standardised on 2026-09-15 across the meta title, hero, features, pricing and the articles. Use that exact wording. Speed guidance stays 15 Mbit/s HD · 25 Mbit/s 4K — there is no published 8K speed figure, so don't invent one.
- 🟠 **EUR on a Swedish site.** Prices are in euros; Swedish readers think in kronor. Don't quote SEK conversions — the rate moves and a stale conversion is a pricing claim. Write "15 €" and nothing more.

### 1.2 Real routes — the only internal link targets that exist

```
/sv             /en             home
/sv/features    /en/features
/sv/pricing     /en/pricing
/sv/devices     /en/devices
/sv/faq         /en/faq
/sv/contact     /en/contact
/sv/blog        /en/blog
/sv/blog/{slug} /en/blog/{slug}
/sv/terms  /sv/privacy  /sv/refund   (+ /en equivalents)
```

There are **no city or country landing pages**. Don't link to `/sv/iptv-stockholm` or similar — `check:blog` fails the build on any link to a route that doesn't exist.

### 1.3 Blog engine — how it works here

[app/lib/blog.js](app/lib/blog.js), [app/[locale]/blog/[slug]/page.js](app/[locale]/blog/[slug]/page.js), [app/sitemap.js](app/sitemap.js):

| Behaviour | This project | vs Finland |
|---|---|---|
| File naming | `content/blog/{slug}.{sv\|en}.md` | same |
| FAQ block + `FAQPage` schema | from the **`faq:` frontmatter array** | same |
| Related posts | shared `tags`, then date — 3 shown under "Läs också" | same |
| Featured slot | `featured: true`, max 3 per locale | same |
| Reading time | auto, ~200 wpm; shortcodes and image lines excluded | Finland counts them |
| Modified date | `updateDate` → `dateModified` and sitemap `<lastmod>` | same |
| **hreflang** | **only the locales the post exists in**; a single-locale post gets none | ✗ Finland emits both locales for every post (its doc's pre-flight #2) |
| **Heading anchors** | **every H2/H3 gets an id** (`## Så fungerar det` → `#sa-fungerar-det`) | ✗ Finland has none (pre-flight #4) |
| **Dates** | unquoted YAML dates normalised | ✗ Finland sorts them wrongly |
| **In-body images** | routed through `/_next/image` with srcset, sizes and dimensions; hero high-priority, others lazy | ✗ Finland ships raw `<img>` |
| **Tables** | wrapped so they scroll sideways on phones | ✗ |
| External links | `target="_blank" rel="noopener noreferrer"` added | ✗ |
| Inline CTAs | `[[wa:Label\|note]]` → WhatsApp button with a **prefilled blog message** | same |
| End-of-post CTA | rendered automatically | same |
| Schema per post | `BlogPosting` + 3-level `BreadcrumbList` + `FAQPage`; site-wide `Organization` + `WebSite`; `ItemList` on the index | same |
| **Pre-publish checks** | **`npm run check:blog`**, fails `verify` | ✗ manual checklist |

### 1.4 Markdown pipeline — verified behaviour

Pipeline: `remark → remark-gfm → remark-html`, then heading ids, image optimisation, table wrapping, external-link hardening, CTA shortcodes.

| Input | Output | Consequence |
|---|---|---|
| `## Rubrik` | `<h2 id="rubrik">` | ✅ deep links work; a table of contents is **allowed** (§9.3) |
| Raw HTML (`<div>`, `<img class>`, `<details>`) | **silently stripped** | ❌ Markdown only. `check:blog` fails on raw HTML |
| `# Title` in the body | a second `<h1>` | ❌ `check:blog` fails it |
| GFM table | renders, scrolls on mobile | ✅ use them |
| `[text](/sv/pricing)` | unchanged | ✅ root-relative links |
| `![alt](/assets/blog/x.webp)` | optimised responsive image | ✅ |

---

## 2. PRE-FLIGHT — status

| # | Item | Status |
|---|---|---|
| 1 | Posts enter the sitemap with `updateDate` as lastmod | ✅ done |
| 2 | hreflang limited to locales that exist | ✅ done — locale-exclusive posts are safe |
| 3 | Heading anchors | ✅ done |
| 4 | Pre-publish validation | ✅ `check:blog` in `verify` |
| 5 | **Teaser fallback.** `/blog` and the home page show the four invented posts from `blog.posts` until real posts exist | 🟠 **Delete `blog.posts` from both catalogs once 3 real posts per locale are live** |
| 6 | 4K vs 8K claim (§1.1) | ✅ standardised to `8K / 4K Ultra HD ready` (2026-09-15) |
| 7 | Operator placeholder on Terms/Privacy/Refund | ✅ replaced 2026-09-15 with "Digital Product & Support Provider". By the owner's decision no company name, address or registration number is published — note that the legality checklist in `iptv-nordic` still tells readers to look for those details |
| 8 | **No analytics.** There is no GA4 or any tracking — §16 cannot be measured | 🟠 add GA4 + a WhatsApp outbound-click event before publishing |
| 9 | **Default social image** is the flag logo; posts without `image:` share it | 🟡 a branded 1200×630 card would convert better |
| 10 | `public/assets/blog/` doesn't exist yet | 🟡 created by the first post's images |

---

## 3. STRATEGIC POSITION — Sweden

- **A mid-sized, digitally mature market.** About 10.5 million people ⚠️. Broadband, fibre and streaming adoption are among the highest in Europe, so "will it buffer?" is a weak objection. The real ones are **price versus the operators**, **do you have Swedish channels and sport**, and **is this legitimate**.
- **TV is paid through several channels at once.** The TV licence was abolished on 1 January 2019 and replaced by the **public service-avgift**, collected through income tax. Households pay that, plus an operator or satellite package, plus one or more streaming services. Cost-comparison content is the highest-converting angle — as it is in Finland.
- **Distribution is fragmented** across broadband operators, satellite and digital terrestrial, and the major streaming services ⚠️ (§6). Fragmentation is the sales argument: *one subscription instead of several*.
- **Sport drives TV.** SHL hockey, Allsvenskan, the Premier League and Champions League, the NHL (heavy Swedish interest), the ice hockey World Championship in May, Vasaloppet and winter sport. Rights are split between services and change hands ⚠️ — write about *what people want to watch*, never about who currently holds the rights (§12).
- **Strong TV traditions.** Melodifestivalen (Feb–Mar), Kalle Anka at 15:00 on Christmas Eve, midsummer, long dark winters. These are seasonal publishing windows (§13).
- **Legality is a live consumer question**, searched in Swedish as *är IPTV lagligt*. Answer it honestly — it's a keyword this site can own precisely by *not* dodging it (§12).

**Positioning line (SV):** *ett abonnemang i stället för flera — svenska och internationella kanaler, sport och film i samma app, utan bindningstid.*
**(EN):** *one subscription instead of four — Swedish and international TV in one app, no fixed-term contract.*

---

## 4. LANGUAGE STRATEGY — `sv` and `en` are different audiences

| | `sv` (primary) | `en` (secondary) |
|---|---|---|
| Audience | Swedish households | Internationals **living in Sweden** — tech and research workers, students, families relocating to Stockholm, Göteborg, Malmö, Uppsala |
| Share of output | **~65%** | ~35% |
| Core intent | Replace or supplement an operator TV package; get sport and film for less | Watch **their home country's TV** and English-language TV; understand how Swedish TV and the public service fee work |
| Emotional driver | value, sport, no contract | homesickness, orientation, "how does TV even work here" |
| Tone | *lagom*: factual, calm, no hype. Swedes distrust superlatives — and Swedish marketing law requires them to be provable (§12). | warm, practical, orientation-guide |
| Translation | **Never machine-translate.** ~60% of posts are locale-exclusive. | |

**Rule:** translate only when the intent is identical — device how-tos, app guides, troubleshooting. A Swedish post about the public service fee becomes an English post titled *"How TV costs work in Sweden when you move here"*, not a translation.

**Nuance specific to Sweden.** Swedes have very high English proficiency and some search in English. That doesn't change the rule — Swedish households are still served best in Swedish — but it means `en` posts can rank for Swedes too. Keep `en` posts Sweden-anchored so they never compete with a `sv` post for the same intent.

> **Decision for you:** Finland declares `en-FI`; this site declares plain `en`, so English pages compete for English queries worldwide. Switching to `en-SE` focuses them on Sweden. That's a sitewide hreflang change — decide before English posts ship.

---

## 5. SWEDISH KEYWORD MECHANICS

Swedish is far less inflected than Finnish, but it has three features that change how keywords behave.

1. **Definite suffixes and plurals.** `IPTV-tjänst` → *IPTV-tjänsten, IPTV-tjänster, IPTV-tjänsterna*. `kanalpaket` → *kanalpaketet, kanalpaketen*. Google's Swedish stemming handles these. **Target the family**, not exact-match repetition.
2. **Compounds, and the hyphen after an abbreviation.** *strömningstjänst, sportkanaler, tv-paket*. An acronym joined to a word takes a hyphen: `IPTV-tjänst`, `IPTV-abonnemang`, `4K-kvalitet`, `M3U-lista`. A multi-word first part takes a hyphen before the last element: `Smart TV-app`. Genitive of an acronym takes a colon: `IPTV:s`.
3. **`tv` is lower case in running text and compounds** — *tv-kanaler, tv-paket, kabel-tv* — per Språkrådet's recommendation. Brand and product names keep their own casing (`SVT1`, `Smart TV`, `Apple TV`). Getting this right signals a native writer.

Targets:

- Keyword **family** (all inflected and compound forms) at **1.0–1.5%** of words.
- The clean form in: title, first 100 words, ≥2 H2s, the excerpt, the conclusion.
- **Slugs are ASCII**: `å→a`, `ä→a`, `ö→o` (`basta-iptv`, `ar-iptv-lagligt`). `check:blog` enforces this.
- **Never mix languages in one post.** No English CTA in a Swedish article.

### Swedish keyword families

| Family | Head term | Variants to weave in |
|---|---|---|
| Service | `IPTV Sverige` | IPTV-tjänst, IPTV-abonnemang, IPTV i Sverige, svensk IPTV, bästa IPTV |
| Trial & price | `IPTV gratis test` | IPTV testperiod, IPTV pris, billig IPTV, IPTV månadskostnad |
| Channels | `svenska tv-kanaler online` | kanalpaket, kanallista, se svensk tv på nätet, tv-kanaler på nätet |
| Alternative | `tv utan kabel` | alternativ till kabel-tv, tv-paket jämförelse, tv via internet, strömmad tv |
| Sport | `sportkanaler online` | se hockey på nätet, se fotboll på nätet, SHL på tv, Allsvenskan på tv |
| Devices | `IPTV Smart TV` | IPTV Samsung, IPTV LG, IPTV Android TV, IPTV-box, Fire TV Stick |
| Technical | `M3U-lista` | Xtream Codes, EPG, tv-guide, IPTV Smarters Pro, IPTV buffrar |
| Trust | `är IPTV lagligt` | laglig IPTV, IPTV omdömen, pålitlig IPTV, IPTV bluff |

### English (`en`, Sweden-anchored) families

`IPTV Sweden` · `IPTV subscription Sweden` · `English TV channels in Sweden` · `watch UK TV in Sweden` · `watch Swedish TV online` · `IPTV for expats in Sweden` · `best IPTV service Sweden` · `IPTV free trial Sweden` · `watch Premier League in Sweden` · `NHL streaming Sweden` · `TV licence Sweden / public service fee explained`

---

## 6. ENTITY BANK — Sweden

Name the real entities of the topic, in context, not as a keyword list. **Everything in this section is ⚠️ — ownership, channel line-ups and names change. Verify each entity's current status on the day.**

- **Public service:** SVT, SVT1, SVT2, SVT24, Barnkanalen, **SVT Play**, UR, UR Play, Sveriges Radio. *Kunskapskanalen is scheduled to close as a linear channel on 1 January 2027 per SVT's announcement of 6 May 2026 — the Finland site's `svensk-iptv` post documents it; cite SVT, not that post.*
- **Commercial TV:** TV4, **TV4 Play**, Sjuan, TV12, Kanal 5, Kanal 9, Kanal 11, TV3, TV6, TV8
- **Distribution:** Telia, Tele2, Allente, Boxer, Bredbandsbolaget, stadsnät, kabel-tv, digital-tv via antenn, satellit
- **Streaming:** Netflix, **Viaplay**, Max, Disney+, SkyShowtime, Prime Video, Apple TV+
- **Sport:** **SHL**, HockeyAllsvenskan, **Allsvenskan**, Superettan, Damallsvenskan, Premier League, Champions League, **NHL**, **hockey-VM**, Vasaloppet, skid-VM, handbolls-EM/VM, Formel 1
- **Entertainment moments:** **Melodifestivalen**, Kalle Anka på julafton, Allsång på Skansen, Nobelfesten
- **Apps / players:** **IPTV Smarters Pro**, TiviMate, IBO Player, Smart IPTV, XCIPTV, GSE Smart IPTV, Kodi
- **Devices:** Samsung Tizen, LG webOS, Android TV / Google TV, **Amazon Fire TV Stick**, Apple TV, Chromecast, Nvidia Shield
- **Tech:** M3U, Xtream Codes API, EPG (XMLTV), HLS, HEVC, catch-up, VOD, buffring, latens
- **Connectivity:** fiber, stadsnät, 5G-bredband, mobilt bredband, wifi 6, nätverkskabel
- **Institutions:** **public service-avgift** (collected by Skatteverket), Mediemyndigheten ⚠️, Konsumentverket, Allmänna reklamationsnämnden (ARN), Integritetsskyddsmyndigheten (IMY), Patent- och marknadsdomstolen, Rättighetsalliansen
- **Places:** Stockholm, Göteborg, Malmö, Uppsala, Västerås, Örebro, Linköping, Helsingborg, Jönköping, Umeå, Luleå, Kiruna; Skåne, Västra Götaland, Norrland; Norge, Danmark, Finland

**Competitor rule:** name Telia, Tele2, Allente, Viaplay and the others openly and describe them fairly. **Never state a competitor's price, package or channel count without checking it that day**, and write `Priser kontrollerade {datum}.` / `Prices checked {date}.` in the article.

---

## 7. TAG TAXONOMY

Defined once in [app/lib/blog-taxonomy.js](app/lib/blog-taxonomy.js). `tags[0]` is the visible badge **and** the related-post signal, so the vocabulary is fixed; `check:blog` rejects a first tag that isn't on this list.

| Cluster | `sv` `tags[0]` | `en` `tags[0]` |
|---|---|---|
| A — Buyer / comparison | `IPTV-guider` | `IPTV Guides` |
| B — Channels & sport | `Kanaler och sport` | `Channels & Sport` |
| C — Devices & setup | `Installation` | `Installation` |
| D — Troubleshooting & tips | `Streamingtips` | `Streaming Tips` |
| E — Local & seasonal | `Sverige` | `Sweden` |
| F — Product news | `Produktnyheter` | `Product Updates` |

Rules:
- **2–4 tags** per post, the first from the table.
- Secondary tags are the linking glue — reuse: `pris`, `jämförelse`, `Smart TV`, `Android`, `iOS`, `sport`, `hockey`, `fotboll`, `EPG`, `M3U`, `buffring`, `nybörjare` (EN: `pricing`, `comparison`, `Smart TV`, `Android`, `iOS`, `sport`, `hockey`, `football`, `expats`, `EPG`, `M3U`, `buffering`, `beginners`).
- Tags are **locale-local**: Swedish tags in `.sv.md`, English in `.en.md`.
- Keep tags matched across a pair so both show the same related set — with one deliberate exception.
- **The `expats` exception.** `en` is a different audience, not a translation (§4), so an `en` post may carry `expats` as an extra tag that has no `sv` counterpart. That tag is what links the English posts to each other. Everything else — the cluster tag and the topical secondaries — must still match across the pair. Do not invent further one-sided tags.

---

## 8. THE CONTENT MAP — pillars and 25 articles

### 8.1 Architecture

```
PILLAR SV:  /sv/blog/iptv-sverige         ← "IPTV Sverige" master guide
PILLAR EN:  /en/blog/iptv-sweden-guide    ← "IPTV Sweden" newcomer master guide
   │
   ├── A. Buyer / comparison   (converts)   → links hard to /sv/pricing
   ├── B. Channels & sport     (traffic)    → pillar + /sv/features
   ├── C. Devices & setup      (long-tail)  → /sv/devices
   ├── D. Troubleshooting      (trust)      → /sv/faq + /sv/contact
   └── E. Local & seasonal     (seasonal)   → pillar
```

Every cluster post links **up to its pillar** and **sideways to 3–6 siblings**.

### 8.2 Backlog

**P1** = days 1–30 · **P2** = 31–60 · **P3** = 61–90+. Words are the finished count in that language.

#### Cluster A — Buyer & comparison

| # | Slug | Locale | Primary keyword | Intent | Words | P |
|---|---|---|---|---|---|---|
| A1 | `iptv-sverige` | sv | IPTV Sverige | **PILLAR** | 3 200–4 000 | P1 |
| A2 | `tv-paket-jamforelse` | sv | tv-paket jämförelse · IPTV pris | commercial | 2 400–3 000 | P1 |
| A3 | `tv-utan-kabel` | sv | tv utan kabel · alternativ till kabel-tv | commercial | 2 200–2 800 | P1 |
| A4 | `iptv-gratis-test` | sv | IPTV gratis test | transactional | 1 500–2 000 | P1 |
| A5 | `ar-iptv-lagligt` | sv | är IPTV lagligt | trust | 2 000–2 600 | P2 |
| A6 | `public-service-avgift-och-tv-kostnader` | sv | public service-avgift · tv-kostnader | informational → commercial | 1 800–2 300 | P2 |
| A7 | `iptv-omdomen` | sv | IPTV omdömen | trust | 1 600–2 000 | P3 |
| A8 | `iptv-sweden-guide` | en | IPTV Sweden | **PILLAR** | 3 000–3 800 | P1 |
| A9 | `iptv-for-expats-in-sweden` | en | IPTV for expats in Sweden | commercial | 2 200–2 800 | P2 |
| A10 | `tv-costs-in-sweden-explained` | en | TV licence Sweden · public service fee | informational | 1 800–2 300 | P3 |

#### Cluster B — Channels & sport

| # | Slug | Locale | Primary keyword | Intent | Words | P |
|---|---|---|---|---|---|---|
| B1 | `svenska-tv-kanaler-online` | sv | svenska tv-kanaler online | informational | 2 200–2 800 | P1 |
| B2 | `sportkanaler-online` | sv | sportkanaler online | commercial | 2 000–2 600 | P1 |
| B3 | `se-hockey-pa-natet` | sv | se hockey på nätet · SHL | seasonal (Sep–Apr) | 1 600–2 200 | P2 |
| B4 | `se-fotboll-pa-natet` | sv | se fotboll på nätet · Allsvenskan | seasonal (Apr–Nov) | 1 600–2 200 | P2 |
| B5 | `english-tv-channels-in-sweden` | en | English TV channels in Sweden | commercial | 2 000–2 600 | P1 |
| B6 | `watch-premier-league-in-sweden` | en | watch Premier League in Sweden | seasonal (Aug–May) | 1 600–2 200 | P2 |
| B7 | `melodifestivalen-pa-tv` | sv | Melodifestivalen på tv | seasonal (Feb–Mar) | 1 200–1 700 | P3 |

#### Cluster C — Devices & setup (both locales, shared slug)

| # | Slug | Primary keyword | Words | P |
|---|---|---|---|---|
| C1 | `iptv-smart-tv` | IPTV Smart TV installation / setup | 1 400–1 900 | P1 |
| C2 | `iptv-smarters-pro` | IPTV Smarters Pro | 2 400–3 200 | P2 |
| C3 | `iptv-android-tv-box` | IPTV Android TV · IPTV-box | 1 400–1 900 | P2 ⚠️ see §11.1 |
| C4 | `iptv-fire-tv-stick` | IPTV Fire TV Stick | 1 200–1 700 | P2 |
| C5 | `iptv-iphone-ipad-apple-tv` | IPTV iPhone · Apple TV | 1 200–1 700 | P3 |
| C6 | `m3u-lista-och-xtream-codes` | M3U-lista · Xtream Codes | 1 300–1 800 | P3 |

C3 note: `iptv-box-malmo` already covers the box basics as a local variant (§11.1). Write C3 as the **general** guide and trim the overlap out of the Malmö post when you do.

C2 note: Finland published `iptv-smarters-pro` with an angle on counterfeit apps and Android's developer-verification rules. **Write an original post** — different structure and examples, Swedish sources. Same slug on two domains is fine; the same text is not.

#### Cluster D — Troubleshooting (both locales)

| # | Slug | Primary keyword | Words | P |
|---|---|---|---|---|
| D1 | `iptv-buffrar` | IPTV buffrar · fix IPTV buffering | 1 400–1 900 | P1 |
| D2 | `internethastighet-for-iptv` | internethastighet IPTV · internet speed for IPTV | 1 100–1 600 | P2 |
| D3 | `epg-tv-guide` | EPG · tv-guide | 900–1 400 | P3 |

#### Cluster E — Seasonal

| # | Slug | Locale | Primary keyword | Words | P |
|---|---|---|---|---|---|
| E1 | `tv-i-jul-och-vinter` | sv | *(seasonal — refresh yearly)* | 1 000–1 500 | P3 |

**Total: 25 slugs → ~34 markdown files.**

### 8.3 Featured slots

Exactly three `featured: true` per locale (`check:blog` fails on a fourth):
- **sv:** A1 `iptv-sverige`, A2 `tv-paket-jamforelse`, B1 `svenska-tv-kanaler-online`
- **en:** A8 `iptv-sweden-guide`, B5 `english-tv-channels-in-sweden`, A9 `iptv-for-expats-in-sweden`

Rotate a seasonal post in during its window, then back out.

---

## 9. ARTICLE SPEC

### 9.1 Frontmatter

```yaml
---
title: "IPTV Sverige 2026 — vad det är, vad det kostar och hur det fungerar"
excerpt: "IPTV i Sverige: vad en IPTV-tjänst innehåller, vad den kostar jämfört med kabel-tv och hur du kommer igång. Utan bindningstid."
date: "2026-09-15"
updateDate: "2026-09-15"
author: "IPTV NORDIC"
image: "/assets/blog/iptv-sverige-hero.webp"
imageAlt: "IPTV i Sverige – smart-tv i ett vardagsrum en kväll"
tags: ["IPTV-guider", "pris", "jämförelse", "nybörjare"]
featured: true
faq:
  - q: "Vad är IPTV?"
    a: "IPTV betyder att tv-kanaler strömmas via internet i stället för antenn, kabel eller parabol. Kanalerna spelas upp i en app på en smart-tv, mobil, surfplatta eller streamingsticka, så det enda du behöver är en stabil internetuppkoppling."
  - q: "Vad kostar IPTV NORDIC?"
    a: "Paketen kostar 15 € för en månad, 35 € för tre, 45 € för sex och 65 € för tolv månader. Det finns ingen bindningstid, abonnemanget förnyas inte automatiskt och alla paket har sju dagars pengarna-tillbaka-garanti."
  - q: "Behöver jag en särskild box?"
    a: "Nej. Tjänsten fungerar på smart-tv, Android TV, Fire TV Stick, Apple TV, mobil, surfplatta och dator. Du behöver ingen operatörsbox och inget separat avtal för utrustning."
  - q: "Hur snabbt internet behövs?"
    a: "Vi rekommenderar minst 15 Mbit/s för HD och 25 Mbit/s för jämn 4K-strömning. En svensk fiber- eller 5G-uppkoppling räcker gott. Stabilitet är viktigare än toppfart."
  - q: "Kan jag testa innan jag betalar?"
    a: "Ja. Alla nya kunder kan börja med en gratis testperiod och kontrollera bildkvalitet och stabilitet på sin egen enhet innan de bestämmer sig."
---
```

| Field | Rule | Checked |
|---|---|---|
| `title` | Primary keyword first; year on evergreen commercial posts; ~55–62 chars (the layout appends `\| IPTV NORDIC`) | presence |
| `excerpt` | **≤155 chars.** It is the meta description, the card text and `BlogPosting.description`. Write it as ad copy. | ✅ length |
| `date` | quoted `"YYYY-MM-DD"` | ✅ format |
| `updateDate` | bump on every real edit; drives `dateModified` and `<lastmod>`; never earlier than `date` | ✅ |
| `author` | `"IPTV NORDIC"` — schema types it as an Organization. No invented personas. | |
| `image` | `/assets/blog/{slug}-hero.webp`, 16:9. Shown as the **hero banner above the title** and used as the social card; must exist | ✅ exists |
| `imageAlt` | describes the hero picture, in the post's language | ⚠️ warns if missing |
| `tags` | 2–4, first from §7 | ✅ |
| `featured` | max 3 per locale | ✅ |
| `faq` | **5–8 items, mandatory.** Plain text; 40–70 words; answer in the first sentence. The only source of `FAQPage` schema. | ✅ count + plain text |

### 9.2 Body template

````markdown
Inledning med huvudsökordet inom de första 100 orden. Säg direkt vilken fråga
artikeln besvarar. 2–4 meningar, ingen säljsnack.

## Vad är IPTV och hur fungerar det?

Brödtext…

### Underrubrik

Brödtext med en naturlig intern länk till [paketen och priserna](/sv/pricing).

[[wa:Testa gratis|Se kvaliteten på din egen enhet innan du betalar.]]

## IPTV eller kabel-tv — vad är skillnaden?

| | Kabel-tv | IPTV |
|---|---|---|
| Bindningstid | ofta 12–24 månader | ingen |
| Utrustning | operatörens box | egen smart-tv eller streamingsticka |

## Sammanfattning

Sammanfattning och ett tydligt nästa steg: [börja med en gratis testperiod](/sv/contact)
eller [jämför paketen](/sv/pricing).
````

The hero banner (from `image:`), the FAQ block, the closing CTA and "Läs också" render automatically. **Don't write them into the body** — the checker warns on a hand-written FAQ heading.

### 9.3 Structural rules

| Element | Rule | Checked |
|---|---|---|
| H1 | **Never.** The title is the page `<h1>`. Start at `##`. | ✅ fails |
| Raw HTML | **Never** — stripped silently | ✅ fails |
| Table of contents | **Optional** on posts over ~2 500 words. Headings have ids, so link as `[Pris](#vad-kostar-iptv)` — the id is the heading, lower-cased, å/ä/ö folded to a/a/o, spaces to hyphens. | |
| H2 | 6–12. Keyword family in ≥2. Question-form works well. | ⚠️ warns under 6 |
| Hero | **not in the body** — set `image:` and `imageAlt:`; the page shows it as a banner above the title | ⚠️ warns if repeated in the body |
| Tables | ≥1 wherever the topic allows | |
| Lists | yes, but under ~30% of the article | |
| Conclusion | summary + one next step to `/pricing` or `/contact` | |

### 9.4 Word counts

Swedish is somewhat more compact than English, so its bands sit a little lower.

| Type | `sv` | `en` |
|---|---|---|
| Pillar | 3 200–4 000 | 3 000–3 800 |
| Commercial / comparison | 2 200–3 000 | 2 000–2 800 |
| Channels / sport | 1 600–2 600 | 1 600–2 600 |
| Device how-to | 1 200–1 900 | 1 200–1 900 |
| Troubleshooting | 900–1 900 | 900–1 900 |

**Floor: 900 words** — `check:blog` fails below it. A shorter post doesn't justify its own URL; fold it into an existing one.

### 9.5 Images and inline CTAs

**Three images per article** — the hero banner (from `image:`) plus two in-body. The site owner creates the images; the article author supplies prompts for them.

| Slot | Path | Size | Placement |
|---|---|---|---|
| Hero | `/assets/blog/{slug}-hero.webp` | 16:9, 1600 px wide or more | `image:` + `imageAlt:` only — shown as a banner above the title, cropped to 2:1 on desktop, so keep the subject centred |
| Context 1 | `/assets/blog/{slug}-{topic}.webp` | 1200×675 (16:9) | After the first explanatory section |
| Context 2 | `/assets/blog/{slug}-{topic}.webp` | 1200×675 (16:9) | In the practical half |

WebP, under ~250 KB, alt text that describes the image and contains the keyword naturally. No decorative stock. Everything is served through the image optimizer, so export at least 1200 px wide (1600 px or more for the hero).

**Inline WhatsApp CTAs — `[[wa:Label|note]]`**, on a line of its own:

```markdown
[[wa:Fråga på WhatsApp|Berätta vilken tv du har, så bekräftar vi att den fungerar innan du beställer.]]
```

| Rule | Value | Checked |
|---|---|---|
| Count | **5** per article | ⚠️ |
| Placement | after the problem is established, after the main evidence, after the offer, after the practical section, before the conclusion | |
| Never | two in a row; one in the intro; one directly before the auto CTA | ⚠️ adjacency |
| Labels, `sv` | `Testa gratis` · `Fråga på WhatsApp` · `Starta testperiod` · `Få dina inloggningsuppgifter` · `Beställ på WhatsApp` — all five different | ⚠️ |
| Labels, `en` | `Test it Free` · `Ask us on WhatsApp` · `Start Free Trial` · `Get Your Login` · `Order on WhatsApp` | ⚠️ |
| Notes | **required and never reused** — each answers the objection its section raised, one sentence, under ~110 chars | ⚠️ |
| Note claims | must match §1.1: 7-day money-back, about a minute to activate, no fixed term, no auto-renewal | |
| Internal link? | **No** — outbound to WhatsApp; outside the 8–14 quota | |

Every CTA opens WhatsApp with *"Hej! Jag läste er guide och vill veta mer om IPTV NORDIC."* prefilled, so a chat started from the blog says so.

---

## 10. INTERNAL LINKING

### 10.1 Quota per article

| Destination | Count | Anchor rule |
|---|---|---|
| Pillar (`/sv/blog/iptv-sverige` or `/en/blog/iptv-sweden-guide`) | 1–2 | keyword-rich, varied |
| `/{lang}/pricing` | 1–2 | one mid-article, one in the conclusion |
| `/{lang}/features` or `/{lang}/devices` | 1 | whichever fits |
| Sibling posts (shared tag) | 3–6 | in-sentence, contextual |
| `/{lang}/faq` or `/{lang}/contact` | 1 | when referencing support |
| **Total** | **8–14** | never the same anchor text twice |

`check:blog` warns outside 8–14 and on repeated anchor text.

**Before the pillars exist.** The first published pair (`iptv-nordic`, sv + en) has no pillar or sibling to link to, so it links to `/pricing`, `/contact` and the home page (`/{lang}`) instead. From the next post on, include the pillar links above.

### 10.2 Link format

No link rewriter exists. A `/en/` link in a Swedish post sends the reader into English.

- Root-relative only: `/sv/pricing`, `/en/blog/iptv-sweden-guide`.
- **The locale prefix must match the file.** `check:blog` fails a mismatch.
- **Every internal link must resolve** to a real page or published post — `check:blog` fails dead links. Link to a post only once it exists.
- Never `[text](#)`. Never "klicka här" or "läs mer" as the whole anchor.
- **≥1 outbound authority link** per article, language-matched: SVT, Konsumentverket, Mediemyndigheten ⚠️, an official app vendor, Wikipedia. Swedish sources in Swedish posts.

### 10.3 When you publish

Add one contextual link to the new post from **2–3 existing posts in the same locale** — the pillar plus one tag-sibling — and bump their `updateDate`.

**Never add a "Läs också" / "See also" block.** The page renders one automatically.

---

## 11. LOCAL SEO

There is still no landing-page route, so there is no city layer to feed, and **a city post is never justified by the city name alone**. The failure mode is a generic guide with a place name pasted on: it ranks badly and dilutes the pillar.

A city post is allowed only when it passes all four of these:

1. **Three or more verifiable local facts** that change the reader's decision — the local network model, what housing associations bundle, a regional channel demand, a local operator's terms. Cite them; a fact you cannot source is not a fact.
2. **Sourced to local authorities or operators** — the municipality, the city network, an operator's own page — not to a national page with the city inserted.
3. **The advice genuinely differs** from the national guide. If deleting the city name leaves the article unchanged, it is not a city post.
4. **It links up to its cluster guide** rather than competing with it (§11.1).

Revisit this section if a `[locale]/[slug]` landing route is ever added.

### 11.1 City posts and their cluster guide

A city post is a *variant* of a cluster topic, never a replacement. The cluster guide owns the general keyword; the city post owns the local query and links up to it.

**Published:** `iptv-box-malmo` (sv + en, 2026-09-29) is the local variant of **C3** `iptv-android-tv-box`. It qualifies on Malmö's open city network (sourced to the municipality), the Öresund demand for Danish channels (sourced to an operator's package page) and what apartment buildings already bundle.

When C3 is written it takes the general box keyword and the full device walk-through; the Malmö post then keeps only its local material and links up to C3. Until then, `iptv-box-malmo` carries the box basics — so **C3 must be written as the general guide, not as a second Malmö article**, and the overlap trimmed at that point.

---

## 12. EDITORIAL & COMPLIANCE GUARDRAILS — Sweden

**Do:**
- Describe what the service is, what it costs, which devices it runs on, what support exists.
- Answer legality questions factually and neutrally: the difference between licensed distribution and unlicensed streams. Point to official sources ⚠️.
- Name the official Swedish services plainly — SVT Play, TV4 Play, the operators, the streaming services.
- Date every price claim: `Priser kontrollerade 15 september 2026.`
- Use honest experience language: *vi testade*, *vi rekommenderar*, *den vanligaste frågan vi får är…*

**Don't:**
- Frame content around getting paid content for free, bypassing geo-blocks, or evading detection. `se gratis` as an intent is off-limits even with volume.
- **Claim specific rights** — never say the line-up carries SHL, Allsvenskan, Premier League or any named premium channel. Write about what people want to watch and what the service offers generally (`sportkanaler`, `18 000+ kanaler`).
- **Use unprovable superlatives.** Swedish marketing law (marknadsföringslagen) requires claims like *bäst*, *billigast* or *snabbast* to be substantiated. "Bästa IPTV" is a fine *topic* for a comparison post; it is not a claim to make about ourselves.
- **Misstate consumer rights.** Distance sales in Sweden carry a statutory 14-day right of withdrawal (distansavtalslagen), with specific rules for digital services. The 7-day guarantee is *in addition to* statutory rights — never write that it replaces them.
- Publish invented reviews, testimonials or an author persona.
- State a competitor price, package or channel count you haven't verified that day.
- Promise "alla kanaler", "100 % stabilt", or anything the FAQ contradicts.

A mismatch between structured-data claims and page content is a rich-result risk — these rules protect the `Organization`, `Product` and `BlogPosting` schema as much as the reader.

---

## 13. SEASONAL CALENDAR — the Swedish TV year

Publish **6–8 weeks before** a window so the post is indexed and has aged by the peak. Refresh the existing URL each year; don't create a new one.

| Window | Driver | Publish / refresh | Posts |
|---|---|---|---|
| Jan | New year, dark season, budget reviews | Nov–Dec | A2, A3 |
| **Feb–Mar** | **Melodifestivalen**, winter sport, Vasaloppet | Dec–Jan | B7 |
| Apr | **Allsvenskan kicks off**, SHL playoffs | Feb | B4, B3 refresh |
| **May** | **Hockey-VM** — the year's biggest shared sports TV moment | Mar | B3 refresh, urgency CTAs |
| Jun–Jul | Midsummer, summer houses, travel, tournament summers | Apr–May | D2, C-cluster how-tos |
| Aug | Premier League and new TV season; **student and relocation intake** | Jun–Jul | B6, A9, B5 |
| **Sep** | **SHL season opens**; autumn TV season | Jul | B3, B2 |
| Oct–Nov | NHL in full swing, dark evenings | Aug–Sep | A1/A8 refresh, A4 |
| **Dec** | **Christmas TV, Kalle Anka**, holiday viewing | Oct | E1, featured rotation |

Maintenance: bump `updateDate`, refresh the year in `title`/`excerpt`, re-verify prices, re-request indexing.

### 13.1 Refresh triggers for claims that expire

Several published posts rest on facts with a known expiry. These are not seasonal — they go stale on an event, so watch the event rather than the calendar.

| Claim | In | Trigger to re-check |
|---|---|---|
| Viewer fines are only a proposal (SOU 2025:100, no new date after 1 July 2026 passed) | `iptv-bolaget` | Any government bill or riksdag decision on illegal ip-tv |
| Mediavision Q1/Q2 2026 figures: ~11m subscriptions, growth gone, 4m cancellations | `basta-iptv-abonnemang` | Mediavision's next quarterly release |
| HBO Max / SkyShowtime integration barred before 1 June 2027 | `basta-iptv-abonnemang` | The twelve-state court ruling, or 1 June 2027 |
| Google developer verification: global rollout "2027 and beyond" | `iptv-box-malmo` | Google naming a date that includes Sweden |
| Allente Danish add-on at 59 kr/month | `iptv-box-malmo` | Any price check; re-date or remove |
| Withdrawal button in force since 19 June 2026 | `ip-tv-kopa` | Stable — but confirm before citing it as new |
| Competitor prices checked 13 September 2026 | `iptv-nordic` | Quarterly; prices move faster than the post |

A claim whose trigger has fired is a factual error, not an aging article. Fix it the same week.

---

## 14. 90-DAY PUBLISHING PLAN

Cadence: **2 posts a week**, Swedish-weighted. Never publish a post that fails `check:blog`.

### Week 0 — before any content
- [x] Resolve 4K vs 8K (§1.1) — `8K / 4K Ultra HD ready`
- [x] Fill the operator placeholder on the legal pages — provider wording, no company details
- [ ] Add GA4 and a WhatsApp outbound-click event (§16)
- [ ] Decide `en` vs `en-SE` hreflang (§4)
- [ ] Search Console verified for `https://www.nordiciptvsweden.com`

### Days 1–30 (P1 — 9 posts)
| Week | Posts |
|---|---|
| 1 | **A1** `iptv-sverige` (sv, pillar) · **A8** `iptv-sweden-guide` (en, pillar) |
| 2 | **A2** `tv-paket-jamforelse` (sv) · **B1** `svenska-tv-kanaler-online` (sv) |
| 3 | **A3** `tv-utan-kabel` (sv) · **B5** `english-tv-channels-in-sweden` (en) |
| 4 | **C1** `iptv-smart-tv` (sv+en) · **A4** `iptv-gratis-test` (sv) · **D1** `iptv-buffrar` (sv+en) |

Ship the two pillars first — everything else links up to them. **Once three real posts per locale are live, delete the teaser `blog.posts` from both catalogs** (pre-flight #5).

### Days 31–60 (P2 — 9 posts)
`B2` sportkanaler · `A5` är IPTV lagligt · `C2` IPTV Smarters Pro (sv+en) · `B3` hockey · `C3` Android TV box (sv+en) · `A9` expats · `B6` Premier League · `D2` internethastighet (sv+en) · `A6` public service-avgift

### Days 61–90 (P3 — 7 posts)
`C4` Fire TV Stick (sv+en) · `B4` fotboll · `A7` omdömen · `C5` Apple (sv+en) · `D3` EPG (sv+en) · `A10` TV costs (en) · `B7` Melodifestivalen *(time to its window)*

Deferred to day 91+: `C6` M3U/Xtream · `E1` jul och vinter *(time to December)*.

### After day 90
**1 new post + 1 refresh a week.** In a market this size, refreshing a post that already ranks beats publishing a new one.

---

## 15. PRE-PUBLISH CHECKLIST

`npm run check:blog` automates everything marked ✅. **Errors fail the build; warnings print.**

**Frontmatter**
- ✅ `title` present
- ✅ `excerpt` ≤155 chars — and it reads as ad copy
- ✅ `date` / `updateDate` quoted `YYYY-MM-DD`; `updateDate` not before `date`
- ✅ `image` exists in `public/`
- ✅ `tags` 2–4, first from §7
- ✅ `faq` 5–8, plain text
- ✅ ≤3 `featured` per locale

**Body**
- ✅ no `#` H1
- ✅ no raw HTML
- ✅ ≥900 words
- ⚠️ 6+ H2s
- ⚠️ hero set with `image:` + `imageAlt:`, not repeated in the body
- ⚠️ no hand-written FAQ section
- [ ] keyword family in the first 100 words and ≥2 H2s
- [ ] ≥1 comparison table where the topic allows
- [ ] entities from §6 present, in context, verified
- [ ] numbers match §1.1 exactly
- [ ] prices dated
- [ ] no rights claims, no piracy framing, no unprovable superlatives (§12)

**Images & CTAs**
- ✅ every image path exists
- ⚠️ 2 in-body images (plus the hero banner)
- ⚠️ 5 `[[wa:…]]` shortcodes, labels and notes all different, none adjacent
- [ ] notes consistent with §1.1

**Links**
- ✅ every internal link uses the file's locale
- ✅ every internal link resolves to a real page or post
- ⚠️ 8–14 internal links, no repeated anchor text
- [ ] 1–2 pillar, 1–2 `/pricing`, 3–6 siblings
- [ ] ≥1 outbound authority link, language-matched

**Build & verify**
- ✅ `npm run verify` passes (lint, i18n, blog, build, URL check)
- [ ] post renders at `/sv/blog/{slug}`; tables scroll; images load
- [ ] related posts appear (proves tags matched a sibling)
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) → Article + Breadcrumb + FAQ, no errors

**After publishing**
- [ ] contextual links added from 2–3 existing posts; their `updateDate` bumped
- [ ] Search Console → URL Inspection → Request indexing, for each locale published

---

## 16. MEASUREMENT

**There is currently no analytics on this site** (pre-flight #8). Every sale leaves the site for WhatsApp, so **the outbound WhatsApp click is the conversion**. Without tracking it, the blog looks like it converts at zero no matter how well it performs.

| Horizon | Look at | Action |
|---|---|---|
| Week 2 | Indexed? `site:nordiciptvsweden.com/sv/blog/` | Not indexed → technical (canonical, sitemap, hreflang), not content |
| Week 4 | Search Console impressions by query, per locale | Impressions but no clicks → rewrite the `excerpt` |
| Week 8 | Average position | 8–20 → extend by 400–800 words, bump `updateDate`, re-request indexing |
| Week 12 | WhatsApp clicks per post | High traffic, zero clicks → wrong CTA context, or purely informational intent (fine for pillars, not for cluster A) |
| Quarterly | Cannibalisation — **including against the Finland site** (§0.1) | Two URLs for one query → merge, redirect the weaker, keep the stronger |

Report `sv` and `en` separately — different audiences, SERPs and conversion rates.

---

## 17. QUICK REFERENCE

| Need | Location |
|---|---|
| Post files | `content/blog/{slug}.sv.md` · `content/blog/{slug}.en.md` |
| Post images | `public/assets/blog/{slug}-{hero\|topic}.webp` |
| Author quick guide | [content/blog/README.md](content/blog/README.md) |
| Loader, rendering, related, CTAs | [app/lib/blog.js](app/lib/blog.js) |
| Post page | [app/[locale]/blog/[slug]/page.js](app/[locale]/blog/[slug]/page.js) |
| Blog index | [app/[locale]/blog/page.js](app/[locale]/blog/page.js) |
| Tags and limits | [app/lib/blog-taxonomy.js](app/lib/blog-taxonomy.js) |
| Pre-publish checker | [scripts/check-blog.mjs](scripts/check-blog.mjs) |
| JSON-LD | [app/lib/schema.js](app/lib/schema.js) |
| hreflang for posts | `postAlternates()` in [app/lib/metadata.js](app/lib/metadata.js) |
| Sitemap | [app/sitemap.js](app/sitemap.js) |
| Prefilled WhatsApp messages | [app/lib/whatsapp.js](app/lib/whatsapp.js) |
| Product facts, plans, FAQ | [app/i18n/messages/sv.json](app/i18n/messages/sv.json) · [en.json](app/i18n/messages/en.json) |

```bash
npm run dev          # dev server
npm run check:blog   # validate posts
npm run verify       # lint + i18n + blog + build + URL checks
```

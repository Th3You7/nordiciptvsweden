# content/blog

One markdown file per post per language: `{slug}.sv.md`, `{slug}.en.md`.
A translation shares the slug. The full playbook is
[STRATEGY_BLOG_SWEDEN.md](../../STRATEGY_BLOG_SWEDEN.md).

```bash
npm run check:blog   # validates every post — run before you commit
npm run verify       # lint + i18n + blog + build + URL checks
```

## Frontmatter

```yaml
---
title: "IPTV Sverige 2026 — vad det är, vad det kostar och hur det fungerar"
excerpt: "Under 155 tecken. Det här är både metabeskrivningen och korttexten."
date: "2026-09-15"          # quoted YYYY-MM-DD
updateDate: "2026-09-15"    # bump on every real edit — drives dateModified and sitemap lastmod
author: "IPTV NORDIC"
image: "/assets/blog/iptv-sverige-hero.webp"   # 16:9 hero banner above the title, must exist
imageAlt: "Beskrivning av bilden"                  # describes the hero, in the post's language
tags: ["IPTV-guider", "pris", "jämförelse"]    # 2–4; the first from the cluster list
featured: false             # max 3 per language
faq:                        # 5–8, plain text — becomes the FAQ block and FAQPage schema
  - q: "Vad är IPTV?"
    a: "Svaret i första meningen, 40–70 ord, utan markdown eller HTML."
---
```

Cluster tags (`tags[0]`) are defined in [app/lib/blog-taxonomy.js](../../app/lib/blog-taxonomy.js).

## Body — what the checker enforces

- No `#` H1 — the title is already the page heading. Start at `##`.
- No raw HTML — the renderer strips it silently. Markdown only.
- Internal links use this file's locale: `/sv/…` in `.sv.md`, `/en/…` in `.en.md`, and must point at a page or post that exists.
- Every image path must exist under `public/`.
- At least 900 words.
- Don't put the hero picture in the body — it's shown above the title from `image:`.

## Inline WhatsApp buttons

On a line of its own:

```markdown
[[wa:Testa gratis|Se kvaliteten på din egen enhet innan du betalar.]]
```

Five per post, every label and note different. The hero banner, the FAQ block, the closing
CTA and "Läs också" render automatically — don't write them into the body.

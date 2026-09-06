# AURION IPTV — Next.js

The AURION IPTV landing page, converted from the original standalone template into a
[Next.js](https://nextjs.org) (App Router) project.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.js            # <html> shell, fonts, metadata
  globals.css          # theme CSS variables + keyframes
  page.js              # the full single-page app (all 7 views)
  components/ui.js      # Box (CSS-string + hover), Icon, LogoMark, Stars
  lib/data.js          # all content, translations (EN/MT) and icon paths
public/
  assets/              # images (backgrounds, feature art, etc.)
legacy/                # the original .html / support.js source, kept for reference
```

## Notes

- **Single-page app.** Navigation (Home, Features, Pricing, Blog, Devices, FAQ, Contact)
  switches views via component state, matching the original template.
- **Theme & language** (dark/light, English/Maltese) are toggled in the nav and
  persisted to `localStorage`.
- Styling is inline (as in the source); `components/ui.js` parses the original CSS
  strings into React style objects and adds hover support.
- To make navigation URL-addressable later, the per-view blocks in `page.js` can be
  split into App Router routes (`app/features/page.js`, etc.).

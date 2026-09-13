// The blog's fixed vocabulary and publishing limits — the single source for both
// STRATEGY_BLOG_SWEDEN.md and scripts/check-blog.mjs.
//
// Tags do two jobs: tags[0] is the badge shown on cards and the post header, and
// shared tags are what related-post ranking runs on. So the first tag must come
// from the cluster list, and tags are locale-local — Swedish tags in .sv.md,
// English tags in .en.md — or related posts stop matching within a locale.

export const CLUSTER_TAGS = {
  sv: {
    A: "IPTV-guider", // buyer & comparison
    B: "Kanaler och sport",
    C: "Installation",
    D: "Streamingtips", // troubleshooting
    E: "Sverige", // local & seasonal
    F: "Produktnyheter",
  },
  en: {
    A: "IPTV Guides",
    B: "Channels & Sport",
    C: "Installation",
    D: "Streaming Tips",
    E: "Sweden",
    F: "Product Updates",
  },
};

// Linking glue for tags[1..]. Reuse these rather than inventing new ones.
export const SECONDARY_TAGS = {
  sv: ["pris", "jämförelse", "Smart TV", "Android", "iOS", "sport", "hockey", "fotboll", "EPG", "M3U", "buffring", "nybörjare"],
  en: ["pricing", "comparison", "Smart TV", "Android", "iOS", "sport", "hockey", "football", "expats", "EPG", "M3U", "buffering", "beginners"],
};

export const RULES = {
  excerptMax: 155,
  faqMin: 5,
  faqMax: 8,
  tagsMin: 2,
  tagsMax: 4,
  featuredMaxPerLocale: 3,
  waCtas: 5,
  internalLinksMin: 8,
  internalLinksMax: 14,
  images: 3,
  wordsFloor: 900,
};

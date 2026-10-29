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
  // A topical hub links DOWN to every spoke it parents, so it legitimately
  // carries more outbound links than a spoke does. The 8–14 band was written
  // for spokes; applying it to a hub would force the hub to drop children.
  internalLinksMaxHub: 20,
  bodyImages: 2, // plus the hero banner, which comes from the image: field
  wordsFloor: 900,
  // A one-sided anti-stuffing ceiling, not a target. There is no evidence for an
  // ideal density, and a floor would push authors to insert keywords — the exact
  // padding §5 forbids. Set from the corpus: the densest published post measures
  // 2.53%, so 3.0% is a real guard with headroom. See STRATEGY_BLOG_SWEDEN.md §5.
  keywordDensityMax: 0.03,
};

// Reverse lookup for the blog hub: a post's tags[0] is always a cluster tag
// (check:blog enforces it), so the letter is derivable from the post itself and
// no post needs a second "cluster:" field in its frontmatter.
const TAG_TO_CLUSTER = Object.fromEntries(
  Object.entries(CLUSTER_TAGS).flatMap(([locale, map]) =>
    Object.entries(map).map(([letter, tag]) => [`${locale}:${tag}`, letter]),
  ),
);

export function clusterOf(post, locale) {
  return TAG_TO_CLUSTER[`${locale}:${post.tags?.[0]}`] ?? null;
}

// The order the hub lists clusters in: the commercial core first, then the
// system-level background, then setup. Clusters with no posts are skipped at
// render time, so this list can name letters that aren't filled yet.
export const CLUSTER_ORDER = ["A", "E", "C", "B", "D", "F"];

// Posts that act as topical hubs: they take the raised link ceiling and are
// expected to link DOWN to the spokes they parent. `digital-tv-sverige` holds
// this role until the A1/A8 pillars are written (STRATEGY_BLOG_SWEDEN.md §9.4).
export const HUB_SLUGS = new Set(["digital-tv-sverige"]);

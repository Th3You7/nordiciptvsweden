/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Verification builds need their own output directory, but editing this file
  // while `next dev` is running makes the dev server reload with a different
  // distDir and leaves its route graph broken — every page but the locale home
  // 404s until the cache is cleared. So the directory is switched by env var
  // instead: NEXT_DIST_DIR=.next-verify next build.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    // The optimizer negotiates per request: AVIF where supported, WebP
    // otherwise, original format as a last resort.
    formats: ["image/avif", "image/webp"],

    // Next's default ladder jumps 384 -> 640 with nothing between, so a card
    // rendering at 385px had to download a 640px file. These intermediate
    // widths close that gap; the rest are Next's defaults.
    deviceSizes: [420, 512, 576, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    // Allowed `quality` values. 40 for art that sits at 28% opacity under a
    // near-opaque scrim, 50 for the scrimmed hero collage, 75 elsewhere.
    qualities: [40, 50, 75],
  },

  // Security headers. The site loads nothing from a third party — no analytics,
  // no CDN, no external fonts (next/font self-hosts Poppins and Inter under
  // /_next/static/media) — so the policy can be tight without breaking anything.
  //
  // The one concession is 'unsafe-inline' for scripts. The App Router inlines the
  // RSC payload as <script>self.__next_f.push(...)</script>, several blocks per
  // page, and their content changes per page, so they cannot be hashed. The strict
  // alternative is a per-request nonce from middleware, which would make every page
  // dynamic and give up the static prerender this site is built on. JSON-LD blocks
  // are data, not executable, so CSP does not touch them.
  //
  // style-src needs it too: components set inline style attributes.
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          // frame-ancestors above covers modern browsers; this is the legacy twin.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Nothing here uses these APIs, so deny them outright.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          // Two years, subdomains included. Deliberately no `preload`: that submits
          // the domain to a browser-baked list which is slow and awkward to leave.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },

  // Every page lives under a locale segment, so "/" is only an entry point.
  // 307 (not permanent) keeps the door open for Accept-Language detection later.
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sv",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

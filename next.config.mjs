/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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

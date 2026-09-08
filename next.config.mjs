/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // The optimizer negotiates per request: AVIF where supported, WebP
    // otherwise, original format as a last resort.
    formats: ["image/avif", "image/webp"],
    // Allowed `quality` values. 40 is for the blurred backdrop, where the
    // 6px blur hides the compression entirely.
    qualities: [40, 75],
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

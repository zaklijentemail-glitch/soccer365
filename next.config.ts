import type { NextConfig } from "next";

/**
 * Headers that cost nothing and close the obvious gaps. Vercel already sends
 * HSTS; none of these are ranking factors, they are the baseline a publisher is
 * expected to meet.
 *
 * No CSP here on purpose: this site loads AdSense and embeds tweets, and a
 * policy written without testing against those would either break them or be
 * loose enough to be theatre. That deserves its own pass.
 */
const securityHeaders = [
  // Stop the browser second-guessing declared content types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin cross-site, the full path same-origin. Referrer data keeps
  // working in analytics without leaking full URLs to third parties.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Nothing here needs these, so decline them rather than leave them available
  // to any embedded frame.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Framing is what a clickjacking attempt needs. Same-origin keeps any
  // internal preview working.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  outputFileTracingIncludes: {
    "/**": ["./content/**/*.mdx"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "www.mancity.com",
      },
    ],
  },
};

export default nextConfig;

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

/**
 * News pieces removed on 2026-09-27 for restating a single source without
 * adding to it. Each points at the page that covers the same subject in the
 * site's own words, or at /news where no such page exists.
 */
const removedNews: Record<string, string> = {
  "balogun-ruling-england-france-card-appeals": "/guides/yellow-and-red-cards-explained",
  "france-push-fifa-to-overturn-olise-yellow-card": "/guides/yellow-and-red-cards-explained",
  "fifa-sanctions-world-cup-final-brawl": "/guides/yellow-and-red-cards-explained",
  "collina-rejects-bias-claims-argentina-egypt": "/guides/what-is-var-and-how-does-it-work",
  "switzerland-ready-test-argentina-colombia-shootout": "/guides/extra-time-and-penalty-shootouts-explained",
  "pub-hours-extended-england-norway-world-cup": "/guides/world-cup-2026-format-explained",
  "usa-world-cup-run-ends-in-belgium-rout": "/guides/world-cup-2026-format-explained",
  "tottenham-sign-savinho-manchester-city": "/guides/how-transfer-windows-work",
  "bruno-fernandes-hat-trick-manchester-united-ipswich": "/news",
  "jonathan-david-atletico-fitness-criticism-griezmann": "/news",
  "juventus-squad-list-parma-yildiz-mckennie-out": "/news",
  "messi-retires-argentina-national-team": "/news",
  // Removed 2026-10-12, the last of the noindexed restatements.
  "arsenal-lautaro-martinez-approach-alvarez-collapse": "/news",
  "arsenal-sign-illan-meslier-leeds": "/news",
  "manchester-city-sign-jeremy-monga": "/guides/jeremy-monga-profile",
};

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(removedNews).map(([slug, destination]) => ({
      source: `/news/${slug}`,
      destination,
      permanent: true,
    }));
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  outputFileTracingIncludes: {
    "/**": ["./content/**/*.mdx"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Covers and photos never change at the same URL, so an optimised copy can
    // live a month instead of being rebuilt every few hours for each crawler.
    minimumCacheTTL: 2678400,
    // Content is at most 1200px wide; the 1920-3840 defaults only ever served
    // oversized files, mostly to bots reading the srcset.
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [48, 96, 128, 256, 384],
  },
};

export default nextConfig;

/**
 * Flip to true once the AdSense account/publisher ID is approved and live.
 * Ad slot components/placements stay in the codebase either way; this only
 * controls whether they render.
 */
export const ADS_ENABLED = false;

/**
 * Publisher line for /ads.txt, e.g. "pub-0000000000000000". Set
 * NEXT_PUBLIC_ADSENSE_PUBLISHER_ID once the AdSense account exists; the ID is
 * issued at signup, so this does not have to wait for approval.
 */
export const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ?? "";

/**
 * Shown as "last updated" on the legal pages. Bump by hand when a policy
 * actually changes, so the date reflects a real revision rather than the
 * build date.
 */
export const POLICY_UPDATED = "23 August 2026";

/**
 * An archive holding fewer articles than this is too thin to be worth
 * indexing or to carry an ad unit. Google treats near-empty auto-generated
 * archives as thin content, and serving ads against them breaks the
 * "no ads on screens without publisher-content" publisher policy. Such pages
 * stay reachable and crawlable, they are just noindex and ad-free until they
 * fill up.
 */
export const MIN_ARTICLES_FOR_INDEXING = 3;

/** Below this many cards, a listing page is mostly chrome: no ad unit. */
export const MIN_ARTICLES_FOR_LISTING_AD = 4;

export const SITE = {
  name: "Soccer 365",
  shortName: "Soccer 365",
  domain: "soccer365.news",
  url: "https://www.soccer365.news",
  description:
    "Soccer 365 brings you the latest football news, transfers, Champions League and World Cup coverage. Fast, clear, no filler.",
  locale: "en_GB",
  language: "en",
  twitter: "@soccer365",
  logo: "/images/icon-512.png",
  logoWidth: 512,
  logoHeight: 512,
};

export const NAV_LINKS = [
  { label: "News", href: "/news" },
  { label: "Results", href: "/results" },
  { label: "Guides", href: "/guides" },
  { label: "Transfers", href: "/category/transfers" },
  { label: "Champions League", href: "/category/champions-league" },
  { label: "World Cup", href: "/category/world-cup" },
];

export type SocialPlatform = "facebook" | "x" | "instagram" | "youtube";

export const SOCIAL_LINKS: { label: string; href: string; platform: SocialPlatform }[] = [
  { label: "Facebook", href: "https://www.facebook.com/news.soccer365", platform: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/@soccer365-uk", platform: "youtube" },
];

/** Single inline row of footer links, goal.com-style, pipe-separated. */
export const FOOTER_INLINE_LINKS = [
  { label: "News", href: "/news" },
  { label: "Results", href: "/results" },
  { label: "Guides", href: "/guides" },
  { label: "Transfers", href: "/category/transfers" },
  { label: "Champions League", href: "/category/champions-league" },
  { label: "World Cup", href: "/category/world-cup" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms", href: "/terms" },
  { label: "DMCA", href: "/dmca" },
];

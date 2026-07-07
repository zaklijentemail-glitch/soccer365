/**
 * Flip to true once the AdSense account/publisher ID is approved and live.
 * Ad slot components/placements stay in the codebase either way; this only
 * controls whether they render.
 */
export const ADS_ENABLED = false;

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
  { label: "Guides", href: "/guides" },
  { label: "Transfers", href: "/category/transfers" },
  { label: "Champions League", href: "/category/champions-league" },
  { label: "World Cup", href: "/category/world-cup" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "DMCA", href: "/dmca" },
];

/**
 * Flip to true once the AdSense account/publisher ID is approved and live.
 * Ad slot components/placements stay in the codebase either way — this only
 * controls whether they render.
 */
export const ADS_ENABLED = false;

export const SITE = {
  name: "Soccer 365",
  shortName: "Soccer 365",
  domain: "soccer365.com",
  url: "https://www.soccer365.com",
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

export const FOOTER_LINKS = {
  content: [
    { label: "News", href: "/news" },
    { label: "Guides", href: "/guides" },
    { label: "Transfers", href: "/category/transfers" },
    { label: "Champions League", href: "/category/champions-league" },
    { label: "World Cup", href: "/category/world-cup" },
  ],
  info: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
    { label: "DMCA", href: "/dmca" },
  ],
};

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://www.facebook.com/news.soccer365" },
  { label: "YouTube", href: "https://www.youtube.com/@soccer365" },
  { label: "Instagram", href: "https://www.instagram.com/soccer365" },
];

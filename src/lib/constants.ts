/**
 * Flip to true once the AdSense account/publisher ID is approved and live.
 * Ad slot components/placements stay in the codebase either way; this only
 * controls whether they render.
 */
export const ADS_ENABLED = false;

/**
 * AdSense publisher ID for this site. Not a secret: Google publishes it in the
 * loader script tag on every page, so it lives in source rather than in env,
 * and an env var can still override it per deployment.
 *
 * `ca-pub-...` is the form the loader script wants; `pub-...` is the form
 * ads.txt wants. Both are derived from this one value.
 */
export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "ca-pub-1788818896309024";

/** The same ID in the form ads.txt expects, without the leading "ca-". */
export const ADSENSE_PUBLISHER_ID = ADSENSE_CLIENT_ID.replace(/^ca-/, "");

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
    "Football explained in plain English: the laws of the game, how transfers and contracts really work, and where the money goes. Plus selective news.",
  locale: "en_GB",
  language: "en",
  twitter: "@soccer365",
  logo: "/images/icon-512.png",
  logoWidth: 512,
  logoHeight: 512,
};

/**
 * Byline slugs that stand for the newsroom rather than an individual. They are
 * marked up as Organization, not Person, because that is what they are, and
 * Google supports organizational authorship. When a named journalist starts
 * writing here, their slug simply stays off this list.
 */
export const TEAM_AUTHOR_SLUGS = ["soccer-365-team"];

/**
 * Subjects the site actually covers, used for the organisation's knowsAbout.
 * Keep this honest: it is a claim of expertise, and every entry here has to be
 * backed by published work.
 */
export const EXPERTISE = [
  "Association football",
  "Laws of the Game",
  "Football transfer market",
  "Premier League",
  "UEFA Champions League",
  "FIFA World Cup",
];

export const NAV_LINKS = [
  { label: "News", href: "/news" },
  { label: "Results", href: "/results" },
  { label: "Guides", href: "/guides" },
  { label: "Premier League", href: "/category/premier-league" },
  { label: "Transfers", href: "/category/transfers" },
  { label: "Champions League", href: "/category/champions-league" },
  { label: "World Cup", href: "/category/world-cup" },
];

export type SocialPlatform = "facebook" | "x" | "instagram" | "youtube" | "tiktok";

export const SOCIAL_LINKS: { label: string; href: string; platform: SocialPlatform }[] = [
  { label: "Facebook", href: "https://www.facebook.com/news.soccer365", platform: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/@soccer365-uk", platform: "youtube" },
  { label: "TikTok", href: "https://www.tiktok.com/@thesoccer365", platform: "tiktok" },
];

/** Single inline row of footer links, goal.com-style, pipe-separated. */
export const FOOTER_INLINE_LINKS = [
  { label: "News", href: "/news" },
  { label: "Results", href: "/results" },
  { label: "Guides", href: "/guides" },
  { label: "Premier League", href: "/category/premier-league" },
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

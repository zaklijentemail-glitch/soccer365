export type CompetitionSlug = "premier-league" | "champions-league" | "la-liga" | "world-cup";

export interface MarqueeLeague {
  id: number;
  name: string;
  competition: CompetitionSlug;
}

export const MARQUEE_LEAGUES: MarqueeLeague[] = [
  { id: 39, name: "Premier League", competition: "premier-league" },
  { id: 2, name: "Champions League", competition: "champions-league" },
  { id: 140, name: "La Liga", competition: "la-liga" },
  { id: 1, name: "World Cup", competition: "world-cup" },
];

export const COMPETITIONS: { slug: CompetitionSlug; label: string }[] = [
  { slug: "premier-league", label: "Premier League" },
  { slug: "champions-league", label: "Champions League" },
  { slug: "la-liga", label: "La Liga" },
  { slug: "world-cup", label: "World Cup" },
];

export const STANDINGS_LEAGUE_IDS: Record<CompetitionSlug, number> = {
  "premier-league": 39,
  "champions-league": 2,
  "la-liga": 140,
  "world-cup": 1,
};

/**
 * The API-Football free plan caps requests at 100/day and restricts most
 * endpoints to a handful of past seasons. These windows are tuned to stay
 * comfortably under that budget across the match center + standings
 * combined; loosen them if the plan is upgraded.
 */
export const TODAY_REVALIDATE_SECONDS = 1800;
export const YESTERDAY_REVALIDATE_SECONDS = 3600;
export const STANDINGS_REVALIDATE_SECONDS = 43200;

/** Seasons the free plan can actually serve, tried in order after the real current season. */
export const STANDINGS_FALLBACK_SEASONS = [2024, 2023, 2022];

export const MAX_STANDINGS_GROUPS_DISPLAYED = 6;

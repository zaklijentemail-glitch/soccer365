export type CompetitionSlug = "premier-league" | "champions-league" | "la-liga" | "world-cup";

/** football-data.org competition codes. */
export type CompetitionCode = "PL" | "CL" | "PD" | "WC";

export interface Competition {
  slug: CompetitionSlug;
  /** football-data.org competition code, used in /competitions/{code}/... paths. */
  code: CompetitionCode;
  label: string;
}

export const COMPETITIONS: Competition[] = [
  { slug: "premier-league", code: "PL", label: "Premier League" },
  { slug: "champions-league", code: "CL", label: "Champions League" },
  { slug: "la-liga", code: "PD", label: "La Liga" },
  { slug: "world-cup", code: "WC", label: "World Cup" },
];

export const COMPETITION_BY_CODE: Record<CompetitionCode, Competition> = Object.fromEntries(
  COMPETITIONS.map((c) => [c.code, c])
) as Record<CompetitionCode, Competition>;

/**
 * football-data.org free tier allows 10 requests/minute across all endpoints.
 * These revalidate windows keep the homepage well under that even under load,
 * since Next caches each unique request for the given number of seconds.
 * The matches window also sets how often the homepage and /results are
 * regenerated, which is most of the site's ISR and function time: hourly is
 * fresh enough for a fixtures list and halves that cost.
 */
export const MATCHES_REVALIDATE_SECONDS = 3600;
export const STANDINGS_REVALIDATE_SECONDS = 3600;

export const MAX_STANDINGS_GROUPS_DISPLAYED = 6;

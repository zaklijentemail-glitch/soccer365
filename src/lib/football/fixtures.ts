import "server-only";
import { fetchFootballData } from "./client";
import { COMPETITIONS, MATCHES_REVALIDATE_SECONDS, type CompetitionSlug } from "./config";
import { isFinishedStatus, isLiveStatus } from "./status";
import type { MatchFixture } from "./types";

interface FdMatchTeam {
  name: string;
  shortName: string | null;
  crest: string | null;
}

interface FdMatch {
  id: number;
  utcDate: string;
  status: string;
  stage: string;
  competition: { code: string; name: string };
  homeTeam: FdMatchTeam;
  awayTeam: FdMatchTeam;
  score: { fullTime: { home: number | null; away: number | null } };
}

interface FdMatchesResponse {
  matches: FdMatch[];
}

export interface MatchCentreFeed {
  live: MatchFixture[];
  todaysFixtures: MatchFixture[];
  results: MatchFixture[];
}

// Brand priority when several competitions have matches at once: Premier
// League first as the anchor audience, World Cup last since it already gets
// prominence elsewhere.
const COMPETITION_PRIORITY: CompetitionSlug[] = ["premier-league", "champions-league", "la-liga", "world-cup"];

function competitionRank(slug: CompetitionSlug): number {
  return COMPETITION_PRIORITY.indexOf(slug);
}

/**
 * Champions League qualifying rounds pull in every UEFA nation's domestic
 * champion regardless of profile — none of it is clubs a mainstream audience
 * follows, so those rounds are excluded. Once the league phase starts, its
 * matches (stage GROUP_STAGE / PLAY_OFFS / knockouts) appear normally.
 */
function isQualifyingStage(stage: string): boolean {
  return /QUALIF|PRELIMIN/i.test(stage);
}

function toDateParam(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(date.getUTCDate() + days);
  return next;
}

function mapMatch(item: FdMatch, slug: CompetitionSlug, leagueName: string): MatchFixture {
  return {
    id: item.id,
    competition: slug,
    leagueName,
    stage: item.stage,
    kickoff: item.utcDate,
    status: item.status,
    homeTeam: item.homeTeam.shortName ?? item.homeTeam.name,
    homeCrest: item.homeTeam.crest,
    homeGoals: item.score.fullTime.home,
    awayTeam: item.awayTeam.shortName ?? item.awayTeam.name,
    awayCrest: item.awayTeam.crest,
    awayGoals: item.score.fullTime.away,
  };
}

async function fetchCompetitionMatches(
  code: string,
  slug: CompetitionSlug,
  leagueName: string,
  dateFrom: string,
  dateTo: string
): Promise<MatchFixture[]> {
  const data = await fetchFootballData<FdMatchesResponse>(
    `/competitions/${code}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
    MATCHES_REVALIDATE_SECONDS
  );
  if (!data) return [];

  return data.matches
    .filter((item) => !isQualifyingStage(item.stage))
    .map((item) => mapMatch(item, slug, leagueName));
}

/**
 * Fetches every tracked competition's matches for yesterday → tomorrow.
 *
 * Each competition is fetched on its own endpoint rather than through the
 * combined `/matches?competitions=` query: that combined endpoint silently
 * drops later fixtures of a day (e.g. it returned only 3 of 5 World Cup
 * matches, omitting the evening kickoffs), whereas the per-competition
 * endpoint is complete. The window spans one day either side of today so
 * matches that fall on a different UTC calendar day than the viewer's local
 * day are still included; the client filters to the local day for display.
 */
export async function getMatchCentreMatches(): Promise<MatchFixture[]> {
  const now = new Date();
  const dateFrom = toDateParam(addDays(now, -1));
  const dateTo = toDateParam(addDays(now, 1));

  const perCompetition = await Promise.all(
    COMPETITIONS.map((c) => fetchCompetitionMatches(c.code, c.slug, c.label, dateFrom, dateTo))
  );
  return perCompetition.flat();
}

/**
 * Classifies yesterday's + today's matches into the three groups the Match
 * Centre shows. Returns full sets, unsliced — the client-side competition
 * filter decides what's relevant before anything gets capped for display.
 */
export function buildMatchCentreFeed(matches: MatchFixture[]): MatchCentreFeed {
  // The fetch window spans a day either side of today (see getMatchCentreMatches),
  // so bound upcoming fixtures to the next ~30 hours: that reliably covers the
  // rest of today and tonight's late kickoffs without spilling tomorrow's full
  // card into the "today" column.
  const upcomingHorizon = Date.now() + 30 * 60 * 60 * 1000;

  const live = matches.filter((m) => isLiveStatus(m.status));
  const todaysFixtures = matches.filter(
    (m) =>
      !isLiveStatus(m.status) &&
      !isFinishedStatus(m.status) &&
      new Date(m.kickoff).getTime() <= upcomingHorizon
  );
  const results = matches.filter((m) => isFinishedStatus(m.status));

  const byPriorityThenTimeAsc = (a: MatchFixture, b: MatchFixture) => {
    const rankDiff = competitionRank(a.competition) - competitionRank(b.competition);
    return rankDiff !== 0 ? rankDiff : new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime();
  };
  const byPriorityThenTimeDesc = (a: MatchFixture, b: MatchFixture) => {
    const rankDiff = competitionRank(a.competition) - competitionRank(b.competition);
    return rankDiff !== 0 ? rankDiff : new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime();
  };

  return {
    live: [...live].sort(byPriorityThenTimeAsc),
    todaysFixtures: [...todaysFixtures].sort(byPriorityThenTimeAsc),
    results: [...results].sort(byPriorityThenTimeDesc),
  };
}

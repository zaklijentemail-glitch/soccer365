import "server-only";
import { fetchFootball } from "./client";
import { MARQUEE_LEAGUES, TODAY_REVALIDATE_SECONDS, YESTERDAY_REVALIDATE_SECONDS, type CompetitionSlug } from "./config";
import { isFinishedStatus, isLiveStatus } from "./status";
import type { MatchFixture } from "./types";

interface RawFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string; elapsed: number | null };
  };
  league: { id: number; round: string };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: { home: number | null; away: number | null };
}

export interface MatchCenterData {
  yesterday: MatchFixture[];
  today: MatchFixture[];
}

export interface MatchCentreFeed {
  live: MatchFixture[];
  todaysFixtures: MatchFixture[];
  results: MatchFixture[];
}

// Brand priority when several competitions have matches at once: Premier
// League first as the anchor audience, World Cup last since it already gets
// prominence from being the only thing on outside domestic season.
const COMPETITION_PRIORITY: CompetitionSlug[] = ["premier-league", "champions-league", "la-liga", "world-cup"];

function competitionRank(slug: CompetitionSlug): number {
  return COMPETITION_PRIORITY.indexOf(slug);
}

/**
 * Early Champions League/Europa qualifying rounds pull in every UEFA
 * nation's domestic champion (Armenia, Latvia, Wales, San Marino, the Faroes
 * ...) regardless of profile — that's simply how qualifying works, and it's
 * the only Champions League football played in June/July. None of it is
 * clubs a mainstream UK/US audience follows, so it's excluded from the feed
 * entirely rather than merely labeled: once the real league phase kicks off
 * in September, those fixtures appear normally.
 */
function isQualifyingRound(round: string): boolean {
  return /qualifying|preliminary/i.test(round);
}

function toDateParam(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(date.getUTCDate() + days);
  return next;
}

async function fetchFixturesForDate(date: string, revalidateSeconds: number): Promise<MatchFixture[]> {
  const leaguesById = new Map(MARQUEE_LEAGUES.map((league) => [league.id, league]));
  const raw = await fetchFootball<RawFixture>(`/fixtures?date=${date}`, revalidateSeconds);

  return raw
    .filter((item) => leaguesById.has(item.league.id))
    .map((item): MatchFixture => {
      const league = leaguesById.get(item.league.id)!;
      return {
        id: item.fixture.id,
        leagueId: league.id,
        leagueName: league.name,
        competition: league.competition,
        round: item.league.round,
        kickoff: item.fixture.date,
        statusShort: item.fixture.status.short,
        elapsedMinutes: item.fixture.status.elapsed,
        homeTeam: item.teams.home.name,
        homeLogo: item.teams.home.logo,
        homeGoals: item.goals.home,
        awayTeam: item.teams.away.name,
        awayLogo: item.teams.away.logo,
        awayGoals: item.goals.away,
      };
    })
    .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime());
}

export async function getMatchCenterData(): Promise<MatchCenterData> {
  const now = new Date();

  const [yesterday, today] = await Promise.all([
    fetchFixturesForDate(toDateParam(addDays(now, -1)), YESTERDAY_REVALIDATE_SECONDS),
    fetchFixturesForDate(toDateParam(now), TODAY_REVALIDATE_SECONDS),
  ]);

  return { yesterday, today };
}

/**
 * Classifies today's + yesterday's fixtures (across all tracked competitions)
 * into the three groups the Match Centre shows. Returns the full sets,
 * unsliced — the client-side competition filter decides what's actually
 * relevant before anything gets capped for display.
 */
export function buildMatchCentreFeed(data: MatchCenterData): MatchCentreFeed {
  const relevantToday = data.today.filter((match) => !isQualifyingRound(match.round));
  const relevantYesterday = data.yesterday.filter((match) => !isQualifyingRound(match.round));

  const live = relevantToday.filter((match) => isLiveStatus(match.statusShort));
  const todaysFixtures = relevantToday.filter(
    (match) => !isLiveStatus(match.statusShort) && !isFinishedStatus(match.statusShort)
  );
  const finishedToday = relevantToday.filter((match) => isFinishedStatus(match.statusShort));
  const results = [...finishedToday, ...relevantYesterday];

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

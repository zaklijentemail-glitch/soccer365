import "server-only";
import { fetchFootball } from "./client";
import {
  STANDINGS_FALLBACK_SEASONS,
  STANDINGS_LEAGUE_IDS,
  STANDINGS_REVALIDATE_SECONDS,
  type CompetitionSlug,
} from "./config";
import type { StandingGroup, StandingRow, StandingsResult } from "./types";

interface RawStandingRow {
  rank: number;
  team: { name: string; logo: string };
  points: number;
  goalsDiff: number;
  group: string;
  form: string | null;
  all: { played: number };
}

interface RawStandingsResponse {
  league: { logo: string; standings: RawStandingRow[][] };
}

function domesticSeasonFor(date = new Date()): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  // European domestic seasons start in August and are named for their starting year.
  return month >= 8 ? year : year - 1;
}

function mapRows(raw: RawStandingRow[]): StandingRow[] {
  return raw.map((row) => ({
    rank: row.rank,
    team: row.team.name,
    logo: row.team.logo,
    played: row.all.played,
    points: row.points,
    form: row.form ?? "",
    goalsDiff: row.goalsDiff,
  }));
}

function toGroups(raw: RawStandingRow[][]): StandingGroup[] {
  return raw.map((group) => ({
    name: group[0]?.group ?? "Table",
    rows: mapRows(group),
  }));
}

async function fetchStandingsForSeason(
  leagueId: number,
  season: number
): Promise<{ standings: RawStandingRow[][]; logo: string } | null> {
  const raw = await fetchFootball<RawStandingsResponse>(
    `/standings?league=${leagueId}&season=${season}`,
    STANDINGS_REVALIDATE_SECONDS
  );
  const league = raw[0]?.league;
  const standings = league?.standings;
  if (!standings || standings.length === 0 || !standings[0]?.length) return null;
  return { standings, logo: league.logo };
}

async function getStandingsForLeague(leagueId: number, preferredSeason: number): Promise<StandingsResult | null> {
  const seasonsToTry = [preferredSeason, ...STANDINGS_FALLBACK_SEASONS.filter((s) => s !== preferredSeason)];

  for (const season of seasonsToTry) {
    const result = await fetchStandingsForSeason(leagueId, season);
    if (result) {
      return {
        season,
        isFallback: season !== preferredSeason,
        leagueLogo: result.logo,
        groups: toGroups(result.standings),
      };
    }
  }
  return null;
}

export async function getStandingsBundle(): Promise<Record<CompetitionSlug, StandingsResult | null>> {
  const domesticSeason = domesticSeasonFor();
  const worldCupSeason = new Date().getUTCFullYear();

  const [premierLeague, championsLeague, laLiga, worldCup] = await Promise.all([
    getStandingsForLeague(STANDINGS_LEAGUE_IDS["premier-league"], domesticSeason),
    getStandingsForLeague(STANDINGS_LEAGUE_IDS["champions-league"], domesticSeason),
    getStandingsForLeague(STANDINGS_LEAGUE_IDS["la-liga"], domesticSeason),
    getStandingsForLeague(STANDINGS_LEAGUE_IDS["world-cup"], worldCupSeason),
  ]);

  return {
    "premier-league": premierLeague,
    "champions-league": championsLeague,
    "la-liga": laLiga,
    "world-cup": worldCup,
  };
}

import type { CompetitionSlug } from "./config";

export interface MatchFixture {
  id: number;
  leagueId: number;
  leagueName: string;
  competition: CompetitionSlug;
  round: string;
  kickoff: string;
  statusShort: string;
  elapsedMinutes: number | null;
  homeTeam: string;
  homeLogo: string;
  homeGoals: number | null;
  awayTeam: string;
  awayLogo: string;
  awayGoals: number | null;
}

export interface StandingRow {
  rank: number;
  team: string;
  logo: string;
  played: number;
  points: number;
  form: string;
  goalsDiff: number;
}

export interface StandingGroup {
  name: string;
  rows: StandingRow[];
}

export interface StandingsResult {
  season: number;
  isFallback: boolean;
  leagueLogo: string | null;
  groups: StandingGroup[];
}

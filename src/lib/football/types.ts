import type { CompetitionSlug } from "./config";

export interface MatchFixture {
  id: number;
  competition: CompetitionSlug;
  leagueName: string;
  stage: string;
  kickoff: string;
  status: string;
  homeTeam: string;
  homeCrest: string | null;
  homeGoals: number | null;
  awayTeam: string;
  awayCrest: string | null;
  awayGoals: number | null;
}

export interface StandingRow {
  rank: number;
  team: string;
  crest: string | null;
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
  leagueLogo: string | null;
  groups: StandingGroup[];
}

/** A single World Cup knockout round (Round of 16, Quarter-finals, ...). */
export interface KnockoutRound {
  stage: string;
  label: string;
  matches: MatchFixture[];
}

export interface WorldCupKnockout {
  season: number;
  leagueLogo: string | null;
  rounds: KnockoutRound[];
}

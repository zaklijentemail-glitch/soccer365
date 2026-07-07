import "server-only";
import { fetchFootballData } from "./client";
import { MATCHES_REVALIDATE_SECONDS } from "./config";
import type { KnockoutRound, MatchFixture, WorldCupKnockout } from "./types";

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
  homeTeam: FdMatchTeam;
  awayTeam: FdMatchTeam;
  score: { fullTime: { home: number | null; away: number | null } };
}

interface FdMatchesResponse {
  filters: { season: string };
  competition: { name: string; emblem: string | null };
  matches: FdMatch[];
}

// Knockout rounds in the order they should render. Group stage is deliberately
// excluded — once the tournament reaches the knockouts the group tables are
// finished and no longer shown.
const KNOCKOUT_STAGES: { stage: string; label: string }[] = [
  { stage: "LAST_32", label: "Round of 32" },
  { stage: "LAST_16", label: "Round of 16" },
  { stage: "QUARTER_FINALS", label: "Quarter-finals" },
  { stage: "SEMI_FINALS", label: "Semi-finals" },
  { stage: "THIRD_PLACE", label: "Third-place play-off" },
  { stage: "FINAL", label: "Final" },
];

function mapMatch(match: FdMatch): MatchFixture {
  return {
    id: match.id,
    competition: "world-cup",
    leagueName: "World Cup",
    stage: match.stage,
    kickoff: match.utcDate,
    status: match.status,
    homeTeam: match.homeTeam.shortName ?? match.homeTeam.name ?? "TBD",
    homeCrest: match.homeTeam.crest,
    homeGoals: match.score.fullTime.home,
    awayTeam: match.awayTeam.shortName ?? match.awayTeam.name ?? "TBD",
    awayCrest: match.awayTeam.crest,
    awayGoals: match.score.fullTime.away,
  };
}

export async function getWorldCupKnockout(): Promise<WorldCupKnockout | null> {
  const data = await fetchFootballData<FdMatchesResponse>(
    `/competitions/WC/matches`,
    MATCHES_REVALIDATE_SECONDS
  );
  if (!data) return null;

  const rounds: KnockoutRound[] = KNOCKOUT_STAGES.map(({ stage, label }) => {
    const matches = data.matches
      .filter((m) => m.stage === stage)
      .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime())
      .map(mapMatch);
    return { stage, label, matches };
  }).filter((round) => round.matches.length > 0);

  // No knockout matches scheduled yet (tournament still in the group stage,
  // or off-season): nothing to render.
  if (rounds.length === 0) return null;

  return {
    season: Number(data.filters.season) || new Date().getUTCFullYear(),
    leagueLogo: data.competition.emblem,
    rounds,
  };
}

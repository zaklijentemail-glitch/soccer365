import "server-only";
import { fetchFootballData } from "./client";
import { COMPETITIONS, STANDINGS_REVALIDATE_SECONDS, type CompetitionSlug } from "./config";
import type { StandingGroup, StandingsResult } from "./types";

interface FdTeam {
  name: string;
  shortName: string | null;
  crest: string | null;
}

interface FdTableRow {
  position: number;
  team: FdTeam;
  playedGames: number;
  form: string | null;
  points: number;
  goalDifference: number;
}

interface FdStanding {
  stage: string;
  type: string;
  group: string | null;
  table: FdTableRow[];
}

interface FdStandingsResponse {
  competition: { emblem: string | null };
  season: { startDate: string };
  standings: FdStanding[];
}

// The football-data.org form string uses commas ("W,W,L,D"); the UI expects a
// bare letter sequence ("WWLD"), most recent last.
function normaliseForm(form: string | null): string {
  return form ? form.replace(/[^WDL]/g, "") : "";
}

function mapGroup(standing: FdStanding): StandingGroup {
  return {
    name: standing.group ?? "Table",
    rows: standing.table.map((row) => ({
      rank: row.position,
      team: row.team.shortName ?? row.team.name,
      crest: row.team.crest,
      played: row.playedGames,
      points: row.points,
      form: normaliseForm(row.form),
      goalsDiff: row.goalDifference,
    })),
  };
}

async function getStandingsForCompetition(code: string): Promise<StandingsResult | null> {
  const data = await fetchFootballData<FdStandingsResponse>(
    `/competitions/${code}/standings`,
    STANDINGS_REVALIDATE_SECONDS
  );

  // Only the aggregate "TOTAL" tables are shown (not home/away splits).
  const totals = data?.standings.filter((s) => s.type === "TOTAL") ?? [];
  if (!data || totals.length === 0 || !totals[0]?.table.length) return null;

  return {
    season: new Date(data.season.startDate).getUTCFullYear(),
    leagueLogo: data.competition.emblem,
    groups: totals.map(mapGroup),
  };
}

export async function getStandingsBundle(): Promise<Record<CompetitionSlug, StandingsResult | null>> {
  // World Cup is handled separately as a knockout bracket (see worldcup.ts),
  // so only the three table-based competitions are fetched here.
  const tableComps = COMPETITIONS.filter((c) => c.slug !== "world-cup");

  const results = await Promise.all(tableComps.map((c) => getStandingsForCompetition(c.code)));

  const bundle: Record<CompetitionSlug, StandingsResult | null> = {
    "premier-league": null,
    "champions-league": null,
    "la-liga": null,
    "world-cup": null,
  };
  tableComps.forEach((c, i) => {
    bundle[c.slug] = results[i];
  });
  return bundle;
}

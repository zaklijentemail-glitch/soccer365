"use client";

import TeamCrest from "@/components/football/TeamCrest";
import type { MatchFixture, WorldCupKnockout } from "@/lib/football/types";

function Team({ name, crest, won }: { name: string; crest: string | null; won: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <TeamCrest src={crest} name={name} size={18} />
      <span className={`truncate text-sm ${won ? "font-bold text-ink" : "font-medium text-ink-soft"}`}>{name}</span>
    </div>
  );
}

function KnockoutMatch({ match }: { match: MatchFixture }) {
  const scoreKnown = match.homeGoals !== null && match.awayGoals !== null;
  const homeWon = scoreKnown && match.homeGoals! > match.awayGoals!;
  const awayWon = scoreKnown && match.awayGoals! > match.homeGoals!;

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper px-3 py-2">
      <div className="min-w-0 flex-1 space-y-1.5">
        <Team name={match.homeTeam} crest={match.homeCrest} won={homeWon} />
        <Team name={match.awayTeam} crest={match.awayCrest} won={awayWon} />
      </div>
      {scoreKnown ? (
        <div className="shrink-0 text-right text-sm font-bold tabular-nums text-ink">
          <div>{match.homeGoals}</div>
          <div className="mt-1.5">{match.awayGoals}</div>
        </div>
      ) : (
        <div className="shrink-0 text-right text-xs font-bold text-ink-faint">
          {new Date(match.kickoff).toLocaleDateString([], { day: "numeric", month: "short" })}
        </div>
      )}
    </div>
  );
}

export default function WorldCupKnockoutView({ data }: { data: WorldCupKnockout | null }) {
  if (!data) {
    return <p className="text-sm text-ink-faint">Knockout fixtures aren&apos;t available right now.</p>;
  }

  return (
    <div className="space-y-6">
      {data.rounds.map((round) => (
        <div key={round.stage}>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-faint">{round.label}</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {round.matches.map((match) => (
              <KnockoutMatch key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

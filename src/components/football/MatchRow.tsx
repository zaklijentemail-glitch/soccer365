import TeamCrest from "@/components/football/TeamCrest";
import { COMPETITIONS } from "@/lib/football/config";
import type { CompetitionSlug } from "@/lib/football/config";
import { isFinishedStatus, isLiveStatus } from "@/lib/football/status";
import type { MatchFixture } from "@/lib/football/types";

export const COMPETITION_LABELS = Object.fromEntries(
  COMPETITIONS.map((c) => [c.slug, c.label])
) as Record<CompetitionSlug, string>;

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function isToday(iso: string): boolean {
  return new Date(iso).toDateString() === new Date().toDateString();
}

export function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
}

export default function MatchRow({
  match,
  showCompetition,
}: {
  match: MatchFixture;
  showCompetition: boolean;
}) {
  const live = isLiveStatus(match.status);
  const finished = isFinishedStatus(match.status);
  const scoreKnown = match.homeGoals !== null && match.awayGoals !== null;

  return (
    <div
      className={`flex items-start gap-3 rounded-lg border py-2.5 pl-3 pr-3 ${
        live ? "border-accent/30 bg-accent/5" : "border-line bg-paper"
      }`}
    >
      <div className="flex w-14 shrink-0 flex-col items-center pt-0.5 leading-tight">
        {live ? (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-accent">
            <span
              aria-hidden
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none"
            />
            LIVE
          </span>
        ) : finished ? (
          <span className="text-xs font-bold text-ink-faint">FT</span>
        ) : (
          <>
            {!isToday(match.kickoff) && (
              <span className="text-[9px] font-bold uppercase text-ink-faint">{formatDay(match.kickoff)}</span>
            )}
            <span className="text-xs font-bold text-ink-faint">{formatTime(match.kickoff)}</span>
          </>
        )}
      </div>

      <div className="min-w-0 flex-1">
        {showCompetition && (
          <div className="truncate text-[10px] font-bold uppercase tracking-wide text-ink-faint">
            {COMPETITION_LABELS[match.competition]}
          </div>
        )}
        <div className={`flex items-center gap-2 text-sm font-bold text-ink ${showCompetition ? "mt-1" : ""}`}>
          <TeamCrest src={match.homeCrest} name={match.homeTeam} />
          <span className="truncate">{match.homeTeam}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm font-bold text-ink">
          <TeamCrest src={match.awayCrest} name={match.awayTeam} />
          <span className="truncate">{match.awayTeam}</span>
        </div>
      </div>

      {scoreKnown && (
        <div className="shrink-0 pt-0.5 text-right text-sm font-bold tabular-nums text-ink">
          <div>{match.homeGoals}</div>
          <div className="mt-1">{match.awayGoals}</div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import CompetitionSwitcher, { type CompetitionOption } from "./CompetitionSwitcher";
import { COMPETITIONS, type CompetitionSlug } from "@/lib/football/config";
import type { MatchCentreFeed } from "@/lib/football/fixtures";
import { isFinishedStatus, isLiveStatus } from "@/lib/football/status";
import type { MatchFixture } from "@/lib/football/types";

type MatchCentreFilter = "all" | CompetitionSlug;

const STORAGE_KEY = "s365:match-centre-filter";
const MAX_PER_COLUMN = 6;

const COMPETITION_LABELS = Object.fromEntries(COMPETITIONS.map((c) => [c.slug, c.label])) as Record<
  CompetitionSlug,
  string
>;

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function isToday(iso: string): boolean {
  return new Date(iso).toDateString() === new Date().toDateString();
}

function formatDay(iso: string): string {
  return new Date(iso).toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });
}

function Crest({ src }: { src: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" width={16} height={16} className="shrink-0 object-contain" />;
}

function MatchRow({ match, showCompetition }: { match: MatchFixture; showCompetition: boolean }) {
  const live = isLiveStatus(match.statusShort);
  const finished = isFinishedStatus(match.statusShort);
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
            {match.elapsedMinutes ?? ""}&apos;
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
          <Crest src={match.homeLogo} />
          <span className="truncate">{match.homeTeam}</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm font-bold text-ink">
          <Crest src={match.awayLogo} />
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

function Column({
  title,
  matches,
  total,
  showCompetition,
  emptyText,
}: {
  title: string;
  matches: MatchFixture[];
  total: number;
  showCompetition: boolean;
  emptyText: string;
}) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">{title}</h3>
      <div className="mt-2 flex flex-col gap-2">
        {matches.length === 0 ? (
          <p className="py-2 text-sm text-ink-faint">{emptyText}</p>
        ) : (
          matches.map((match) => <MatchRow key={match.id} match={match} showCompetition={showCompetition} />)
        )}
      </div>
      {total > matches.length && (
        <p className="mt-2 text-xs text-ink-faint">+{total - matches.length} more not shown here.</p>
      )}
    </div>
  );
}

export default function MatchCentreSection({
  feed,
  logos,
}: {
  feed: MatchCentreFeed;
  logos: Partial<Record<CompetitionSlug, string | null>>;
}) {
  const [filter, setFilter] = useState<MatchCentreFilter>("all");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as MatchCentreFilter | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setFilter(stored);
  }, []);

  function handleChange(next: MatchCentreFilter) {
    setFilter(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const options: CompetitionOption<MatchCentreFilter>[] = [
    { slug: "all", label: "All Football", logo: "all" },
    ...COMPETITIONS.map((c) => ({ slug: c.slug, label: c.label, logo: logos[c.slug] ?? null })),
  ];

  const liveCount = feed.live.length;

  const { live, todaysFixtures, results } = useMemo(() => {
    const matches = (list: MatchFixture[]) =>
      filter === "all" ? list : list.filter((match) => match.competition === filter);
    return {
      live: matches(feed.live),
      todaysFixtures: matches(feed.todaysFixtures),
      results: matches(feed.results),
    };
  }, [feed, filter]);

  const showCompetition = filter === "all";

  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-line pb-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">Match Centre</h2>
        {liveCount > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-accent">
            <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
            {liveCount} live now
          </span>
        )}
      </div>

      <div className="mt-5">
        <CompetitionSwitcher options={options} value={filter} onChange={handleChange} />
      </div>

      <div className="mt-6 grid gap-x-10 gap-y-8 lg:grid-cols-3">
        <Column
          title="Live now"
          matches={live.slice(0, MAX_PER_COLUMN)}
          total={live.length}
          showCompetition={showCompetition}
          emptyText="Nothing live right now."
        />
        <Column
          title="Today's fixtures"
          matches={todaysFixtures.slice(0, MAX_PER_COLUMN)}
          total={todaysFixtures.length}
          showCompetition={showCompetition}
          emptyText="No more fixtures today."
        />
        <Column
          title="Latest results"
          matches={results.slice(0, MAX_PER_COLUMN)}
          total={results.length}
          showCompetition={showCompetition}
          emptyText="No recent results."
        />
      </div>
    </section>
  );
}

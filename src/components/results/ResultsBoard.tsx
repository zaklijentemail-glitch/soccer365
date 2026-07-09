"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import CompetitionSwitcher, { type CompetitionOption } from "@/components/home/CompetitionSwitcher";
import MatchRow, { formatDay } from "@/components/football/MatchRow";
import type { MatchCentreFeed } from "@/lib/football/fixtures";
import { COMPETITIONS, type CompetitionSlug } from "@/lib/football/config";
import type { MatchFixture } from "@/lib/football/types";

type ResultsFilter = "all" | CompetitionSlug;

const STORAGE_KEY = "s365:results-filter";

function groupByDay(matches: MatchFixture[]): { day: string; matches: MatchFixture[] }[] {
  const groups = new Map<string, MatchFixture[]>();
  for (const match of matches) {
    const key = new Date(match.kickoff).toDateString();
    const list = groups.get(key) ?? [];
    list.push(match);
    groups.set(key, list);
  }
  return Array.from(groups.entries()).map(([, matchesForDay]) => ({
    day: formatDay(matchesForDay[0].kickoff),
    matches: matchesForDay,
  }));
}

function MatchGrid({ matches, showCompetition }: { matches: MatchFixture[]; showCompetition: boolean }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {matches.map((match) => (
        <MatchRow key={match.id} match={match} showCompetition={showCompetition} />
      ))}
    </div>
  );
}

function Section({
  id,
  title,
  badge,
  matches,
  showCompetition,
  emptyText,
  groupByDate = false,
}: {
  id: string;
  title: string;
  badge?: ReactNode;
  matches: MatchFixture[];
  showCompetition: boolean;
  emptyText: string;
  groupByDate?: boolean;
}) {
  const groups = useMemo(() => (groupByDate ? groupByDay(matches) : []), [groupByDate, matches]);

  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-2 border-b border-line pb-2">
        <h2 className="font-display text-lg font-bold uppercase tracking-tight text-ink">{title}</h2>
        {badge}
      </div>
      <div className="mt-4">
        {matches.length === 0 ? (
          <p className="py-4 text-sm text-ink-faint">{emptyText}</p>
        ) : groupByDate ? (
          <div className="flex flex-col gap-6">
            {groups.map((group) => (
              <div key={group.day}>
                <h3 className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">{group.day}</h3>
                <div className="mt-2">
                  <MatchGrid matches={group.matches} showCompetition={showCompetition} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <MatchGrid matches={matches} showCompetition={showCompetition} />
        )}
      </div>
    </section>
  );
}

export default function ResultsBoard({
  feed,
  logos,
}: {
  feed: MatchCentreFeed;
  logos: Partial<Record<CompetitionSlug, string | null>>;
}) {
  const [filter, setFilter] = useState<ResultsFilter>("all");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ResultsFilter | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setFilter(stored);
  }, []);

  function handleChange(next: ResultsFilter) {
    setFilter(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const options: CompetitionOption<ResultsFilter>[] = [
    { slug: "all", label: "All Football", logo: "all" },
    ...COMPETITIONS.map((c) => ({ slug: c.slug, label: c.label, logo: logos[c.slug] ?? null })),
  ];

  function matchesOf(list: MatchFixture[]) {
    return filter === "all" ? list : list.filter((match) => match.competition === filter);
  }

  const live = useMemo(() => matchesOf(feed.live), [feed.live, filter]); // eslint-disable-line react-hooks/exhaustive-deps
  const todaysFixtures = useMemo(() => matchesOf(feed.todaysFixtures), [feed.todaysFixtures, filter]); // eslint-disable-line react-hooks/exhaustive-deps
  const results = useMemo(() => matchesOf(feed.results), [feed.results, filter]); // eslint-disable-line react-hooks/exhaustive-deps

  const showCompetition = filter === "all";

  return (
    <div>
      <CompetitionSwitcher options={options} value={filter} onChange={handleChange} />

      <nav aria-label="Jump to section" className="mt-4 flex flex-wrap gap-2 text-xs font-bold uppercase">
        <a href="#live" className="rounded-full border border-line px-3 py-1.5 text-ink-soft hover:border-brand hover:text-brand">
          Live ({live.length})
        </a>
        <a href="#today" className="rounded-full border border-line px-3 py-1.5 text-ink-soft hover:border-brand hover:text-brand">
          Today&apos;s matches ({todaysFixtures.length})
        </a>
        <a href="#results" className="rounded-full border border-line px-3 py-1.5 text-ink-soft hover:border-brand hover:text-brand">
          Results ({results.length})
        </a>
      </nav>

      <div className="mt-8 flex flex-col gap-10">
        <Section
          id="live"
          title="Live now"
          badge={
            live.length > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-accent">
                <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent motion-reduce:animate-none" />
                {live.length} live
              </span>
            )
          }
          matches={live}
          showCompetition={showCompetition}
          emptyText="Nothing live right now. Check back when kickoff comes around."
        />

        <Section
          id="today"
          title="Today's matches"
          matches={todaysFixtures}
          showCompetition={showCompetition}
          emptyText="No more fixtures scheduled for today."
        />

        <Section
          id="results"
          title="Results: yesterday & today"
          matches={results}
          showCompetition={showCompetition}
          emptyText="No matches have finished yet in this window."
          groupByDate
        />
      </div>
    </div>
  );
}

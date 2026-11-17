"use client";

import Link from "@/components/ui/Link";
import { useEffect, useMemo, useState } from "react";
import CompetitionSwitcher, { type CompetitionOption } from "./CompetitionSwitcher";
import MatchRow from "@/components/football/MatchRow";
import { COMPETITIONS, type CompetitionSlug } from "@/lib/football/config";
import type { MatchCentreFeed } from "@/lib/football/fixtures";
import type { MatchFixture } from "@/lib/football/types";

type MatchCentreFilter = "all" | CompetitionSlug;

const STORAGE_KEY = "s365:match-centre-filter";
const MAX_PER_COLUMN = 6;

function Column({
  title,
  matches,
  total,
  showCompetition,
  emptyText,
  moreHref,
}: {
  title: string;
  matches: MatchFixture[];
  total: number;
  showCompetition: boolean;
  emptyText: string;
  moreHref?: string;
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
      {total > matches.length &&
        (moreHref ? (
          <Link href={moreHref} className="mt-2 inline-block text-xs font-bold text-brand hover:text-brand-dark">
            +{total - matches.length} more results →
          </Link>
        ) : (
          <p className="mt-2 text-xs text-ink-faint">+{total - matches.length} more not shown here.</p>
        ))}
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
          moreHref="/results"
        />
      </div>
    </section>
  );
}

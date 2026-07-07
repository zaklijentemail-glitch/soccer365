"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CompetitionSwitcher from "./CompetitionSwitcher";
import StandingsTable from "./StandingsTable";
import { COMPETITIONS, type CompetitionSlug } from "@/lib/football/config";
import type { StandingsResult } from "@/lib/football/types";

const STORAGE_KEY = "s365:standings-competition";

// Only Champions League and World Cup have a matching editorial category today.
const CATEGORY_LINKS: Partial<Record<CompetitionSlug, string>> = {
  "champions-league": "/category/champions-league",
  "world-cup": "/category/world-cup",
};

export default function StandingsSection({
  standings,
}: {
  standings: Record<CompetitionSlug, StandingsResult | null>;
}) {
  const [competition, setCompetitionState] = useState<CompetitionSlug>("premier-league");

  useEffect(() => {
    // One-time correction from the default to the visitor's remembered
    // choice; reading localStorage during render would break SSR.
    const stored = window.localStorage.getItem(STORAGE_KEY) as CompetitionSlug | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setCompetitionState(stored);
  }, []);

  function handleChange(next: CompetitionSlug) {
    setCompetitionState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  const options = COMPETITIONS.map((c) => ({
    slug: c.slug,
    label: c.label,
    logo: standings[c.slug]?.leagueLogo ?? null,
  }));
  const result = standings[competition];
  const label = COMPETITIONS.find((c) => c.slug === competition)!.label;
  const categoryHref = CATEGORY_LINKS[competition];

  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-line pb-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">League Standings</h2>
        {result?.isFallback && (
          <span className="text-sm text-ink-faint">
            {competition === "world-cup" ? result.season : `${result.season}/${String(result.season + 1).slice(-2)}`}{" "}
            season
          </span>
        )}
      </div>

      <div className="mt-5">
        <CompetitionSwitcher options={options} value={competition} onChange={handleChange} />
      </div>

      <div className="mt-6">
        <StandingsTable result={result} />
      </div>

      {categoryHref && (
        <Link
          href={categoryHref}
          className="mt-4 inline-block text-sm font-bold uppercase text-brand hover:text-brand-dark"
        >
          More {label} coverage →
        </Link>
      )}
    </section>
  );
}

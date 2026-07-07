"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CompetitionSwitcher from "./CompetitionSwitcher";
import StandingsTable from "./StandingsTable";
import WorldCupKnockoutView from "./WorldCupKnockout";
import { COMPETITIONS, type CompetitionSlug } from "@/lib/football/config";
import type { StandingsResult, WorldCupKnockout } from "@/lib/football/types";

const STORAGE_KEY = "s365:standings-competition";

// Only Champions League and World Cup have a matching editorial category today.
const CATEGORY_LINKS: Partial<Record<CompetitionSlug, string>> = {
  "champions-league": "/category/champions-league",
  "world-cup": "/category/world-cup",
};

export default function StandingsSection({
  standings,
  worldCup,
}: {
  standings: Record<CompetitionSlug, StandingsResult | null>;
  worldCup: WorldCupKnockout | null;
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
    logo: (c.slug === "world-cup" ? worldCup?.leagueLogo : standings[c.slug]?.leagueLogo) ?? null,
  }));
  const label = COMPETITIONS.find((c) => c.slug === competition)!.label;
  const categoryHref = CATEGORY_LINKS[competition];
  const isWorldCup = competition === "world-cup";

  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-line pb-3">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
          {isWorldCup ? "World Cup Knockouts" : "League Standings"}
        </h2>
      </div>

      <div className="mt-5">
        <CompetitionSwitcher options={options} value={competition} onChange={handleChange} />
      </div>

      <div className="mt-6">
        {isWorldCup ? (
          <WorldCupKnockoutView data={worldCup} />
        ) : (
          <StandingsTable result={standings[competition]} />
        )}
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

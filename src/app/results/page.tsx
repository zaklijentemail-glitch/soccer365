import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import ResultsBoard from "@/components/results/ResultsBoard";
import StandingsSection from "@/components/home/StandingsSection";
import { sportsEventListSchema } from "@/lib/seo/jsonld";
import { COMPETITIONS } from "@/lib/football/config";
import { buildMatchCentreFeed, getMatchCentreMatches } from "@/lib/football/fixtures";
import { getStandingsBundle } from "@/lib/football/standings";
import { getWorldCupKnockout } from "@/lib/football/worldcup";

const TITLE = "World Cup 2026 Results, Today's Matches & Live Scores";
const DESCRIPTION =
  "Live scores, today's fixtures, yesterday's results and up-to-date league tables for the World Cup 2026, Premier League, Champions League and La Liga, updated as matches kick off and finish.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/results" },
  openGraph: {
    title: `${TITLE} | Soccer 365`,
    description: DESCRIPTION,
    url: "/results",
    type: "website",
  },
};

export default async function ResultsPage() {
  const [matches, standings, worldCup] = await Promise.all([
    getMatchCentreMatches(),
    getStandingsBundle(),
    getWorldCupKnockout(),
  ]);

  const feed = buildMatchCentreFeed(matches);
  const leagueLogos = Object.fromEntries(
    COMPETITIONS.map((c) => [
      c.slug,
      (c.slug === "world-cup" ? worldCup?.leagueLogo : standings[c.slug]?.leagueLogo) ?? null,
    ])
  );

  const schemaMatches = [...feed.live, ...feed.todaysFixtures, ...feed.results];

  return (
    <Container className="py-8">
      {schemaMatches.length > 0 && <JsonLd data={sportsEventListSchema(schemaMatches)} />}

      <Breadcrumbs items={[{ name: "Results", href: "/results" }]} />

      <header className="mt-4 border-b border-line pb-4">
        <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-ink sm:text-3xl">
          World Cup 2026 Results, Today&apos;s Matches &amp; Live Scores
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          Everything in one place: live scores as they happen, every fixture kicking off today, full-time results
          from yesterday and today, and up-to-date league tables across the World Cup 2026, Premier League,
          Champions League and La Liga. Filter by competition to focus on the tournament you care about.
        </p>
      </header>

      <div className="mt-6">
        <ResultsBoard feed={feed} logos={leagueLogos} />
      </div>

      <div className="mt-14">
        <StandingsSection standings={standings} worldCup={worldCup} />
      </div>
    </Container>
  );
}

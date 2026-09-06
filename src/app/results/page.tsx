import type { Metadata } from "next";
import Link from "next/link";
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

      {/*
        Everything above this point is third-party data. A scores board and a
        league table are the same on every site that carries them, so the only
        thing this page can offer that a feed cannot is an explanation of what
        the numbers mean. It also gives the guides a route in from a page that
        sits in the main navigation.
      */}
      <section className="mt-14 border-t border-line pt-8">
        <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
          How to read these tables
        </h2>

        <div className="prose-content mt-4 max-w-3xl text-ink-soft [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink [&_p]:mt-3 [&_a]:font-semibold [&_a]:text-brand">
          <h3>The columns</h3>
          <p>
            P is matches played, W/D/L are wins, draws and losses, GF and GA are goals scored
            and conceded, and GD is the difference between them. Points come from three for a
            win and one for a draw.
          </p>
          <p>
            Check the Played column before the position. A team four points behind with two
            matches in hand is not four points behind in any meaningful sense, and the table
            will not tell you that.{" "}
            <Link href="/guides/how-league-tables-and-points-work">
              How league tables and points work
            </Link>{" "}
            covers the columns, points deductions and why teams level on points are separated
            differently in England and Spain.
          </p>

          <h3>Why the Champions League table looks wrong</h3>
          <p>
            It is one table of 36 clubs rather than eight groups, and each club plays eight
            different opponents rather than the same three twice. Two teams on the same points
            may have had very different schedules.{" "}
            <Link href="/guides/champions-league-format-explained">
              How the Champions League format works
            </Link>{" "}
            explains the seeding pots and what finishing ninth instead of eighth costs.
          </p>

          <h3>Third place at the World Cup</h3>
          <p>
            Finishing third in a group is usually survivable now: the eight best third-placed
            teams across all twelve groups go through, ranked against each other on points,
            then goal difference, then goals scored, then discipline.{" "}
            <Link href="/guides/world-cup-2026-format-explained">
              The 48-team World Cup format
            </Link>{" "}
            sets out the round of 32 and how those comparisons are made.
          </p>

          <h3>Scores that change after full time</h3>
          <p>
            A result can move after the whistle. Matches level in a knockout tie go to{" "}
            <Link href="/guides/extra-time-and-penalty-shootouts-explained">
              extra time and then penalties
            </Link>
            , and the clock itself is less fixed than it looks, because{" "}
            <Link href="/guides/stoppage-time-explained">stoppage time</Link>{" "}
            is a minimum rather than a deadline.
          </p>
        </div>
      </section>
    </Container>
  );
}

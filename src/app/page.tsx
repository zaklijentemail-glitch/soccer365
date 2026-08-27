import Link from "next/link";
import Container from "@/components/ui/Container";
import AdSlot from "@/components/ui/AdSlot";
import { GuideCard } from "@/components/ui/ArticleCard";
import FeaturedStories from "@/components/home/FeaturedStories";
import MatchCentreSection from "@/components/home/MatchCentreSection";
import StandingsSection from "@/components/home/StandingsSection";
import CategorySpotlight from "@/components/home/CategorySpotlight";
import { COMPETITIONS } from "@/lib/football/config";
import {
  buildMatchCentreFeed,
  getMatchCentreMatches,
} from "@/lib/football/fixtures";
import { getStandingsBundle } from "@/lib/football/standings";
import { getWorldCupKnockout } from "@/lib/football/worldcup";
import {
  getLatestNews,
  getFeaturedGuides,
  getCategories,
} from "@/lib/data";

export default async function HomePage() {
  const [latest, guides, matches, standings, worldCup, categories] =
    await Promise.all([
      getLatestNews(13),
      getFeaturedGuides(6),
      getMatchCentreMatches(),
      getStandingsBundle(),
      getWorldCupKnockout(),
      getCategories(),
    ]);

  // The newest article always leads; everything older shifts down one slot.
  const [lead, ...rest] = latest;
  const secondary = rest.slice(0, 2);
  const latestSidebar = rest.slice(2, 6);
  const gridMore = rest.slice(6, 12);

  const matchFeed = buildMatchCentreFeed(matches);
  const leagueLogos = Object.fromEntries(
    COMPETITIONS.map((c) => [
      c.slug,
      (c.slug === "world-cup" ? worldCup?.leagueLogo : standings[c.slug]?.leagueLogo) ?? null,
    ]),
  );

  return (
    <Container className="py-8">
      {/*
        Every page needs one h1 saying what the page is. The homepage had none:
        the lead story's headline was carrying the tag, which misdescribes the
        page to a screen reader and leaves the site with no brand-level heading
        anywhere. That absence shows up in Search Console as /about outranking
        the homepage for "soccer 365" and its misspellings.

        Visually hidden rather than rendered, because the masthead already
        states the brand graphically and a second visible title would be
        redundant. The text matches what the page is, so nothing is concealed
        from a crawler that a reader is not also being told.
      */}
      <h1 className="sr-only">
        Soccer 365: football news, transfers, results and rules explained
      </h1>
      {lead && (
        <FeaturedStories
          lead={lead}
          secondary={secondary}
          latest={latestSidebar}
          grid={gridMore}
        />
      )}

      <div className="mt-14">
        <MatchCentreSection feed={matchFeed} logos={leagueLogos} />
      </div>

      <div className="mt-14">
        <CategorySpotlight categories={categories} />
      </div>

      <div className="mt-14">
        <StandingsSection standings={standings} worldCup={worldCup} />
      </div>

      <section className="mt-14">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wide text-brand">
              Learn Football
            </span>
            <h2 className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-ink">
              Featured Guides
            </h2>
          </div>
          <Link
            href="/guides"
            className="text-sm font-bold uppercase text-brand hover:text-brand-dark"
          >
            All guides →
          </Link>
        </div>
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((article) => (
            <GuideCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <div className="my-14">
        <AdSlot variant="rectangle" className="mx-auto max-w-md" />
      </div>
    </Container>
  );
}

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
  getMatchCenterData,
} from "@/lib/football/fixtures";
import { getStandingsBundle } from "@/lib/football/standings";
import {
  getFeaturedNews,
  getLatestNews,
  getFeaturedGuides,
  getCategories,
} from "@/lib/data";

export default async function HomePage() {
  const [featured, latest, guides, fixtures, standings, categories] =
    await Promise.all([
      getFeaturedNews(1),
      getLatestNews(13),
      getFeaturedGuides(6),
      getMatchCenterData(),
      getStandingsBundle(),
      getCategories(),
    ]);

  const lead = featured[0] ?? latest[0];
  const rest = latest.filter((article) => article.id !== lead?.id);
  const secondary = rest.slice(0, 2);
  const latestSidebar = rest.slice(2, 6);
  const gridMore = rest.slice(6, 12);

  const matchFeed = buildMatchCentreFeed(fixtures);
  const leagueLogos = Object.fromEntries(
    COMPETITIONS.map((c) => [c.slug, standings[c.slug]?.leagueLogo ?? null]),
  );

  return (
    <Container className="py-8">
      {lead && (
        <FeaturedStories lead={lead} secondary={secondary} latest={latestSidebar} grid={gridMore} />
      )}

      <div className="my-10">
        <AdSlot variant="leaderboard" />
      </div>

      <div className="mt-14">
        <MatchCentreSection feed={matchFeed} logos={leagueLogos} />
      </div>

      <div className="mt-14">
        <CategorySpotlight categories={categories} />
      </div>

      <div className="mt-14">
        <StandingsSection standings={standings} />
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

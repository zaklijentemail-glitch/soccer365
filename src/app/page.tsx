import Link from "next/link";
import Container from "@/components/ui/Container";
import AdSlot from "@/components/ui/AdSlot";
import { GuideCard } from "@/components/ui/ArticleCard";
import Hero from "@/components/home/Hero";
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
      getLatestNews(9),
      getFeaturedGuides(6),
      getMatchCenterData(),
      getStandingsBundle(),
      getCategories(),
    ]);

  const topStory = featured[0] ?? latest[0];
  const latestExcludingTop = latest
    .filter((article) => article.id !== topStory?.id)
    .slice(0, 8);
  const matchFeed = buildMatchCentreFeed(fixtures);
  const leagueLogos = Object.fromEntries(
    COMPETITIONS.map((c) => [c.slug, standings[c.slug]?.leagueLogo ?? null]),
  );

  return (
    <>
      {topStory && <Hero topStory={topStory} />}

      <Container className="py-8">
        <section className="mt-4">
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-ink">
              Latest News
            </h2>
            <Link
              href="/news"
              className="text-sm font-bold uppercase text-brand hover:text-brand-dark"
            >
              All news →
            </Link>
          </div>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {latestExcludingTop.map((article) => (
              <GuideCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <div className="mt-14">
          <MatchCentreSection feed={matchFeed} logos={leagueLogos} />
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

        <div className="mt-14">
          <StandingsSection standings={standings} />
        </div>
        <div className="mt-14">
          <CategorySpotlight categories={categories} />
        </div>
      </Container>
    </>
  );
}

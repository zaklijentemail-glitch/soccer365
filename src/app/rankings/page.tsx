import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { getRankings, type Ranking } from "@/lib/data";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Football Rankings: The Best Players by Position",
  description:
    "Every Soccer 365 ranking in one place: the best goalkeepers, defenders, midfielders and wingers in the world right now, and the greatest of all time, each with the criteria and the numbers behind it.",
  alternates: { canonical: "/rankings" },
};

function RankingCard({ r }: { r: Ranking }) {
  return (
    <li className="rounded-card border border-line p-5">
      <Link href={`/guides/${r.article.slug}`} className="font-display text-xl font-bold uppercase leading-tight tracking-tight text-ink hover:text-brand">
        {r.article.meta_title ?? r.article.title}
      </Link>
      {r.top.length > 0 && (
        <ol className="mt-3 space-y-0.5 text-[0.95rem] text-ink-soft">
          {r.top.map((name, i) => (
            <li key={name}>
              <span className="font-bold text-ink">{i + 1}.</span> {name}
            </li>
          ))}
        </ol>
      )}
      <p className="mt-3 text-sm text-ink-faint">{r.article.excerpt}</p>
    </li>
  );
}

export default async function RankingsPage() {
  const rankings = await getRankings();
  const now = rankings.filter((r) => !r.allTime);
  const allTime = rankings.filter((r) => r.allTime);

  return (
    <Container className="py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Football rankings",
          itemListElement: rankings.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE.url}/guides/${r.article.slug}`,
            name: r.article.meta_title ?? r.article.title,
          })),
        }}
      />
      <Breadcrumbs items={[{ name: "Rankings", href: "/rankings" }]} />
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-ink sm:text-4xl">
        Football rankings
      </h1>
      <p className="mt-3 max-w-3xl text-lg text-ink-soft">
        Who is the best in the world in each position right now, and who were the greatest of all
        time. Every list states how it was ranked, gives each player a stat line with the season it
        refers to, and makes the case for the placing, so you can see why we disagree with you.
      </p>
      <p className="mt-3 max-w-3xl text-ink-soft">
        The current lists are ranked on the 2025-26 club season and the 2026 World Cup, and are
        revised as the new season changes the picture. The all-time lists rank on the documented
        record: trophies, individual awards, international caps and peak seasons, weighed across
        eras.
      </p>

      {now.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">Best in the world right now</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {now.map((r) => (
              <RankingCard key={r.article.slug} r={r} />
            ))}
          </ul>
        </section>
      )}

      {allTime.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-ink">The greatest of all time</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allTime.map((r) => (
              <RankingCard key={r.article.slug} r={r} />
            ))}
          </ul>
        </section>
      )}
    </Container>
  );
}

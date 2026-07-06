import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { GuideCard } from "@/components/ui/ArticleCard";
import { searchArticles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = q ? await searchArticles(q) : [];

  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ name: "Search", href: "/search" }]} />

      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-ink">
        Search
      </h1>

      <form action="/search" method="get" className="mt-6 flex max-w-md gap-2">
        <label htmlFor="q" className="sr-only">
          Search articles
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Search news and guides…"
          className="w-full rounded-md border border-line px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-md bg-brand px-4 py-2 text-sm font-bold uppercase text-white hover:bg-brand-dark"
        >
          Search
        </button>
      </form>

      {q && (
        <p className="mt-6 text-sm text-ink-faint">
          {results.length} result{results.length === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <GuideCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </Container>
  );
}

import Link from "next/link";
import type { PaginatedResult, Article, Category } from "@/lib/data/types";
import type { SortOrder } from "@/lib/data";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Pagination from "@/components/ui/Pagination";
import { GuideCard } from "@/components/ui/ArticleCard";
import AdSlot from "@/components/ui/AdSlot";
import { MIN_ARTICLES_FOR_LISTING_AD } from "@/lib/constants";

const tabClasses =
  "flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-bold uppercase tracking-wide text-ink-soft hover:border-brand hover:text-brand";
const tabActiveClasses =
  "flex min-h-11 items-center rounded-full border border-brand bg-brand px-4 text-sm font-bold uppercase tracking-wide text-white";

export default function ArticleListing({
  title,
  description,
  breadcrumbs,
  result,
  basePath,
  categoryFilter,
  sort,
}: {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  result: PaginatedResult<Article>;
  basePath: string;
  /** Renders a row of category tabs above the grid. Omit to hide it. */
  categoryFilter?: { categories: Category[]; activeSlug?: string };
  /** Renders a Newest/Oldest sort toggle. Omit to hide it. */
  sort?: SortOrder;
}) {
  const queryString = sort === "oldest" ? "sort=oldest" : undefined;

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-ink">
        {title}
      </h1>
      {description && <p className="mt-2 max-w-2xl text-ink-soft">{description}</p>}

      {(categoryFilter || sort) && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          {categoryFilter && (
            <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-2">
              <Link
                href="/news"
                aria-current={!categoryFilter.activeSlug ? "page" : undefined}
                className={!categoryFilter.activeSlug ? tabActiveClasses : tabClasses}
              >
                All
              </Link>
              {categoryFilter.categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  aria-current={categoryFilter.activeSlug === category.slug ? "page" : undefined}
                  className={categoryFilter.activeSlug === category.slug ? tabActiveClasses : tabClasses}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          )}

          {sort && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-ink-soft">Sort:</span>
              <div className="flex gap-2">
                <Link
                  href={basePath}
                  aria-current={sort === "newest" ? "page" : undefined}
                  className={sort === "newest" ? tabActiveClasses : tabClasses}
                >
                  Newest first
                </Link>
                <Link
                  href={`${basePath}?sort=oldest`}
                  aria-current={sort === "oldest" ? "page" : undefined}
                  className={sort === "oldest" ? tabActiveClasses : tabClasses}
                >
                  Oldest first
                </Link>
              </div>
            </div>
          )}
        </div>
      )}

      {result.items.length === 0 ? (
        <p className="mt-10 text-ink-soft">No articles found yet. Check back soon.</p>
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {result.items.map((article) => (
            <GuideCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {result.items.length >= MIN_ARTICLES_FOR_LISTING_AD && (
        <div className="my-10">
          <AdSlot variant="leaderboard" />
        </div>
      )}

      <Pagination
        basePath={basePath}
        page={result.page}
        totalPages={result.totalPages}
        queryString={queryString}
      />
    </div>
  );
}

import Image from "next/image";
import Link from "@/components/ui/Link";
import { GuideCard, articleHref } from "@/components/ui/ArticleCard";
import type { Article } from "@/lib/data/types";
import { formatDate } from "@/lib/utils";

function CategoryTag({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand">
      <span aria-hidden className="h-3 w-1 bg-brand" />
      {name}
    </span>
  );
}

function LeadStory({ article }: { article: Article }) {
  const href = articleHref(article);
  return (
    <article>
      <Link
        href={href}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-card bg-paper-soft"
      >
        <Image
          src={article.cover_image}
          alt={article.cover_image_alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="mt-4">
        <CategoryTag name={article.category.name} />
        {/* h2, not h1: this is the lead story, not what the page is. The page's
            own h1 lives in the homepage route. Styling is unchanged. */}
        <h2 className="mt-2 font-display text-2xl font-bold uppercase leading-[1.05] tracking-tight text-ink sm:text-3xl lg:text-[2.5rem]">
          <Link href={href} className="hover:text-brand">
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <time className="text-sm text-ink-faint" dateTime={article.published_at}>
            {formatDate(article.published_at)}
          </time>
          <Link href={href} className="text-sm font-bold uppercase text-brand hover:text-brand-dark">
            Full story →
          </Link>
        </div>
      </div>
    </article>
  );
}

function SecondaryStory({ article }: { article: Article }) {
  const href = articleHref(article);
  return (
    <article>
      <Link
        href={href}
        className="group relative block aspect-[16/10] w-full overflow-hidden rounded-card bg-paper-soft"
      >
        <Image
          src={article.cover_image}
          alt={article.cover_image_alt}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="mt-3">
        <CategoryTag name={article.category.name} />
        <h2 className="mt-1.5 font-display text-base font-bold uppercase leading-snug tracking-tight text-ink">
          <Link href={href} className="hover:text-brand">
            {article.title}
          </Link>
        </h2>
        <time className="mt-2 block text-xs text-ink-faint" dateTime={article.published_at}>
          {formatDate(article.published_at)}
        </time>
      </div>
    </article>
  );
}

function LatestList({ articles }: { articles: Article[] }) {
  return (
    <div>
      <h2 className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-tight text-ink">
        <span aria-hidden className="h-4 w-1 bg-brand" />
        Latest
      </h2>
      <ul className="mt-3 divide-y divide-line border-t border-line">
        {articles.map((article) => {
          const href = articleHref(article);
          return (
            <li key={article.id} className="py-3">
              <h3 className="text-sm font-bold uppercase leading-snug text-ink">
                <Link href={href} className="hover:text-brand">
                  {article.title}
                </Link>
              </h3>
              <time className="mt-1.5 block text-xs text-ink-faint" dateTime={article.published_at}>
                {formatDate(article.published_at)}
              </time>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function FeaturedStories({
  lead,
  secondary,
  latest,
  grid,
}: {
  lead: Article;
  secondary: Article[];
  latest: Article[];
  grid: Article[];
}) {
  return (
    <section>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LeadStory article={lead} />
        </div>

        {secondary.length > 0 && (
          <div className="flex flex-col gap-8">
            {secondary.map((article) => (
              <SecondaryStory key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>

      {(latest.length > 0 || grid.length > 0) && (
        <div className="mt-10 grid gap-10 lg:grid-cols-4">
          {latest.length > 0 && (
            <div className="lg:col-span-1">
              <LatestList articles={latest} />
            </div>
          )}
          {grid.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
              {grid.map((article) => (
                <GuideCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

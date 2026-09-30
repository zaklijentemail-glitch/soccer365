import Image from "next/image";
import CoverFallback from "@/components/ui/CoverFallback";
import Link from "next/link";
import type { Article } from "@/lib/data/types";
import { formatDate } from "@/lib/utils";
import { EDITOR } from "@/lib/constants";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/ui/Breadcrumbs";

export default function ArticleHeader({
  article,
  breadcrumbs,
}: {
  article: Article;
  breadcrumbs: BreadcrumbItem[];
}) {
  const wasUpdated = article.updated_at !== article.published_at;

  return (
    <header>
      <Breadcrumbs items={breadcrumbs} />

      <Link
        href={`/category/${article.category.slug}`}
        className="mt-4 inline-block text-xs font-bold uppercase tracking-wide text-brand"
      >
        {article.category.name}
      </Link>

      <h1 className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ink sm:text-4xl">
        {article.title}
      </h1>

      <p className="mt-3 max-w-3xl text-lg text-ink-soft">{article.excerpt}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-faint">
        <span>
          By{" "}
          <span className="font-semibold text-ink-soft">{article.author.name}</span>
        </span>
        <span aria-hidden="true">&middot;</span>
        <span>
          Edited by{" "}
          <Link href={`/about#${EDITOR.anchor}`} className="font-semibold text-ink-soft hover:text-brand">
            {EDITOR.name}
          </Link>
        </span>
        <span aria-hidden="true">&middot;</span>
        <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
        {wasUpdated && (
          <>
            <span aria-hidden="true">&middot;</span>
            <span>
              Updated <time dateTime={article.updated_at}>{formatDate(article.updated_at)}</time>
            </span>
          </>
        )}
        <span aria-hidden="true">&middot;</span>
        <span>{article.reading_time_minutes} min read</span>
      </div>

      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-card bg-paper-soft">
        {article.cover_image ? (
          <Image
            src={article.cover_image}
            alt={article.cover_image_alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 768px"
            className="object-cover"
          />
        ) : (
          <CoverFallback article={article} size="hero" />
        )}
      </div>
    </header>
  );
}

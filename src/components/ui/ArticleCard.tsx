import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/data/types";
import { formatDate } from "@/lib/utils";
import CoverFallback from "./CoverFallback";

export function articleHref(article: Article) {
  return article.type === "news" ? `/news/${article.slug}` : `/guides/${article.slug}`;
}

export function CompactCard({ article }: { article: Article }) {
  return (
    <article className="flex gap-3">
      <Link href={articleHref(article)} className="relative block h-20 w-28 shrink-0 overflow-hidden rounded-md bg-paper-soft">
        {article.cover_image ? (
          <Image
            src={article.cover_image}
            alt={article.cover_image_alt}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <CoverFallback article={article} size="compact" />
        )}
      </Link>
      <div>
        <h4 className="text-sm font-bold uppercase leading-snug text-ink">
          <Link href={articleHref(article)} className="hover:text-brand">
            {article.title}
          </Link>
        </h4>
        <time className="mt-1 block text-xs text-ink-faint" dateTime={article.published_at}>
          {formatDate(article.published_at)}
        </time>
      </div>
    </article>
  );
}

export function GuideCard({ article }: { article: Article }) {
  return (
    <article>
      <Link href={articleHref(article)} className="group block">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card bg-paper-soft">
          {article.cover_image ? (
            <Image
              src={article.cover_image}
              alt={article.cover_image_alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <CoverFallback article={article} />
          )}
        </div>
      </Link>
      <div className="mt-3">
        <span className="inline-flex items-center rounded-full bg-brand-light px-2.5 py-1 text-xs font-semibold text-brand">
          {article.category.name}
        </span>
        <h3 className="mt-2 text-lg font-bold uppercase leading-snug text-ink">
          <Link href={articleHref(article)} className="hover:text-brand">
            {article.title}
          </Link>
        </h3>
        <time className="mt-2 block text-sm text-ink-faint" dateTime={article.published_at}>
          {formatDate(article.published_at)}
        </time>
      </div>
    </article>
  );
}

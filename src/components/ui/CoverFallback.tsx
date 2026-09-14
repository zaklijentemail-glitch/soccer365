import type { Article } from "@/lib/data/types";

/**
 * Shown in place of a cover photograph when an article has none.
 *
 * The alternative was a generic stock stadium shot, which is worse than it
 * sounds: a reader sees the same picture on unrelated articles and learns it
 * means nothing. A typographic panel is honest about being a graphic, reads
 * as deliberate rather than unfinished, and carries the title, which is the
 * one thing actually worth seeing at card size.
 */
export default function CoverFallback({
  article,
  size = "card",
}: {
  article: Article;
  /** "card" for grids and lists, "hero" for the top of an article page. */
  size?: "card" | "hero" | "compact";
}) {
  const hero = size === "hero";
  const compact = size === "compact";

  return (
    <div
      role="img"
      aria-label={article.cover_image_alt || article.title}
      className="flex h-full w-full flex-col justify-between overflow-hidden bg-ink p-4 sm:p-5"
    >
      <span
        className={`font-semibold uppercase tracking-wide text-brand-light ${
          compact ? "text-[10px]" : "text-xs"
        }`}
      >
        {article.category.name}
      </span>

      <span
        className={`font-display font-bold uppercase leading-tight tracking-tight text-white ${
          compact ? "line-clamp-2 text-xs" : hero ? "text-2xl sm:text-4xl" : "line-clamp-3 text-lg"
        }`}
      >
        {article.title}
      </span>

      {!compact && (
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
          Soccer 365
        </span>
      )}
    </div>
  );
}

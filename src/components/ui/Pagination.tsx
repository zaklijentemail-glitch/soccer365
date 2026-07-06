import Link from "next/link";

function getPageWindow(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[i]);
  }
  return result;
}

export default function Pagination({
  basePath,
  page,
  totalPages,
  queryString,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  /** Query string (without leading "?") to append to every page link, e.g. "sort=oldest" */
  queryString?: string;
}) {
  if (totalPages <= 1) return null;

  const suffix = queryString ? `?${queryString}` : "";
  const hrefFor = (p: number) => (p <= 1 ? `${basePath}${suffix}` : `${basePath}/page/${p}${suffix}`);
  const pageWindow = getPageWindow(page, totalPages);

  const linkClasses =
    "flex min-h-11 min-w-11 items-center justify-center rounded-md border border-line px-3 text-sm font-semibold text-ink-soft hover:border-brand hover:text-brand";
  const activeClasses =
    "flex min-h-11 min-w-11 items-center justify-center rounded-md border border-brand bg-brand px-3 text-sm font-bold text-white";

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        rel="prev"
        aria-disabled={page <= 1}
        className={page <= 1 ? `${linkClasses} pointer-events-none opacity-40` : linkClasses}
      >
        ← Previous
      </Link>

      <span className="mx-1 flex items-center gap-1">
        {pageWindow.map((entry, i) =>
          entry === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="px-2 text-sm text-ink-faint">
              …
            </span>
          ) : (
            <Link
              key={entry}
              href={hrefFor(entry)}
              aria-current={entry === page ? "page" : undefined}
              className={entry === page ? activeClasses : linkClasses}
            >
              {entry}
            </Link>
          )
        )}
      </span>

      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        rel="next"
        aria-disabled={page >= totalPages}
        className={page >= totalPages ? `${linkClasses} pointer-events-none opacity-40` : linkClasses}
      >
        Next →
      </Link>
    </nav>
  );
}

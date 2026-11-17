import Link from "@/components/ui/Link";
import type { Ranking } from "@/lib/data";

/**
 * Shown under every ranked list: links to all the other lists, split into
 * current and all-time. The lists were near-orphans (most had one or two
 * internal links), and they are the pages that earn the site's clicks.
 */
export default function MoreRankings({ rankings, currentSlug }: { rankings: Ranking[]; currentSlug: string }) {
  const others = rankings.filter((r) => r.article.slug !== currentSlug);
  if (others.length === 0) return null;
  const groups = [
    { title: "Right now", items: others.filter((r) => !r.allTime) },
    { title: "Of all time", items: others.filter((r) => r.allTime) },
  ].filter((g) => g.items.length > 0);

  return (
    <nav aria-label="More rankings" className="mt-10 rounded-card border border-line p-5">
      <p className="font-display text-xl font-bold uppercase tracking-tight text-ink">More rankings</p>
      {groups.map((g) => (
        <div key={g.title} className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">{g.title}</p>
          <ul className="mt-2 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {g.items.map((r) => (
              <li key={r.article.slug}>
                <Link href={`/guides/${r.article.slug}`} className="text-[0.95rem] font-semibold text-brand hover:text-brand-dark">
                  {r.article.meta_title ?? r.article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="mt-4 text-sm">
        <Link href="/rankings" className="font-semibold text-ink-soft hover:text-brand">
          All football rankings →
        </Link>
      </p>
    </nav>
  );
}

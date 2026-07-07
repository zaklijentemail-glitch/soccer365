import Link from "next/link";
import type { Category } from "@/lib/data/types";

export default function CategorySpotlight({ categories }: { categories: Category[] }) {
  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-line pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wide text-brand">Coverage</span>
          <h2 className="mt-1 font-display text-xl font-bold uppercase tracking-tight text-ink">
            Explore by Topic
          </h2>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group block rounded-card border border-line p-5 transition-colors hover:border-brand"
          >
            <h3 className="font-display text-lg font-bold uppercase tracking-tight text-ink group-hover:text-brand">
              {category.name}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{category.description}</p>
            <span className="mt-4 inline-block text-xs font-bold uppercase text-brand">Explore →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

import type { Article } from "@/lib/data/types";
import { GuideCard } from "@/components/ui/ArticleCard";

export default function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;
  return (
    <section className="mt-14" aria-labelledby="related-heading">
      <h2 id="related-heading" className="font-display text-xl font-bold uppercase tracking-tight text-ink">
        Read Next
      </h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <GuideCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}

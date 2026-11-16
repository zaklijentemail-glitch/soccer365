import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import {
  getCategories,
  getCategoryArticleCounts,
  getCategoryBySlugAsync,
  getNewsByCategory,
} from "@/lib/data";
import { MIN_ARTICLES_FOR_INDEXING } from "@/lib/constants";
import type { SortOrder } from "@/lib/data";

// Only real slugs exist; any other URL is a 404 served without a render.
export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlugAsync(slug);
  if (!category) return {};
  return {
    title: category.meta_title,
    description: category.meta_description,
    alternates: { canonical: `/category/${category.slug}` },
    // A category holding one or two articles is a thin archive, and being in
    // the main navigation makes it more visible, not more useful. It stays
    // browsable and crawlable, just not offered to the index until it fills.
    robots:
      (await getCategoryArticleCounts())[category.slug] < MIN_ARTICLES_FOR_INDEXING
        ? { index: false, follow: true }
        : undefined,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Newest first only. A ?sort= variant made every listing render per
  // request and gave crawlers a duplicate of each archive to fetch.
  const sort: SortOrder = "newest";

  const category = await getCategoryBySlugAsync(slug);
  if (!category) notFound();

  const [result, categories] = await Promise.all([
    getNewsByCategory(slug, { page: 1, limit: 12, sort }),
    getCategories(),
  ]);

  return (
    <Container className="py-8">
      <ArticleListing
        title={category.name}
        description={category.description}
        breadcrumbs={[{ name: category.name, href: `/category/${category.slug}` }]}
        result={result}
        basePath={`/category/${category.slug}`}
        categoryFilter={{ categories, activeSlug: category.slug }}
      />
    </Container>
  );
}

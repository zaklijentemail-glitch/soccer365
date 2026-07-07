import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getCategories, getCategoryBySlugAsync, getNewsByCategory } from "@/lib/data";
import type { SortOrder } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}): Promise<Metadata> {
  const { slug, page } = await params;
  const category = await getCategoryBySlugAsync(slug);
  if (!category) return {};
  return {
    title: `${category.name}: Page ${page}`,
    alternates: { canonical: `/category/${category.slug}/page/${page}` },
  };
}

export default async function CategoryPagedPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; page: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug, page } = await params;
  const { sort: sortParam } = await searchParams;
  const sort: SortOrder = sortParam === "oldest" ? "oldest" : "newest";

  const category = await getCategoryBySlugAsync(slug);
  if (!category) notFound();

  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const [result, categories] = await Promise.all([
    getNewsByCategory(slug, { page: pageNum, limit: 12, sort }),
    getCategories(),
  ]);
  if (pageNum > result.totalPages) notFound();

  return (
    <Container className="py-8">
      <ArticleListing
        title={category.name}
        description={category.description}
        breadcrumbs={[{ name: category.name, href: `/category/${category.slug}` }]}
        result={result}
        basePath={`/category/${category.slug}`}
        categoryFilter={{ categories, activeSlug: category.slug }}
        sort={sort}
      />
    </Container>
  );
}

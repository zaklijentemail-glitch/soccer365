import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getCategories, getCategoryBySlugAsync, getNewsByCategory } from "@/lib/data";
import type { SortOrder } from "@/lib/data";

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
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort: sortParam } = await searchParams;
  const sort: SortOrder = sortParam === "oldest" ? "oldest" : "newest";

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
        sort={sort}
      />
    </Container>
  );
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getNews, getCategories } from "@/lib/data";
import type { SortOrder } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Football News — Page ${page}`,
    alternates: { canonical: `/news/page/${page}` },
  };
}

export default async function NewsListingPagedPage({
  params,
  searchParams,
}: {
  params: Promise<{ page: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { page } = await params;
  const { sort: sortParam } = await searchParams;
  const sort: SortOrder = sortParam === "oldest" ? "oldest" : "newest";

  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const [result, categories] = await Promise.all([
    getNews({ page: pageNum, limit: 12, sort }),
    getCategories(),
  ]);
  if (pageNum > result.totalPages) notFound();

  return (
    <Container className="py-8">
      <ArticleListing
        title="Football News"
        description="The latest football news, match reports and breaking stories."
        breadcrumbs={[{ name: "News", href: "/news" }]}
        result={result}
        basePath="/news"
        categoryFilter={{ categories }}
        sort={sort}
      />
    </Container>
  );
}

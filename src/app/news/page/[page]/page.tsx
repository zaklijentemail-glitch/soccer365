import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getNews, getCategories } from "@/lib/data";
import type { SortOrder } from "@/lib/data";

// Rendered on first request, then cached until the next deploy; content only
// changes when the repo does, so there is nothing to recompute per request.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Football News: Page ${page}`,
    alternates: { canonical: `/news/page/${page}` },
  };
}

export default async function NewsListingPagedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  // Newest first only. A ?sort= variant made every listing render per
  // request and gave crawlers a duplicate of each archive to fetch.
  const sort: SortOrder = "newest";

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
      />
    </Container>
  );
}

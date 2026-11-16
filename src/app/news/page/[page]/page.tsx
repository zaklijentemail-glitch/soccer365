import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getNews, getCategories } from "@/lib/data";
import type { SortOrder } from "@/lib/data";

// Every real page is built at deploy; anything else is a 404 without a render,
// so crawlers probing /news/page/99 cost no function time.
export const dynamicParams = false;

export async function generateStaticParams() {
  const { totalPages } = await getNews({ page: 1, limit: 12 });
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({ page: String(i + 2) }));
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

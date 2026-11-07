import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getNews, getCategories } from "@/lib/data";
import type { SortOrder } from "@/lib/data";

export const metadata: Metadata = {
  title: "Football News",
  description:
    "The latest football news, match reports and breaking stories from the Premier League and across Europe.",
  alternates: { canonical: "/news" },
};

export default async function NewsListingPage() {
  // Newest first only. A ?sort= variant made every listing render per
  // request and gave crawlers a duplicate of each archive to fetch.
  const sort: SortOrder = "newest";

  const [result, categories] = await Promise.all([
    getNews({ page: 1, limit: 12, sort }),
    getCategories(),
  ]);

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

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getGuides } from "@/lib/data";

// Every real page is built at deploy; anything else is a 404 without a render.
export const dynamicParams = false;

export async function generateStaticParams() {
  const { totalPages } = await getGuides({ page: 1, limit: 12 });
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Football Guides: Page ${page}`,
    alternates: { canonical: `/guides/page/${page}` },
  };
}

export default async function GuidesListingPagedPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const result = await getGuides({ page: pageNum, limit: 12 });
  if (pageNum > result.totalPages) notFound();

  return (
    <Container className="py-8">
      <ArticleListing
        title="Football Guides"
        description="Plain-English explainers on the rules, formats and quirks of football."
        breadcrumbs={[{ name: "Guides", href: "/guides" }]}
        result={result}
        basePath="/guides"
      />
    </Container>
  );
}

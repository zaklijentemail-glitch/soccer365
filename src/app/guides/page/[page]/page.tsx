import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getGuides } from "@/lib/data";

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

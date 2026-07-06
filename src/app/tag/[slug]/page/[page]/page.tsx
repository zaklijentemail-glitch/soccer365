import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getTagBySlug, getNewsByTag } from "@/lib/data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}): Promise<Metadata> {
  const { slug, page } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) return {};
  return {
    title: `${tag.name} News & Articles — Page ${page}`,
    alternates: { canonical: `/tag/${tag.slug}/page/${page}` },
  };
}

export default async function TagPagedPage({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}) {
  const { slug, page } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();

  const pageNum = Number(page);
  if (!Number.isInteger(pageNum) || pageNum < 2) notFound();

  const result = await getNewsByTag(slug, { page: pageNum, limit: 12 });
  if (pageNum > result.totalPages) notFound();

  return (
    <Container className="py-8">
      <ArticleListing
        title={`#${tag.name}`}
        description={`All articles tagged ${tag.name}.`}
        breadcrumbs={[{ name: tag.name, href: `/tag/${tag.slug}` }]}
        result={result}
        basePath={`/tag/${tag.slug}`}
      />
    </Container>
  );
}

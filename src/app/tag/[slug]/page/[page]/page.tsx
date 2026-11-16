import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getTagBySlug, getNewsByTag, getAllTags } from "@/lib/data";

// Every real page is built at deploy; anything else is a 404 without a render.
export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = await getAllTags();
  const params: { slug: string; page: string }[] = [];
  for (const t of tags) {
    const { totalPages } = await getNewsByTag(t.slug, { page: 1, limit: 12 });
    for (let p = 2; p <= totalPages; p++) params.push({ slug: t.slug, page: String(p) });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; page: string }>;
}): Promise<Metadata> {
  const { slug, page } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) return {};
  return {
    title: `${tag.name} News & Articles: Page ${page}`,
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

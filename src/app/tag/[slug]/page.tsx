import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getAllTags, getTagBySlug, getNewsByTag } from "@/lib/data";

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) return {};
  // Tag archives are lists of headlines with no text of their own, and after
  // a third AdSense "low value content" rejection they were a quarter of the
  // sitemap. All of them stay out of the index; they remain crawlable so the
  // links on them still lead somewhere.

  return {
    title: `${tag.name} News & Articles`,
    description: `All Soccer 365 articles tagged ${tag.name}.`,
    robots: { index: false, follow: true },
    alternates: { canonical: `/tag/${tag.slug}` },
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();

  const result = await getNewsByTag(slug, { page: 1, limit: 12 });

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

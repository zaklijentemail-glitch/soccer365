import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getAllTags, getTagBySlug, getNewsByTag } from "@/lib/data";
import { MIN_ARTICLES_FOR_INDEXING } from "@/lib/constants";

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
  // A one- or two-article archive has nothing to offer a searcher, so keep it
  // out of the index while leaving it crawlable for link discovery. Spreading
  // the key in only when it applies matters: a `robots: undefined` present on
  // the object overrides the root layout's directives instead of inheriting
  // them, which silently stripped max-image-preview:large from every tag page.
  const thin = tag.articleCount < MIN_ARTICLES_FOR_INDEXING;

  return {
    title: `${tag.name} News & Articles`,
    description: `All Soccer 365 articles tagged ${tag.name}.`,
    ...(thin ? { robots: { index: false, follow: true } } : {}),
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

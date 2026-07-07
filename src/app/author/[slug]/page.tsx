import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import JsonLd from "@/components/seo/JsonLd";
import { getAllAuthors, getAuthorBySlug, getArticlesByAuthor } from "@/lib/data";
import { SITE } from "@/lib/constants";

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return {};
  return {
    title: `${author.name} — Author Profile`,
    description: author.bio ?? `Articles by ${author.name} on ${SITE.name}.`,
    alternates: { canonical: `/author/${author.slug}` },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const result = await getArticlesByAuthor(slug, { page: 1, limit: 12 });
  const url = `${SITE.url}/author/${author.slug}`;

  return (
    <Container className="py-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${url}#person`,
          name: author.name,
          url,
          image: author.avatar_url ?? undefined,
          description: author.bio ?? undefined,
          worksFor: { "@id": `${SITE.url}/#organization` },
        }}
      />

      {author.avatar_url && (
        <Image
          src={author.avatar_url}
          alt={author.name}
          width={72}
          height={72}
          className="float-left mr-4 rounded-full object-cover"
        />
      )}

      <ArticleListing
        title={author.name}
        description={author.bio ?? undefined}
        breadcrumbs={[{ name: author.name, href: `/author/${author.slug}` }]}
        result={result}
        basePath={`/author/${author.slug}`}
      />
    </Container>
  );
}

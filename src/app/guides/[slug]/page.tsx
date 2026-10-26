import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNewsBySlug, getRelatedNews, getAllArticleSlugsWithType } from "@/lib/data";
import { SITE, SOCIAL_FALLBACK_IMAGE } from "@/lib/constants";
import { articleSchema } from "@/lib/seo/jsonld";
import JsonLd from "@/components/seo/JsonLd";
import ArticleHeader from "@/components/article/ArticleHeader";
import ArticleBody from "@/components/article/ArticleBody";
import EditorsTake from "@/components/article/EditorsTake";
import ShareButtons from "@/components/article/ShareButtons";
import TagList from "@/components/article/TagList";
import RelatedArticles from "@/components/article/RelatedArticles";
import FaqAccordion from "@/components/ui/FaqAccordion";
import AdSlot from "@/components/ui/AdSlot";
import Container from "@/components/ui/Container";

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugsWithType();
  return slugs.filter((s) => s.type === "guide").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article || article.type !== "guide") return {};

  const url = `${SITE.url}/guides/${article.slug}`;
  return {
    title: article.meta_title ?? article.title,
    description: article.meta_description ?? article.excerpt,
    alternates: { canonical: `/guides/${article.slug}` },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.cover_image || SOCIAL_FALLBACK_IMAGE, width: 1200, height: 675 }],
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.cover_image || SOCIAL_FALLBACK_IMAGE],
    },
  };
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article || article.type !== "guide") notFound();

  const related = await getRelatedNews(article.id, article.category.id, 3);
  const url = `${SITE.url}/guides/${article.slug}`;

  return (
    <Container className="py-8">
      <JsonLd data={articleSchema(article, url)} />
      <article className="mx-auto max-w-3xl">
        <ArticleHeader
          article={article}
          breadcrumbs={[
            { name: "Guides", href: "/guides" },
            { name: article.title, href: `/guides/${article.slug}` },
          ]}
        />

        <div className="mt-6">
          <ShareButtons url={url} title={article.title} />
        </div>

        <ArticleBody content={article.content} />
        {article.editors_take && <EditorsTake text={article.editors_take} />}

        {article.faq && <FaqAccordion items={article.faq} />}

        <TagList tags={article.tags} />

        <div className="mt-8">
          <ShareButtons url={url} title={article.title} />
        </div>

        <div className="my-10">
          <AdSlot variant="incontent" />
        </div>
      </article>

      <div className="mx-auto max-w-5xl">
        <RelatedArticles articles={related} />
      </div>
    </Container>
  );
}

import { SITE } from "@/lib/constants";
import type { Article } from "@/lib/data/types";

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}${SITE.logo}`,
      width: SITE.logoWidth,
      height: SITE.logoHeight,
    },
    sameAs: [
      "https://www.facebook.com/soccer365",
      "https://www.youtube.com/@soccer365",
      "https://www.instagram.com/soccer365",
    ],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function rootGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteSchema(), organizationSchema()],
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleSchema(article: Article, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": article.type === "news" ? "NewsArticle" : "Article",
    headline: article.title,
    description: article.excerpt,
    image: [article.cover_image],
    datePublished: article.published_at,
    dateModified: article.updated_at,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: article.author.name,
      url: `${SITE.url}/author/${article.author.slug}`,
    },
    publisher: organizationSchema(),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

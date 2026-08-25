import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import type { Article } from "@/lib/data/types";
import type { MatchFixture } from "@/lib/football/types";

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
    // Derived from SOCIAL_LINKS so the schema can never drift from the
    // profiles actually linked in the footer.
    sameAs: SOCIAL_LINKS.map((s) => s.href),
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

function sportsEventStatus(match: MatchFixture): string {
  if (match.homeGoals !== null && match.awayGoals !== null) {
    return "https://schema.org/EventCompleted";
  }
  return "https://schema.org/EventScheduled";
}

export function sportsEventSchema(match: MatchFixture) {
  return {
    "@type": "SportsEvent",
    name: `${match.homeTeam} vs ${match.awayTeam}`,
    startDate: match.kickoff,
    eventStatus: sportsEventStatus(match),
    superEvent: match.leagueName,
    homeTeam: { "@type": "SportsTeam", name: match.homeTeam },
    awayTeam: { "@type": "SportsTeam", name: match.awayTeam },
    ...(match.homeGoals !== null && match.awayGoals !== null
      ? { description: `${match.homeTeam} ${match.homeGoals}-${match.awayGoals} ${match.awayTeam}` }
      : {}),
  };
}

export function sportsEventListSchema(matches: MatchFixture[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: matches.map((match, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: sportsEventSchema(match),
    })),
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

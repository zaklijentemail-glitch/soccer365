import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import type { Article } from "@/lib/data/types";
import type { MatchFixture } from "@/lib/football/types";

/** Absolute form of a site path, left alone if it is already absolute. */
function absoluteUrl(path: string): string {
  return /^https?:\/\//.test(path) ? path : `${SITE.url}${path}`;
}

export function organizationSchema() {
  return {
    // NewsMediaOrganization is the Organization subtype Google documents for
    // news publishers. It carries the same logo/sameAs handling and adds the
    // publishing-principles slot that news E-E-A-T leans on.
    "@type": "NewsMediaOrganization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publishingPrinciples: `${SITE.url}/editorial-policy`,
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
    // Schema.org image URLs have to resolve on their own: a site-relative path
    // is not something a consumer outside the page can fetch, and Google drops
    // the image rather than guessing the origin. Cover images are usually local
    // paths but may already be absolute, so only prefix the ones that need it.
    image: [absoluteUrl(article.cover_image)],
    datePublished: article.published_at,
    dateModified: article.updated_at,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      "@id": `${SITE.url}/author/${article.author.slug}#person`,
      name: article.author.name,
      url: `${SITE.url}/author/${article.author.slug}`,
    },
    // The full organization node already ships in the root graph on every
    // page, so reference it by @id instead of restating it here.
    publisher: { "@id": `${SITE.url}/#organization` },
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

/**
 * ItemList for an article archive: /news, /guides, category, tag and author
 * pages all render through the same listing component, so they all get this.
 *
 * The listing pages previously carried a BreadcrumbList and nothing else, while
 * /results already described its fixtures as an ItemList. This closes that
 * inconsistency and states plainly what each archive contains and in what
 * order, rather than leaving it to be inferred from the markup.
 *
 * `position` is offset by the page number so page 2 continues the sequence
 * instead of restarting at 1 and claiming to be the same list.
 */
export function articleListSchema(
  articles: Pick<Article, "title" | "slug" | "type">[],
  startPosition = 1
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: articles.length,
    itemListElement: articles.map((article, i) => ({
      "@type": "ListItem",
      position: startPosition + i,
      url: `${SITE.url}/${article.type === "news" ? "news" : "guides"}/${article.slug}`,
      name: article.title,
    })),
  };
}

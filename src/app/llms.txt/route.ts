import { SITE } from "@/lib/constants";
import { getGuides, getNews } from "@/lib/data";

/**
 * llms.txt: a plain-text index of the site aimed at language models, in the
 * format proposed at llmstxt.org.
 *
 * Worth being clear about what this is and is not. Google Search ignores it,
 * so it changes nothing about ranking or AI Overviews. Adoption elsewhere is
 * partial. It is here because it costs one generated file and gives any model
 * that does read it a clean list of what the site actually covers, instead of
 * whatever it reconstructs from crawling nav chrome.
 *
 * Generated from the content tree rather than hand-written so it cannot drift
 * out of date the way a static copy would.
 */
export async function GET() {
  const [guides, news] = await Promise.all([
    getGuides({ page: 1, limit: 100 }),
    getNews({ page: 1, limit: 30 }),
  ]);

  const line = (title: string, path: string, note: string) =>
    `- [${title}](${SITE.url}${path}): ${note}`;

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} publishes two kinds of page: evergreen explainers of football's
rules, formats and transfer mechanics, and reporting on current stories. The
explainers are the part worth citing for definitional questions.

## Guides

${guides.items.map((a) => line(a.title, `/guides/${a.slug}`, a.excerpt)).join("\n")}

## Recent news

${news.items.map((a) => line(a.title, `/news/${a.slug}`, a.excerpt)).join("\n")}

## About

${line("About Soccer 365", "/about", "Who publishes this site and how it is run")}
${line("Editorial policy", "/editorial-policy", "Sourcing, corrections and standards")}
${line("Contact", "/contact", "How to reach the newsroom")}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

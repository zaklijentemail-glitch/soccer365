import { MIN_ARTICLES_FOR_INDEXING, POLICY_UPDATED, SITE } from "@/lib/constants";
import {

  getAllArticleSlugsWithType,
  getCategories,
  getCategoryArticleCounts,
  getAllTags,
  getAllAuthors,
  getSitemapLastmods,
} from "@/lib/data";

// Built once per deploy: everything it lists comes from the repo, so a
// request-time render only spends function time on bots.
export const dynamic = "force-static";

/** The legal pages carry a hand-maintained revision date rather than a build date. */
const policyLastmod = new Date(POLICY_UPDATED).toISOString();

function urlEntry(loc: string, lastmod?: string, changefreq = "weekly", priority = "0.6") {
  return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const [articles, categories, categoryCounts, tags, authors, lastmod] = await Promise.all([
    getAllArticleSlugsWithType(),
    getCategories(),
    getCategoryArticleCounts(),
    getAllTags(),
    getAllAuthors(),
    getSitemapLastmods(),
  ]);

  const staticEntries = [
    urlEntry(SITE.url, lastmod.site, "hourly", "1.0"),
    urlEntry(`${SITE.url}/news`, lastmod.news, "hourly", "0.9"),
    urlEntry(`${SITE.url}/guides`, lastmod.guides, "weekly", "0.8"),
    urlEntry(`${SITE.url}/rankings`, lastmod.guides, "weekly", "0.8"),
    urlEntry(`${SITE.url}/about`, policyLastmod, "yearly", "0.4"),
    urlEntry(`${SITE.url}/contact`, policyLastmod, "yearly", "0.4"),
    urlEntry(`${SITE.url}/editorial-policy`, policyLastmod, "yearly", "0.4"),
    urlEntry(`${SITE.url}/privacy-policy`, policyLastmod, "yearly", "0.3"),
    urlEntry(`${SITE.url}/cookie-policy`, policyLastmod, "yearly", "0.3"),
    urlEntry(`${SITE.url}/terms`, policyLastmod, "yearly", "0.3"),
    urlEntry(`${SITE.url}/disclaimer`, policyLastmod, "yearly", "0.3"),
    urlEntry(`${SITE.url}/dmca`, policyLastmod, "yearly", "0.3"),
  ];

  // Same rule as the tag archives below: a category too thin to index is
  // too thin to submit.
  const categoryEntries = categories
    .filter((c) => (categoryCounts[c.slug] ?? 0) >= MIN_ARTICLES_FOR_INDEXING)
    .map((c) =>
      urlEntry(`${SITE.url}/category/${c.slug}`, lastmod.byCategory[c.slug], "hourly", "0.7")
    );

  // Tag archives and /results are noindex (headline lists and automated
  // fixture data), so neither is submitted.

  const authorEntries = authors.map((a) =>
    urlEntry(`${SITE.url}/author/${a.slug}`, lastmod.byAuthor[a.slug], "weekly", "0.4")
  );

  const articleEntries = articles.map((a) =>
    urlEntry(
      `${SITE.url}/${a.type === "news" ? "news" : "guides"}/${a.slug}`,
      a.updated_at,
      "daily",
      a.type === "news" ? "0.8" : "0.6"
    )
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...categoryEntries, ...authorEntries, ...articleEntries].join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml",
      // Rendered per request otherwise, once per crawler hit. Ten minutes at
      // the edge is well inside the window a sitemap needs to be accurate in.
      "Cache-Control": "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
    },
  });
}

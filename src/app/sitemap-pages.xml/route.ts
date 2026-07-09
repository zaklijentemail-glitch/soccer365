import { SITE } from "@/lib/constants";
import { getAllArticleSlugsWithType, getCategories, getAllTags, getAllAuthors } from "@/lib/data";

function urlEntry(loc: string, lastmod?: string, changefreq = "weekly", priority = "0.6") {
  return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const [articles, categories, tags, authors] = await Promise.all([
    getAllArticleSlugsWithType(),
    getCategories(),
    getAllTags(),
    getAllAuthors(),
  ]);

  const staticEntries = [
    urlEntry(SITE.url, undefined, "hourly", "1.0"),
    urlEntry(`${SITE.url}/news`, undefined, "hourly", "0.9"),
    urlEntry(`${SITE.url}/guides`, undefined, "weekly", "0.8"),
    urlEntry(`${SITE.url}/about`, undefined, "yearly", "0.4"),
    urlEntry(`${SITE.url}/contact`, undefined, "yearly", "0.4"),
    urlEntry(`${SITE.url}/privacy-policy`, undefined, "yearly", "0.3"),
    urlEntry(`${SITE.url}/terms`, undefined, "yearly", "0.3"),
    urlEntry(`${SITE.url}/disclaimer`, undefined, "yearly", "0.3"),
    urlEntry(`${SITE.url}/dmca`, undefined, "yearly", "0.3"),
  ];

  const categoryEntries = categories.map((c) =>
    urlEntry(`${SITE.url}/category/${c.slug}`, undefined, "hourly", "0.7")
  );

  const tagEntries = tags.map((t) =>
    urlEntry(`${SITE.url}/tag/${t.slug}`, undefined, "weekly", "0.4")
  );

  const authorEntries = authors.map((a) =>
    urlEntry(`${SITE.url}/author/${a.slug}`, undefined, "weekly", "0.4")
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
${[...staticEntries, ...categoryEntries, ...tagEntries, ...authorEntries, ...articleEntries].join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}

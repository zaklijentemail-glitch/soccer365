import { SITE } from "@/lib/constants";
import { getRecentNewsForNewsSitemap } from "@/lib/data";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getRecentNewsForNewsSitemap(48);

  const entries = articles.map(
    (article) => `  <url>
    <loc>${SITE.url}/news/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>${SITE.name}</news:name>
        <news:language>${SITE.language}</news:language>
      </news:publication>
      <news:publication_date>${article.published_at}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${entries.join("\n")}
</urlset>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}

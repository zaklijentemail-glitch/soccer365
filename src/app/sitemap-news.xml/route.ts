import { SITE } from "@/lib/constants";
import { getRecentNewsForNewsSitemap } from "@/lib/data";

// The news sitemap only lists the last 48 hours, so it has to age between
// deploys: regenerate at most hourly instead of on every request.
export const revalidate = 3600;

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
    headers: {
      "Content-Type": "application/xml",
      // Shorter than the pages sitemap: the 48-hour window this covers moves
      // continuously, and Google News crawls it far more aggressively.
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
    },
  });
}

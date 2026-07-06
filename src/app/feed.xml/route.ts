import { SITE } from "@/lib/constants";
import { getLatestNews } from "@/lib/data";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getLatestNews(30);

  const items = articles.map(
    (article) => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${SITE.url}/news/${article.slug}</link>
      <guid>${SITE.url}/news/${article.slug}</guid>
      <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
      <description>${escapeXml(article.excerpt)}</description>
    </item>`
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE.name} — Football News</title>
    <link>${SITE.url}</link>
    <description>${escapeXml(SITE.description)}</description>
    <language>${SITE.language}</language>
${items.join("\n")}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/rss+xml" },
  });
}

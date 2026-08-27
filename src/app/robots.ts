import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  // A crawler obeys exactly one group, the most specific one that names it, and
  // groups do not inherit from "*". Every named group therefore has to repeat
  // the disallows or it is being handed the whole site: as written before this,
  // Googlebot was free to crawl /api/ and the noindexed /search.
  const disallow = ["/api/", "/search"];

  // Named so their access is explicit rather than inherited. Crawlers absent
  // from this list still match "*" and are allowed under the same terms.
  const namedAgents = [
    "Googlebot",
    "Bingbot",
    "Mediapartners-Google",
    "OAI-SearchBot",
    "ClaudeBot",
    "PerplexityBot",
    "GPTBot",
    // Controls grounding in Gemini and Vertex AI. It has no bearing on Google
    // Search or AI Overviews, which crawl as Googlebot.
    "Google-Extended",
    "Applebot-Extended",
    "meta-externalagent",
    "Amazonbot",
    "CCBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...namedAgents.map((userAgent) => ({ userAgent, allow: "/", disallow })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

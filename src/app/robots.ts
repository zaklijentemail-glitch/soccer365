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

  // Crawlers that bring no readers: model-training collectors and SEO
  // scrapers. They were a large share of the site's bandwidth and function
  // time. Search crawlers (Googlebot, Bingbot, AdSense's Mediapartners-Google,
  // OAI-SearchBot, PerplexityBot) stay allowed above.
  const blockedAgents = [
    "GPTBot",
    "CCBot",
    "ClaudeBot",
    "Bytespider",
    "meta-externalagent",
    "Amazonbot",
    "PetalBot",
    "AhrefsBot",
    "MJ12bot",
    "DotBot",
    "BLEXBot",
    "DataForSeoBot",
    "Barkrowler",
    "SeekportBot",
    "ImagesiftBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      ...namedAgents
        .filter((userAgent) => !blockedAgents.includes(userAgent))
        .map((userAgent) => ({ userAgent, allow: "/", disallow })),
      ...blockedAgents.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}

import { ADSENSE_PUBLISHER_ID } from "@/lib/constants";

// Built once per deploy: everything it lists comes from the repo, so a
// request-time render only spends function time on bots.
export const dynamic = "force-static";

/**
 * Google requires the publisher line to be live before it will serve ads on
 * the domain. The ID is issued when the AdSense account is created, so this
 * can (and should) be set before the site is approved.
 */
export async function GET() {
  const body = ADSENSE_PUBLISHER_ID
    ? `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`
    : `# Set NEXT_PUBLIC_ADSENSE_PUBLISHER_ID (e.g. pub-0000000000000000) to publish the AdSense line\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}

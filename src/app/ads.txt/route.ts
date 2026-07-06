export async function GET() {
  // Replace with the real line Google AdSense provides once the publisher
  // account for this domain is approved, e.g.:
  // google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
  const body = `# ads.txt placeholder — replace with your AdSense publisher line before going live\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}

import "server-only";

const BASE_URL = "https://v3.football.api-sports.io";

/**
 * Thin fetch wrapper for API-Football. Fails soft everywhere: a missing key,
 * network error, non-OK response, or a plan-restriction error all resolve to
 * an empty array rather than throwing, so a quota hiccup never breaks the
 * homepage — the affected section just renders its empty state.
 */
export async function fetchFootball<T>(path: string, revalidateSeconds: number): Promise<T[]> {
  const apiKey = process.env.API_FOOTBALL_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { "x-apisports-key": apiKey },
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) return [];

    const json = await res.json();
    return Array.isArray(json?.response) ? (json.response as T[]) : [];
  } catch {
    return [];
  }
}

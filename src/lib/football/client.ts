import "server-only";

const BASE_URL = "https://api.football-data.org/v4";

/**
 * Thin fetch wrapper for football-data.org. Fails soft everywhere: a missing
 * token, network error, non-OK response, or a plan-restriction error all
 * resolve to `null` rather than throwing, so a quota hiccup never breaks the
 * homepage — the affected section just renders its empty state.
 */
export async function fetchFootballData<T>(path: string, revalidateSeconds: number): Promise<T | null> {
  const token = process.env.FOOTBALL_DATA_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { "X-Auth-Token": token },
      next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

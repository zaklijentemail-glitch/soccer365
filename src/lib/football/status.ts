// football-data.org match status values.
const LIVE_STATUSES = new Set(["LIVE", "IN_PLAY", "PAUSED"]);
const FINISHED_STATUSES = new Set(["FINISHED", "AWARDED"]);

export function isLiveStatus(status: string): boolean {
  return LIVE_STATUSES.has(status);
}

export function isFinishedStatus(status: string): boolean {
  return FINISHED_STATUSES.has(status);
}

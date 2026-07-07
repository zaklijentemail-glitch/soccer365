const LIVE_STATUSES = new Set(["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"]);
const FINISHED_STATUSES = new Set(["FT", "AET", "PEN", "AWD", "WO"]);

export function isLiveStatus(status: string): boolean {
  return LIVE_STATUSES.has(status);
}

export function isFinishedStatus(status: string): boolean {
  return FINISHED_STATUSES.has(status);
}

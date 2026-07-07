export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function isWithinHours(iso: string, hours: number): boolean {
  const diffMs = Date.now() - new Date(iso).getTime();
  return diffMs >= 0 && diffMs / (1000 * 60 * 60) < hours;
}

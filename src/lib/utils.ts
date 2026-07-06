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

export function formatRelativeOrDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
  if (diffHours < 48) return "Yesterday";
  if (diffHours < 24 * 3) return `${Math.floor(diffHours / 24)} days ago`;
  return formatDate(iso);
}

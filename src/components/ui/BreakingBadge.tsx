export default function BreakingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-accent px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
      </span>
      Breaking
    </span>
  );
}

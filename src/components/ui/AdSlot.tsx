import { ADS_ENABLED } from "@/lib/constants";

const SIZES: Record<string, string> = {
  leaderboard: "aspect-[6/1] min-h-[90px]",
  rectangle: "aspect-[4/3] min-h-[250px]",
  incontent: "aspect-[4/1] min-h-[100px]",
};

/**
 * Reserved-space placeholder for an AdSense unit. Aspect-ratio boxes prevent
 * CLS whether or not an ad has loaded into the slot. Swap the inner div for
 * the real <ins class="adsbygoogle"> unit once AdSense is approved.
 */
export default function AdSlot({
  variant = "rectangle",
  label = "Advertisement",
  className = "",
}: {
  variant?: keyof typeof SIZES;
  label?: string;
  className?: string;
}) {
  if (!ADS_ENABLED) return null;

  return (
    <div className={`w-full ${className}`}>
      <span className="mb-1 block text-center text-[10px] uppercase tracking-wide text-ink-faint">
        {label}
      </span>
      <div
        className={`w-full ${SIZES[variant]} flex items-center justify-center rounded-md border border-dashed border-line bg-paper-soft text-xs text-ink-faint`}
      >
        Ad slot ({variant})
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

function initials(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * Team/nation crest with a graceful fallback: renders the crest image from
 * football-data.org when available and loadable, otherwise a neutral badge
 * with the team's initials. Never renders a broken image.
 */
export default function TeamCrest({
  src,
  name,
  size = 16,
}: {
  src: string | null;
  name: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        onError={() => setFailed(true)}
        className="shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-line font-bold text-ink-faint"
      style={{ width: size, height: size, fontSize: Math.max(7, size * 0.38) }}
    >
      {initials(name)}
    </span>
  );
}

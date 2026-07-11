"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: { load: (el?: HTMLElement) => void };
    };
  }
}

const WIDGETS_SRC = "https://platform.twitter.com/widgets.js";

function loadWidgetsScript(): Promise<void> {
  if (window.twttr) return Promise.resolve();
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGETS_SRC}"]`);
  if (existing) {
    return new Promise((resolve) => existing.addEventListener("load", () => resolve(), { once: true }));
  }
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = WIDGETS_SRC;
    script.async = true;
    script.addEventListener("load", () => resolve(), { once: true });
    document.body.appendChild(script);
  });
}

/**
 * Renders a tweet/X post as the official embedded widget. Accepts a full
 * status URL (x.com or twitter.com); falls back to a plain link if the
 * widgets script fails to load (e.g. ad blockers).
 */
export default function TweetEmbed({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadWidgetsScript().then(() => {
      if (!cancelled && containerRef.current) {
        window.twttr?.widgets.load(containerRef.current);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <div ref={containerRef} className="not-prose my-6 flex justify-center">
      <blockquote className="twitter-tweet" data-dnt="true">
        <a href={url}>{url}</a>
      </blockquote>
    </div>
  );
}

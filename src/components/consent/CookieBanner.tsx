"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

export default function CookieBanner() {
  const state = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );

  // Hidden during SSR and first paint too: the server snapshot says
  // "undecided", but the banner is fixed to the bottom, so a returning
  // visitor only ever sees it flash away rather than shift the page.
  if (state !== "undecided") return null;

  function choose(choice: ConsentChoice) {
    writeConsent(choice);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-paper shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
          We use cookies to run this site, measure how it is used, and fund it through
          advertising. Analytics and advertising cookies are only set if you accept. Read our{" "}
          <Link href="/cookie-policy" className="font-semibold text-brand underline">
            Cookie Policy
          </Link>
          .
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-paper-soft"
          >
            Reject non-essential
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

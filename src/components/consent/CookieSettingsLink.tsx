"use client";

import { CONSENT_REOPEN_EVENT } from "@/lib/consent";

/** Footer trigger that reopens the consent banner so a choice can be changed. */
export default function CookieSettingsLink({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}
      className={className}
    >
      Cookie settings
    </button>
  );
}

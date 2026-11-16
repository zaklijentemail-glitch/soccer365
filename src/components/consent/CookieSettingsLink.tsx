"use client";

type GoogleFc = { callbackQueue: (() => void)[]; showRevocationMessage?: () => void };

/**
 * Footer trigger that reopens Google's consent message so a visitor can change
 * their choice. Google's message only exists for visitors in the EEA, the UK
 * and Switzerland; elsewhere the call queues harmlessly and nothing opens.
 */
export default function CookieSettingsLink({ className = "" }: { className?: string }) {
  function open() {
    const w = window as unknown as { googlefc?: GoogleFc };
    w.googlefc = w.googlefc || { callbackQueue: [] };
    w.googlefc.callbackQueue = w.googlefc.callbackQueue || [];
    w.googlefc.callbackQueue.push(() => w.googlefc?.showRevocationMessage?.());
  }

  return (
    <button type="button" onClick={open} className={className}>
      Cookie settings
    </button>
  );
}

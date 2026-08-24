/**
 * Cookie consent state, shared between the banner and the footer trigger.
 *
 * Consent is stored client-side only. Google Consent Mode is initialised to
 * "denied" in the document head before any Google tag loads, so nothing
 * non-essential fires until the visitor chooses.
 */
export const CONSENT_STORAGE_KEY = "s365-consent";

/** Fired on `window` when the footer link asks to reopen the banner. */
export const CONSENT_REOPEN_EVENT = "s365:consent-reopen";

export type ConsentChoice = "accepted" | "rejected";

/**
 * Runs in the document head, ahead of the React bundle and any Google tag, so
 * that a returning visitor's stored choice is applied before the first ad or
 * analytics call rather than after it.
 */
export const CONSENT_BOOTSTRAP_SCRIPT = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
var granted="denied";
try{granted=localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})==="accepted"?"granted":"denied"}catch(e){}
gtag("consent","default",{
ad_storage:granted,
ad_user_data:granted,
ad_personalization:granted,
analytics_storage:granted,
functionality_storage:"granted",
security_storage:"granted",
wait_for_update:500
});
`.trim();

/**
 * Snapshot of what the banner should do: show itself, or stay hidden because
 * the visitor already chose. Held in a tiny external store so the banner can
 * read it with useSyncExternalStore instead of setting state from an effect.
 */
export type ConsentState = ConsentChoice | "undecided";

let snapshot: ConsentState | null = null;
const listeners = new Set<() => void>();

function readStoredChoice(): ConsentState {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : "undecided";
  } catch {
    // Private mode or blocked storage: treat as undecided and ask again.
    return "undecided";
  }
}

function emit(next: ConsentState) {
  snapshot = next;
  for (const listener of listeners) listener();
}

// Attached once per client page load rather than per subscriber: the footer
// trigger can fire before the banner hydrates, or while the banner renders
// nothing because a choice was already made, and the event must still land.
if (typeof window !== "undefined") {
  window.addEventListener(CONSENT_REOPEN_EVENT, reopenConsent);
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getConsentSnapshot(): ConsentState {
  if (snapshot === null) snapshot = readStoredChoice();
  return snapshot;
}

/** Server render always assumes undecided; the client corrects on hydration. */
export function getConsentServerSnapshot(): ConsentState {
  return "undecided";
}

function reopenConsent() {
  emit("undecided");
}

export function writeConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Nothing to persist to; the in-page consent update below still applies.
  }

  const granted = choice === "accepted" ? "granted" : "denied";
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    ad_storage: granted,
    ad_user_data: granted,
    ad_personalization: granted,
    analytics_storage: granted,
  });

  emit(choice);
}

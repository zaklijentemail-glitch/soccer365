/**
 * Consent for advertising and analytics.
 *
 * Consent is collected by Google's own certified message (AdSense, Privacy &
 * messaging), which Google's EU user consent policy requires in the EEA, the
 * UK and Switzerland and which updates Consent Mode itself. This file only
 * sets the defaults that apply before that message has run.
 *
 * The site's own banner used to set every visitor worldwide to "denied" until
 * they clicked Accept. Outside the regions below no consent is required, and
 * the default cost those visitors personalised ads for no legal reason.
 */

/** EEA member states plus the UK and Switzerland, as ISO 3166-1 alpha-2. */
const CONSENT_REQUIRED_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IS",
  "IE", "IT", "LV", "LI", "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI",
  "ES", "SE", "GB", "CH",
];

/**
 * Runs in the document head, ahead of any Google tag. The region-specific
 * default must come first: Consent Mode applies the most specific match.
 */
export const CONSENT_BOOTSTRAP_SCRIPT = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments)}
gtag("consent","default",{
ad_storage:"denied",
ad_user_data:"denied",
ad_personalization:"denied",
analytics_storage:"denied",
region:${JSON.stringify(CONSENT_REQUIRED_REGIONS)},
wait_for_update:500
});
gtag("consent","default",{
ad_storage:"granted",
ad_user_data:"granted",
ad_personalization:"granted",
analytics_storage:"granted",
functionality_storage:"granted",
security_storage:"granted"
});
`.trim();

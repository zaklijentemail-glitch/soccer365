import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { POLICY_UPDATED, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `What cookies ${SITE.name} sets, what each one is for, and how to change or withdraw your consent at any time.`,
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      breadcrumbs={[{ name: "Cookie Policy", href: "/cookie-policy" }]}
    >
      <p>Last updated: {POLICY_UPDATED}</p>

      <p>
        This policy explains what cookies are, which ones {SITE.name}{" "}uses on {SITE.domain},
        and how you can control them. It sits alongside our{" "}
        <a href="/privacy-policy">Privacy Policy</a>, which covers personal data more broadly.
      </p>

      <h2>What Cookies Are</h2>
      <p>
        A cookie is a small text file that a website asks your browser to store on your device.
        It lets the site remember things between page loads and between visits. Similar
        technologies such as local storage, pixels and device identifiers do much the same job,
        and everything in this policy applies to those too.
      </p>

      <h2>Categories We Use</h2>
      <ul>
        <li>
          <strong>Strictly necessary</strong>{" "}— required for the site to work and to remember
          your cookie choices. These are set without consent because the site cannot function
          without them.
        </li>
        <li>
          <strong>Analytics</strong>{" "}— help us understand which pages are read, how visitors
          arrive, and where pages are slow or broken. This data is aggregated and is not used to
          identify you personally.
        </li>
        <li>
          <strong>Advertising</strong>{" "}— set by Google and its advertising partners to serve
          ads, cap how often you see the same ad, and measure whether ads worked. Where you have
          consented, these may be used to personalise the ads you see.
        </li>
      </ul>

      <h2>Advertising Cookies and Google</h2>
      <p>
        We use Google AdSense to fund this site. Google, as a third-party vendor, uses cookies
        to serve ads on {SITE.domain}. Google&apos;s use of advertising cookies enables it and
        its partners to serve ads to you based on your visits to this site and other sites on
        the internet.
      </p>
      <p>
        These are third-party cookies: they are placed and read by Google and its partners
        rather than by us, and we do not control them. For a full account of what Google
        collects and how it uses it, see{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          How Google uses data when you use our partners&apos; sites or apps
        </a>
        .
      </p>
      <p>
        You can opt out of personalised advertising at{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        . For a fuller list of vendors and opt-outs, see{" "}
        <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">
          Your Online Choices
        </a>{" "}
        in the UK and EU, or{" "}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
          aboutads.info/choices
        </a>{" "}
        elsewhere. Opting out of personalisation does not remove ads; it makes them less
        relevant.
      </p>

      <h2>Your Consent</h2>
      <p>
        If you are in the UK or the EEA, we ask for your consent before setting any analytics or
        advertising cookies, using a consent banner on your first visit. Nothing beyond the
        strictly necessary cookies is set until you make a choice, and you can accept some
        categories and refuse others.
      </p>

      <h2>Changing or Withdrawing Consent</h2>
      <p>
        You can change your mind at any time. Reopen the cookie settings from the{" "}
        <strong>Cookie settings</strong>{" "}link in the site footer, and your new choice replaces
        the old one straight away. Withdrawing consent does not affect processing that already
        happened while consent was in place.
      </p>

      <h2>Controlling Cookies in Your Browser</h2>
      <p>
        Every major browser lets you block or delete cookies, either for all sites or site by
        site, in its privacy or site-settings menu. Blocking all cookies will break parts of
        this and most other websites. Clearing your cookies also clears the record of your
        consent choice, so the banner will appear again on your next visit.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We update this policy when the cookies we use change. Any revision is posted here with a
        new &ldquo;last updated&rdquo; date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about cookies on this site? Reach us via our{" "}
        <a href="/contact">Contact page</a>.
      </p>
    </LegalPage>
  );
}

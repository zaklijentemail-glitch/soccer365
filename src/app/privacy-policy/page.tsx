import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses and protects your personal data, including our use of cookies and advertising partners.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      breadcrumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]}
    >
      <p>Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

      <p>
        This Privacy Policy explains how {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;) collects, uses and protects information when you visit{" "}
        {SITE.domain}. We are committed to complying with the UK GDPR and, where applicable, the
        EU General Data Protection Regulation (GDPR).
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect limited personal data that you provide directly to us, such as your name and
        email address when you use our contact form. We also collect non-personal technical data
        automatically, including IP address, browser type, device type and pages visited, via
        standard web server logs and analytics tools.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies and similar technologies to operate the site, remember your preferences,
        and, where you have given consent, to serve personalised advertising and measure site
        performance. You can control or disable cookies through your browser settings, though
        some site features may not work correctly without them. Where required by law, we will
        request your consent before setting non-essential cookies, through Google&apos;s consent
        message shown to visitors in the UK, the EEA and Switzerland.
      </p>

      <h2>Third-Party Advertising (Google AdSense)</h2>
      <p>
        We use Google AdSense to display advertising on this site. Google and its partners may
        use cookies, web beacons and similar technologies to collect information about your
        visits to this and other websites in order to provide advertisements about goods and
        services of interest to you. Google&apos;s use of advertising cookies enables it and its
        partners to serve ads based on your visit to this site and/or other sites on the
        Internet.
      </p>
      <p>
        In plain terms: <strong>third parties, including Google and its advertising partners,
        may place and read cookies on your browser, or use web beacons and your IP address to
        collect information, as a result of ads being served on this site.</strong>{" "}This
        happens on this site and can be linked to your activity on other sites in the same
        advertising network.
      </p>
      <p>
        For a full account of what Google collects and how it uses that data when you visit a
        site that uses its products, see{" "}
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
        You may opt out of personalised advertising by visiting{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a>
        , or by visiting{" "}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
          www.aboutads.info/choices
        </a>{" "}
        if you are outside the UK/EU.
      </p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To operate, maintain and improve the site</li>
        <li>To respond to enquiries submitted through our contact form</li>
        <li>To measure site performance and understand how visitors use our content</li>
        <li>To display relevant advertising through Google AdSense and other partners</li>
      </ul>

      <h2>Your Rights</h2>
      <p>
        If you are located in the UK or EU, you have the right to access, correct, delete, or
        request a copy of your personal data, and to object to or restrict certain processing.
        To exercise any of these rights, contact us via our{" "}
        <a href="/contact">Contact page</a>.
      </p>

      <h2>Data Retention</h2>
      <p>
        We retain personal data submitted via our contact form only for as long as necessary to
        respond to your enquiry, unless a longer retention period is required by law.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this
        page with a revised &ldquo;last updated&rdquo; date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach us via our <a href="/contact">Contact page</a>.
      </p>
    </LegalPage>
  );
}

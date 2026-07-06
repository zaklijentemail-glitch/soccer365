import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms and conditions governing your use of ${SITE.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      breadcrumbs={[{ name: "Terms & Conditions", href: "/terms" }]}
    >
      <p>Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

      <p>
        By accessing or using {SITE.domain} (the &ldquo;Site&rdquo;), you agree to be bound by
        these Terms &amp; Conditions. If you do not agree, please do not use the Site.
      </p>

      <h2>Use of the Site</h2>
      <p>
        You may access and read content on the Site for personal, non-commercial use. You may
        not reproduce, republish, or redistribute our content without prior written permission,
        except for standard fair-use quotation with attribution and a link back to the original
        article.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on the Site — including articles, graphics, logos and page layout — is the
        property of {SITE.name}{" "}or its licensors, and is protected by applicable copyright and
        trademark law, unless otherwise credited.
      </p>

      <h2>Third-Party Links and Advertising</h2>
      <p>
        The Site may contain links to third-party websites and displays advertising served by
        Google AdSense and other advertising partners. We are not responsible for the content,
        accuracy or practices of any third-party site or advertiser.
      </p>

      <h2>Disclaimer of Warranties</h2>
      <p>
        The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. We
        make reasonable efforts to keep information accurate and up to date but do not guarantee
        the accuracy, completeness or timeliness of any content, particularly live scores,
        fixtures and rapidly-changing news. See our <a href="/disclaimer">Disclaimer</a> for
        further detail.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE.name}{" "}shall not be liable for any indirect,
        incidental or consequential damages arising from your use of the Site.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may revise these Terms at any time. Continued use of the Site after changes are
        posted constitutes acceptance of the revised Terms.
      </p>

      <h2>Governing Law</h2>
      <p>These Terms are governed by the laws of England and Wales.</p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Reach us via our <a href="/contact">Contact page</a>.
      </p>
    </LegalPage>
  );
}

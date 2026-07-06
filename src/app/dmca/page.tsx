import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "DMCA & Copyright",
  description: `${SITE.name}'s policy on copyright infringement claims and how to submit a DMCA takedown request.`,
  alternates: { canonical: "/dmca" },
};

export default function DmcaPage() {
  return (
    <LegalPage title="DMCA & Copyright" breadcrumbs={[{ name: "DMCA", href: "/dmca" }]}>
      <p>
        {SITE.name}{" "}respects the intellectual property rights of others and expects its users
        and contributors to do the same. We respond to clear notices of alleged copyright
        infringement in accordance with the Digital Millennium Copyright Act (DMCA).
      </p>

      <h2>Filing a Takedown Notice</h2>
      <p>
        If you believe content on this Site infringes your copyright, please send a notice via
        our <a href="/contact">Contact page</a> including:
      </p>
      <ul>
        <li>A description of the copyrighted work you claim has been infringed</li>
        <li>The exact URL(s) of the material on our Site you claim is infringing</li>
        <li>Your name, address, phone number and email address</li>
        <li>
          A statement that you have a good-faith belief the use is not authorised by the
          copyright owner, its agent, or the law
        </li>
        <li>
          A statement, made under penalty of perjury, that the information in the notice is
          accurate and that you are the copyright owner or authorised to act on their behalf
        </li>
        <li>Your physical or electronic signature</li>
      </ul>

      <h2>Our Response</h2>
      <p>
        Upon receiving a valid notice, we will review the claim and, where appropriate, remove or
        disable access to the material in question in a timely manner.
      </p>

      <h2>Counter-Notification</h2>
      <p>
        If you believe material was removed in error, you may submit a counter-notification via
        our <a href="/contact">Contact page</a> with the information required under the DMCA.
      </p>
    </LegalPage>
  );
}

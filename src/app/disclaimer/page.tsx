import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer covering the accuracy of news, statistics and opinion published on ${SITE.name}.`,
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" breadcrumbs={[{ name: "Disclaimer", href: "/disclaimer" }]}>
      <p>Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

      <p>
        The information published on {SITE.name}{" "}is provided for general informational and
        entertainment purposes only. While we aim for accuracy, football news, transfer
        speculation, statistics and match data can change quickly and we cannot guarantee that
        every detail is current or error-free at the time of reading.
      </p>

      <h2>No Professional Advice</h2>
      <p>
        Nothing on this Site constitutes betting, financial or professional advice. Any
        predictions, odds references or statistical analysis are for informational purposes only
        and should not be relied upon for decision-making of any kind.
      </p>

      <h2>Transfer News and Speculation</h2>
      <p>
        Transfer stories are often based on reporting from other outlets, agent sources or club
        statements at the time of publication, and may not reflect the final outcome of a deal.
        We update articles where possible but cannot guarantee real-time accuracy on
        fast-moving stories.
      </p>

      <h2>External Links</h2>
      <p>
        This Site may link to third-party websites for reference. We do not control and are not
        responsible for the content, accuracy, or availability of external sites.
      </p>

      <h2>Trademarks</h2>
      <p>
        Club badges, competition names and player likenesses referenced on this Site remain the
        property of their respective owners and are used for editorial and identification
        purposes only.{" "}
        {SITE.name}{" "}is not affiliated with, endorsed by, or sponsored by FIFA,
        UEFA, the Premier League, or any football club or competition mentioned.
      </p>

      <h2>Contact</h2>
      <p>
        If you believe any content on this Site is inaccurate, please let us know via our{" "}
        <a href="/contact">Contact page</a> and we will review it promptly.
      </p>
    </LegalPage>
  );
}

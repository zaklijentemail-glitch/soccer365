import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { POLICY_UPDATED, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: `How ${SITE.name} sources, writes, fact-checks and corrects its football coverage, and how we keep editorial independent from advertising.`,
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <LegalPage
      title="Editorial Policy"
      breadcrumbs={[{ name: "Editorial Policy", href: "/editorial-policy" }]}
    >
      <p>Last updated: {POLICY_UPDATED}</p>

      <p>
        {SITE.name}{" "}publishes football news and explainer guides for a general audience. This
        page sets out how that content is produced, who is accountable for it, and what we do
        when we get something wrong. If any article on this site falls short of what follows, we
        want to hear about it via our <a href="/contact">Contact page</a>.
      </p>

      <h2>Who Writes For Us</h2>
      <p>
        Articles on this site carry a team byline rather than an individual one. {SITE.name}{" "}
        is written and edited by a small in-house editorial team, and a piece often passes
        through more than one pair of hands between the first draft and publication, so the
        byline reflects the group that is accountable for it. You can see everything published
        under it on our{" "}
        <Link href="/author/soccer-365-team">team author page</Link>.
      </p>
      <p>
        What a team byline does not mean: it is not a cover for outside contributors. We do not
        run guest posts sold as advertising, sponsored content dressed up as editorial, or work
        bought from content farms. Everything published here is produced by the team, and
        editorial responsibility for it sits with us.
      </p>

      <h2>How We Source Stories</h2>
      <p>
        News articles are built from primary sources wherever possible: club and federation
        announcements, official competition statements, published match data, and press
        conference transcripts. Where we rely on reporting by another outlet, we say so in the
        article and link to it. We do not present another publication&apos;s exclusive as our
        own.
      </p>
      <p>
        Transfer stories are labelled according to how firm they are. A completed deal, a club
        confirmation and a report of interest are three different things, and we write them
        differently rather than flattening them all into a headline.
      </p>

      <h2>Guides and Explainers</h2>
      <p>
        Our guides explain the laws of the game, competition formats and football terminology.
        Rules content is checked against the current IFAB Laws of the Game and the published
        regulations of the relevant competition, since these change from season to season. When
        a law or format changes, we update the guide rather than leaving an outdated page in
        place.
      </p>

      <h2>Fact-Checking and Review</h2>
      <p>
        Articles are reviewed before publication for factual accuracy, correct names and
        spellings, correct scores and dates, and clear sourcing. Statistics are checked against
        the competition&apos;s own published data. Where a claim cannot be verified, it is either
        cut or clearly attributed to whoever made it.
      </p>

      <h2>Updates and Corrections</h2>
      <p>
        Football moves quickly and some stories change after publication. Articles that we
        revise carry an updated date so you can see when the page last changed.
      </p>
      <p>
        When we publish something factually wrong, we correct it as soon as we can and note the
        correction on the article itself rather than editing the mistake away silently. If you
        believe an article contains an error, tell us through the{" "}
        <a href="/contact">Contact page</a>{" "}with a link to the article and we will look at it.
      </p>

      <h2>Use of AI Tools</h2>
      <p>
        We use software tools in our workflow, for example for transcription, spellchecking and
        research. We do not publish machine-generated articles. Every article on this site is
        written, verified and signed off by a human editor, who is responsible for its accuracy.
      </p>

      <h2>Advertising and Editorial Independence</h2>
      <p>
        This site is funded by advertising, including advertising served by Google AdSense.
        Advertisers have no input into what we cover, how we cover it, or the conclusions we
        reach, and no advertiser sees an article before it is published. Any content that is
        paid for or provided by a third party would be clearly labelled as such. See our{" "}
        <a href="/privacy-policy">Privacy Policy</a>{" "}for how advertising affects data
        collection on this site.
      </p>

      <h2>What We Do Not Publish</h2>
      <ul>
        <li>Betting tips, odds promotion or gambling affiliate content</li>
        <li>Links to unauthorised streams of matches</li>
        <li>Unverified rumours about players&apos; private lives or health</li>
        <li>Content scraped or republished from other sites without permission</li>
      </ul>

      <h2>Contact the Editors</h2>
      <p>
        Corrections, story tips, and questions about how we covered something all go to the same
        place: our <a href="/contact">Contact page</a>. We read every message.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import LegalPage from "@/components/legal/LegalPage";
import { EDITOR, OWNER, POLICY_UPDATED, SITE } from "@/lib/constants";

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
        {SITE.name}{" "}is edited by its founder, {EDITOR.name}, and published by {OWNER.name}.
        Articles carry a team byline because they are produced through a research and drafting
        workflow, described below under Use of AI Tools, rather than written from scratch by
        one named writer. Faris edits every article and is accountable for its accuracy. More
        about him is on our <Link href={`/about#${EDITOR.anchor}`}>About page</Link>, and
        everything published under the team byline is on the{" "}
        <Link href="/author/soccer-365-team">team author page</Link>.
      </p>
      <p>
        What a team byline does not mean: it is not a cover for outside contributors. We do not
        run guest posts sold as advertising, sponsored content dressed up as editorial, or work
        bought from content farms.
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
        Every fact, date, statistic and quote in an article has to come from a source checked
        at the time of writing: club and competition announcements, governing bodies, published
        match data and established outlets. Guides link to the sources they rely on. Where a
        claim cannot be verified, it is cut rather than softened. The editor reads every
        article, normally within a day of publication, and anything he finds wrong is corrected
        in the open, as described below.
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
        We use AI tools to research and draft articles. They work to written house rules: every
        factual claim must be checked against a source fetched at the time of writing, any
        sentence that cannot be supported is removed, and each piece has to answer a question
        readers actually ask rather than fill space. AI is never used to invent quotes,
        statistics, transfer fees or experiences, and the diagrams and tables in our guides are
        built from sourced data.
      </p>
      <p>
        AI does not decide what we publish or sign anything off. The editor approves the topics,
        sets the rules, reviews every article and is responsible for it.
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

import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `What ${SITE.name} is: plain-English guides to football's rules, contracts and money, plus selective news. Who writes it, how it is funded, and who we are not affiliated with.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage title="About Us" breadcrumbs={[{ name: "About Us", href: "/about" }]}>
      <p>
        {SITE.name}{" "}explains football to people who follow it without having memorised the
        rulebook. Most of what we publish answers a question a match throws up and nobody
        stops to explain: why that handball was not given, what a loan actually costs the
        club paying for it, why a team that just won the league says it cannot afford a
        striker.
      </p>

      <h2>What We Actually Publish</h2>
      <p>
        The bulk of the site is a library of explainer guides, each one written to answer a
        single question properly rather than briefly. They fall into three groups:
      </p>
      <ul>
        <li>
          <strong>The laws of the game</strong>{" "}— offside, handball, cards and suspensions,
          stoppage time, substitutions, VAR and what it is not allowed to review.
        </li>
        <li>
          <strong>Contracts and transfers</strong>{" "}— loans, release clauses, buy-back and
          sell-on clauses, free transfers and the Bosman ruling, agent fees, why deals collapse
          on deadline day.
        </li>
        <li>
          <strong>Football money</strong>{" "}— amortisation, profit and sustainability rules,
          and why selling an academy player helps a club far more than selling a signing for
          the same fee.
        </li>
      </ul>
      <p>
        We also publish football news, but selectively and as a smaller part of the site. If a
        story is already reported everywhere and we have nothing to add beyond repeating it,
        we would rather not run it. When we do cover news, we try to explain the mechanism
        behind it and link to the guide that sets out how it works.
      </p>

      <h2>Who Writes It</h2>
      <p>
        Articles carry a team byline rather than an individual one. The site is written and
        edited in-house by a small team, and a piece usually passes through more than one pair
        of hands before publication, so the byline reflects the group accountable for it. You
        can see everything published under it on the{" "}
        <Link href="/author/soccer-365-team">team page</Link>.
      </p>
      <p>
        We do not run guest posts sold as advertising, sponsored content presented as
        editorial, or work bought from content farms. Our{" "}
        <Link href="/editorial-policy">Editorial Policy</Link>{" "}sets out how we source
        stories, how rules content is checked against the current Laws of the Game, and what
        happens when we get something wrong.
      </p>

      <h2>How the Site Is Funded</h2>
      <p>
        By advertising. Advertisers have no say in what we cover or what we conclude, and no
        advertiser sees an article before it is published. We do not carry betting tips,
        gambling affiliate content, or links to unauthorised streams.
      </p>

      <h2>Who We Are Not</h2>
      <p>
        Several unrelated football sites use a similar name, some of them long established and
        much larger than us. {SITE.name}{" "}at {SITE.domain}{" "}has no connection to any of
        them: no shared ownership, no partnership, no network. If you arrived here looking for
        a different site, that is why the coverage does not look familiar.
      </p>

      <h2>Corrections and Contact</h2>
      <p>
        If an article is wrong, we want to know, and we would rather fix it than let it sit.
        Corrections, story tips and questions all go to the same place: our{" "}
        <Link href="/contact">Contact page</Link>. We read every message.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE.name}, the team behind it, and our mission to bring fast, clear football coverage to fans.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <LegalPage title="About Us" breadcrumbs={[{ name: "About Us", href: "/about" }]}>
      <p>
        {SITE.name}{" "}is an independent football news site covering the Premier League, the
        Champions League, the World Cup and the global transfer market. We&apos;re part of the
        &ldquo;365&rdquo; network of sports sites, which also includes dedicated coverage for
        other sports under the same editorial standards.
      </p>

      <h2>Our Mission</h2>
      <p>
        Football news moves fast, and a lot of sites bury the story under adverts, pop-ups and
        padding.{" "}
        {SITE.name}{" "}exists to do the opposite: clear headlines, fast-loading pages, and
        articles that get to the point. We write for fans who want to know what happened and why
        it matters, without wading through filler to get there.
      </p>

      <h2>What We Cover</h2>
      <p>
        Breaking transfer news, match reports, Champions League and World Cup coverage, and a
        growing library of explainer guides on the laws of the game and how competitions work —
        useful whether you&apos;ve followed football for decades or are just getting into it.
      </p>

      <h2>Editorial Standards</h2>
      <p>
        Every article on {SITE.name}{" "}is written and edited by our team before publication. We
        correct errors transparently and mark updated articles with a revised publication date.
        If you spot something that needs fixing, please{" "}
        <a href="/contact">get in touch</a>.
      </p>

      <h2>Get In Touch</h2>
      <p>
        Questions, tips or feedback? Visit our <a href="/contact">Contact page</a> — we read
        every message.
      </p>
    </LegalPage>
  );
}

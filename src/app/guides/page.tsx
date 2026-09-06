import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getGuides } from "@/lib/data";

export const metadata: Metadata = {
  title: "Football Guides",
  description:
    "Plain-English explainers on football: the laws of the game, how transfers and contracts really work, and where the money goes.",
  alternates: { canonical: "/guides" },
};

/**
 * The listing below is chronological, which tells a reader nothing about what
 * is here. These three groups are how the library is actually organised, so
 * the page says so before dropping someone into a grid of cards.
 */
const THEMES = [
  {
    heading: "The laws of the game",
    blurb:
      "The decisions that start arguments, and why they were given. Most come down to a rule that changed at some point and never got explained.",
    links: [
      { href: "/guides/offside-explained-simply", label: "Offside" },
      { href: "/guides/handball-rule-explained", label: "The handball rule" },
      { href: "/guides/what-is-var-and-how-does-it-work", label: "VAR, and what it cannot review" },
      { href: "/guides/yellow-and-red-cards-explained", label: "Cards, bans and appeals" },
      { href: "/guides/stoppage-time-explained", label: "Stoppage time" },
      {
        href: "/guides/extra-time-and-penalty-shootouts-explained",
        label: "Extra time and shootouts",
      },
    ],
  },
  {
    heading: "Transfers and contracts",
    blurb:
      "What the reported fee leaves out. Almost every transfer story turns on a clause, a deadline or a payment structure nobody spells out.",
    links: [
      { href: "/guides/what-does-on-loan-mean-football", label: "What 'on loan' really means" },
      { href: "/guides/release-clause-explained", label: "Release clauses" },
      {
        href: "/guides/buy-back-and-sell-on-clauses-explained",
        label: "Buy-back and sell-on clauses",
      },
      { href: "/guides/free-transfers-and-the-bosman-ruling", label: "Free transfers and Bosman" },
      { href: "/guides/how-transfer-windows-work", label: "How transfer windows work" },
      { href: "/guides/football-agent-fees-explained", label: "How agents get paid" },
    ],
  },
  {
    heading: "Football money",
    blurb:
      "Why a club with a wealthy owner says it cannot afford a striker, and why the answer is usually accounting rather than cash.",
    links: [
      { href: "/guides/psr-financial-rules-explained", label: "PSR and the spending limits" },
      {
        href: "/guides/why-clubs-sell-academy-players",
        label: "Why clubs sell their academy players",
      },
      {
        href: "/guides/why-do-transfers-collapse-at-the-last-minute",
        label: "Why transfers collapse",
      },
    ],
  },
];

export default async function GuidesListingPage() {
  const result = await getGuides({ page: 1, limit: 12 });

  const intro = (
    <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
      {THEMES.map((theme) => (
        <div key={theme.heading}>
          <h2 className="font-display text-lg font-bold uppercase tracking-tight text-ink">
            {theme.heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{theme.blurb}</p>
          <ul className="mt-3 space-y-1.5">
            {theme.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-brand hover:text-brand-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <Container className="py-8">
      <ArticleListing
        title="Football Guides"
        description="Questions a match throws up that nobody stops to answer. Each guide takes one and works through it properly, rather than giving the version that fits in a caption. Written and checked in-house, and updated when the rules move."
        breadcrumbs={[{ name: "Guides", href: "/guides" }]}
        intro={intro}
        result={result}
        basePath="/guides"
      />
    </Container>
  );
}

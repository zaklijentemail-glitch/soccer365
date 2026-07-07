import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-transfers",
    slug: "transfers",
    name: "Transfers",
    description:
      "The latest confirmed transfers, loan moves and speculation from the Premier League and across Europe.",
    meta_title: "Football Transfer News & Rumours | Soccer 365",
    meta_description:
      "Breaking transfer news, confirmed deals and the latest rumours from the Premier League, La Liga, Serie A and beyond.",
  },
  {
    id: "cat-champions-league",
    slug: "champions-league",
    name: "Champions League",
    description:
      "Results, fixtures, analysis and everything happening in the UEFA Champions League.",
    meta_title: "Champions League News, Results & Fixtures | Soccer 365",
    meta_description:
      "Stay on top of the UEFA Champions League with results, fixtures, group standings and match analysis.",
  },
  {
    id: "cat-world-cup",
    slug: "world-cup",
    name: "World Cup",
    description:
      "Full coverage of the FIFA World Cup, from qualifiers to the final.",
    meta_title: "World Cup News, Results & Fixtures | Soccer 365",
    meta_description:
      "Every result, storyline and tactical breakdown from the FIFA World Cup, updated as the tournament unfolds.",
  },
  {
    id: "cat-rules",
    slug: "rules",
    name: "Rules & Guides",
    description:
      "Clear explainers on the laws of football, competition formats and the rules casual fans always ask about.",
    meta_title: "Football Rules Explained: Guides | Soccer 365",
    meta_description:
      "Offside, VAR, the Bosman ruling and more: football's rules and formats explained in plain English.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

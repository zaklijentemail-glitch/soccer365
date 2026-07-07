import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ArticleListing from "@/components/listing/ArticleListing";
import { getGuides } from "@/lib/data";

export const metadata: Metadata = {
  title: "Football Guides",
  description:
    "Plain-English explainers on the rules, formats and quirks of football, including offside, VAR and transfers.",
  alternates: { canonical: "/guides" },
};

export default async function GuidesListingPage() {
  const result = await getGuides({ page: 1, limit: 12 });
  return (
    <Container className="py-8">
      <ArticleListing
        title="Football Guides"
        description="Plain-English explainers on the rules, formats and quirks of football."
        breadcrumbs={[{ name: "Guides", href: "/guides" }]}
        result={result}
        basePath="/guides"
      />
    </Container>
  );
}

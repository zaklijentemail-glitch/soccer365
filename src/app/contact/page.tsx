import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContactForm from "@/components/forms/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${SITE.name} team — send us a message or email us directly.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />

      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-ink">
        Contact Us
      </h1>
      <p className="mt-2 max-w-2xl text-ink-soft">
        Got a tip, a correction, or a question? Send us a message below, or email us directly at{" "}
        <a href={`mailto:hello@${SITE.domain}`} className="font-semibold text-brand">
          hello@{SITE.domain}
        </a>
        .
      </p>

      <div className="mt-8">
        <ContactForm />
      </div>
    </Container>
  );
}

import type { FaqItem } from "@/lib/data/types";
import JsonLd from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/jsonld";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-10">
      <JsonLd data={faqSchema(items)} />
      <h2 id="faq-heading" className="text-2xl font-bold uppercase tracking-tight text-ink">
        Frequently Asked Questions
      </h2>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {items.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold uppercase text-ink">
              {item.question}
              <span className="shrink-0 text-xl text-brand group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 text-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

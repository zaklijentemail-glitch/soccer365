import Link from "@/components/ui/Link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/constants";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const full = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(full.map((i) => ({ name: i.name, url: `${SITE.url}${i.href}` })))}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-ink-faint">
        <ol className="flex flex-wrap items-center gap-1.5">
          {full.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === full.length - 1 ? (
                <span className="text-ink-soft" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-brand">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

import Container from "@/components/ui/Container";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/ui/Breadcrumbs";

export default function LegalPage({
  title,
  breadcrumbs,
  children,
}: {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}) {
  return (
    <Container className="py-8">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-ink">
        {title}
      </h1>
      <div className="prose-content mt-6 max-w-3xl text-ink-soft [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:tracking-tight [&_h2]:text-ink [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1 [&_a]:font-semibold [&_a]:text-brand">
        {children}
      </div>
    </Container>
  );
}

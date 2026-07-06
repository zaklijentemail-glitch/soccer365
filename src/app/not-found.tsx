import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="font-display text-6xl font-bold text-brand">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-ink">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-sm text-ink-soft">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="rounded-md bg-brand px-5 py-2.5 text-sm font-bold uppercase text-white hover:bg-brand-dark"
        >
          Back to Home
        </Link>
        <Link
          href="/news"
          className="rounded-md border border-line px-5 py-2.5 text-sm font-bold uppercase text-ink-soft hover:border-brand hover:text-brand"
        >
          Latest News
        </Link>
      </div>
    </Container>
  );
}

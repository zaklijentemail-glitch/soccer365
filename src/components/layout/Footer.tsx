import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "./Logo";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-paper-soft">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-ink-soft">
            The latest football news, transfers and analysis. Fast, clear, no filler.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink">Content</h3>
          <ul className="mt-3 space-y-2">
            {FOOTER_LINKS.content.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-soft hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink">Information</h3>
          <ul className="mt-3 space-y-2">
            {FOOTER_LINKS.info.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-soft hover:text-brand">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-ink">Follow Us</h3>
          <ul className="mt-3 space-y-2">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-ink-soft hover:text-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-sm text-ink-faint sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Soccer 365. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}

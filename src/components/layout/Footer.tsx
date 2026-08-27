import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SocialIcon from "./SocialIcon";
import CookieSettingsLink from "@/components/consent/CookieSettingsLink";
import { FOOTER_INLINE_LINKS, SITE, SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-ink text-white">
      <Container className="flex flex-col items-center py-12 text-center">
        {/* Wordmark */}
        <Link
          href="/"
          aria-label={`${SITE.name} home`}
          className="inline-flex items-center gap-2.5"
        >
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={44}
            height={44}
            className="h-10 w-10 shrink-0"
          />
          <span className="font-display text-2xl font-bold uppercase tracking-tight text-white">
            Soccer <span className="text-brand-light">365</span>
          </span>
        </Link>

        {/* Social row */}
        <ul className="mt-6 flex items-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.platform}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand hover:text-white"
              >
                <SocialIcon platform={social.platform} />
              </a>
            </li>
          ))}
        </ul>

        {/* Inline link row with dividers */}
        <nav aria-label="Footer" className="mt-8 max-w-3xl">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {FOOTER_INLINE_LINKS.map((link, i) => (
              <li key={link.href} className="flex items-center gap-x-3">
                {i > 0 && (
                  <span aria-hidden className="text-white/25">
                    |
                  </span>
                )}
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-white/80 transition-colors hover:text-brand-light"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-x-3">
              <span aria-hidden className="text-white/25">
                |
              </span>
              <CookieSettingsLink className="text-sm font-semibold text-white/80 transition-colors hover:text-brand-light" />
            </li>
          </ul>
        </nav>

        {/* Copyright / disclaimer */}
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-white/45">
          &copy; {year} {SITE.name}. All rights reserved. The information
          contained in {SITE.name} may not be published, broadcast, rewritten or
          redistributed without the prior written authority of {SITE.name}.
        </p>

        {/*
          Required by the Football-Data.org API terms (§7.1), which ask for this
          exact wording in a visible location. Fixtures, results and league
          tables across the site come from them, so the credit belongs on every
          page rather than only on the pages that render a table.
        */}
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-white/45">
          Football data provided by the{" "}
          <a
            href="https://www.football-data.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-brand-light"
          >
            Football-Data.org API
          </a>
          .
        </p>
      </Container>
    </footer>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-1.5 px-1 text-ink"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
        <span className="text-sm font-bold uppercase tracking-wide">{open ? "Close" : "Menu"}</span>
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          className="absolute left-0 top-full w-full border-t border-line bg-paper px-4 py-4 shadow-sm"
        >
          <form action="/search" method="get" className="mb-4">
            <label htmlFor="mobile-search" className="mb-1.5 block text-sm font-bold text-ink">
              Search
            </label>
            <div className="flex gap-2">
              <input
                id="mobile-search"
                name="q"
                type="search"
                placeholder="Search news and guides…"
                className="min-h-11 w-full rounded-md border border-line px-3 text-base text-ink focus:border-brand focus:outline-none"
              />
              <button
                type="submit"
                className="min-h-11 shrink-0 rounded-md bg-brand px-4 text-sm font-bold uppercase text-white hover:bg-brand-dark"
              >
                Search
              </button>
            </div>
          </form>

          <nav>
            <ul className="flex flex-col gap-1 border-t border-line pt-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block min-h-11 py-2.5 text-sm font-bold uppercase tracking-wide text-ink hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

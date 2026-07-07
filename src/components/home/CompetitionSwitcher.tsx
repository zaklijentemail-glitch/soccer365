"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

export interface CompetitionOption<T extends string = string> {
  slug: T;
  label: string;
  /** null falls back to a monogram; "all" renders a dedicated icon instead. */
  logo: string | null | "all";
}

function AllIcon({ size }: { size: number }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" style={{ width: size, height: size }} className="shrink-0 text-brand">
      <circle cx="7" cy="7" r="4" fill="currentColor" opacity="0.9" />
      <circle cx="17" cy="7" r="4" fill="currentColor" opacity="0.55" />
      <circle cx="7" cy="17" r="4" fill="currentColor" opacity="0.55" />
      <circle cx="17" cy="17" r="4" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function Crest<T extends string>({ option, size }: { option: CompetitionOption<T>; size: number }) {
  if (option.logo === "all") {
    return <AllIcon size={size} />;
  }
  if (option.logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={option.logo}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 object-contain"
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-brand"
    >
      {option.label[0]}
    </span>
  );
}

export default function CompetitionSwitcher<T extends string>({
  options,
  value,
  onChange,
}: {
  options: CompetitionOption<T>[];
  value: T;
  onChange: (slug: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = options.find((option) => option.slug === value) ?? options[0];
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.slug === value)
  );

  useEffect(() => {
    if (!open) return;
    itemRefs.current[activeIndex]?.focus();

    function onPointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, activeIndex]);

  function handleItemKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, index: number) {
    const count = options.length;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;

    if (next !== null) {
      event.preventDefault();
      itemRefs.current[next]?.focus();
    }
  }

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full border border-line bg-paper-soft py-2 pl-2.5 pr-4 transition-colors hover:border-brand"
      >
        <Crest option={active} size={28} />
        <span className="font-display text-base font-bold uppercase tracking-tight text-ink">{active.label}</span>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className={`h-4 w-4 shrink-0 text-ink-faint transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M5 7.5l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Choose a competition"
          className="absolute left-0 top-full z-20 mt-2 grid w-72 grid-cols-2 gap-1 rounded-xl border border-line bg-paper p-2 shadow-lg"
        >
          {options.map((option, index) => (
            <button
              key={option.slug}
              type="button"
              role="menuitem"
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              aria-current={option.slug === value ? "true" : undefined}
              onClick={() => {
                onChange(option.slug);
                setOpen(false);
              }}
              onKeyDown={(event) => handleItemKeyDown(event, index)}
              className={`flex flex-col items-center gap-1.5 rounded-lg px-2 py-3.5 text-center transition-colors ${
                option.slug === value ? "bg-brand-light" : "hover:bg-paper-soft"
              }`}
            >
              <Crest option={option} size={32} />
              <span className="text-xs font-bold uppercase leading-tight text-ink">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

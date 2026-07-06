import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import BreakingBadge from "@/components/ui/BreakingBadge";
import type { Article, Category } from "@/lib/data/types";
import { formatRelativeOrDate, isWithinHours } from "@/lib/utils";

function articleHref(article: Article) {
  return article.type === "news"
    ? `/news/${article.slug}`
    : `/guides/${article.slug}`;
}

function GridIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

/**
 * Drop a licensed background photo at public/images/hero-bg.{jpg,jpeg,png,webp}
 * and it's picked up automatically with a dark overlay for text contrast.
 * Falls back to a gradient when no file is present.
 */
function findHeroBackgroundImage(): string | null {
  const candidates = ["jpg", "jpeg", "png", "webp"].map(
    (ext) => `hero-bg.${ext}`,
  );
  for (const fileName of candidates) {
    if (fs.existsSync(path.join(process.cwd(), "public", "images", fileName))) {
      return `/images/${fileName}`;
    }
  }
  return null;
}

export default function Hero({
  topStory,
  categories,
}: {
  topStory: Article;
  categories: Category[];
}) {
  const breaking = isWithinHours(topStory.published_at, 20);
  const topHref = articleHref(topStory);
  const backgroundImage = findHeroBackgroundImage();

  return (
    <section className="relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute inset-0">
        {backgroundImage ? (
          <>
            <Image
              src={backgroundImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/40 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-linear-to-br from-ink via-ink to-brand-dark" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand opacity-30 blur-3xl" />
            <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-brand opacity-[0.2] blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </>
        )}
      </div>

      <Container className="relative flex  !py-14 lg:!py-20 flex-col justify-center">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-10">
          {/* Welcome copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-400 ring-1 ring-inset ring-white/15">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Updated Every Day
            </span>

            <h1 className="mt-3 font-display text-2xl font-bold uppercase leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-4xl">
              Football News, Transfers &amp; Analysis
            </h1>

            <p className="mt-3 max-w-md text-sm text-white/70 sm:text-base">
              Fast, clear reporting and in-depth guides to the game — transfers,
              Champions League nights and World Cup drama, without the filler.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href="/news"
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
              >
                Latest News →
              </Link>
              <Link
                href="/guides"
                className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
              >
                Explore Guides
              </Link>
            </div>
          </div>

          {/* Top story spotlight */}
          <article className="min-w-0 overflow-hidden rounded-card border border-white/15 bg-black/35 backdrop-blur-md mt-5 lg:mt-0">
            <Link
              href={topHref}
              className="group relative block aspect-[16/6] w-full overflow-hidden"
            >
              <Image
                src={topStory.cover_image}
                alt={topStory.cover_image_alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
                aria-hidden="true"
              />
              {breaking && (
                <div className="absolute left-3 top-3">
                  <BreakingBadge />
                </div>
              )}
            </Link>

            <div className="p-4">
              <span className="block text-xs font-bold uppercase tracking-wide text-white/50">
                Top Story
              </span>
              <h2 className="mt-1 font-display text-base font-bold uppercase leading-snug text-white sm:text-lg">
                <Link
                  href={topHref}
                  className="transition-opacity hover:opacity-80"
                >
                  {topStory.title}
                </Link>
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/50">
                <span className="font-semibold text-white/70">
                  {topStory.author.name}
                </span>
                <span aria-hidden="true">&middot;</span>
                <time dateTime={topStory.published_at}>
                  {formatRelativeOrDate(topStory.published_at)}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{topStory.reading_time_minutes} min read</span>
                <span aria-hidden="true">&middot;</span>
                <Link
                  href={topHref}
                  className="font-bold text-white transition-opacity hover:opacity-80"
                >
                  Read Full Story →
                </Link>
              </div>
            </div>
          </article>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mt-5 border-t border-white/10 pt-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand">
              <GridIcon />
              Browse by Category
            </span>
            <div className="mt-3 flex items-center gap-4 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((category, i) => (
                <span
                  key={category.slug}
                  className="flex shrink-0 items-center gap-4"
                >
                  {i > 0 && (
                    <span className="text-white/20" aria-hidden="true">
                      •
                    </span>
                  )}
                  <Link
                    href={`/category/${category.slug}`}
                    className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-white/80 transition-colors hover:text-brand-light"
                  >
                    {category.name}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

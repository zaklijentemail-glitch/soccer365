import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import BreakingBadge from "@/components/ui/BreakingBadge";
import type { Article } from "@/lib/data/types";
import { isWithinHours } from "@/lib/utils";

function articleHref(article: Article) {
  return article.type === "news"
    ? `/news/${article.slug}`
    : `/guides/${article.slug}`;
}

export default function Hero({ topStory }: { topStory: Article }) {
  const breaking = isWithinHours(topStory.published_at, 20);
  const topHref = articleHref(topStory);

  return (
    <section className="relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <Container className="relative py-10! lg:py-14!">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div>
            <h1 className="font-display text-2xl font-bold uppercase leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-4xl">
              Football News, Transfers &amp; Analysis
            </h1>

            <p className="mt-3 max-w-md text-sm text-white/70 sm:text-base">
              Fast, clear reporting and in-depth guides to the game — transfers,
              Champions League nights and World Cup drama, without the filler.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 hidden">
              <Link
                title="Explore News"
                href="/news"
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
              >
                Explore News →
              </Link>
              <Link
                href="/guides"
                className="hidden rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-white/10"
              >
                Explore Guides
              </Link>
            </div>
          </div>

          <article className="min-w-0 overflow-hidden rounded-card border border-white/15 bg-black/35">
            <Link
              href={topHref}
              className="relative block aspect-[16/9] w-full overflow-hidden"
            >
              <Image
                src={topStory.cover_image}
                alt={topStory.cover_image_alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
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
                <Link href={topHref}>{topStory.title}</Link>
              </h2>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}

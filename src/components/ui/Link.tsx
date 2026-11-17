import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * next/link with prefetching off by default.
 *
 * Prefetch fetches the RSC payload (~70 KB) of every link that scrolls into
 * view. Those requests vary on router headers, so Vercel's CDN does not cache
 * them and each one is an ISR read and origin transfer. With 30+ links on a
 * ranking page, a single visit pulled up to 2 MB from origin and the site went
 * over the Hobby plan's 10 GB Fast Origin Transfer. Pages still load on click;
 * pass prefetch explicitly where a link is worth it.
 */
export default function Link({ prefetch = false, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={prefetch} {...props} />;
}

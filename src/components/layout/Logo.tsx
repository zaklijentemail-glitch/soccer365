import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${SITE.name} home`}>
      <Image
        src="/images/logo-mark.png"
        alt={SITE.name}
        width={44}
        height={44}
        priority
        className="h-10 w-10 shrink-0"
      />
      <span className="font-display text-xl font-bold uppercase tracking-tight text-ink">
        Soccer <span className="text-brand">365</span>
      </span>
    </Link>
  );
}

import Image from "next/image";
import Link from "@/components/ui/Link";
import { EDITOR } from "@/lib/constants";

/**
 * The editor's own view on a piece, written by him and added after he has
 * read it. Renders only when the article carries an `editorsTake`, so it is
 * never a placeholder: every box on the site is something he actually wrote.
 */
export default function EditorsTake({ text }: { text: string }) {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <aside className="mt-10 rounded-card border-l-4 border-brand bg-paper-soft p-5" aria-label="Editor's take">
      <div className="flex items-center gap-3">
        <Image src={EDITOR.image} alt={EDITOR.name} width={48} height={48} className="rounded-full object-cover" />
        <div>
          <p className="font-display text-lg font-bold uppercase tracking-tight text-ink">Editor&apos;s take</p>
          <p className="text-sm text-ink-faint">
            <Link href={`/about#${EDITOR.anchor}`} className="font-semibold text-ink-soft hover:text-brand">
              {EDITOR.name}
            </Link>
            , {EDITOR.jobTitle.toLowerCase()}
          </p>
        </div>
      </div>
      {paragraphs.map((p, i) => (
        <p key={i} className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
          {p}
        </p>
      ))}
    </aside>
  );
}

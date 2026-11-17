import Link from "@/components/ui/Link";
import type { Tag } from "@/lib/data/types";

export default function TagList({ tags }: { tags: Tag[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-8 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag.id}>
          <Link
            href={`/tag/${tag.slug}`}
            className="inline-block rounded-full bg-paper-soft px-3 py-1 text-sm text-ink-soft hover:text-brand"
          >
            #{tag.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

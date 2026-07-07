import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import { frontmatterSchema, type Frontmatter } from "./frontmatter";

export type ContentType = "news" | "guide";

export interface RawContentEntry {
  type: ContentType;
  slug: string;
  frontmatter: Frontmatter;
  body: string;
  readingTimeMinutes: number;
  filePath: string;
}

const CONTENT_ROOT = path.join(process.cwd(), "content");
const DIR_BY_TYPE: Record<ContentType, string> = {
  news: path.join(CONTENT_ROOT, "news"),
  guide: path.join(CONTENT_ROOT, "guides"),
};

async function readEntry(type: ContentType, fileName: string): Promise<RawContentEntry> {
  const filePath = path.join(DIR_BY_TYPE[type], fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(raw);

  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in content/${type}s/${fileName}:\n${issues}`);
  }

  const frontmatter = result.data;
  const readingTimeMinutes =
    frontmatter.readingTime ?? Math.max(1, Math.ceil(readingTime(content).minutes));

  return {
    type,
    slug: frontmatter.slug,
    frontmatter,
    body: content,
    readingTimeMinutes,
    filePath,
  };
}

async function readAllOfType(type: ContentType): Promise<RawContentEntry[]> {
  const dir = DIR_BY_TYPE[type];
  let fileNames: string[];
  try {
    fileNames = await fs.readdir(dir);
  } catch {
    return [];
  }

  const mdxFiles = fileNames.filter((name) => name.endsWith(".mdx"));
  const entries = await Promise.all(mdxFiles.map((fileName) => readEntry(type, fileName)));

  const slugs = new Set<string>();
  for (const entry of entries) {
    if (slugs.has(entry.slug)) {
      throw new Error(
        `Duplicate slug "${entry.slug}" found in content/${type}s. Slugs must be unique per content type.`
      );
    }
    slugs.add(entry.slug);
  }

  return entries
    .filter((entry) => !entry.frontmatter.draft)
    .sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime());
}

export const getAllNewsEntries = cache(() => readAllOfType("news"));
export const getAllGuideEntries = cache(() => readAllOfType("guide"));

export const getAllEntries = cache(async (): Promise<RawContentEntry[]> => {
  const [news, guides] = await Promise.all([getAllNewsEntries(), getAllGuideEntries()]);
  return [...news, ...guides];
});

export const getEntryBySlug = cache(
  async (slug: string): Promise<RawContentEntry | null> => {
    const all = await getAllEntries();
    return all.find((entry) => entry.slug === slug) ?? null;
  }
);

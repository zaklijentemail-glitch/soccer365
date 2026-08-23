import "server-only";
import type { Article, Category, PaginatedResult, Tag, TagWithCount } from "./types";
import { CATEGORIES, getCategoryBySlug } from "./categories";
import {
  getAllEntries,
  getAllNewsEntries,
  getAllGuideEntries,
  getEntryBySlug,
  type RawContentEntry,
} from "@/lib/content/reader";

function toArticle(entry: RawContentEntry): Article {
  const fm = entry.frontmatter;
  const category = getCategoryBySlug(fm.category);
  if (!category) {
    throw new Error(
      `content/${entry.type}s/${entry.slug}.mdx references unknown category "${fm.category}". ` +
        `Add it to src/lib/data/categories.ts first.`
    );
  }

  return {
    id: entry.slug,
    type: entry.type,
    slug: fm.slug,
    title: fm.title,
    excerpt: fm.excerpt,
    content: entry.body,
    cover_image: fm.coverImage,
    cover_image_alt: fm.coverImageAlt,
    category,
    tags: fm.tags.map((slug): Tag => ({ id: `tag-${slug}`, slug, name: tagLabel(slug) })),
    author: {
      id: fm.author.slug,
      name: fm.author.name,
      slug: fm.author.slug,
      avatar_url: fm.author.avatar ?? null,
      bio: fm.author.bio ?? null,
    },
    published_at: fm.date.toISOString(),
    updated_at: (fm.updatedAt ?? fm.date).toISOString(),
    reading_time_minutes: entry.readingTimeMinutes,
    is_featured: fm.featured,
    faq: fm.faq,
    meta_title: fm.metaTitle,
    meta_description: fm.metaDescription ?? fm.description,
  };
}

function tagLabel(slug: string): string {
  return slug
    .split("-")
    .map((word) => (word.length <= 3 ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)))
    .join(" ");
}

export type SortOrder = "newest" | "oldest";

function byDateDesc(a: Article, b: Article) {
  return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
}

function sortArticles(items: Article[], sort: SortOrder = "newest"): Article[] {
  const sorted = [...items].sort(byDateDesc);
  return sort === "oldest" ? sorted.reverse() : sorted;
}

function paginate<T>(items: T[], page: number, limit: number): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return {
    items: items.slice(start, start + limit),
    page,
    limit,
    total,
    totalPages,
  };
}

export async function getNews(
  options: { page?: number; limit?: number; category?: string; sort?: SortOrder } = {}
): Promise<PaginatedResult<Article>> {
  const { page = 1, limit = 12, category, sort = "newest" } = options;
  const entries = await getAllNewsEntries();
  let items = entries.map(toArticle);
  if (category) {
    items = items.filter((a) => a.category.slug === category);
  }
  return paginate(sortArticles(items, sort), page, limit);
}

export async function getNewsBySlug(slug: string): Promise<Article | null> {
  const entry = await getEntryBySlug(slug);
  return entry ? toArticle(entry) : null;
}

export async function getCategories(): Promise<Category[]> {
  return CATEGORIES;
}

export async function getCategoryBySlugAsync(slug: string): Promise<Category | null> {
  return getCategoryBySlug(slug) ?? null;
}

export async function getNewsByCategory(
  categorySlug: string,
  options: { page?: number; limit?: number; sort?: SortOrder } = {}
): Promise<PaginatedResult<Article>> {
  const { page = 1, limit = 12, sort = "newest" } = options;
  const entries = await getAllEntries();
  const items = entries.map(toArticle).filter((a) => a.category.slug === categorySlug);
  return paginate(sortArticles(items, sort), page, limit);
}

export async function getNewsByTag(
  tagSlug: string,
  options: { page?: number; limit?: number } = {}
): Promise<PaginatedResult<Article>> {
  const { page = 1, limit = 12 } = options;
  const entries = await getAllEntries();
  const items = entries
    .map(toArticle)
    .filter((a) => a.tags.some((t) => t.slug === tagSlug))
    .sort(byDateDesc);
  return paginate(items, page, limit);
}

export async function getAllAuthors() {
  const entries = await getAllEntries();
  const map = new Map<string, ReturnType<typeof toArticle>["author"]>();
  for (const entry of entries) {
    const author = toArticle(entry).author;
    map.set(author.slug, author);
  }
  return Array.from(map.values());
}

export async function getAuthorBySlug(slug: string) {
  const authors = await getAllAuthors();
  return authors.find((a) => a.slug === slug) ?? null;
}

export async function getArticlesByAuthor(
  slug: string,
  options: { page?: number; limit?: number } = {}
): Promise<PaginatedResult<Article>> {
  const { page = 1, limit = 12 } = options;
  const entries = await getAllEntries();
  const items = entries.map(toArticle).filter((a) => a.author.slug === slug);
  return paginate(sortArticles(items), page, limit);
}

export async function getTagBySlug(slug: string): Promise<TagWithCount | null> {
  const tags = await getAllTags();
  return tags.find((t) => t.slug === slug) ?? null;
}

export async function getAllTags(): Promise<TagWithCount[]> {
  const entries = await getAllEntries();
  const map = new Map<string, TagWithCount>();
  for (const entry of entries) {
    for (const slug of entry.frontmatter.tags) {
      const existing = map.get(slug);
      if (existing) {
        existing.articleCount += 1;
      } else {
        map.set(slug, { id: `tag-${slug}`, slug, name: tagLabel(slug), articleCount: 1 });
      }
    }
  }
  return Array.from(map.values());
}

export async function getRelatedNews(
  articleId: string,
  categoryId: string,
  limit = 3
): Promise<Article[]> {
  const entries = await getAllEntries();
  return entries
    .map(toArticle)
    .filter((a) => a.id !== articleId && a.category.id === categoryId)
    .sort(byDateDesc)
    .slice(0, limit);
}

export async function getFeaturedNews(limit = 4): Promise<Article[]> {
  const entries = await getAllNewsEntries();
  return entries
    .map(toArticle)
    .filter((a) => a.is_featured)
    .sort(byDateDesc)
    .slice(0, limit);
}

export async function getFeaturedGuides(limit = 6): Promise<Article[]> {
  const entries = await getAllGuideEntries();
  return entries.map(toArticle).sort(byDateDesc).slice(0, limit);
}

export async function getGuides(
  options: { page?: number; limit?: number } = {}
): Promise<PaginatedResult<Article>> {
  const { page = 1, limit = 12 } = options;
  const entries = await getAllGuideEntries();
  const items = entries.map(toArticle).sort(byDateDesc);
  return paginate(items, page, limit);
}

export async function getLatestNews(limit = 8): Promise<Article[]> {
  const entries = await getAllNewsEntries();
  return entries.map(toArticle).sort(byDateDesc).slice(0, limit);
}

export async function searchArticles(query: string, limit = 20): Promise<Article[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const entries = await getAllEntries();
  return entries
    .map(toArticle)
    .filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.name.toLowerCase().includes(q))
    )
    .slice(0, limit);
}

export async function getAllArticleSlugsWithType(): Promise<
  { slug: string; type: Article["type"]; updated_at: string }[]
> {
  const entries = await getAllEntries();
  return entries.map((entry) => ({
    slug: entry.frontmatter.slug,
    type: entry.type,
    updated_at: (entry.frontmatter.updatedAt ?? entry.frontmatter.date).toISOString(),
  }));
}

export async function getRecentNewsForNewsSitemap(hours = 48): Promise<Article[]> {
  const cutoff = Date.now() - hours * 60 * 60 * 1000;
  const entries = await getAllNewsEntries();
  return entries
    .map(toArticle)
    .filter((a) => new Date(a.published_at).getTime() >= cutoff)
    .sort(byDateDesc);
}

export type { Article, Category, PaginatedResult, Tag, TagWithCount } from "./types";

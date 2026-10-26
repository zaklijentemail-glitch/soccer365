export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar_url: string | null;
  bio: string | null;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  meta_title: string;
  meta_description: string;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
}

/**
 * A tag together with how many published articles carry it. Used to keep
 * near-empty tag archives out of the index and out of ad inventory.
 */
export interface TagWithCount extends Tag {
  articleCount: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type ArticleType = "news" | "guide";

export interface Article {
  id: string;
  type: ArticleType;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  /** Path to the cover photograph, or "" when the article has none. */
  cover_image: string;
  cover_image_alt: string;
  category: Category;
  tags: Tag[];
  author: Author;
  published_at: string;
  updated_at: string;
  reading_time_minutes: number;
  is_featured: boolean;
  /** Readable and linked, but kept out of the index, sitemap and homepage. */
  noindex: boolean;
  faq?: FaqItem[];
  /** The editor's own view on the piece, when he has written one. */
  editors_take?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

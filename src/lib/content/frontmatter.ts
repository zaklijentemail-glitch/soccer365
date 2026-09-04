import { z } from "zod";

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const authorSchema = z.object({
  name: z.string(),
  slug: z.string(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

export const frontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  excerpt: z.string(),
  date: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: authorSchema,
  category: z.string(),
  tags: z.array(z.string()).default([]),
  coverImage: z.string(),
  coverImageAlt: z.string(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  /**
   * Keep the article readable and linked, but out of the index and out of
   * the homepage. For aggregated coverage that adds little beyond its source:
   * it stays for anyone who lands on it, without presenting the site as a
   * news aggregator to a crawler.
   */
  noindex: z.boolean().default(false),
  readingTime: z.number().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  faq: z.array(faqItemSchema).optional(),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type FrontmatterAuthor = z.infer<typeof authorSchema>;

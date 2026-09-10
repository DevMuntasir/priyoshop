import * as z from 'zod';

const localeContentSchema = z.object({
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500),
  contentHtml: z.string().max(200_000),
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
});

export const createNewsPostSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(120),
});

export const updateNewsPostSchema = z.object({
  slug: z.string().min(1).max(120).optional(),
  categories: z.array(z.string().min(1).max(40)).max(10).optional(),
  content: z
    .object({
      en: localeContentSchema,
      bn: localeContentSchema.partial().optional(),
    })
    .optional(),
  coverImage: z.string().max(500).optional(),
  coverImageAlt: z.string().max(200).optional(),
  publicationId: z.string().min(1).max(40).nullable().optional(),
  status: z.enum(['draft', 'published']).optional(),
  featured: z.boolean().optional(),
  publishedAt: z.iso.datetime().optional(),
});

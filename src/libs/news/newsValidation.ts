import * as z from 'zod';

const localeContentSchema = z.object({
  title: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional().default(''),
  contentHtml: z.string().max(200_000).optional().default(''),
  metaTitle: z
    .string()
    .max(70)
    .nullable()
    .transform((value) => value ?? '')
    .optional(),
  metaDescription: z
    .string()
    .max(160)
    .nullable()
    .transform((value) => value ?? '')
    .optional(),
});

export const createNewsPostSchema = z.object({
  title: z.string().min(1).max(200),
  banglaTitle: z.string().max(200).optional(),
  slug: z.string().min(1).max(120),
  newsLink: z.string().max(2000).optional(),
  categories: z.array(z.string().min(1).max(40)).max(10).optional(),
  coverImage: z.string().max(500).optional(),
  coverImageAlt: z.string().max(200).optional(),
  publicationId: z.string().min(1).max(40).nullable().optional(),
  featured: z.boolean().optional(),
  publishedAt: z.iso.datetime().optional(),
});

export const updateNewsPostSchema = z.object({
  slug: z.string().min(1).max(120).optional(),
  categories: z.array(z.string().min(1).max(40)).max(10).optional(),
  newsLink: z.string().max(2000).optional(),
  content: z
    .object({
      en: localeContentSchema,
      bn: localeContentSchema
        .extend({ title: z.string().max(200) })
        .partial()
        .optional(),
    })
    .optional(),
  coverImage: z.string().max(500).optional(),
  coverImageAlt: z.string().max(200).optional(),
  publicationId: z.string().min(1).max(40).nullable().optional(),
  status: z.enum(['draft', 'published']).optional(),
  featured: z.boolean().optional(),
  publishedAt: z.iso.datetime().optional(),
});

import * as z from 'zod';

export const seoOverrideUpdateSchema = z.object({
  locale: z.string().min(2).max(5),
  title: z.string().max(160).optional(),
  description: z.string().max(320).optional(),
  keywords: z.array(z.string().min(1).max(60)).max(20).optional(),
  canonicalPath: z.string().max(300).optional(),
  ogImage: z.string().max(500).optional(),
  robots: z.object({ index: z.boolean(), follow: z.boolean() }).optional(),
});

export type SeoOverrideUpdateInput = z.infer<typeof seoOverrideUpdateSchema>;

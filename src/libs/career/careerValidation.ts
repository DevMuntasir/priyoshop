import * as z from 'zod';

const localeContentSchema = z.object({
  title: z.string().min(1).max(200),
  descriptionHtml: z.string().max(200_000),
  experienceRequirement: z.string().max(200),
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
});

export const createJobPostingSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(120),
});

export const updateJobPostingSchema = z.object({
  slug: z.string().min(1).max(120).optional(),
  category: z.string().min(1).max(80).optional(),
  location: z.string().max(120).optional(),
  jobType: z.string().max(60).optional(),
  level: z.string().max(60).optional(),
  workMode: z.string().max(60).optional(),
  compensation: z.string().max(120).optional(),
  salary: z.string().max(120).optional(),
  benefits: z.array(z.string().min(1).max(200)).max(20).optional(),
  vacancy: z.number().int().min(0).max(1000).optional(),
  applyEmail: z.email().max(200).optional(),
  content: z
    .object({
      en: localeContentSchema,
      bn: localeContentSchema.partial().optional(),
    })
    .optional(),
  status: z.enum(['draft', 'published']).optional(),
  deadline: z.iso.datetime().optional(),
});

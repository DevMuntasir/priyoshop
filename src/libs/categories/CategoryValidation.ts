import { z } from 'zod';

export const categoryScopeSchema = z.enum(['blog', 'news']);
export type CategoryScope = z.infer<typeof categoryScopeSchema>;

export const createCategorySchema = z.object({
  name: z
    .string()
    .transform((name) => name.trim().replaceAll(/\s+/gu, ' '))
    .pipe(z.string().min(1).max(40)),
});

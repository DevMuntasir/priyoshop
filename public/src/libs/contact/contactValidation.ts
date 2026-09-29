import * as z from 'zod';

export const createContactSubmissionSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.email().max(200),
  message: z.string().trim().min(1).max(5000),
});

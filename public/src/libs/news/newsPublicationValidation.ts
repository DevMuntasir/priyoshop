import * as z from 'zod';

function normalizeWebsiteUrl(value: unknown) {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return undefined;
  }

  if (/^[a-z][a-z0-9+.-]*:\/\//iu.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

const websiteUrlSchema = z.preprocess(
  normalizeWebsiteUrl,
  z.string().url('Website URL must be a valid URL').max(500).optional(),
);

export const createNewsPublicationSchema = z.object({
  name: z.string().min(1).max(120),
  slug: z.string().min(1).max(120),
  logo: z.string().min(1).max(500),
  logoAlt: z.string().max(200).optional(),
  websiteUrl: websiteUrlSchema,
});

export const updateNewsPublicationSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  slug: z.string().min(1).max(120).optional(),
  logo: z.string().min(1).max(500).optional(),
  logoAlt: z.string().max(200).optional(),
  websiteUrl: websiteUrlSchema,
});

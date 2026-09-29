/**
 * Derives a kebab-case slug from a job title. Keeps Unicode letters
 * (e.g. Bangla) so non-Latin titles produce usable slugs.
 * @param title The job title.
 * @returns A lowercase, hyphen-separated slug.
 */
export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{M}\p{N}\s-]/gu, '')
    .trim()
    .replaceAll(/[\s-]+/gu, '-');
}

/**
 * Decodes a percent-encoded slug route param (non-Latin slugs arrive
 * URL-encoded from Next.js). Returns the input unchanged if it is not
 * valid percent-encoding.
 * @param slug The raw route param.
 * @returns The decoded slug.
 */
export function decodeSlugParam(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

/**
 * Validates a job posting slug. Career slugs live under /career/, so no
 * reserved-path check is needed — only format rules.
 * @param slug The slug to validate (lowercase, kebab-case).
 * @returns Error message if invalid, undefined if valid.
 */
export function validateCareerSlug(slug: string): string | undefined {
  if (!slug) {
    return 'Slug is required';
  }

  if (!/^[\p{Ll}\p{Lo}\p{M}\p{N}-]+$/u.test(slug)) {
    return 'Slug must contain only lowercase letters, numbers, and hyphens';
  }

  if (slug.startsWith('-') || slug.endsWith('-')) {
    return 'Slug cannot start or end with a hyphen';
  }

  return undefined;
}

/** Paths that are reserved and cannot be used as builder page slugs. */
const RESERVED_PATHS = new Set([
  'about',
  'business',
  'commerce',
  'portfolio',
  'admin',
  'api',
  'pages',
  'impact',
  'opportunity',
  'media',
  'careers',
]);

/**
 * Validates a slug for use as a builder page route.
 * @param slug The slug to validate (lowercase, kebab-case)
 * @returns Error message if invalid, undefined if valid
 */
export function validateSlug(slug: string): string | undefined {
  if (!slug) {
    return 'Slug is required';
  }

  if (!/^[a-z0-9\-]+$/.test(slug)) {
    return 'Slug must contain only lowercase letters, numbers, and hyphens';
  }

  if (slug.startsWith('-') || slug.endsWith('-')) {
    return 'Slug cannot start or end with a hyphen';
  }

  if (RESERVED_PATHS.has(slug)) {
    return `"${slug}" is a reserved path and cannot be used`;
  }

  return undefined;
}

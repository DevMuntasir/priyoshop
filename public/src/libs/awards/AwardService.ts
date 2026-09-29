import 'server-only';

import type { Award } from '@/components/sections/awards/data';
import { AWARDS } from '@/components/sections/awards/data';
import { getSection } from '@/libs/cms/ContentRepository';
import { decodeAwardSlug, normalizeAward } from './awardUtils';

export { decodeAwardSlug, normalizeAward, slugifyAward } from './awardUtils';

/**
 * Retrieves the full list of awards for the given locale from CMS content.
 * Falls back to default seed awards if none are configured.
 * @param locale The active language code.
 * @returns Promise resolving to an array of normalized awards.
 */
export async function listAwards(locale: string): Promise<Award[]> {
  try {
    const section = await getSection('awards', locale);
    if (section.items && section.items.length > 0) {
      return section.items.map((item, index) => normalizeAward(item, index));
    }
  } catch {
    // If the database is unreachable or table not seeded, fall back gracefully to static seed data.
  }
  return AWARDS.map((item, index) => normalizeAward(item, index));
}

/**
 * Retrieves a single award by its slug identifier.
 * @param slug The award slug.
 * @param locale The active language code.
 * @returns Promise resolving to the matching award or null.
 */
export async function getAwardBySlug(slug: string, locale: string): Promise<Award | null> {
  const decoded = decodeAwardSlug(slug);
  const awards = await listAwards(locale);
  return awards.find((award) => award.slug === decoded) ?? null;
}

/**
 * Returns all unique award slugs across the default locale for static params & sitemap generation.
 * @returns Promise resolving to an array of slug strings.
 */
export async function listAwardSlugs(): Promise<string[]> {
  const awards = await listAwards('en');
  const seen = new Set<string>();
  const slugs: string[] = [];

  for (const award of awards) {
    if (award.slug && !seen.has(award.slug)) {
      seen.add(award.slug);
      slugs.push(award.slug);
    }
  }

  return slugs;
}

import type { Award } from '@/components/sections/awards/data';
import type { AwardItem, SectionItem } from '@/libs/cms/Sections';

/**
 * Derives a kebab-case slug from an award title or name.
 * Keeps Unicode letters (e.g. Bangla) so non-Latin names produce usable slugs.
 * @param title The award name.
 * @returns A lowercase, hyphen-separated slug.
 */
export function slugifyAward(title: string): string {
  return title
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{M}\p{N}\s-]/gu, '')
    .trim()
    .replaceAll(/[\s-]+/gu, '-');
}

/**
 * Decodes a percent-encoded slug route param.
 * @param slug The raw route param.
 * @returns The decoded slug string.
 */
export function decodeAwardSlug(slug: string): string {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
}

function cleanStr(val: string | undefined): string {
  return typeof val === 'string' ? val.trim() : '';
}

/**
 * Normalizes a raw CMS section item into a complete Award record with guaranteed fallback defaults.
 * Safe for use in client components (no Node/MongoDB dependencies).
 * @param item The raw section item.
 * @param index Ordinal index within the items array.
 * @returns A normalized Award object.
 */
export function normalizeAward(item: AwardItem | SectionItem, index = 0): Award {
  const rawName = cleanStr(item.name);
  const name = rawName ? rawName : `Award ${index + 1}`;
  const rawSlug = cleanStr(item.slug);
  const slug = rawSlug ? rawSlug : slugifyAward(name);
  const rawLogo = cleanStr(item.logo);
  const logo = rawLogo ? rawLogo : '/awards/icon.png';
  const rawCover = cleanStr(item.coverImage);
  const coverImage = rawCover ? rawCover : logo;
  const caption = cleanStr(item.caption);
  const rawDesc = cleanStr(item.description);
  const description = rawDesc ? rawDesc : caption;
  const rawCoverAlt = cleanStr(item.coverImageAlt);
  const coverImageAlt = rawCoverAlt ? rawCoverAlt : name;

  return {
    name,
    caption,
    logo,
    slug,
    coverImage,
    coverImageAlt,
    organization: cleanStr(item.organization),
    year: cleanStr(item.year),
    category: cleanStr(item.category),
    description,
    externalUrl: cleanStr(item.externalUrl),
  };
}

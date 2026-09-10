import type { Collection } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import { routing } from '@/libs/I18nRouting';
import type { SeoOverrideUpdateInput } from '@/validations/Seo';
import type { SeoOverride } from './types';

/** Stored SEO overrides for one page, keyed by locale. */
export type SeoOverrideDoc = {
  /** Normalized canonical path; `/` for the home page. */
  path: string;
  byLocale: Record<string, SeoOverride>;
  updatedAt: Date;
  updatedBy?: string;
};

const collection = (): Collection<SeoOverrideDoc> =>
  getDb().collection<SeoOverrideDoc>(COLLECTIONS.seoOverride);

const projection = { _id: 0, path: 1, byLocale: 1 } as const;

// Treats the home page ('') and '/' as the same stored path.
const normalizeSeoPath = (path: string): string => (path === '' ? '/' : path);

// Drops blank strings and empty arrays so an emptied field falls back to the
// i18n default instead of overriding it with nothing.
const stripEmpty = (override: Omit<SeoOverrideUpdateInput, 'locale'>): SeoOverride => {
  const result: SeoOverride = {};
  if (override.title?.trim()) {
    result.title = override.title.trim();
  }
  if (override.description?.trim()) {
    result.description = override.description.trim();
  }
  if (override.keywords && override.keywords.length > 0) {
    result.keywords = override.keywords;
  }
  if (override.canonicalPath?.trim()) {
    result.canonicalPath = override.canonicalPath.trim();
  }
  if (override.ogImage?.trim()) {
    result.ogImage = override.ogImage.trim();
  }
  if (override.robots) {
    result.robots = override.robots;
  }
  return result;
};

const fetchDoc = async (path: string): Promise<SeoOverrideDoc | null> =>
  await collection().findOne({ path: normalizeSeoPath(path) }, { projection });

// Resolves the stored override for a page/locale, or `{}` when none exists.
export const getStoredSeoOverride = async (args: {
  path: string;
  locale: string;
}): Promise<SeoOverride> => {
  const doc = await fetchDoc(args.path);
  return doc?.byLocale?.[args.locale] ?? {};
};

/** Admin editor view: the current override for every locale (blank when unset). */
export type AdminSeoOverride = {
  path: string;
  byLocale: Record<string, SeoOverride>;
};

export const getAdminSeoOverride = async (path: string): Promise<AdminSeoOverride> => {
  const doc = await fetchDoc(path);
  const byLocale = Object.fromEntries(
    routing.locales.map((locale) => [locale, doc?.byLocale?.[locale] ?? {}]),
  );
  return { path: normalizeSeoPath(path), byLocale };
};

/**
 * Upserts the override for one locale of a page and revalidates the cached
 * marketing routes so the new metadata is served immediately.
 * @param path The page's application-relative path.
 * @param input Validated editor payload (the locale plus its override fields).
 * @param userId The acting admin's id, stored for audit.
 */
export const updateSeoOverride = async (
  path: string,
  input: SeoOverrideUpdateInput,
  userId: string,
): Promise<void> => {
  const { locale, ...override } = input;
  const normalized = normalizeSeoPath(path);

  await collection().updateOne(
    { path: normalized },
    {
      $set: {
        [`byLocale.${locale}`]: stripEmpty(override),
        updatedAt: new Date(),
        updatedBy: userId,
      },
      $setOnInsert: { path: normalized },
    },
    { upsert: true },
  );

  revalidatePath('/', 'layout');
};

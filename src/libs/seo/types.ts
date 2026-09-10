import type { MetadataRoute } from 'next';

/** Indexing directives for a page. */
export type SeoRobots = {
  index: boolean;
  follow: boolean;
};

/**
 * Admin-owned SEO overrides for a single page/locale. The static source returns
 * an empty object (i18n defaults win); a future DB/admin source returns the
 * fields an editor has customized. This is the single seam the admin portal
 * backs — pages and `buildPageMetadata` never change.
 */
export type SeoOverride = {
  title?: string;
  description?: string;
  keywords?: string[];
  /** Application-relative canonical path override. */
  canonicalPath?: string;
  /** Absolute or relative Open Graph image URL override. */
  ogImage?: string;
  robots?: Partial<SeoRobots>;
};

/** Inputs a page passes to compose its metadata. */
export type BuildPageMetadataArgs = {
  /** Application-relative path without locale prefix, e.g. `/about`. */
  path: string;
  locale: string;
  /** Default title resolved from i18n; an admin override takes precedence. */
  title: string;
  /** Default description resolved from i18n; an admin override takes precedence. */
  description: string;
  keywords?: string[];
  /** Per-page robots override (e.g. auth pages set `index: false`). */
  robots?: Partial<SeoRobots>;
  /** Default Open Graph image; an admin override takes precedence. */
  ogImage?: string;
  /** Open Graph object type; article pages pass `article`. */
  ogType?: 'website' | 'article';
};

/** A route that should appear in the sitemap. */
export type SeoRoute = {
  path: string;
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority?: number;
};

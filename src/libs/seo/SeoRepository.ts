import { listPublishedJobSlugs } from '@/libs/career/CareerRepository';
import { listPublishedSlugs } from '@/libs/media/BlogPostRepository';
import { listPublishedNewsPublicationSlugs } from '@/libs/news/NewsPublicationRepository';
import { listPublishedNewsSlugs } from '@/libs/news/NewsPostRepository';
import { getStoredSeoOverride } from './SeoOverrideRepository';
import type { SeoOverride, SeoRoute } from './types';

/** Number of portfolio detail pages. Keep in sync with the portfolio listing. */
export const PORTFOLIO_COUNT = 6;

/**
 * Source of admin-owned SEO data.
 *
 * This interface is the single seam an admin portal will later own: swap the
 * exported {@link seoRepository} for a DB/API-backed implementation and every
 * page, the sitemap, OG route and JSON-LD keep working unchanged. Pages resolve
 * their default copy from i18n; `getOverride` lets an editor override any field.
 */
export type SeoRepository = {
  getOverride: (args: { path: string; locale: string }) => SeoOverride | Promise<SeoOverride>;
  listRoutes: () => SeoRoute[] | Promise<SeoRoute[]>;
};

/**
 * Active SEO data source: per-page overrides come from the admin DB
 * ({@link getStoredSeoOverride}); the route list for the sitemap is static.
 * Pages resolve their default copy from i18n and call `getOverride` to let an
 * admin override any field.
 */
export const seoRepository: SeoRepository = {
  async getOverride(args) {
    return await getStoredSeoOverride(args);
  },

  async listRoutes() {
    const staticRoutes: SeoRoute[] = [
      { path: '', changeFrequency: 'weekly', priority: 1 },
      { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
      { path: '/business', changeFrequency: 'monthly', priority: 0.7 },
      { path: '/business/commerce', changeFrequency: 'monthly', priority: 0.7 },
      { path: '/business/distribution', changeFrequency: 'monthly', priority: 0.7 },
      { path: '/business/retail-finance', changeFrequency: 'monthly', priority: 0.7 },
      { path: '/business/dipty', changeFrequency: 'monthly', priority: 0.7 },
      { path: '/impact', changeFrequency: 'monthly', priority: 0.7 },
      { path: '/opportunity', changeFrequency: 'monthly', priority: 0.7 },
      { path: '/media', changeFrequency: 'weekly', priority: 0.8 },
      { path: '/news', changeFrequency: 'weekly', priority: 0.8 },
      { path: '/career', changeFrequency: 'weekly', priority: 0.8 },
      { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
      { path: '/portfolio', changeFrequency: 'weekly', priority: 0.8 },
    ];

    const portfolioRoutes: SeoRoute[] = Array.from({ length: PORTFOLIO_COUNT }, (_, i) => ({
      path: `/portfolio/${i}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    const publishedSlugs = await listPublishedSlugs();
    const blogRoutes: SeoRoute[] = publishedSlugs.map(({ slug }) => ({
      path: `/media/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    const publishedNewsSlugs = await listPublishedNewsSlugs();
    const newsRoutes: SeoRoute[] = publishedNewsSlugs.map(({ slug }) => ({
      path: `/news/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    const publishedNewsPublicationSlugs = await listPublishedNewsPublicationSlugs();
    const newsPublicationRoutes: SeoRoute[] = publishedNewsPublicationSlugs.map(({ slug }) => ({
      path: `/news/publications/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    const publishedJobSlugs = await listPublishedJobSlugs();
    const careerRoutes: SeoRoute[] = publishedJobSlugs.map(({ slug }) => ({
      path: `/career/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [
      ...staticRoutes,
      ...portfolioRoutes,
      ...blogRoutes,
      ...newsRoutes,
      ...newsPublicationRoutes,
      ...careerRoutes,
    ];
  },
};

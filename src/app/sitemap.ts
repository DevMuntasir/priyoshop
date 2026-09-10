import type { MetadataRoute } from 'next';
import { routing } from '@/libs/I18nRouting';
import { seoRepository } from '@/libs/seo/SeoRepository';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const routes = await seoRepository.listRoutes();

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales
          .filter((locale) => locale !== routing.defaultLocale)
          .map((locale) => [locale, `${baseUrl}${getI18nPath(route.path, locale)}`]),
      ),
    },
  }));
}

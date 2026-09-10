import type { Metadata } from 'next';
import { routing } from '@/libs/I18nRouting';
import { seoRepository } from '@/libs/seo/SeoRepository';
import type { BuildPageMetadataArgs } from '@/libs/seo/types';
import { AppConfig } from '@/utils/AppConfig';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

/**
 * Builds page metadata with SEO overrides from the repository.
 * @param args Metadata build arguments including path, locale, and default values.
 * @returns Promise resolving to Next.js Metadata object.
 */
export const buildPageMetadata = async (args: BuildPageMetadataArgs): Promise<Metadata> => {
  const override = await seoRepository.getOverride({ path: args.path, locale: args.locale });
  const baseUrl = getBaseUrl();

  const title = override.title ?? args.title;
  const description = override.description ?? args.description;
  const keywords = override.keywords ?? args.keywords;
  const canonicalPath = override.canonicalPath ?? args.path;
  const robots = { index: true, follow: true, ...args.robots, ...override.robots };

  const withPath = (locale: string) => getI18nPath(canonicalPath, locale) || '/';

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${baseUrl}${withPath(locale)}`]),
  );
  const canonicalUrl = `${baseUrl}${withPath(args.locale)}`;

  const isHome = canonicalPath === '' || canonicalPath === '/';
  const ogImage = override.ogImage ?? args.ogImage;

  return {
    title: isHome ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    robots: {
      index: robots.index,
      follow: robots.follow,
    },
    openGraph: {
      type: args.ogType ?? 'website',
      siteName: AppConfig.name,
      title,
      description,
      url: canonicalUrl,
      locale: args.locale,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(AppConfig.twitterHandle ? { site: `@${AppConfig.twitterHandle}` } : {}),
    },
  };
};

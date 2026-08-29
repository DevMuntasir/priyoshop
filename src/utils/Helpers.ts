import { Env } from '@/libs/Env';
import { routing } from '@/libs/I18nRouting';

/**
 * Gets the base URL for the application.
 * @returns The base URL string.
 */
export const getBaseUrl = () => {
  if (Env.NEXT_PUBLIC_APP_URL) {
    return Env.NEXT_PUBLIC_APP_URL;
  }

  return 'http://localhost:3000';
};

/**
 * Converts a URL path to include the locale prefix if not default locale.
 * @param url The base URL path.
 * @param locale The locale code.
 * @returns The localized path.
 */
export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

/**
 * Formats a post's ISO date for display, e.g. "03 Sep, 2025".
 * @param iso ISO date string.
 * @param locale Active locale identifier.
 * @returns The localized display date.
 */
export function formatPostDate(iso: string, locale: string): string {
  const date = new Date(iso);
  const intlLocale = locale === 'bn' ? 'bn-BD' : 'en-GB';
  const day = date.toLocaleDateString(intlLocale, { day: '2-digit' });
  const month = date.toLocaleDateString(intlLocale, { month: 'short' });
  const year = date.toLocaleDateString(intlLocale, { year: 'numeric' });
  return `${day} ${month}, ${year}`;
}

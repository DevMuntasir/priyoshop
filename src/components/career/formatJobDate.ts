/**
 * Formats a job's ISO date for display, e.g. "02 July 2026".
 * @param iso ISO date string.
 * @param locale Active locale identifier.
 * @returns The localized display date.
 */
export function formatJobDate(iso: string, locale: string): string {
  const date = new Date(iso);
  const intlLocale = locale === 'bn' ? 'bn-BD' : 'en-GB';
  return date.toLocaleDateString(intlLocale, { day: '2-digit', month: 'long', year: 'numeric' });
}

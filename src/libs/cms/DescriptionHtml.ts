import { sanitizeBlogHtml } from '@/libs/media/sanitizeBlogHtml';

/**
 * Converts plain descriptions to paragraphs and sanitizes editor HTML.
 * @param description The plain text or rich text description.
 * @returns Safe HTML for the editor and public rendering.
 */
export function toDescriptionHtml(description: string) {
  if (/<\/?[a-z][^>]*>/iu.test(description)) {
    return sanitizeBlogHtml(description);
  }

  const escaped = description
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

  return escaped ? `<p>${escaped.replaceAll(/\r?\n/gu, '<br>')}</p>` : '';
}

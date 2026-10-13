import { sanitizeBlogHtml } from '@/libs/media/sanitizeBlogHtml';

const escapeHtml = (text: string) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

/**
 * Preserves legacy step descriptions and sanitizes rich text for previews and rendering.
 * @param body The plain text or rich text description.
 * @returns Safe HTML with the description formatting preserved.
 */
export function toStepBodyHtml(body: string) {
  if (/<\/?[a-z][^>]*>/iu.test(body)) {
    return sanitizeBlogHtml(body);
  }

  const items = body
    .split(/\r?\n/u)
    .map((line) => line.trim().replace(/^(?:[-*•]|\d+[.)])\s*/u, ''))
    .filter(Boolean);

  if (items.length > 1) {
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }

  return body ? `<p>${escapeHtml(body)}</p>` : '';
}

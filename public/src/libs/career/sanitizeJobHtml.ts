import sanitizeHtml from 'sanitize-html';

/**
 * Sanitizes Tiptap-produced job description HTML before it is persisted. The
 * allowlist mirrors the editor's extensions (headings 2–3, marks, lists,
 * blockquote, links, images); everything else — scripts, event handlers,
 * styles — is stripped. Rendering trusts the stored HTML, so every write must
 * pass here.
 * @param html Raw HTML from the admin editor.
 * @returns Sanitized HTML safe to render with dangerouslySetInnerHTML.
 */
export function sanitizeJobHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ['h2', 'h3', 'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'ul', 'ol', 'li', 'blockquote', 'img'],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesAppliedToAttributes: ['href', 'src'],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  });
}

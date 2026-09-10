/*
 * Renders the stored article HTML. Safe to inject directly: the HTML was
 * sanitized with an allowlist when the admin saved it (sanitizeBlogHtml).
 */
export function ArticleBody(props: { html: string }) {
  return <div className="prose-blog" dangerouslySetInnerHTML={{ __html: props.html }} />;
}

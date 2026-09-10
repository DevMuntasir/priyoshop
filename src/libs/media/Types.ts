/** Per-locale editable fields of a blog post. English is mandatory; other locales fall back to it. */
export type BlogPostLocaleContent = {
  title: string;
  excerpt: string;
  /** Sanitized Tiptap HTML — cleaned on write, trusted on render. */
  contentHtml: string;
  /** SEO overrides; fall back to title/excerpt when empty. */
  metaTitle?: string;
  metaDescription?: string;
};

/** Blog post document stored in the `blog_post` collection. */
export type BlogPostDoc = {
  postId: string;
  slug: string;
  categories: string[];
  content: Record<string, BlogPostLocaleContent>;
  coverImage: string;
  coverImageAlt?: string;
  status: 'draft' | 'published';
  /** Appears in the /media featured hero carousel. */
  featured: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: string;
};

/** Locale-resolved card shape for public listings (no article body). */
export type BlogPostCard = {
  postId: string;
  slug: string;
  categories: string[];
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt?: string;
  featured: boolean;
  /** ISO string so it can cross the server → client boundary. */
  publishedAt: string;
};

/** Locale-resolved full post for the detail page. */
export type ResolvedBlogPost = BlogPostCard & {
  contentHtml: string;
  metaTitle?: string;
  metaDescription?: string;
  updatedAt: string;
};

/** Per-locale editable fields of a news post. English is mandatory; other locales fall back to it. */
export type NewsPostLocaleContent = {
  title: string;
  excerpt: string;
  /** Sanitized Tiptap HTML — cleaned on write, trusted on render. */
  contentHtml: string;
  /** SEO overrides; fall back to title/excerpt when empty. */
  metaTitle?: string;
  metaDescription?: string;
};

export type NewsPublicationDoc = {
  publicationId: string;
  slug: string;
  name: string;
  logo: string;
  logoAlt?: string;
  websiteUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: string;
};

export type NewsPublicationSummary = Pick<
  NewsPublicationDoc,
  'publicationId' | 'slug' | 'name' | 'logo' | 'logoAlt' | 'websiteUrl'
>;

/** News post document stored in the `news_post` collection. */
export type NewsPostDoc = {
  postId: string;
  slug: string;
  categories: string[];
  content: Record<string, NewsPostLocaleContent>;
  coverImage: string;
  coverImageAlt?: string;
  publicationId?: string;
  status: 'draft' | 'published';
  /** Appears in the /news featured spotlight. */
  featured: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: string;
};

export type NewsPostPublication = Pick<
  NewsPublicationSummary,
  'publicationId' | 'slug' | 'name' | 'logo' | 'logoAlt'
>;

/** Locale-resolved card shape for public listings (no article body). */
export type NewsPostCard = {
  postId: string;
  slug: string;
  categories: string[];
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt?: string;
  publication?: NewsPostPublication;
  featured: boolean;
  /** ISO string so it can cross the server → client boundary. */
  publishedAt: string;
};

/** Locale-resolved full post for the detail page. */
export type ResolvedNewsPost = NewsPostCard & {
  contentHtml: string;
  metaTitle?: string;
  metaDescription?: string;
  updatedAt: string;
};

import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import type { BlogPostCard, BlogPostDoc, BlogPostLocaleContent, ResolvedBlogPost } from './Types';

const collection = () => getDb().collection<BlogPostDoc>(COLLECTIONS.blogPost);

/**
 * Field-level locale resolution: locale values win, empty fields fall back to English.
 * @param doc The stored post document.
 * @param locale The requested locale.
 * @returns The resolved per-locale content.
 */
function resolveLocaleContent(doc: BlogPostDoc, locale: string): BlogPostLocaleContent {
  const en = doc.content.en ?? { title: '', excerpt: '', contentHtml: '' };
  const localized = doc.content[locale];
  if (!localized || locale === 'en') {
    return en;
  }
  return {
    title: localized.title || en.title,
    excerpt: localized.excerpt || en.excerpt,
    contentHtml: localized.contentHtml || en.contentHtml,
    metaTitle: localized.metaTitle || en.metaTitle,
    metaDescription: localized.metaDescription || en.metaDescription,
  };
}

function toCard(doc: BlogPostDoc, locale: string): BlogPostCard {
  const content = resolveLocaleContent(doc, locale);
  return {
    postId: doc.postId,
    slug: doc.slug,
    categories: doc.categories,
    title: content.title,
    excerpt: content.excerpt,
    coverImage: doc.coverImage,
    coverImageAlt: doc.coverImageAlt,
    featured: doc.featured,
    publishedAt: doc.publishedAt.toISOString(),
  };
}

/**
 * Fetches all posts for the admin listing, newest first.
 * @returns Every post document regardless of status.
 */
export async function listBlogPosts(): Promise<BlogPostDoc[]> {
  return await collection().find({}).sort({ publishedAt: -1 }).limit(200).toArray();
}

/**
 * Fetches a single post by id (any status) for the admin editor.
 * @param postId The post's id.
 * @returns The post document, or null when unknown.
 */
export async function getBlogPost(postId: string): Promise<BlogPostDoc | null> {
  return await collection().findOne({ postId }, { projection: { _id: 0 } });
}

/**
 * Published posts resolved for the public listing, newest first.
 * @param locale The requested locale.
 * @returns Locale-resolved cards without article bodies.
 */
export async function listPublishedPosts(locale: string): Promise<BlogPostCard[]> {
  const docs = await collection()
    .find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(200)
    .toArray();
  return docs.map((doc) => toCard(doc, locale));
}

/**
 * Published featured posts for the /media hero carousel.
 * @param locale The requested locale.
 * @param limit Maximum number of featured posts.
 * @returns Locale-resolved featured cards, newest first.
 */
export async function listFeaturedPosts(locale: string, limit = 5): Promise<BlogPostCard[]> {
  const docs = await collection()
    .find({ status: 'published', featured: true })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .toArray();
  return docs.map((doc) => toCard(doc, locale));
}

/**
 * A published post resolved for the detail page.
 * @param slug The post's slug.
 * @param locale The requested locale.
 * @returns The resolved post, or null for drafts/unknown slugs.
 */
export async function getPublishedPostBySlug(
  slug: string,
  locale: string,
): Promise<ResolvedBlogPost | null> {
  const doc = await collection().findOne({ slug, status: 'published' });
  if (!doc) {
    return null;
  }
  const content = resolveLocaleContent(doc, locale);
  return {
    ...toCard(doc, locale),
    contentHtml: content.contentHtml,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    updatedAt: doc.updatedAt.toISOString(),
  };
}

/**
 * Published posts sharing a category with the given post; falls back to latest posts.
 * @param args The current post's slug and categories, the locale and an optional limit.
 * @returns Locale-resolved related cards.
 */
export async function listSimilarPosts(args: {
  slug: string;
  categories: string[];
  locale: string;
  limit?: number;
}): Promise<BlogPostCard[]> {
  const limit = args.limit ?? 6;
  const related = args.categories.length > 0
    ? await collection()
        .find({ status: 'published', slug: { $ne: args.slug }, categories: { $in: args.categories } })
        .sort({ publishedAt: -1 })
        .limit(limit)
        .toArray()
    : [];

  if (related.length < limit) {
    const seen = new Set(related.map((doc) => doc.slug));
    const latest = await collection()
      .find({ status: 'published', slug: { $ne: args.slug } })
      .sort({ publishedAt: -1 })
      .limit(limit + seen.size)
      .toArray();
    for (const doc of latest) {
      if (related.length >= limit) {
        break;
      }
      if (!seen.has(doc.slug)) {
        seen.add(doc.slug);
        related.push(doc);
      }
    }
  }

  return related.map((doc) => toCard(doc, args.locale));
}

/**
 * Published slugs with their last update, for the sitemap.
 * @returns The slug and updatedAt of every published post, newest first.
 */
export async function listPublishedSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  const docs = await collection()
    .find({ status: 'published' }, { projection: { _id: 0, slug: 1, updatedAt: 1 } })
    .sort({ publishedAt: -1 })
    .toArray();
  return docs.map((doc) => ({ slug: doc.slug, updatedAt: doc.updatedAt }));
}

/**
 * Creates a draft post skeleton from a title and slug.
 * @param input The English title and the post's slug.
 * @param userId The creating admin's user id.
 * @returns The created post document.
 * @throws Error when the insert is not acknowledged.
 */
export async function createBlogPost(
  input: { title: string; slug: string },
  userId: string,
): Promise<BlogPostDoc> {
  const now = new Date();
  const doc: BlogPostDoc = {
    postId: new ObjectId().toHexString(),
    slug: input.slug,
    categories: [],
    content: { en: { title: input.title, excerpt: '', contentHtml: '' } },
    coverImage: '',
    status: 'draft',
    featured: false,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    updatedBy: userId,
  };

  const result = await collection().insertOne(doc);
  if (!result.insertedId) {
    throw new Error('Failed to create post');
  }

  revalidatePath('/', 'layout');
  return doc;
}

/**
 * Updates a post's fields.
 * @param postId The post's id.
 * @param updates The fields to set.
 * @param userId The editing admin's user id.
 * @returns The updated post document, or null when unknown.
 */
export async function updateBlogPost(
  postId: string,
  updates: Partial<
    Pick<
      BlogPostDoc,
      'slug' | 'categories' | 'content' | 'coverImage' | 'coverImageAlt' | 'status' | 'featured' | 'publishedAt'
    >
  >,
  userId: string,
): Promise<BlogPostDoc | null> {
  const result = await collection().findOneAndUpdate(
    { postId },
    { $set: { ...updates, updatedAt: new Date(), updatedBy: userId } },
    { returnDocument: 'after' },
  );

  revalidatePath('/', 'layout');
  return result ?? null;
}

/**
 * Deletes a post by id.
 * @param postId The post's id.
 * @returns True when a post was deleted.
 */
export async function deleteBlogPost(postId: string): Promise<boolean> {
  const result = await collection().deleteOne({ postId });
  revalidatePath('/', 'layout');
  return result.deletedCount > 0;
}

/**
 * Checks whether a slug is already used by another post.
 * @param slug The slug to check.
 * @param excludePostId A post id to ignore (the post being edited).
 * @returns True when another post already uses the slug.
 */
export async function isBlogSlugTaken(slug: string, excludePostId?: string): Promise<boolean> {
  const query: Record<string, unknown> = { slug };
  if (excludePostId) {
    query.postId = { $ne: excludePostId };
  }
  const count = await collection().countDocuments(query);
  return count > 0;
}

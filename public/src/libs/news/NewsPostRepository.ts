import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import {
  getNewsPublicationBySlug,
  getNewsPublicationSummariesByIds,
  listPublicationsWithPublishedNews,
  toNewsPostPublication,
} from './NewsPublicationRepository';
import type {
  NewsPostCard,
  NewsPostDoc,
  NewsPostLocaleContent,
  NewsPublicationSummary,
  ResolvedNewsPost,
} from './Types';

const collection = () => getDb().collection<NewsPostDoc>(COLLECTIONS.newsPost);

/**
 * Field-level locale resolution: locale values win, empty fields fall back to English.
 * @param doc The stored post document.
 * @param locale The requested locale.
 * @returns The resolved per-locale content.
 */
function resolveLocaleContent(doc: NewsPostDoc, locale: string): NewsPostLocaleContent {
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

function toCard(
  doc: NewsPostDoc,
  locale: string,
  publication?: ReturnType<typeof toNewsPostPublication>,
): NewsPostCard {
  const content = resolveLocaleContent(doc, locale);
  return {
    postId: doc.postId,
    slug: doc.slug,
    categories: doc.categories,
    title: content.title,
    excerpt: content.excerpt,
    coverImage: doc.coverImage,
    coverImageAlt: doc.coverImageAlt,
    publication,
    featured: doc.featured,
    publishedAt: doc.publishedAt.toISOString(),
  };
}

async function getPublicationMapForPosts(posts: NewsPostDoc[]) {
  const publicationIds = posts
    .map((post) => post.publicationId)
    .filter((publicationId): publicationId is string => Boolean(publicationId));
  const publicationSummaries = await getNewsPublicationSummariesByIds(publicationIds);

  return new Map(
    [...publicationSummaries.entries()].map(([publicationId, publication]) => [
      publicationId,
      toNewsPostPublication(publication),
    ]),
  );
}

/**
 * Fetches all posts for the admin listing, newest first.
 * @returns Every post document regardless of status.
 */
export async function listNewsPosts(): Promise<NewsPostDoc[]> {
  return await collection().find({}).sort({ publishedAt: -1 }).limit(200).toArray();
}

/**
 * Fetches a single post by id (any status) for the admin editor.
 * @param postId The post's id.
 * @returns The post document, or null when unknown.
 */
export async function getNewsPost(postId: string): Promise<NewsPostDoc | null> {
  return await collection().findOne({ postId }, { projection: { _id: 0 } });
}

/**
 * Published posts resolved for the public listing, newest first.
 * @param locale The requested locale.
 * @returns Locale-resolved cards without article bodies.
 */
export async function listPublishedNewsPosts(locale: string): Promise<NewsPostCard[]> {
  const docs = await collection()
    .find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(200)
    .toArray();
  const publicationMap = await getPublicationMapForPosts(docs);
  return docs.map((doc) => toCard(doc, locale, doc.publicationId ? publicationMap.get(doc.publicationId) : undefined));
}

/**
 * Published featured posts for the /news hero spotlight.
 * @param locale The requested locale.
 * @param limit Maximum number of featured posts.
 * @returns Locale-resolved featured cards, newest first.
 */
export async function listFeaturedNewsPosts(locale: string, limit = 5): Promise<NewsPostCard[]> {
  const docs = await collection()
    .find({ status: 'published', featured: true })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .toArray();
  const publicationMap = await getPublicationMapForPosts(docs);
  return docs.map((doc) => toCard(doc, locale, doc.publicationId ? publicationMap.get(doc.publicationId) : undefined));
}

/**
 * A published post resolved for the detail page.
 * @param slug The post's slug.
 * @param locale The requested locale.
 * @returns The resolved post, or null for drafts/unknown slugs.
 */
export async function getPublishedNewsPostBySlug(
  slug: string,
  locale: string,
): Promise<ResolvedNewsPost | null> {
  const doc = await collection().findOne({ slug, status: 'published' });
  if (!doc) {
    return null;
  }
  const content = resolveLocaleContent(doc, locale);
  const publicationMap = await getPublicationMapForPosts([doc]);
  return {
    ...toCard(doc, locale, doc.publicationId ? publicationMap.get(doc.publicationId) : undefined),
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
export async function listSimilarNewsPosts(args: {
  slug: string;
  categories: string[];
  locale: string;
  limit?: number;
}): Promise<NewsPostCard[]> {
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

  const publicationMap = await getPublicationMapForPosts(related);
  return related.map((doc) =>
    toCard(doc, args.locale, doc.publicationId ? publicationMap.get(doc.publicationId) : undefined),
  );
}

/**
 * Lists published news posts for a publication slug.
 * @param args The requested locale and publication slug.
 * @returns The matched publication with its published posts, or null.
 */
export async function getPublishedNewsByPublicationSlug(args: {
  locale: string;
  slug: string;
}): Promise<{
  publication: NewsPublicationSummary;
  posts: NewsPostCard[];
} | null> {
  const publication = await getNewsPublicationBySlug(args.slug);
  if (!publication) {
    return null;
  }

  const docs = await collection()
    .find({ status: 'published', publicationId: publication.publicationId })
    .sort({ publishedAt: -1 })
    .limit(200)
    .toArray();

  if (docs.length === 0) {
    return null;
  }

  const postPublication = toNewsPostPublication(publication);
  return {
    publication,
    posts: docs.map((doc) => toCard(doc, args.locale, postPublication)),
  };
}

/**
 * Lists publications that have at least one published news post.
 * @returns Public publication summaries for the /news marquee.
 */
export async function listPublishedNewsPublications() {
  return await listPublicationsWithPublishedNews();
}

/**
 * Published slugs with their last update, for the sitemap.
 * @returns The slug and updatedAt of every published post, newest first.
 */
export async function listPublishedNewsSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
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
export async function createNewsPost(
  input: { title: string; slug: string },
  userId: string,
): Promise<NewsPostDoc> {
  const now = new Date();
  const doc: NewsPostDoc = {
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
export async function updateNewsPost(
  postId: string,
  updates: Partial<
    Pick<
      NewsPostDoc,
      | 'slug'
      | 'categories'
      | 'content'
      | 'coverImage'
      | 'coverImageAlt'
      | 'status'
      | 'featured'
      | 'publishedAt'
    >
  > & { publicationId?: string | null },
  userId: string,
): Promise<NewsPostDoc | null> {
  const { publicationId, ...rest } = updates;
  const setUpdates: Record<string, unknown> = {
    ...rest,
    updatedAt: new Date(),
    updatedBy: userId,
  };
  const unsetUpdates: Record<string, ''> = {};

  if (publicationId !== undefined) {
    if (publicationId) {
      setUpdates.publicationId = publicationId;
    } else {
      unsetUpdates.publicationId = '';
    }
  }

  const result = await collection().findOneAndUpdate(
    { postId },
    {
      $set: setUpdates,
      ...(Object.keys(unsetUpdates).length > 0 ? { $unset: unsetUpdates } : {}),
    },
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
export async function deleteNewsPost(postId: string): Promise<boolean> {
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
export async function isNewsSlugTaken(slug: string, excludePostId?: string): Promise<boolean> {
  const query: Record<string, unknown> = { slug };
  if (excludePostId) {
    query.postId = { $ne: excludePostId };
  }
  const count = await collection().countDocuments(query);
  return count > 0;
}

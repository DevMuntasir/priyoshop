import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import type {
  NewsPostDoc,
  NewsPostPublication,
  NewsPublicationDoc,
  NewsPublicationSummary,
} from './Types';

const collection = () => getDb().collection<NewsPublicationDoc>(COLLECTIONS.newsPublication);
const newsPostCollection = () => getDb().collection<NewsPostDoc>(COLLECTIONS.newsPost);

function toSummary(doc: NewsPublicationDoc): NewsPublicationSummary {
  return {
    publicationId: doc.publicationId,
    slug: doc.slug,
    name: doc.name,
    logo: doc.logo,
    logoAlt: doc.logoAlt,
    websiteUrl: doc.websiteUrl,
  };
}

export function toNewsPostPublication(doc: NewsPublicationDoc | NewsPublicationSummary): NewsPostPublication {
  return {
    publicationId: doc.publicationId,
    slug: doc.slug,
    name: doc.name,
    logo: doc.logo,
    logoAlt: doc.logoAlt,
  };
}

/**
 * Lists every publication for the admin UI.
 * @returns All publications sorted by name.
 */
export async function listNewsPublications(): Promise<NewsPublicationDoc[]> {
  return await collection().find({}).sort({ name: 1 }).limit(500).toArray();
}

/**
 * Lists admin/publication summaries for a set of ids.
 * @param publicationIds The ids to resolve.
 * @returns A map keyed by publication id.
 */
export async function getNewsPublicationSummariesByIds(
  publicationIds: string[],
): Promise<Map<string, NewsPublicationSummary>> {
  if (publicationIds.length === 0) {
    return new Map();
  }

  const docs = await collection()
    .find({ publicationId: { $in: [...new Set(publicationIds)] } })
    .toArray();

  return new Map(docs.map((doc) => [doc.publicationId, toSummary(doc)]));
}

/**
 * Fetches a publication by id for the admin editor.
 * @param publicationId The publication id.
 * @returns The stored publication, or null.
 */
export async function getNewsPublication(publicationId: string): Promise<NewsPublicationDoc | null> {
  return await collection().findOne({ publicationId }, { projection: { _id: 0 } });
}

/**
 * Fetches a publication by slug for public routes.
 * @param slug The publication slug.
 * @returns The public summary, or null.
 */
export async function getNewsPublicationBySlug(slug: string): Promise<NewsPublicationSummary | null> {
  const doc = await collection().findOne({ slug }, { projection: { _id: 0 } });
  return doc ? toSummary(doc) : null;
}

/**
 * Checks whether a publication slug is already used by another publication.
 * @param slug The slug to check.
 * @param excludePublicationId A publication id to ignore.
 * @returns True when the slug is already taken.
 */
export async function isNewsPublicationSlugTaken(
  slug: string,
  excludePublicationId?: string,
): Promise<boolean> {
  const query: Record<string, unknown> = { slug };
  if (excludePublicationId) {
    query.publicationId = { $ne: excludePublicationId };
  }
  return (await collection().countDocuments(query)) > 0;
}

/**
 * Lists publications that currently have at least one published news post.
 * @returns Public summaries sorted by name.
 */
export async function listPublicationsWithPublishedNews(): Promise<NewsPublicationSummary[]> {
  const publicationIds = (
    await newsPostCollection().distinct('publicationId', {
      status: 'published',
      publicationId: { $exists: true, $ne: '' },
    })
  ).filter((publicationId): publicationId is string => Boolean(publicationId));

  if (publicationIds.length === 0) {
    return [];
  }

  const docs = await collection()
    .find({ publicationId: { $in: publicationIds } })
    .sort({ name: 1 })
    .toArray();

  return docs.map(toSummary);
}

/**
 * Lists the publication slugs that have at least one published news post.
 * @returns Publication slugs for sitemap/static params.
 */
export async function listPublishedNewsPublicationSlugs(): Promise<{ slug: string }[]> {
  const publications = await listPublicationsWithPublishedNews();
  return publications.map((publication) => ({ slug: publication.slug }));
}

/**
 * Creates a publication.
 * @param input The new publication fields.
 * @param userId The acting admin.
 * @returns The created publication.
 */
export async function createNewsPublication(
  input: Pick<NewsPublicationSummary, 'name' | 'slug' | 'logo' | 'logoAlt' | 'websiteUrl'>,
  userId: string,
): Promise<NewsPublicationDoc> {
  const now = new Date();
  const doc: NewsPublicationDoc = {
    publicationId: new ObjectId().toHexString(),
    name: input.name,
    slug: input.slug,
    logo: input.logo,
    logoAlt: input.logoAlt,
    websiteUrl: input.websiteUrl || undefined,
    createdAt: now,
    updatedAt: now,
    updatedBy: userId,
  };

  const result = await collection().insertOne(doc);
  if (!result.insertedId) {
    throw new Error('Failed to create publication');
  }

  revalidatePath('/', 'layout');
  return doc;
}

/**
 * Updates a publication.
 * @param publicationId The publication id.
 * @param updates The changed fields.
 * @param userId The acting admin.
 * @returns The updated publication, or null.
 */
export async function updateNewsPublication(
  publicationId: string,
  updates: Partial<Pick<NewsPublicationDoc, 'name' | 'slug' | 'logo' | 'logoAlt' | 'websiteUrl'>>,
  userId: string,
): Promise<NewsPublicationDoc | null> {
  const result = await collection().findOneAndUpdate(
    { publicationId },
    {
      $set: {
        ...updates,
        websiteUrl: updates.websiteUrl || undefined,
        updatedAt: new Date(),
        updatedBy: userId,
      },
    },
    { returnDocument: 'after' },
  );

  revalidatePath('/', 'layout');
  return result ?? null;
}

/**
 * Deletes a publication and clears it from linked news posts.
 * @param publicationId The publication id.
 * @returns True when a publication was deleted.
 */
export async function deleteNewsPublication(publicationId: string): Promise<boolean> {
  const result = await collection().deleteOne({ publicationId });
  if (result.deletedCount === 0) {
    return false;
  }

  await newsPostCollection().updateMany({ publicationId }, { $unset: { publicationId: '' } });
  revalidatePath('/', 'layout');
  return true;
}

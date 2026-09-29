import { ObjectId } from 'mongodb';
import { getDb, COLLECTIONS } from '@/libs/db/Mongodb';
import type { BuilderPageDoc } from './Types';

/**
 * Fetches all builder pages (paginated).
 */
export async function listBuilderPages(skip = 0, limit = 50): Promise<BuilderPageDoc[]> {
  const collection = getDb().collection<BuilderPageDoc>(COLLECTIONS.builderPage);
  return collection
    .find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
}

/**
 * Fetches a single page by ID.
 */
export async function getBuilderPage(pageId: string): Promise<BuilderPageDoc | null> {
  const collection = getDb().collection<BuilderPageDoc>(COLLECTIONS.builderPage);
  return collection.findOne({ pageId });
}

/**
 * Fetches a page by slug (published or draft).
 */
export async function getBuilderPageBySlug(slug: string): Promise<BuilderPageDoc | null> {
  const collection = getDb().collection<BuilderPageDoc>(COLLECTIONS.builderPage);
  return collection.findOne({ slug });
}

/**
 * Creates a new builder page.
 */
export async function createBuilderPage(
  slug: string,
  title: string,
  userId: string
): Promise<BuilderPageDoc> {
  const collection = getDb().collection<BuilderPageDoc>(COLLECTIONS.builderPage);

  const now = new Date();
  const doc: BuilderPageDoc = {
    pageId: new ObjectId().toHexString(),
    slug,
    title,
    status: 'draft',
    blocks: [],
    seo: { metaTitle: title, metaDescription: '' },
    createdAt: now,
    updatedAt: now,
    updatedBy: userId,
  };

  const result = await collection.insertOne(doc);
  if (!result.insertedId) {
    throw new Error('Failed to create page');
  }

  return doc;
}

/**
 * Updates a page's blocks and metadata.
 */
export async function updateBuilderPage(
  pageId: string,
  updates: Partial<Pick<BuilderPageDoc, 'title' | 'slug' | 'blocks' | 'seo'>>,
  userId: string
): Promise<BuilderPageDoc | null> {
  const collection = getDb().collection<BuilderPageDoc>(COLLECTIONS.builderPage);

  const result = await collection.findOneAndUpdate(
    { pageId },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
        updatedBy: userId,
      },
    },
    { returnDocument: 'after' }
  );

  return result ?? null;
}

/**
 * Publishes a page (sets status to published).
 */
export async function publishBuilderPage(pageId: string, userId: string): Promise<BuilderPageDoc | null> {
  const collection = getDb().collection<BuilderPageDoc>(COLLECTIONS.builderPage);

  const result = await collection.findOneAndUpdate(
    { pageId },
    {
      $set: {
        status: 'published',
        updatedAt: new Date(),
        updatedBy: userId,
      },
    },
    { returnDocument: 'after' }
  );

  return result ?? null;
}

/**
 * Unpublishes a page (sets status to draft).
 */
export async function unpublishBuilderPage(pageId: string, userId: string): Promise<BuilderPageDoc | null> {
  const collection = getDb().collection<BuilderPageDoc>(COLLECTIONS.builderPage);

  const result = await collection.findOneAndUpdate(
    { pageId },
    {
      $set: {
        status: 'draft',
        updatedAt: new Date(),
        updatedBy: userId,
      },
    },
    { returnDocument: 'after' }
  );

  return result ?? null;
}

/**
 * Deletes a page by ID.
 */
export async function deleteBuilderPage(pageId: string): Promise<boolean> {
  const collection = getDb().collection<BuilderPageDoc>(COLLECTIONS.builderPage);
  const result = await collection.deleteOne({ pageId });
  return result.deletedCount > 0;
}

/**
 * Checks if a slug is already taken.
 */
export async function isSlugTaken(slug: string, excludePageId?: string): Promise<boolean> {
  const collection = getDb().collection<BuilderPageDoc>(COLLECTIONS.builderPage);
  const query: Record<string, any> = { slug };

  if (excludePageId) {
    query.pageId = { $ne: excludePageId };
  }

  const count = await collection.countDocuments(query);
  return count > 0;
}

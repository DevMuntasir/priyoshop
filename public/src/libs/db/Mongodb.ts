import type { Db, MongoClient as MongoClientType } from 'mongodb';
import { MongoClient } from 'mongodb';
import { Env } from '@/libs/Env';

// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
const globalForMongo = globalThis as { mongoClient?: MongoClientType | undefined };

const isTopologyClosed = (client: MongoClientType): boolean => {
  const top = (
    client as unknown as {
      topology?: {
        isClosed?: () => boolean;
        isDestroyed?: () => boolean;
        s?: { state?: string };
      };
    }
  ).topology;

  if (!top) {
    return false;
  }

  if (typeof top.isClosed === 'function') {
    return top.isClosed();
  }

  if (typeof top.isDestroyed === 'function') {
    return top.isDestroyed();
  }

  return top.s?.state === 'closed' || top.s?.state === 'closing';
};

/**
 * Retrieves the active MongoClient instance, creating a new connection if none exists or topology is closed.
 * @returns The active MongoClient.
 */
export const getMongoClient = (): MongoClientType => {
  const currentClient = globalForMongo.mongoClient;

  if (!currentClient || isTopologyClosed(currentClient)) {
    const newClient = new MongoClient(Env.MONGODB_URI);
    globalForMongo.mongoClient = newClient;
    return newClient;
  }
  return currentClient;
};

/**
 * Dynamic proxy to the active MongoClient instance to seamlessly support connection auto-recovery.
 */
export const mongoClient = new Proxy({} as MongoClientType, {
  get(_target, prop: string | symbol) {
    const client = getMongoClient();
    const value = Reflect.get(client, prop);
    if (typeof value === 'function') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value.bind(client);
    }
    return value;
  },
});

export const COLLECTIONS = {
  role: 'role',
  user: 'user',
  sectionContent: 'section_content',
  seoOverride: 'seo_override',
  builderPage: 'builder_page',
  navMenu: 'nav_menu',
  blogPost: 'blog_post',
  newsPost: 'news_post',
  newsPublication: 'news_publication',
  jobPosting: 'job_posting',
  contactSubmission: 'contact_submission',
  mediaAsset: 'media_asset',
} as const;

/**
 * Retrieves the active database instance.
 * @returns The active Db instance.
 */
export const getDb = (): Db => getMongoClient().db();

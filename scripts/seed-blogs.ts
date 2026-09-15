/**
 * Bulk seed script to import all converted blog posts into MongoDB.
 *
 * Run with: `npx tsx scripts/seed-blogs.ts`
 * Safe to re-run (idempotent upsert by slug).
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { ObjectId } from 'mongodb';

// Minimal .env loader so the standalone script works
const loadEnvFile = (envPath: string) => {
  if (!existsSync(envPath)) {
    return;
  }
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/u);
    if (!match) {
      continue;
    }
    const key = match[1] ?? '';
    if (!key) {
      continue;
    }
    const value = match[2] ?? '';
    process.env[key] ??= value.replaceAll(/^["']|["']$/gu, '');
  }
};

loadEnvFile('.env.local');
loadEnvFile('.env');

const run = async () => {
  const jsonPath = path.resolve('scripts/formatted_blogs.json');
  if (!existsSync(jsonPath)) {
    console.error('Error: scripts/formatted_blogs.json not found. Run scripts/convert-blogs.ts first.');
    process.exit(1);
  }

  const raw = readFileSync(jsonPath, 'utf-8');
  const posts = JSON.parse(raw);

  console.log(`Loaded ${posts.length} blog posts from scripts/formatted_blogs.json`);

  const { getDb, COLLECTIONS, mongoClient } = await import('@/libs/db/Mongodb');
  const db = getDb();
  const blogPosts = db.collection(COLLECTIONS.blogPost);

  // Ensure unique index on slug
  await blogPosts.createIndex({ slug: 1 }, { unique: true });
  await blogPosts.createIndex({ status: 1, publishedAt: -1 });
  await blogPosts.createIndex({ status: 1, featured: 1, publishedAt: -1 });

  let insertedCount = 0;
  let updatedCount = 0;

  for (const p of posts) {
    const existing = await blogPosts.findOne({ slug: p.slug });
    const postId = existing?.postId ?? new ObjectId().toHexString();
    const publishedAt = new Date(p.publishedAt);
    const now = new Date();

    const doc = {
      postId,
      slug: p.slug,
      categories: p.categories,
      content: {
        en: {
          title: p.title,
          excerpt: p.excerpt,
          contentHtml: p.contentHtml,
          metaTitle: p.metaTitle || undefined,
          metaDescription: p.metaDescription || undefined,
        },
      },
      coverImage: p.coverImage || '',
      coverImageAlt: p.coverImageAlt || p.title,
      status: p.status as 'draft' | 'published',
      featured: Boolean(p.featured),
      publishedAt,
      createdAt: existing?.createdAt ?? publishedAt,
      updatedAt: now,
      updatedBy: 'system-migration',
    };

    const res = await blogPosts.updateOne(
      { slug: p.slug },
      { $set: doc },
      { upsert: true }
    );

    if (res.upsertedCount > 0) {
      insertedCount++;
    } else {
      updatedCount++;
    }
  }

  console.log(`\n✅ Bulk Seed Completed!`);
  console.log(`- Inserted new: ${insertedCount}`);
  console.log(`- Updated existing: ${updatedCount}`);
  console.log(`- Total blogs in database: ${await blogPosts.countDocuments()}`);

  await mongoClient.close();
};

try {
  await run();
  process.exit(0);
} catch (error) {
  console.error('Migration failed:', error);
  process.exit(1);
}

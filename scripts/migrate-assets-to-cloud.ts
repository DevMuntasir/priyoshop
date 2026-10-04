import fs from 'node:fs/promises';
import path from 'node:path';
import { COLLECTIONS, getDb, getMongoClient } from '../src/libs/db/Mongodb';
import { getStorageAdapter } from '../src/libs/storage/StorageFactory';
import type { MediaAssetDoc } from '../src/libs/assets/Types';

const FOLDER_MAP: Record<string, string> = {
  hero: 'Hero',
  awards: 'Awards',
  backers: 'Brands',
  brands: 'Brands',
  blogs: 'Blogs',
  dipty: 'Dipty',
  distribution: 'Distribution',
  team: 'Team',
  career: 'Career',
  impact: 'Impact',
};

async function getFilesRecursively(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const res = path.resolve(dir, entry.name);
      return entry.isDirectory() ? getFilesRecursively(res) : res;
    }),
  );
  return files.flat();
}

async function migrate() {
  console.log('🚀 Starting Asset Migration to Cloud Storage...');

  const adapter = getStorageAdapter();
  console.log(`📦 Active Storage Provider: ${adapter.provider.toUpperCase()}`);

  const publicDir = path.join(process.cwd(), 'public');
  const allFiles = await getFilesRecursively(publicDir);

  // Filter media files only
  const validExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.mp4']);
  const mediaFiles = allFiles.filter((file) => validExtensions.has(path.extname(file).toLowerCase()));

  console.log(`🔍 Found ${mediaFiles.length} media files under public/ directory.`);

  const db = getDb();
  const assetCollection = db.collection<MediaAssetDoc>(COLLECTIONS.mediaAsset);
  const mapping: Record<string, string> = {};

  let successCount = 0;
  let skipCount = 0;

  for (let i = 0; i < mediaFiles.length; i++) {
    const filePath = mediaFiles[i];
    if (!filePath) continue;

    const relPath = path.relative(publicDir, filePath).replaceAll('\\', '/');
    const localUrl = `/${relPath}`;
    const filename = path.basename(filePath);
    const subfolder = relPath.split('/')[0] || 'general';
    const targetFolder = FOLDER_MAP[subfolder.toLowerCase()] || 'General';

    // Check if asset is already registered in DB
    const existing = await assetCollection.findOne({ filename });
    if (existing) {
      mapping[localUrl] = existing.secureUrl || existing.url;
      skipCount++;
      continue;
    }

    try {
      const buffer = await fs.readFile(filePath);
      const ext = path.extname(filePath).replace('.', '').toLowerCase();
      const mimeType = ext === 'mp4' ? 'video/mp4' : ext === 'svg' ? 'image/svg+xml' : `image/${ext}`;

      const stored = await adapter.upload(buffer, {
        filename,
        folder: targetFolder,
        mimeType,
        tags: [targetFolder.toLowerCase(), subfolder.toLowerCase()],
      });

      const now = new Date();
      const doc: MediaAssetDoc = {
        assetId: `ast_${crypto.randomUUID().replaceAll('-', '')}`,
        filename,
        title: filename.replace(/\.[^/.]+$/u, '').replaceAll(/[-_]/gu, ' '),
        alt: filename.replace(/\.[^/.]+$/u, '').replaceAll(/[-_]/gu, ' '),
        url: stored.url,
        secureUrl: stored.secureUrl,
        publicId: stored.providerKey,
        provider: stored.provider,
        mimeType,
        format: stored.format,
        sizeBytes: stored.sizeBytes,
        width: stored.width,
        height: stored.height,
        folder: targetFolder,
        tags: [targetFolder.toLowerCase(), subfolder.toLowerCase()],
        createdAt: now,
        updatedAt: now,
        createdBy: 'migration_script',
      };

      await assetCollection.insertOne(doc);
      mapping[localUrl] = stored.secureUrl || stored.url;
      successCount++;
      console.log(`[${i + 1}/${mediaFiles.length}] Uploaded: ${localUrl} -> ${stored.url}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${localUrl}:`, err);
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`✅ Uploaded: ${successCount}`);
  console.log(`⏭️ Skipped (already exists): ${skipCount}`);
  console.log(`📁 Total Mapped: ${Object.keys(mapping).length}`);

  // Update Database Collections if needed
  console.log('\n🔄 Updating local references in database collections...');
  const sectionCollection = db.collection(COLLECTIONS.sectionContent);
  const sections = await sectionCollection.find({}).toArray();

  for (const section of sections) {
    let sectionString = JSON.stringify(section);
    let modified = false;

    for (const [localUrl, cloudUrl] of Object.entries(mapping)) {
      if (sectionString.includes(localUrl)) {
        sectionString = sectionString.replaceAll(localUrl, cloudUrl);
        modified = true;
      }
    }

    if (modified) {
      const parsed = JSON.parse(sectionString);
      delete parsed._id;
      await sectionCollection.updateOne({ sectionKey: section.sectionKey }, { $set: parsed });
      console.log(`Updated section_content: ${section.sectionKey}`);
    }
  }

  console.log('\n🎉 Migration complete!');
  const client = getMongoClient();
  await client.close();
}

void migrate().catch((err) => {
  console.error('Fatal migration error:', err);
  process.exit(1);
});

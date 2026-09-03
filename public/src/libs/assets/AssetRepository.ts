import type { Filter } from 'mongodb';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import type { AssetFilterQuery, AssetFolderCount, AssetListResult, MediaAssetDoc } from './Types';
import { ASSET_FOLDERS } from './Types';

const collection = () => getDb().collection<MediaAssetDoc>(COLLECTIONS.mediaAsset);

/**
 * Lists media assets with search, folder filtering, media type filtering, and pagination.
 * Zero Cloudinary API calls are made here — all data comes from MongoDB.
 */
export async function listAssets(query: AssetFilterQuery = {}): Promise<AssetListResult> {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.max(1, Math.min(100, query.limit ?? 24));
  const skip = (page - 1) * limit;

  const filter: Filter<MediaAssetDoc> = {};

  if (query.folder && query.folder.toLowerCase() !== 'all') {
    filter.folder = { $regex: new RegExp(`^${query.folder}$`, 'iu') };
  }

  if (query.search?.trim()) {
    const term = query.search.trim();
    const regex = new RegExp(term, 'iu');
    filter.$or = [
      { filename: { $regex: regex } },
      { title: { $regex: regex } },
      { alt: { $regex: regex } },
      { tags: { $in: [regex] } },
    ];
  }

  if (query.type && query.type !== 'all') {
    if (query.type === 'video') {
      filter.mimeType = { $regex: /^video\//u };
    } else if (query.type === 'vector') {
      filter.$or = [{ format: 'svg' }, { filename: { $regex: /\.svg$/iu } }];
    } else if (query.type === 'image') {
      filter.mimeType = { $regex: /^image\//u };
      filter.format = { $ne: 'svg' };
    }
  }

  // Auto-correct any legacy SVG formats in DB
  void collection().updateMany(
    { filename: /\.svg$/iu, format: { $ne: 'svg' } },
    { $set: { format: 'svg', mimeType: 'image/svg+xml' } },
  );

  const [rawAssets, total, folderAgg, storageAgg] = await Promise.all([
    collection()
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    collection().countDocuments(filter),
    collection()
      .aggregate<{ _id: string; count: number }>([
        { $group: { _id: '$folder', count: { $sum: 1 } } },
      ])
      .toArray(),
    collection()
      .aggregate<{ _id: null; totalBytes: number }>([
        { $group: { _id: null, totalBytes: { $sum: '$sizeBytes' } } },
      ])
      .toArray(),
  ]);

  const assets = rawAssets.map((asset) => {
    const isSvg = asset.filename.toLowerCase().endsWith('.svg') || asset.format === 'svg';
    if (isSvg) {
      return { ...asset, format: 'svg', mimeType: 'image/svg+xml' };
    }
    return asset;
  });

  const folderCountMap = new Map<string, number>(
    folderAgg.map((item) => [item._id?.toLowerCase() || 'general', item.count]),
  );

  const folderCounts: AssetFolderCount[] = [
    { name: 'All', count: total },
    ...ASSET_FOLDERS.map((f) => ({
      name: f,
      count: folderCountMap.get(f.toLowerCase()) ?? 0,
    })),
  ];

  return {
    assets,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit) || 1,
    folderCounts,
    totalStorageBytes: storageAgg[0]?.totalBytes ?? 0,
  };
}

/**
 * Fetches a single asset by assetId.
 */
export async function getAssetById(assetId: string): Promise<MediaAssetDoc | null> {
  return await collection().findOne({ assetId });
}

/**
 * Creates a new media asset document in MongoDB.
 */
export async function createAsset(doc: MediaAssetDoc): Promise<MediaAssetDoc> {
  await collection().insertOne(doc);
  return doc;
}

/**
 * Updates metadata fields of an existing media asset.
 */
export async function updateAsset(
  assetId: string,
  patch: Partial<Pick<MediaAssetDoc, 'title' | 'alt' | 'folder' | 'tags'>>,
): Promise<MediaAssetDoc | null> {
  const result = await collection().findOneAndUpdate(
    { assetId },
    {
      $set: {
        ...patch,
        updatedAt: new Date(),
      },
    },
    { returnDocument: 'after' },
  );

  return result;
}

/**
 * Deletes an asset document from MongoDB.
 */
export async function deleteAsset(assetId: string): Promise<MediaAssetDoc | null> {
  const result = await collection().findOneAndDelete({ assetId });
  return result;
}

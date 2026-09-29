import { NextResponse } from 'next/server';
import { createAsset, listAssets } from '@/libs/assets/AssetRepository';
import type { AssetFolder, MediaAssetDoc } from '@/libs/assets/Types';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { getStorageAdapter } from '@/libs/storage/StorageFactory';

export async function GET(request: Request) {
  const guard = await requirePermission(PERMISSIONS.assetsRead);
  if (guard.error) {
    return guard.error;
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') ?? undefined;
  const folder = searchParams.get('folder') ?? undefined;
  const type = (searchParams.get('type') as 'all' | 'image' | 'video' | 'vector') ?? undefined;
  const page = searchParams.get('page') ? Number.parseInt(searchParams.get('page') ?? '1', 10) : 1;
  const limit = searchParams.get('limit') ? Number.parseInt(searchParams.get('limit') ?? '24', 10) : 24;

  const result = await listAssets({ search, folder, type, page, limit });
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const guard = await requirePermission(PERMISSIONS.assetsManage);
  if (guard.error) {
    return guard.error;
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No valid file provided.' }, { status: 400 });
    }

    const folder = (formData.get('folder') as AssetFolder) || 'General';
    const customTitle = (formData.get('title') as string) || '';
    const customAlt = (formData.get('alt') as string) || '';
    const tagsRaw = (formData.get('tags') as string) || '';
    const tags = tagsRaw
      ? tagsRaw.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const adapter = getStorageAdapter();
    const stored = await adapter.upload(buffer, {
      filename: file.name,
      folder,
      mimeType: file.type,
      tags,
    });

    const assetId = `ast_${crypto.randomUUID().replaceAll('-', '')}`;
    const now = new Date();

    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    const isSvg = ext === 'svg' || file.type === 'image/svg+xml' || stored.format === 'svg';
    const format = isSvg ? 'svg' : (stored.format || ext || 'png');
    const mimeType = isSvg ? 'image/svg+xml' : (file.type || 'application/octet-stream');

    const doc: MediaAssetDoc = {
      assetId,
      filename: file.name,
      title: customTitle || file.name,
      alt: customAlt || customTitle || file.name,
      url: stored.url,
      secureUrl: stored.secureUrl,
      publicId: stored.providerKey,
      provider: stored.provider,
      mimeType,
      format,
      sizeBytes: stored.sizeBytes,
      width: stored.width,
      height: stored.height,
      folder,
      tags,
      createdAt: now,
      updatedAt: now,
      createdBy: guard.actor.user.id,
    };

    const saved = await createAsset(doc);
    return NextResponse.json({ asset: saved }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Asset upload failed.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

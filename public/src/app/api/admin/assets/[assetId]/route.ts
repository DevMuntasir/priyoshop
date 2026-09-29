import { NextResponse } from 'next/server';
import { deleteAsset, getAssetById, updateAsset } from '@/libs/assets/AssetRepository';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { getStorageAdapter } from '@/libs/storage/StorageFactory';

type Context = { params: Promise<{ assetId: string }> };

export async function GET(
  _request: Request,
  context: Context,
) {
  const guard = await requirePermission(PERMISSIONS.assetsRead);
  if (guard.error) {
    return guard.error;
  }

  const { assetId } = await context.params;
  const asset = await getAssetById(assetId);

  if (!asset) {
    return NextResponse.json({ error: 'Asset not found.' }, { status: 404 });
  }

  return NextResponse.json({ asset });
}

export async function PATCH(
  request: Request,
  context: Context,
) {
  const guard = await requirePermission(PERMISSIONS.assetsManage);
  if (guard.error) {
    return guard.error;
  }

  const { assetId } = await context.params;
  const body = (await request.json()) as {
    title?: string;
    alt?: string;
    folder?: string;
    tags?: string[];
  };

  const updated = await updateAsset(assetId, {
    title: body.title,
    alt: body.alt,
    folder: body.folder,
    tags: body.tags,
  });

  if (!updated) {
    return NextResponse.json({ error: 'Asset not found or update failed.' }, { status: 404 });
  }

  return NextResponse.json({ asset: updated });
}

export async function DELETE(
  _request: Request,
  context: Context,
) {
  const guard = await requirePermission(PERMISSIONS.assetsManage);
  if (guard.error) {
    return guard.error;
  }

  const { assetId } = await context.params;
  const asset = await getAssetById(assetId);

  if (!asset) {
    return NextResponse.json({ error: 'Asset not found.' }, { status: 404 });
  }

  // Delete from storage adapter
  try {
    const adapter = getStorageAdapter();
    await adapter.delete(asset.publicId);
  } catch (error) {
    console.error('Storage deletion failed for asset:', asset.publicId, error);
  }

  // Delete from MongoDB
  await deleteAsset(assetId);

  return NextResponse.json({ success: true, deletedId: assetId });
}

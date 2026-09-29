import type { StorageProvider } from '@/libs/storage/StorageAdapter';

export const ASSET_FOLDERS = [
  'Hero',
  'Awards',
  'Brands',
  'Blogs',
  'News',
  'Dipty',
  'Distribution',
  'Team',
  'Career',
  'General',
] as const;

export type AssetFolder = (typeof ASSET_FOLDERS)[number] | string;

export type MediaAssetDoc = {
  assetId: string;
  filename: string;
  title: string;
  alt: string;
  url: string;
  secureUrl: string;
  publicId: string;
  provider: StorageProvider;
  mimeType: string;
  format: string;
  sizeBytes: number;
  width?: number;
  height?: number;
  folder: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
};

export type AssetFilterQuery = {
  search?: string;
  folder?: string;
  type?: 'image' | 'video' | 'vector' | 'all';
  page?: number;
  limit?: number;
};

export type AssetFolderCount = {
  name: string;
  count: number;
};

export type AssetListResult = {
  assets: MediaAssetDoc[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  folderCounts: AssetFolderCount[];
  totalStorageBytes: number;
};

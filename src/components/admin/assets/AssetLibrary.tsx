'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { AssetFolderCount, AssetListResult, MediaAssetDoc } from '@/libs/assets/Types';
import { AssetDetailsModal } from './AssetDetailsModal';
import { AssetUploader } from './AssetUploader';

export type AssetLibraryProps = {
  onSelect?: (asset: MediaAssetDoc, customUrl?: string) => void;
  selectionMode?: boolean;
};

export function AssetLibrary(props: AssetLibraryProps) {
  const [assets, setAssets] = useState<MediaAssetDoc[]>([]);
  const [folderCounts, setFolderCounts] = useState<AssetFolderCount[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video' | 'vector'>('all');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalAssets, setTotalAssets] = useState<number>(0);
  const [totalStorageBytes, setTotalStorageBytes] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [showUploader, setShowUploader] = useState<boolean>(false);
  const [activeAsset, setActiveAsset] = useState<MediaAssetDoc | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedFolder && selectedFolder !== 'All') {
        params.set('folder', selectedFolder);
      }
      if (search.trim()) {
        params.set('search', search.trim());
      }
      if (typeFilter !== 'all') {
        params.set('type', typeFilter);
      }
      params.set('page', String(page));
      params.set('limit', '24');

      const response = await adminFetch(`/api/admin/assets?${params.toString()}`);
      if (response.ok) {
        const data = (await response.json()) as AssetListResult;
        setAssets(data.assets);
        setTotalPages(data.totalPages);
        setTotalAssets(data.total);
        setFolderCounts(data.folderCounts);
        setTotalStorageBytes(data.totalStorageBytes);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAssets();
  }, [selectedFolder, typeFilter, page]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      void fetchAssets();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleCopyUrl = async (e: React.MouseEvent, asset: MediaAssetDoc) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(asset.secureUrl || asset.url);
    setCopiedId(asset.assetId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header / Stats Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-2xs">
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
          <span className="font-semibold text-gray-900">
            {totalAssets} {totalAssets === 1 ? 'Asset' : 'Assets'}
          </span>
          <span>·</span>
          <span>Storage: {(totalStorageBytes / (1024 * 1024)).toFixed(1)} MB</span>
          {/* <span>·</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 font-semibold">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Cloud CDN Ready
          </span> */}
        </div>

        <div className="flex items-center gap-2">
          <Button
            tone="brand"
            onClick={() => setShowUploader((prev) => !prev)}
            size='sm'
          >

            {showUploader ? 'Close' : 'Upload'}
          </Button>

          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Grid view"
              className={`cursor-pointer rounded-md p-1.5 ${viewMode === 'grid' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-400 hover:text-gray-700'
                }`}
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              title="List view"
              className={`cursor-pointer rounded-md p-1.5 ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-400 hover:text-gray-700'
                }`}
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Uploader Accordion */}
      {showUploader && (
        <Card padding="lg" className="border-gray-300 bg-white">
          <AssetUploader
            defaultFolder={selectedFolder !== 'All' ? selectedFolder : 'General'}
            onUploadSuccess={() => void fetchAssets()}
            onClose={() => setShowUploader(false)}
          />
        </Card>
      )}

      {/* Folder Tabs & Search Filter Bar */}
      <div className="space-y-3">
        {/* Folder Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {folderCounts.map((fc) => {
            const isSelected = selectedFolder.toLowerCase() === fc.name.toLowerCase();
            return (
              <button
                key={fc.name}
                type="button"
                onClick={() => {
                  setSelectedFolder(fc.name);
                  setPage(1);
                }}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold transition-all ${isSelected
                  ? 'bg-gray-900 text-white shadow-2xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {fc.name}{' '}
                <span className={`ml-1 font-normal ${isSelected ? 'text-gray-300' : 'text-gray-400'}`}>
                  ({fc.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-3 min-w-[240px] max-w-md">
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assets by filename, title, alt, or tag…"
              className="text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="media-type-filter" className="text-xs font-medium text-gray-500">Type:</label>
            <select
              id="media-type-filter"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value as 'all' | 'image' | 'video' | 'vector');
                setPage(1);
              }}
              className="rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-800 outline-none focus:border-gray-500"
            >
              <option value="all">All formats</option>
              <option value="image">Images (PNG, JPG, WebP)</option>
              <option value="vector">Vectors (SVG)</option>
              <option value="video">Videos (MP4)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Asset Grid / List View */}
      {loading ? (
        <div className="flex h-64 items-center justify-center rounded-xl border border-gray-200 bg-white">
          <Text size="sm" className="text-gray-500 animate-pulse">
            Loading media assets…
          </Text>
        </div>
      ) : assets.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <svg className="mb-3 size-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <Text size="body" weight="semibold" className="text-gray-700">
            No assets found
          </Text>
          <Text size="xs" className="mt-1 text-gray-500">
            {search ? 'Try clearing your search query or folder filter.' : 'Upload your first image or asset above.'}
          </Text>
          <Button
            tone="brand"
            onClick={() => setShowUploader(true)}
            className="mt-4 text-xs"
          >
            Upload new asset
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {assets.map((asset) => {
            const isVideo = asset.mimeType.startsWith('video/') || asset.format === 'mp4';
            const isSvg =
              asset.format === 'svg' ||
              asset.filename.toLowerCase().endsWith('.svg') ||
              (asset.secureUrl || asset.url).toLowerCase().endsWith('.svg');

            return (
              <div
                key={asset.assetId}
                onClick={() => {
                  if (props.onSelect) {
                    props.onSelect(asset);
                  } else {
                    setActiveAsset(asset);
                  }
                }}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:border-gray-400 hover:shadow-md"
              >
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100 flex items-center justify-center p-2">
                  {isVideo ? (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg className="size-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="mt-1 text-[10px] font-semibold uppercase">Video</span>
                    </div>
                  ) : (
                    <Image
                      src={asset.secureUrl || asset.url}
                      alt={asset.alt || asset.filename}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      unoptimized={isSvg}
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  )}

                  {/* Format & Dimensions Badge */}
                  <span className="absolute top-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                    {isSvg ? 'SVG' : asset.format}
                  </span>

                  {/* Quick Copy Action on Hover */}
                  <button
                    type="button"
                    onClick={(e) => void handleCopyUrl(e, asset)}
                    title="Copy CDN URL"
                    className="absolute top-2 right-2 rounded-md bg-white/90 p-1 text-gray-700 opacity-0 shadow-xs transition-opacity hover:bg-white group-hover:opacity-100"
                  >
                    {copiedId === asset.assetId ? (
                      <span className="text-[10px] font-bold text-emerald-600 px-1">✓</span>
                    ) : (
                      <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Card Meta */}
                <div className="p-2.5">
                  <p className="truncate text-xs font-semibold text-gray-800" title={asset.filename}>
                    {asset.title || asset.filename}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500">
                    <span>{asset.folder}</span>
                    <span>{(asset.sizeBytes / 1024).toFixed(0)} KB</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-xs">
            <thead className="bg-gray-50 text-gray-600 font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Preview</th>
                <th className="px-4 py-3 text-left">Filename & Title</th>
                <th className="px-4 py-3 text-left">Folder</th>
                <th className="px-4 py-3 text-left">Size</th>
                <th className="px-4 py-3 text-left">Dimensions</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assets.map((asset) => {
                const isSvg =
                  asset.format === 'svg' ||
                  asset.filename.toLowerCase().endsWith('.svg') ||
                  (asset.secureUrl || asset.url).toLowerCase().endsWith('.svg');

                return (
                  <tr
                    key={asset.assetId}
                    onClick={() => {
                      if (props.onSelect) {
                        props.onSelect(asset);
                      } else {
                        setActiveAsset(asset);
                      }
                    }}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      <div className="relative size-10 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                        <Image
                          src={asset.secureUrl || asset.url}
                          alt={asset.alt || asset.filename}
                          fill
                          unoptimized={isSvg}
                          className="object-contain p-1"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <p className="font-semibold text-gray-900 truncate max-w-xs">{asset.title || asset.filename}</p>
                      <p className="text-[10px] text-gray-400 truncate max-w-xs">{asset.filename}</p>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{asset.folder}</td>
                    <td className="px-4 py-2 text-gray-600">{(asset.sizeBytes / 1024).toFixed(1)} KB</td>
                    <td className="px-4 py-2 text-gray-600">
                      {asset.width && asset.height ? `${asset.width} × ${asset.height}` : '—'}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        type="button"
                        onClick={(e) => void handleCopyUrl(e, asset)}
                        className="cursor-pointer rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {copiedId === asset.assetId ? '✓ Copied' : 'Copy URL'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <Text size="xs" className="text-gray-500">
            Page {page} of {totalPages}
          </Text>

          <div className="flex gap-2">
            <Button
              variant="outlined"
              tone="dark"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="text-xs"
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              tone="dark"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Asset Inspector / Resize Modal */}
      {activeAsset && (
        <AssetDetailsModal
          asset={activeAsset}
          onClose={() => setActiveAsset(null)}
          onUpdate={(updated) => {
            setAssets((prev) => prev.map((a) => (a.assetId === updated.assetId ? updated : a)));
            setActiveAsset(updated);
          }}
          onDelete={(deletedId) => {
            setAssets((prev) => prev.filter((a) => a.assetId !== deletedId));
            setActiveAsset(null);
            void fetchAssets();
          }}
          onSelect={props.onSelect}
        />
      )}
    </div>
  );
}

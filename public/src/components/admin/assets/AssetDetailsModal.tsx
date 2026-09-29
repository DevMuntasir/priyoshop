'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { AssetFolder, MediaAssetDoc } from '@/libs/assets/Types';
import { ASSET_FOLDERS } from '@/libs/assets/Types';

export type AssetDetailsModalProps = {
  asset: MediaAssetDoc;
  onClose: () => void;
  onUpdate?: (updated: MediaAssetDoc) => void;
  onDelete?: (assetId: string) => void;
  onSelect?: (asset: MediaAssetDoc, customUrl?: string) => void;
};

const RESIZE_PRESETS = [
  { label: 'Original', w: 0, h: 0 },
  { label: 'Thumbnail (150×150)', w: 150, h: 150, crop: 'fill' },
  { label: 'Card (600×400)', w: 600, h: 400, crop: 'fill' },
  { label: 'Banner (1200×500)', w: 1200, h: 500, crop: 'fill' },
  { label: 'Square (500×500)', w: 500, h: 500, crop: 'fill' },
  { label: 'HD (1920×1080)', w: 1920, h: 1080, crop: 'limit' },
] as const;

export function AssetDetailsModal(props: AssetDetailsModalProps) {
  const { asset } = props;
  const [title, setTitle] = useState(asset.title);
  const [alt, setAlt] = useState(asset.alt);
  const [folder, setFolder] = useState<AssetFolder>(asset.folder);
  const [tags, setTags] = useState(asset.tags.join(', '));
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Resize & Transformation state
  const [customWidth, setCustomWidth] = useState<number | ''>('');
  const [customHeight, setCustomHeight] = useState<number | ''>('');
  const [cropMode, setCropMode] = useState<'fill' | 'fit' | 'limit' | 'scale'>('fill');

  const getTransformedUrl = () => {
    if (!customWidth && !customHeight) {
      return asset.secureUrl || asset.url;
    }

    if (asset.provider === 'cloudinary' && asset.publicId) {
      const parts: string[] = ['f_auto', 'q_auto'];
      if (customWidth) parts.push(`w_${customWidth}`);
      if (customHeight) parts.push(`h_${customHeight}`);
      if (cropMode) parts.push(`c_${cropMode}`);
      const transformString = parts.join(',');

      // Cloudinary URL transform injection
      const base = asset.secureUrl || asset.url;
      if (base.includes('/upload/')) {
        return base.replace('/upload/', `/upload/${transformString}/`);
      }
    }

    return asset.secureUrl || asset.url;
  };

  const currentDeliveryUrl = getTransformedUrl();

  const handleSave = async () => {
    setSaving(true);
    setStatusMsg('');

    try {
      const response = await adminFetch(`/api/admin/assets/${asset.assetId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          alt,
          folder,
          tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as { asset: MediaAssetDoc };
        props.onUpdate?.(data.asset);
        setStatusMsg('Metadata saved.');
      } else {
        setStatusMsg('Failed to save.');
      }
    } catch {
      setStatusMsg('Network error.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Are you sure you want to delete "${asset.filename}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await adminFetch(`/api/admin/assets/${asset.assetId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        props.onDelete?.(asset.assetId);
        props.onClose();
      } else {
        // eslint-disable-next-line no-alert
        alert('Could not delete asset.');
      }
    } catch {
      // eslint-disable-next-line no-alert
      alert('Network error.');
    }
  };

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isVideo = asset.mimeType.startsWith('video/') || asset.format === 'mp4';
  const isSvg =
    asset.format === 'svg' ||
    asset.filename.toLowerCase().endsWith('.svg') ||
    currentDeliveryUrl.toLowerCase().endsWith('.svg');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row">
        {/* Left Side: Preview & Transformations */}
        <div className="flex flex-1 flex-col justify-between border-b border-gray-200 bg-gray-950 p-6 text-white md:border-r md:border-b-0">
          <div className="flex items-center justify-between">
            <span className="rounded-md bg-white/10 px-2 py-1 text-xs font-semibold tracking-wide uppercase text-gray-300">
              {isSvg ? 'SVG' : asset.format.toUpperCase()} · {(asset.sizeBytes / 1024).toFixed(1)} KB
            </span>
            {asset.width && asset.height && (
              <span className="text-xs text-gray-400">
                {asset.width} × {asset.height} px
              </span>
            )}
          </div>

          {/* Media Center Preview */}
          <div className="my-6 flex max-h-[420px] items-center justify-center overflow-hidden rounded-lg bg-black/40 p-2">
            {isVideo ? (
              <video
                src={currentDeliveryUrl}
                controls
                className="max-h-[380px] max-w-full rounded-md object-contain"
              >
                <track kind="captions" />
              </video>
            ) : (
              <Image
                src={currentDeliveryUrl}
                alt={alt || asset.filename}
                width={asset.width || 800}
                height={asset.height || 600}
                unoptimized={isSvg}
                className="max-h-[380px] w-auto max-w-full rounded-md object-contain"
              />
            )}
          </div>

          {/* On-the-fly Resize Tool for Raster Images */}
          {!isVideo && !isSvg && asset.provider === 'cloudinary' && (
            <div className="space-y-3 rounded-lg bg-white/5 p-3 text-xs text-gray-300">
              <div className="flex items-center justify-between font-semibold text-gray-200">
                <span>⚡ Dynamic Resize & Crop Tool:</span>
                {(customWidth || customHeight) && (
                  <button
                    type="button"
                    onClick={() => {
                      setCustomWidth('');
                      setCustomHeight('');
                    }}
                    className="cursor-pointer text-amber-400 underline hover:text-amber-300"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Presets */}
              <div className="flex flex-wrap gap-1.5">
                {RESIZE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setCustomWidth(preset.w || '');
                      setCustomHeight(preset.h || '');
                      if ('crop' in preset && preset.crop) {
                        setCropMode(preset.crop);
                      }
                    }}
                    className={`cursor-pointer rounded-md border px-2 py-1 font-medium transition-colors ${
                      (customWidth === preset.w && customHeight === preset.h) || (!customWidth && !preset.w)
                        ? 'border-amber-400 bg-amber-400/20 text-amber-300'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Custom Dimensions */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label htmlFor="dim-width" className="block text-[10px] text-gray-400">Width (px)</label>
                  <input
                    id="dim-width"
                    type="number"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 800"
                    className="mt-0.5 w-full rounded border border-white/15 bg-black/40 px-2 py-1 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="dim-height" className="block text-[10px] text-gray-400">Height (px)</label>
                  <input
                    id="dim-height"
                    type="number"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 600"
                    className="mt-0.5 w-full rounded border border-white/15 bg-black/40 px-2 py-1 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label htmlFor="dim-crop" className="block text-[10px] text-gray-400">Crop Mode</label>
                  <select
                    id="dim-crop"
                    value={cropMode}
                    onChange={(e) => setCropMode(e.target.value as 'fill' | 'fit' | 'limit' | 'scale')}
                    className="mt-0.5 w-full rounded border border-white/15 bg-black/40 px-2 py-1 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="fill">Fill (Auto-crop)</option>
                    <option value="fit">Fit (Letterbox)</option>
                    <option value="limit">Limit (Max bounds)</option>
                    <option value="scale">Scale (Stretch)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Metadata, Inspector, Snippets, Actions */}
        <div className="flex w-full flex-col justify-between overflow-y-auto p-6 md:w-96">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 truncate max-w-[220px]" title={asset.filename}>
                  {asset.filename}
                </h3>
                <p className="text-xs text-gray-500">
                  Uploaded {new Date(asset.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                type="button"
                onClick={props.onClose}
                className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label htmlFor="asset-title-input" className="block text-xs font-semibold text-gray-700">Title</label>
                <Input
                  id="asset-title-input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Asset title"
                  className="mt-1"
                />
              </div>

              <div>
                <label htmlFor="asset-alt-input" className="block text-xs font-semibold text-gray-700">Alt Text (Accessibility / SEO)</label>
                <Input
                  id="asset-alt-input"
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="Alt description for search engines"
                  className="mt-1"
                />
              </div>

              <div>
                <label htmlFor="asset-folder-select" className="block text-xs font-semibold text-gray-700">Folder</label>
                <select
                  id="asset-folder-select"
                  value={folder}
                  onChange={(e) => setFolder(e.target.value as AssetFolder)}
                  className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500"
                >
                  {ASSET_FOLDERS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="asset-tags-input" className="block text-xs font-semibold text-gray-700">Tags (comma separated)</label>
                <Input
                  id="asset-tags-input"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. hero, banner, mobile"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button tone="brand" onClick={() => void handleSave()} disabled={saving}>
                  {saving ? 'Saving…' : 'Save metadata'}
                </Button>
                {statusMsg && <span className="text-xs font-medium text-gray-600">{statusMsg}</span>}
              </div>
            </div>

            {/* Quick Copy Snippets */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Copy Code / URL:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => void copyToClipboard(currentDeliveryUrl, 'url')}
                  className="cursor-pointer rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 font-medium text-gray-700 hover:bg-gray-100 text-left"
                >
                  {copiedKey === 'url' ? '✓ Copied URL' : '🔗 Copy CDN URL'}
                </button>
                <button
                  type="button"
                  onClick={() => void copyToClipboard(`![${alt || title}](${currentDeliveryUrl})`, 'md')}
                  className="cursor-pointer rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 font-medium text-gray-700 hover:bg-gray-100 text-left"
                >
                  {copiedKey === 'md' ? '✓ Copied MD' : '📝 Markdown'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void copyToClipboard(
                      `<Image src="${currentDeliveryUrl}" alt="${alt || title}" width={${customWidth || asset.width || 800}} height={${customHeight || asset.height || 600}} />`,
                      'next',
                    )
                  }
                  className="col-span-2 cursor-pointer rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1.5 font-medium text-gray-700 hover:bg-gray-100 text-left"
                >
                  {copiedKey === 'next' ? '✓ Copied <Image />' : '⚛️ Next.js <Image /> Snippet'}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-6">
            <Button variant="ghost" tone="dark" onClick={() => void handleDelete()} className="text-rose-600 hover:text-rose-700">
              Delete asset
            </Button>

            {props.onSelect && (
              <Button
                tone="brand"
                onClick={() => {
                  props.onSelect?.(asset, currentDeliveryUrl);
                  props.onClose();
                }}
              >
                Insert asset
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { AssetFolder, MediaAssetDoc } from '@/libs/assets/Types';
import { ASSET_FOLDERS } from '@/libs/assets/Types';

export type AssetUploaderProps = {
  defaultFolder?: string;
  onUploadSuccess?: (uploaded: MediaAssetDoc) => void;
  onClose?: () => void;
};

type UploadingItem = {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'done' | 'error';
  error?: string;
};

export function AssetUploader(props: AssetUploaderProps) {
  const [folder, setFolder] = useState<AssetFolder>(props.defaultFolder || 'General');
  const [isDragging, setIsDragging] = useState(false);
  const [items, setItems] = useState<UploadingItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      return;
    }

    const fileArray = Array.from(files);
    const newItems: UploadingItem[] = fileArray.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      status: 'uploading',
    }));

    setItems((prev) => [...newItems, ...prev]);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const item = newItems[i];
      if (!file || !item) {
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      try {
        const response = await adminFetch('/api/admin/assets', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = (await response.json()) as { asset: MediaAssetDoc };
          setItems((prev) =>
            prev.map((it) => (it.id === item.id ? { ...it, status: 'done' } : it)),
          );
          props.onUploadSuccess?.(data.asset);
        } else {
          const errData = (await response.json().catch(() => null)) as { error?: string } | null;
          setItems((prev) =>
            prev.map((it) =>
              it.id === item.id
                ? { ...it, status: 'error', error: errData?.error ?? 'Upload failed.' }
                : it,
            ),
          );
        }
      } catch (err) {
        setItems((prev) =>
          prev.map((it) =>
            it.id === item.id
              ? { ...it, status: 'error', error: err instanceof Error ? err.message : 'Network error' }
              : it,
          ),
        );
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="upload-folder-select" className="text-xs font-semibold uppercase text-gray-500">
            Target Folder:
          </label>
          <select
            id="upload-folder-select"
            value={folder}
            onChange={(e) => setFolder(e.target.value as AssetFolder)}
            className="rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-800 outline-none focus:border-gray-500"
          >
            {ASSET_FOLDERS.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        {props.onClose && (
          <Button variant="ghost" tone="dark" onClick={props.onClose}>
            Done
          </Button>
        )}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          void handleFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? 'border-gray-900 bg-gray-100/80'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100/50'
        }`}
      >
        <svg
          className="mb-3 size-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-sm font-semibold text-gray-700">
          Drag & drop images or assets here, or{' '}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer text-gray-900 underline underline-offset-2 hover:text-black font-semibold"
          >
            browse files
          </button>
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supports PNG, JPG, SVG, WebP, GIF, MP4 (Max 20MB for images, 100MB for videos)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/mp4,image/svg+xml"
          className="hidden"
          onChange={(e) => void handleFiles(e.target.files)}
        />
      </div>

      {items.length > 0 && (
        <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-gray-200 bg-white p-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-xs text-gray-700 border-b border-gray-100 pb-1.5 last:border-b-0"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="font-medium truncate max-w-xs">{item.name}</span>
                <span className="text-gray-400">({(item.size / 1024).toFixed(0)} KB)</span>
              </div>
              <div>
                {item.status === 'uploading' && (
                  <span className="animate-pulse font-semibold text-amber-600">Uploading…</span>
                )}
                {item.status === 'done' && (
                  <span className="font-semibold text-emerald-600">✓ Uploaded</span>
                )}
                {item.status === 'error' && (
                  <span className="font-semibold text-rose-600">✗ {item.error || 'Failed'}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import type { MediaAssetDoc } from '@/libs/assets/Types';
import { AssetLibrary } from './AssetLibrary';
import { AssetUploader } from './AssetUploader';

export type SelectedMedia = {
  url: string;
  alt: string;
  title: string;
  assetId?: string;
  width?: number;
  height?: number;
};

export type MediaPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: SelectedMedia) => void;
  title?: string;
  defaultFolder?: string;
};

export function MediaPickerModal(props: MediaPickerModalProps) {
  const [activeTab, setActiveTab] = useState<'library' | 'upload'>('library');

  if (!props.isOpen) {
    return null;
  }

  const handleAssetSelect = (asset: MediaAssetDoc, customUrl?: string) => {
    props.onSelect({
      url: customUrl || asset.secureUrl || asset.url,
      alt: asset.alt || asset.title || asset.filename,
      title: asset.title || asset.filename,
      assetId: asset.assetId,
      width: asset.width,
      height: asset.height,
    });
    props.onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header with Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center gap-6">
            <h2 className="text-base font-bold text-gray-900">
              {props.title || 'Choose Media Asset'}
            </h2>

            <div className="flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setActiveTab('library')}
                className={`cursor-pointer rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                  activeTab === 'library'
                    ? 'bg-gray-900 text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Media Library
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`cursor-pointer rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                  activeTab === 'upload'
                    ? 'bg-gray-900 text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Upload New
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={props.onClose}
            className="cursor-pointer rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'library' ? (
            <AssetLibrary selectionMode onSelect={handleAssetSelect} />
          ) : (
            <div className="mx-auto max-w-2xl py-8">
              <AssetUploader
                defaultFolder={props.defaultFolder || 'General'}
                onUploadSuccess={(uploaded) => {
                  handleAssetSelect(uploaded);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

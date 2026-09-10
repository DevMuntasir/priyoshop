'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import type { SelectedMedia } from './MediaPickerModal';
import { MediaPickerModal } from './MediaPickerModal';

export type MediaInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSelectMedia?: (media: SelectedMedia) => void;
  label?: string;
  placeholder?: string;
  hint?: string;
  defaultFolder?: string;
  className?: string;
};

export function MediaInput(props: MediaInputProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const isVideo = props.value.endsWith('.mp4') || props.value.includes('/video/');

  const handleSelect = (media: SelectedMedia) => {
    props.onChange(media.url);
    props.onSelectMedia?.(media);
  };

  return (
    <div className={`space-y-1.5 ${props.className || ''}`}>
      {props.label && (
        <span className="block text-xs font-semibold text-gray-700">{props.label}</span>
      )}

      <div className="flex items-center gap-2">
        {/* Preview Thumbnail */}
        {props.value ? (
          <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-2xs">
            {isVideo ? (
              <div className="flex size-full items-center justify-center text-[10px] font-bold text-gray-500">
                ▶ MP4
              </div>
            ) : (
              <Image
                src={props.value}
                alt="Selected asset"
                fill
                sizes="40px"
                unoptimized={props.value.toLowerCase().includes('.svg')}
                className="object-contain p-1"
              />
            )}
          </div>
        ) : (
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 text-gray-400">
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Input Box */}
        <div className="relative flex-1">
          <Input
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder || 'Select or enter image URL / path'}
            className="!text-xs pr-7 !py-1"
            size='sm'
          />
          {props.value && (
            <button
              type="button"
              onClick={() => props.onChange('')}
              title="Clear"
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-xs font-bold text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>

        {/* Choose Button */}
        <span


          onClick={() => setModalOpen(true)}
          title="Choose from Asset Library"
          aria-label="Choose from Asset Library"
          className="shrink-0 !p-0 cursor-pointer hover:bg-transparent"
        >
          <svg
            className="size-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </span>
      </div>

      {props.hint && <p className="text-[11px] text-gray-500">{props.hint}</p>}

      <MediaPickerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSelect}
        title={props.label ? `Select ${props.label}` : 'Select Media Asset'}
        defaultFolder={props.defaultFolder}
      />
    </div>
  );
}

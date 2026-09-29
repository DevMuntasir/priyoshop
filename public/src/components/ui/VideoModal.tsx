'use client';

import { useEffect } from 'react';
import { parseVideoSource } from '@/utils/Video';

export type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  videoPath?: string;
  title?: string;
  closeLabel?: string;
};

/**
 * Accessible, responsive modal dialog for playing YouTube and uploaded video files.
 */
export function VideoModal(props: VideoModalProps) {
  useEffect(() => {
    if (!props.isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        props.onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.isOpen, props.onClose]);

  if (!props.isOpen || !props.videoPath) {
    return null;
  }

  const parsed = parseVideoSource(props.videoPath);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={props.title || 'Video Player'}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md transition-all sm:p-6 md:p-10"
      onClick={props.onClose}
    >
      <div
        className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl ring-1 ring-white/10 sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={props.onClose}
          aria-label={props.closeLabel || 'Close video'}
          className="absolute top-3 right-3 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black/90 active:scale-95 sm:top-4 sm:right-4"
        >
          <svg
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {parsed.type === 'youtube' ? (
          <iframe
            src={`${parsed.embedUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={props.title || 'Video Player'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="size-full border-0"
          />
        ) : (
          <video
            src={parsed.src}
            autoPlay
            controls
            playsInline
            className="size-full object-contain"
            aria-label={props.title || 'Video Player'}
          />
        )}
      </div>
    </div>
  );
}

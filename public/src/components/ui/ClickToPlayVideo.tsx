'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ParsedVideo } from '@/utils/Video';
import { parseVideoSource } from '@/utils/Video';

export type ClickToPlayVideoProps = {
  /** Path to local video file, Cloudinary URL, or YouTube URL / ID. */
  videoPath: string;
  /** Optional thumbnail image path. If not provided, will use YouTube thumbnail or default poster. */
  poster?: string;
  title: string;
  className?: string;
};

// Centered play icon with a ring of text rotating around it.
function PlayButton() {
  return (
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-105">
      {/* Rotating text ring */}
      <svg
        viewBox="0 0 200 200"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 animate-spin animation-duration-[14s] sm:size-48"
        aria-hidden
      >
        <defs>
          <path
            id="play-ring"
            d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
            fill="none"
          />
        </defs>

        <text className="fill-ps-black font-body text-[10px] font-semibold uppercase">
          <textPath href="#play-ring" startOffset="0%" textLength="515">
            Press to watch the full video • Press to watch the full video •
          </textPath>
        </text>
      </svg>

      {/* Static white circle and play icon */}
      <svg
        viewBox="0 0 200 200"
        className="relative size-40 sm:size-48 drop-shadow-lg"
        aria-hidden
      >
        <circle cx="100" cy="100" r="65" fill="white" />
        <polygon points="88,72 88,128 130,100" fill="#1a1a1a" />
      </svg>
    </span>
  );
}

function ActiveVideo(props: {
  parsed: ParsedVideo;
  title: string;
  poster?: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  if (props.parsed.type === 'youtube') {
    return (
      <iframe
        src={`${props.parsed.embedUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={props.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="size-full border-0 object-cover"
      />
    );
  }

  return (
    <video
      ref={props.videoRef}
      src={props.parsed.src}
      poster={props.poster}
      aria-label={props.title}
      autoPlay
      controls
      playsInline
      className="size-full object-cover"
    >
      <track kind="captions" />
    </video>
  );
}

// Plays a Cloudinary, YouTube, or local video file behind a rich thumbnail poster with a play button.
// Pressing the button starts the video and smoothly expands the frame.
export function ClickToPlayVideo(props: ClickToPlayVideoProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const parsed = parseVideoSource(props.videoPath);
  const poster =
    props.poster ||
    (parsed.type === 'youtube' ? parsed.thumbnailUrl : APP_VIDEOS.defaultPoster);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && !entry.isIntersecting && playing) {
          if (videoRef.current) {
            videoRef.current.pause();
          }
          setPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [playing]);

  return (
    <div ref={containerRef} className={`flex justify-center ${props.className ?? ''}`}>
      {/* Starts as a narrow centered frame and grows to full width on play. */}
      <div
        onTransitionEnd={() => {
          if (playing) {
            containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
        className={`relative w-full overflow-hidden shadow-md transition-[max-width,max-height] duration-700 ease-in-out aspect-video ${playing ? 'max-w-full max-h-screen' : 'max-w-3xl rounded-ps-xl'}`}
      >
        {playing ? (
          <ActiveVideo
            parsed={parsed}
            title={props.title}
            poster={poster}
            videoRef={videoRef}
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              setPlaying(true);
              if (parsed.type === 'direct') {
                setTimeout(() => {
                  void videoRef.current?.play();
                }, 0);
              }
            }}
            aria-label={`Play video: ${props.title}`}
            className="group absolute inset-0 size-full cursor-pointer overflow-hidden bg-ps-grey-900"
          >
            {poster && (
              <Image
                src={poster}
                alt={props.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {/* Soft dark vignette to ensure play button and contrast look premium */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10 transition-colors group-hover:bg-black/40" />
            <PlayButton />
          </button>
        )}
      </div>
    </div>
  );
}

export const VideoPlayer = ClickToPlayVideo;
export type VideoPlayerProps = ClickToPlayVideoProps;

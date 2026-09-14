'use client';

import Image from 'next/image';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { APP_VIDEOS } from '@/constants/Videos';
import { parseVideoSource } from '@/utils/Video';
import { RollingNumber } from './RollingNumber';

export type ScrollAutoplayVideoProps = {
  /** YouTube embed id, full YouTube URL, direct video path, or Cloudinary URL. */
  videoId: string;
  /** Optional poster thumbnail image. */
  poster?: string;
  title: string;
  className?: string;
};

// Stacked backdrop-blur layers, each blurrier than the last and masked to a
// band, so the blur ramps up smoothly toward the bottom with no visible edge.
function ProgressiveBlur() {
  // [blur radius in px, band start %, band end %]
  const layers: [number, number, number][] = [
    [1, 0, 25],
    [2, 12.5, 37.5],
    [4, 25, 50],
    [8, 37.5, 62.5],
    [16, 50, 75],
    [32, 62.5, 100],
  ];

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-30">
      {layers.map((layer) => {
        const [blur, start, end] = layer;
        const mask = `linear-gradient(to bottom, transparent ${start}%, black ${(start + end) / 2}%, black ${end}%, transparent 100%)`;
        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black" />
    </div>
  );
}

const STATS = [
  { value: 250_000, label: 'MSMEs' },
  { value: 296, label: 'Brands' },
  { value: 1458, label: 'Routes' },
  { value: 43, label: 'Hubs' },
  { value: 3603, label: 'SKUs' },
];

// Embeds an autoplaying video (YouTube or direct MP4/Cloudinary) once it scrolls into view with an initial poster thumbnail preview.
export function ScrollAutoplayVideo(props: ScrollAutoplayVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.1 });
  const parsed = parseVideoSource(props.videoId);

  const poster =
    (props.poster && props.poster.trim()) ||
    (parsed.type === 'youtube' ? parsed.thumbnailUrl : APP_VIDEOS.defaultPoster);

  const params = new URLSearchParams({
    autoplay: inView ? '1' : '0',
    mute: '1',
    controls: '0', // hide play/pause, duration and progress bar
    modestbranding: '1', // minimize YouTube logo
    rel: '0', // no related videos at the end
    showinfo: '0', // hide title/uploader (legacy)
    iv_load_policy: '3', // hide video annotations
    disablekb: '1', // disable keyboard controls
    playsinline: '1',
    loop: '1',
    playlist: parsed.type === 'youtube' ? parsed.videoId : '', // required for loop to work
  });
  const embedSrc = `${parsed.type === 'youtube' ? parsed.embedUrl : ''}?${params.toString()}`;

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-ps-grey-900 ${props.className ?? ''}`}>
      {poster && (
        <Image
          src={poster}
          alt={props.title}
          fill
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="absolute inset-0 object-cover"
        />
      )}
      {inView && (
        parsed.type === 'youtube' ? (
          // Oversize the iframe and clip top/bottom so YouTube's title bar and
          // branding overlay are cropped out of view, leaving only the video.
          <iframe
            src={embedSrc}
            title={props.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="pointer-events-none absolute top-1/2 left-1/2 m-0! h-[calc(100%+160px)] w-full -translate-x-1/2 -translate-y-1/2 border-0 p-0!"
          />
        ) : (
          <video
            src={parsed.src}
            poster={poster}
            aria-label={props.title}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="pointer-events-none absolute inset-0 size-full object-cover"
          >
            <track kind="captions" />
          </video>
        )
      )}
      <ProgressiveBlur />
      <div className="absolute bottom-0 flex flex-wrap w-full justify-center gap-y-4 px-2 pb-3 sm:pb-4 lg:px-0">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-1 flex-col items-center gap-1 px-3 text-center sm:gap-2 sm:px-6 lg:px-10 ${i ? 'border-l border-ps-black-50' : ''}`}
          >
            <span className="font-display leading-none font-extrabold tracking-tight text-ps-white">
              <RollingNumber value={stat.value} suffix="+" height={52} heightMobile={26} />
            </span>
            <span className="font-body text-ps-sm font-semibold text-ps-black-100 sm:text-base">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

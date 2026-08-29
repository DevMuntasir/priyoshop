'use client';

import { useInView } from 'motion/react';
import { useRef } from 'react';
import { RollingNumber } from './RollingNumber';

export type ScrollAutoplayVideoProps = {
  /** YouTube embed id, e.g. `0B2MieWr4rE`. */
  videoId: string;
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

// Embeds a YouTube video that autoplays once it scrolls into view.
export function ScrollAutoplayVideo(props: ScrollAutoplayVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.5 });

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
    playlist: props.videoId, // required for loop to work
  });
  const src = `https://www.youtube-nocookie.com/embed/${props.videoId}?${params.toString()}`;
  const STATS = [
    { value: 120, label: 'Total Operational Hub' },
    { value: 48, label: 'Total District Coverage' },
    { value: 2500, label: 'Total People Employed' },
  ];
  return (
    <div ref={containerRef} className={`relative overflow-hidden ${props.className ?? ''}`}>
      {inView ? (
        // Oversize the iframe and clip top/bottom so YouTube's title bar and
        // branding overlay are cropped out of view, leaving only the video.
        <iframe
          src={src}
          title={props.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="pointer-events-none absolute top-1/2 left-1/2 m-0! h-[calc(100%+160px)] w-full -translate-x-1/2 -translate-y-1/2 border-0 p-0!"
        />
      ) : null}
      <ProgressiveBlur />
      <div className="absolute bottom-0 flex w-full justify-center gap-y-4 px-2 pb-3 sm:pb-4 lg:px-0">
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

'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ResolvedSection } from '@/libs/cms/Sections';
import type { ParsedVideo } from '@/utils/Video';
import { parseVideoSource } from '@/utils/Video';

function VideoPlayButton() {
  return (
    <svg viewBox="0 0 88 88" className="size-18 sm:size-22" aria-hidden>
      <defs>
        <path
          id="brand-growth-play-ring"
          d="M44 44m-35 0a35 35 0 1 1 70 0a35 35 0 1 1-70 0"
          fill="none"
        />
      </defs>
      <text
        fill="white"
        fontSize="5.5"
        fontWeight="600"
        letterSpacing="1.8"
      >
        <textPath href="#brand-growth-play-ring" textLength="220">
          PRESS TO WATCH • PRESS TO WATCH •
        </textPath>
      </text>
      <circle cx="44" cy="44" r="22" fill="white" />
      <path d="m40 35 14 9-14 9Z" fill="#171717" />
    </svg>
  );
}

function PlayingVideo(props: {
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
      controls
      autoPlay
      playsInline
      preload="metadata"
      className="size-full object-cover"
    >
      <track kind="captions" />
    </video>
  );
}

export function DistributionBrandGrowth(props: { data: ResolvedSection }) {
  const data = props.data;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const parsed = parseVideoSource(data.heading.videoPath ?? APP_VIDEOS.distribution.brandGrowth.src);
  const poster =
    data.heading.backgroundImage ||
    (parsed.type === 'youtube' ? parsed.thumbnailUrl : APP_VIDEOS.distribution.brandGrowth.poster);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="m-0 font-display text-ps-h3 leading-tight font-bold tracking-tight text-ps-black text-balance">
            {data.heading.title}
          </h2>
          {data.heading.description && (
            <p className="mx-auto mt-4 max-w-3xl font-body text-ps-sm leading-relaxed font-normal text-ps-ink-600 text-pretty">
              {data.heading.description}
            </p>
          )}
        </div>

        <div className="relative mt-10 aspect-video overflow-hidden rounded-ps-md bg-ps-grey-900 shadow-md sm:mt-12 lg:mt-14 lg:aspect-[1.94/1]">
          {isPlaying ? (
            <PlayingVideo
              parsed={parsed}
              title={data.heading.title}
              poster={poster}
              videoRef={videoRef}
            />
          ) : (
            <button
              type="button"
              aria-label={`Play video: ${data.heading.title}`}
              className="group absolute inset-0 flex size-full cursor-pointer items-center justify-center overflow-hidden bg-ps-grey-900"
              onClick={() => {
                setIsPlaying(true);
                if (parsed.type === 'direct') {
                  setTimeout(() => {
                    void videoRef.current?.play();
                  }, 0);
                }
              }}
            >
              {poster && (
                <Image
                  src={poster}
                  alt={data.heading.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10 transition-colors group-hover:bg-black/40" />
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                <VideoPlayButton />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

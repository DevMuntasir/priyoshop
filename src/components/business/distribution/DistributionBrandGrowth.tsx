'use client';

import { useRef, useState } from 'react';
import type { ResolvedSection } from '@/libs/cms/Sections';

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

export function DistributionBrandGrowth(props: { data: ResolvedSection }) {
  const data = props.data;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

        <div className="relative mt-10 aspect-video overflow-hidden rounded-ps-md bg-[#1b1b1b] sm:mt-12 lg:mt-14 lg:aspect-[1.94/1]">
          <video
            ref={videoRef}
            src={data.heading.videoPath ?? '/video/1.mp4'}
            poster={data.heading.backgroundImage}
            aria-label={data.heading.title}
            controls={isPlaying}
            playsInline
            preload="metadata"
            className={`size-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          >
            <track kind="captions" />
          </video>

          {!isPlaying && (
            <button
              type="button"
              aria-label={`Play video: ${data.heading.title}`}
              className="group absolute inset-0 flex size-full cursor-pointer items-center justify-center bg-[#1b1b1b]"
              onClick={() => {
                setIsPlaying(true);
                void videoRef.current?.play();
              }}
            >
              <span className="transition-transform duration-300 group-hover:scale-105">
                <VideoPlayButton />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

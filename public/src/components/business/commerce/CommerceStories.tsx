'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { IconButton } from '@/components/ui/IconButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ResolvedSection } from '@/libs/cms/Sections';
import type { ParsedVideo } from '@/utils/Video';
import { parseVideoSource } from '@/utils/Video';

const DEFAULT_COMMERCE_STORIES = [
  {
    title: 'Building stronger retail businesses',
    videoPath: '/video/1.mp4',
    image: '/retail/1.png',
  },
  {
    title: 'Empowering local shop owners',
    videoPath: '/video/1.mp4',
    image: '/retail/2.png',
  },
  {
    title: 'Seamless wholesale ordering experience',
    videoPath: '/video/1.mp4',
    image: '/retail/3.png',
  },
  {
    title: 'Direct delivery across Bangladesh',
    videoPath: '/video/1.mp4',
    image: '/retail/4.png',
  },
  {
    title: 'Hassle-free inventory restocking',
    videoPath: '/video/1.mp4',
    image: '/retail/5.png',
  },
];

/** YouTube-style red play button overlay for video thumbnails. */
function YouTubePlayButton() {
  return (
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
      <svg width="68" height="48" viewBox="0 0 68 48" aria-hidden="true">
        <path
          d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
          fill="#FF0000"
        />
        <path d="M45 24L27 14v20" fill="white" />
      </svg>
    </span>
  );
}

function CommerceActiveVideo(props: {
  parsed: ParsedVideo;
  title: string;
  poster?: string;
  index: number;
  videoRefs: React.RefObject<Map<number, HTMLVideoElement>>;
}) {
  if (props.parsed.type === 'youtube') {
    return (
      <iframe
        src={`${props.parsed.embedUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={props.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video h-auto w-full object-cover border-0"
      />
    );
  }

  return (
    <video
      ref={(el) => {
        if (el) {
          props.videoRefs.current?.set(props.index, el);
        }
      }}
      src={props.parsed.src}
      poster={props.poster}
      aria-label={props.title}
      autoPlay
      controls
      playsInline
      className="aspect-video h-auto w-full object-cover"
    >
      <track kind="captions" />
    </video>
  );
}

export function CommerceStories(props: { data: ResolvedSection }) {
  const heading = props.data.heading;
  const rawItems = props.data.items ?? [];
  const items =
    rawItems.length >= 3
      ? rawItems
      : [...rawItems, ...DEFAULT_COMMERCE_STORIES.slice(rawItems.length)];

  const initialIndex = items.length > 1 ? 1 : 0;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  const pausePlayingVideo = () => {
    if (playingIndex !== null) {
      const video = videoRefs.current.get(playingIndex);
      if (video) {
        video.pause();
      }
      setPlayingIndex(null);
    }
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const child = track?.children[index];
    if (!track || !(child instanceof HTMLElement)) {
      return;
    }
    pausePlayingVideo();
    setActiveIndex(index);
    child.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    for (const [index, child] of [...track.children].entries()) {
      if (!(child instanceof HTMLElement)) {
        continue;
      }
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(childCenter - center);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    }

    if (closest !== activeIndex) {
      pausePlayingVideo();
      setActiveIndex(closest);
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    const child = track?.children[initialIndex];
    if (child instanceof HTMLElement) {
      child.scrollIntoView({
        behavior: 'instant',
        block: 'nearest',
        inline: 'center',
      });
      setActiveIndex(initialIndex);
    }
  }, [initialIndex]);

  const handlePlay = (index: number, isDirect: boolean) => {
    pausePlayingVideo();
    setPlayingIndex(index);
    if (isDirect) {
      setTimeout(() => {
        const video = videoRefs.current.get(index);
        if (video) {
          void video.play();
        }
      }, 0);
    }
  };

  return (
    <section className="overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Heading row with nav arrows */}
      <div className="container mx-auto flex flex-wrap items-end justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={
            <AccentedTitle
              text={heading.title}
              emClass="text-gradient"
            />
          }
          description={heading.description}
          align="left"
          className="max-w-3xl"
        />

        {items.length > 1 && (
          <div className="flex shrink-0 gap-3">
            <IconButton
              variant="outline"
              tone="dark"
              disabled={activeIndex === 0}
              onClick={() => {
                scrollToIndex(activeIndex - 1);
              }}
              ariaLabel="Previous video"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </IconButton>
            <IconButton
              variant="filled"
              tone="dark"
              disabled={activeIndex === items.length - 1}
              onClick={() => {
                scrollToIndex(activeIndex + 1);
              }}
              ariaLabel="Next video"
            >
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </IconButton>
          </div>
        )}
      </div>

      {/* Video carousel */}
      <div className="mt-10 py-6 lg:mt-14 lg:py-10">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 scrollbar-none sm:gap-5 sm:px-[20vw]"
        >
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            const isPlaying = playingIndex === index;
            const videoPath = item.videoPath ?? '/video/1.mp4';
            const parsed = parseVideoSource(videoPath);
            const poster =
              item.image ??
              (parsed.type === 'youtube'
                ? parsed.thumbnailUrl
                : (APP_VIDEOS.commerce.stories[index]?.poster ??
                  APP_VIDEOS.defaultPoster));

            return (
              <div
                key={`${item.title ?? 'story'}-${index}`}
                className={`relative w-[calc(100vw-2rem)] max-w-4xl shrink-0 snap-center overflow-hidden rounded-2xl transition-all duration-500 sm:w-[55vw] ${
                  isActive
                    ? 'scale-100 opacity-100'
                    : 'scale-[0.88] opacity-40 blur-[2px]'
                }`}
              >
                {isPlaying ? (
                  <CommerceActiveVideo
                    parsed={parsed}
                    title={item.title ?? ''}
                    poster={poster}
                    index={index}
                    videoRefs={videoRefs}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (isActive) {
                        handlePlay(index, parsed.type === 'direct');
                      } else {
                        scrollToIndex(index);
                      }
                    }}
                    aria-label={`Play video: ${item.title ?? ''}`}
                    className="group relative block w-full cursor-pointer border-none bg-transparent p-0"
                  >
                    {poster ? (
                      <Image
                        src={poster}
                        alt={item.title ?? ''}
                        width={960}
                        height={540}
                        sizes="(max-width: 640px) 75vw, 55vw"
                        className="aspect-video h-auto w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-video w-full bg-ps-ink-700" />
                    )}
                    <span className="absolute inset-0 bg-black/30" />
                    <YouTubePlayButton />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Carousel pagination indicators */}
        {items.length > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  scrollToIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer border-none p-0 ${
                  activeIndex === idx
                    ? 'w-8 bg-ps-primary'
                    : 'w-2.5 bg-ps-black-200/40 hover:bg-ps-black-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

/** YouTube-style red play button overlay for video thumbnails. */
function YouTubePlayButton() {
  return (
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
      <svg width="68" height="48" viewBox="0 0 68 48" aria-hidden="true">
        <path
          d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
          fill="#FF0000"
        />
        <path d="M45 24L27 14v20" fill="white" />
      </svg>
    </span>
  );
}

// Heading + supporting copy with prev/next arrows,
// over a center-focus video carousel on a dark background strip.
export function ImpactWomen(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  // Track which slide sits closest to the viewport center of the track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const handleScroll = () => {
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

      setActiveIndex(closest);
    };

    handleScroll();
    track.addEventListener('scroll', handleScroll, { passive: true });
    // eslint-disable-next-line @typescript-eslint/consistent-return
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

  // Pause video when its slide is no longer active.
  useEffect(() => {
    if (playingIndex !== null && playingIndex !== activeIndex) {
      const video = videoRefs.current.get(playingIndex);
      if (video) {
        video.pause();
      }
      setPlayingIndex(null);
    }
  }, [activeIndex, playingIndex]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    const child = track?.children[index];
    if (!track || !(child instanceof HTMLElement)) {
      return;
    }
    track.scrollTo({
      left: child.offsetLeft + child.offsetWidth / 2 - track.clientWidth / 2,
      behavior: 'smooth',
    });
  };

  const handlePlay = (index: number) => {
    // Pause any currently playing video
    if (playingIndex !== null) {
      const prev = videoRefs.current.get(playingIndex);
      if (prev) {
        prev.pause();
      }
    }
    setPlayingIndex(index);
    // Allow the video element to mount, then play
    setTimeout(() => {
      const video = videoRefs.current.get(index);
      if (video) {
        void video.play();
      }
    }, 0);
  };

  return (
    <section className="overflow-hidden py-16 lg:py-20">
      {/* Heading row with nav arrows */}
      <div className="container mx-auto flex items-end justify-between gap-6 px-4">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
          align="left"
        />

        {items.length > 1 && (
          <div className="flex shrink-0 gap-3">
            <IconButton
              variant="outline"
              tone="dark"
              disabled={activeIndex === 0}
              onClick={() => scrollToIndex(activeIndex - 1)}
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
              onClick={() => scrollToIndex(activeIndex + 1)}
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

      {/* Video carousel on dark background */}
      <div className="mt-10 py-10 lg:mt-14 lg:py-14">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[10vw] scrollbar-none sm:px-[20vw]"
        >
          {items.map((item, index) => {
            const isActive = activeIndex === index;
            const isPlaying = playingIndex === index;
            const videoPath = item.videoPath ?? '';
            const poster = item.image;

            return (
              <div
                key={`${item.title}-${index}`}
                className={`relative w-[75vw] shrink-0 snap-center overflow-hidden rounded-2xl transition-all duration-500 sm:w-[55vw] ${isActive
                    ? 'scale-100 opacity-100'
                    : 'scale-[0.88] opacity-40 blur-[2px]'
                  }`}
              >
                {isPlaying ? (
                  <video
                    ref={(el) => {
                      if (el) {
                        videoRefs.current.set(index, el);
                      }
                    }}
                    src={videoPath}
                    poster={poster}
                    aria-label={item.title ?? ''}
                    autoPlay
                    controls
                    className="aspect-video h-auto w-full object-cover"
                  >
                    <track kind="captions" />
                  </video>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (isActive) {
                        handlePlay(index);
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
                    {/* Dark overlay */}
                    <span className="absolute inset-0 bg-black/30" />
                    {/* YouTube play button */}
                    <YouTubePlayButton />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

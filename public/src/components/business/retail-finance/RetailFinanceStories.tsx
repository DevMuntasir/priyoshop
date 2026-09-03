'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

function PlayButton() {
  return (
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-lg">
      <svg className="h-10 w-14 sm:h-12 sm:w-17" viewBox="0 0 68 48" aria-hidden="true">
        <path
          d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
          fill="#FF0000"
        />
        <path d="M45 24 27 14v20" fill="white" />
      </svg>
    </span>
  );
}

function ArrowIcon(props: { direction: 'left' | 'right' }) {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d={props.direction === 'left' ? 'M15 19 8 12l7-7' : 'm9 5 7 7-7 7'}
      />
    </svg>
  );
}

/** Shows retailer video stories in a center-focused carousel. */
export function RetailFinanceStories(props: { data: ResolvedSection }) {
  const heading = props.data.heading;
  const items = props.data.items;
  const initialIndex = items.length > 1 ? 1 : 0;
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const pausePlayingVideo = () => {
    if (playingIndex === null) {
      return;
    }

    videoRefs.current.get(playingIndex)?.pause();
    setPlayingIndex(null);
  };

  const scrollToIndex = (index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;
    const slide = track?.children[index];

    if (!track || !(slide instanceof HTMLElement)) {
      return;
    }

    pausePlayingVideo();
    setActiveIndex(index);
    track.scrollTo({
      left: slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2,
      behavior,
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    const slide = track?.children[initialIndex];

    if (!track || !(slide instanceof HTMLElement)) {
      return;
    }

    track.scrollLeft = slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2;
  }, [initialIndex]);

  const handleScroll = () => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const center = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    for (const [index, child] of [...track.children].entries()) {
      if (!(child instanceof HTMLElement)) {
        continue;
      }

      const distance = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    }

    if (closestIndex !== activeIndex) {
      pausePlayingVideo();
      setActiveIndex(closestIndex);
    }
  };

  const playVideo = (index: number) => {
    pausePlayingVideo();
    setPlayingIndex(index);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto flex items-end justify-between gap-6 px-4">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
          align="left"
          titleSize="h2"
          className="max-w-3xl"
        />

        {items.length > 1 && (
          <div className="hidden shrink-0 gap-3 sm:flex">
            <IconButton
              variant="outline"
              tone="dark"
              disabled={activeIndex === 0}
              onClick={() => scrollToIndex(activeIndex - 1)}
              ariaLabel="Previous retailer story"
            >
              <ArrowIcon direction="left" />
            </IconButton>
            <IconButton
              variant="filled"
              tone="dark"
              disabled={activeIndex === items.length - 1}
              onClick={() => scrollToIndex(activeIndex + 1)}
              ariaLabel="Next retailer story"
            >
              <ArrowIcon direction="right" />
            </IconButton>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[11vw] [--story-width:78vw] scrollbar-none sm:mt-14 sm:px-[16vw] sm:[--story-width:68vw] lg:px-[21vw] lg:[--story-width:58vw]"
        role="region"
        aria-label={heading.title}
        aria-roledescription="carousel"
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const isPlaying = playingIndex === index;
          const title = item.title ?? heading.title;
          const videoPath = item.videoPath ?? '';

          return (
            <article
              key={`${title}-${index}`}
              className={`relative aspect-video w-(--story-width) shrink-0 snap-center overflow-hidden rounded-ps-md bg-ps-grey-100 transition-[filter,opacity,transform] duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-30 blur-[2px]'}`}
              aria-label={title}
            >
              {isPlaying ? (
                <video
                  ref={(video) => {
                    if (video) {
                      videoRefs.current.set(index, video);
                    }
                  }}
                  src={videoPath}
                  poster={item.image}
                  aria-label={title}
                  autoPlay
                  controls
                  playsInline
                  className="size-full object-cover"
                >
                  <track kind="captions" />
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (isActive) {
                      playVideo(index);
                    } else {
                      scrollToIndex(index);
                    }
                  }}
                  aria-label={`Play video: ${title}`}
                  className="group relative block size-full cursor-pointer border-0 bg-ps-grey-100 p-0"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 78vw, (max-width: 1023px) 68vw, 58vw"
                      className="object-cover"
                    />
                  ) : (
                    <video
                      src={videoPath}
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      className="size-full object-cover"
                    >
                      <track kind="captions" />
                    </video>
                  )}
                  <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/25" />
                  <PlayButton />
                </button>
              )}
            </article>
          );
        })}
      </div>

      {items.length > 1 && (
        <div className="mt-6 flex justify-center gap-3 sm:hidden">
          <IconButton
            variant="outline"
            tone="dark"
            disabled={activeIndex === 0}
            onClick={() => scrollToIndex(activeIndex - 1)}
            ariaLabel="Previous retailer story"
          >
            <ArrowIcon direction="left" />
          </IconButton>
          <IconButton
            variant="filled"
            tone="dark"
            disabled={activeIndex === items.length - 1}
            onClick={() => scrollToIndex(activeIndex + 1)}
            ariaLabel="Next retailer story"
          >
            <ArrowIcon direction="right" />
          </IconButton>
        </div>
      )}
    </section>
  );
}

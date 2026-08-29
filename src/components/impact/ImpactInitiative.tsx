'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

// Centered heading over a center-focus image carousel with dash pagination:
// the active slide stays crisp while its neighbours peek in dimmed, auto-advancing on a timer.
export function ImpactInitiative(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

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

      activeIndexRef.current = closest;
      setActiveIndex(closest);
    };

    handleScroll();
    track.addEventListener('scroll', handleScroll, { passive: true });
    // eslint-disable-next-line @typescript-eslint/consistent-return
    return () => track.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Auto-advance the carousel with a smooth scroll, looping back to the start.
  useEffect(() => {
    if (isPaused || items.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      scrollToIndex((activeIndexRef.current + 1) % items.length);
    }, 4000);

    // eslint-disable-next-line @typescript-eslint/consistent-return
    return () => {
      clearInterval(timer);
    };
  }, [isPaused, items.length]);

  return (
    <section className={`overflow-hidden py-16 lg:py-24 ${resolved.wrapperClass}`.trim()}>
      <div className="container mx-auto px-4">
        <SectionHeading
          align={resolved.align}
          eyebrow={heading.eyebrow}
          title={heading.title}
          titleSize="h3"
          description={heading.description}
        />
      </div>

      <div
        ref={trackRef}
        onMouseEnter={() => {
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          setIsPaused(false);
        }}
        onTouchStart={() => {
          setIsPaused(true);
        }}
        onTouchEnd={() => {
          setIsPaused(false);
        }}
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-[10vw] pb-2 sm:px-[20vw] scrollbar-none"
      >
        {items.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={`${item.image}-${index}`}
              className={`w-[80vw] shrink-0 snap-center transition-[filter] duration-500 sm:w-[50vw] ${isActive ? 'brightness-100' : 'opacity-50 blur-[1px] scale-90 perspective-distant scale-3d'} relative overflow-hidden`}
            >
              <Image
                src={item.image ?? ''}
                alt={item.imageAlt ?? heading.title}
                width={820}
                height={430}
                sizes="(max-width: 540px) 60vw, 40vw"
                className="aspect-video h-auto w-full rounded-ps-lg object-cover"
              />
              {!isActive && (
                <div className="pointer-events-none absolute inset-0 bg-ps-black/20" />
              )}
            </div>
          );
        })}
      </div>

      {/* Dash pagination mirroring the carousel position. */}
      <div className="mt-8 flex justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={`dot-${item.image}-${index}`}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={activeIndex === index}
            onClick={() => scrollToIndex(index)}
            className={`h-1 min-w-[100px] cursor-pointer rounded-full border-none transition-all duration-300 ${activeIndex === index ? 'w-10 bg-ps-black' : 'w-6 bg-ps-black/20 hover:bg-ps-black/40'
              }`}
          />
        ))}
      </div>
    </section>
  );
}

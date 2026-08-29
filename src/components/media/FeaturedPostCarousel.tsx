'use client';

import { DashPagination } from '@/components/ui/DashPagination';
import { Link } from '@/libs/I18nNavigation';
import type { BlogPostCard } from '@/libs/media/Types';
import { useEffect, useRef, useState } from 'react';
import { formatPostDate } from './formatPostDate';

export type FeaturedPostCarouselProps = {
  posts: BlogPostCard[];
  locale: string;
  readLabel: string;
  dashLabel: string;
};

/* White featured card: cover image left, date + title + underlined link right. */
function FeaturedCard(props: { post: BlogPostCard; locale: string; readLabel: string }) {
  const { post } = props;

  return (
    <article className="grid h-full overflow-hidden rounded-ps-md bg-white shadow-ps-soft ring-1 ring-ps-grey-200 ring-inset sm:grid-cols-[1.15fr_1fr]">
      <div className="aspect-16/10 overflow-hidden sm:aspect-auto sm:min-h-44">
        {post.coverImage && (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <img
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            className="size-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-4 p-6 sm:justify-center sm:gap-6 sm:p-8">
        <span className="font-body text-ps-xs font-semibold text-ps-ink-300">
          {formatPostDate(post.publishedAt, props.locale)}
        </span>
        <h2 className="m-0 line-clamp-3 font-display text-ps-h6 leading-snug font-bold text-ps-black sm:text-ps-h5">
          {post.title}
        </h2>
        <Link
          href={`/media/${post.slug}`}
          className="w-fit font-body text-ps-sm font-semibold text-ps-black underline underline-offset-4 transition-colors hover:text-ps-red-600"
        >
          {props.readLabel}
        </Link>
      </div>
    </article>
  );
}

/* Scroll-snap carousel of featured posts with dash pagination. */
export function FeaturedPostCarousel(props: FeaturedPostCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  if (props.posts.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 pb-16">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 scrollbar-none"
      >
        {props.posts.map((post) => (
          <div key={post.slug} className="w-full max-w-3xl shrink-0 snap-center sm:mx-auto">
            <FeaturedCard post={post} locale={props.locale} readLabel={props.readLabel} />
          </div>
        ))}
      </div>

      {props.posts.length > 1 && (
        <div className="mt-6">
          <DashPagination
            count={props.posts.length}
            activeIndex={activeIndex}
            onSelect={scrollToIndex}
            labelPrefix={props.dashLabel}
          />
        </div>
      )}
    </div>
  );
}

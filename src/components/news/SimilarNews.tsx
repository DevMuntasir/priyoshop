'use client';

import { useState } from 'react';
import { IconButton } from '@/components/ui/IconButton';
import type { NewsPostCard } from '@/libs/news/Types';
import { NewsCard } from './NewsCard';

const CARDS_PER_VIEW = 3;

export type SimilarNewsProps = {
  posts: NewsPostCard[];
  locale: string;
  title: string;
  previousLabel: string;
  nextLabel: string;
};

/* Cream "Similar News" band: heading with prev/next arrows over a 3-card window. */
export function SimilarNews(props: SimilarNewsProps) {
  const [start, setStart] = useState(0);
  const maxStart = Math.max(0, props.posts.length - CARDS_PER_VIEW);
  const visible = props.posts.slice(start, start + CARDS_PER_VIEW);

  if (props.posts.length === 0) {
    return null;
  }

  return (
    <section className="rounded-t-4xl bg-ps-cream py-16 lg:py-20">
      <div className="container mx-auto flex flex-col gap-10 px-4">
        <div className="flex items-center justify-between gap-6">
          <h2 className="m-0 font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
            {props.title}
          </h2>
          {props.posts.length > CARDS_PER_VIEW && (
            <div className="flex shrink-0 gap-3">
              <IconButton
                tone="dark"
                disabled={start === 0}
                onClick={() => setStart((index) => Math.max(0, index - 1))}
                ariaLabel={props.previousLabel}
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </IconButton>
              <IconButton
                variant="filled"
                tone="dark"
                disabled={start >= maxStart}
                onClick={() => setStart((index) => Math.min(maxStart, index + 1))}
                ariaLabel={props.nextLabel}
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </IconButton>
            </div>
          )}
        </div>

        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <NewsCard key={post.slug} post={post} locale={props.locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

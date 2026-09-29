'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CategoryChips } from '@/components/media/CategoryChips';
import { NEWS_CATEGORIES } from '@/libs/news/Categories';
import type { NewsPostCard } from '@/libs/news/Types';
import { NewsCard } from './NewsCard';

const PAGE_SIZE = 12;

export type NewsExplorerProps = {
  posts: NewsPostCard[];
  locale: string;
  title: string;
  description: string;
  allLabel: string;
  loadMoreLabel: string;
};

/*
 * "All News" section: heading, category chips, 2-column card grid and a
 * Load More button. Filtering and paging run client-side over the full
 * published list so the page stays statically cacheable.
 */
export function NewsExplorer(props: NewsExplorerProps) {
  const [active, setActive] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Catalog order, limited to categories actually used by published posts.
  const usedCategories = NEWS_CATEGORIES.filter((category) =>
    props.posts.some((post) => post.categories.includes(category)),
  );

  const filtered = active
    ? props.posts.filter((post) => post.categories.includes(active))
    : props.posts;
  const visible = filtered.slice(0, visibleCount);

  return (
    <section className="rounded-t-4xl bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto flex min-w-0 flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="m-0 font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
            {props.title}
          </h2>
          <p className="mt-2 mb-0 font-body text-ps-xs font-semibold text-ps-black-400 sm:text-ps-sm">
            {props.description}
          </p>
        </div>

        <CategoryChips
          categories={usedCategories}
          active={active}
          onSelect={(category) => {
            setActive(category);
            setVisibleCount(PAGE_SIZE);
          }}
          allLabel={props.allLabel}
        />

        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
          {visible.map((post) => (
            <NewsCard key={post.slug} post={post} locale={props.locale} />
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="mt-4 flex justify-center">
            <Button
              variant="filled"
              tone="dark"
              size="md"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              {props.loadMoreLabel}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

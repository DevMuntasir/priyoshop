'use client';

import { useState } from 'react';
import type { Award } from '@/components/sections/awards/data';
import { AwardCard } from '@/components/ui/AwardCard';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';

const PAGE_SIZE = 12;

export function AwardsExplorer(props: {
  awards: Award[];
  allLabel: string;
  loadMoreLabel: string;
  emptyLabel: string;
}) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Extract unique categories and years for filter tabs
  const categories = Array.from(
    new Set(
      props.awards
        .map((award) => award.category?.trim() ?? '')
        .filter((cat) => cat.length > 0),
    ),
  );

  const filtered = activeFilter
    ? props.awards.filter(
      (award) => award.category === activeFilter || award.year === activeFilter,
    )
    : props.awards;

  const visible = filtered.slice(0, visibleCount);

  return (
    <section className="rounded-t-4xl bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto flex min-w-0 flex-col gap-8 px-4 sm:px-6 lg:px-8">
        {categories.length > 0 ? (
          <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 overscroll-x-contain scrollbar-none sm:mx-0 sm:px-0">
            <button
              type="button"
              onClick={() => {
                setActiveFilter(null);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`min-h-11 shrink-0 cursor-pointer rounded-ps-pill border-none px-4 py-2 font-body text-ps-xs font-semibold whitespace-nowrap transition-colors ${activeFilter === null
                ? 'bg-ps-black text-white'
                : 'bg-transparent text-ps-ink-700 ring-1 ring-ps-grey-300 ring-inset hover:ring-ps-black'
                }`}
            >
              {props.allLabel}
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveFilter(category);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`min-h-11 shrink-0 cursor-pointer rounded-ps-pill border-none px-4 py-2 font-body text-ps-xs font-semibold whitespace-nowrap transition-colors ${activeFilter === category
                  ? 'bg-ps-black text-white'
                  : 'bg-transparent text-ps-ink-700 ring-1 ring-ps-grey-300 ring-inset hover:ring-ps-black'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        ) : null}

        {visible.length === 0 ? (
          <p className="py-12 text-center font-body text-ps-body text-ps-ink-500">
            {props.emptyLabel}
          </p>
        ) : (
          <RevealGroup
            stagger={0.06}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visible.map((award, index) => (
              <Reveal item direction="up" key={`${award.slug}-${index}`}>
                <AwardCard award={award} />
              </Reveal>
            ))}
          </RevealGroup>
        )}

        {visibleCount < filtered.length ? (
          <div className="mt-8 flex justify-center">
            <Button
              size="md"
              tone="dark"
              onClick={() => {
                setVisibleCount((prev) => prev + PAGE_SIZE);
              }}
            >
              {props.loadMoreLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

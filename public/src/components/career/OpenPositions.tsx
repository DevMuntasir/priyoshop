'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { CategoryChips } from '@/components/media/CategoryChips';
import { CAREER_CATEGORIES } from '@/libs/career/Categories';
import type { JobPostingCard } from '@/libs/career/Types';
import { JobRow } from './JobRow';

const PAGE_SIZE = 6;

export type OpenPositionsProps = {
  jobs: JobPostingCard[];
  locale: string;
  title: string;
  allLabel: string;
  vacancyLabel: string;
  deadlineLabel: string;
  applyLabel: string;
  loadMoreLabel: string;
};

/* "Open Positions" section: heading, category chips and a stacked, load-more'd job list. */
export function OpenPositions(props: OpenPositionsProps) {
  const [active, setActive] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const usedCategories = CAREER_CATEGORIES.filter((category) =>
    props.jobs.some((job) => job.category === category),
  );

  const filtered = active ? props.jobs.filter((job) => job.category === active) : props.jobs;
  const visible = filtered.slice(0, visibleCount);

  return (
    <section id="open-positions" className="rounded-t-4xl bg-section-gradient py-16 lg:py-20">
      <div className="container mx-auto flex min-w-0 flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <h2 className="m-0 font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
          {props.title}
        </h2>

        <CategoryChips
          categories={usedCategories}
          active={active}
          onSelect={(category) => {
            setActive(category);
            setVisibleCount(PAGE_SIZE);
          }}
          allLabel={props.allLabel}
        />

        <div className="flex flex-col">
          {visible.map((job) => (
            <JobRow
              key={job.slug}
              job={job}
              locale={props.locale}
              vacancyLabel={props.vacancyLabel}
              deadlineLabel={props.deadlineLabel}
              applyLabel={props.applyLabel}
            />
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

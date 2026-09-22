'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { JobPostingCard } from '@/libs/career/Types';

const CareerJobsContext = createContext<JobPostingCard[] | null>(null);

/**
 * Provides preloaded published jobs to career components.
 * Wrapped by buildCareerSections to avoid redundant client fetching.
 */
export function CareerJobsProvider(props: {
  jobs: JobPostingCard[];
  children: React.ReactNode;
}) {
  return (
    <CareerJobsContext.Provider value={props.jobs}>
      {props.children}
    </CareerJobsContext.Provider>
  );
}

/**
 * Accesses published jobs from context or fetches from API if rendered standalone/preview.
 */
export function useCareerJobs(locale = 'en'): JobPostingCard[] {
  const context = useContext(CareerJobsContext);
  const [fetched, setFetched] = useState<JobPostingCard[]>([]);

  useEffect(() => {
    if (context === null) {
      void fetch(`/api/career/jobs?locale=${encodeURIComponent(locale)}`)
        .then((res) => (res.ok ? res.json() : { jobs: [] }))
        .then((data: { jobs?: JobPostingCard[] }) => {
          if (Array.isArray(data.jobs)) {
            setFetched(data.jobs);
          }
        })
        .catch(() => {});
    }
  }, [context, locale]);

  return context ?? fetched;
}

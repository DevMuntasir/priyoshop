import type { BuildPageSectionsOptions } from '@/components/sections/buildPageSections';
import { buildPageSections } from '@/components/sections/buildPageSections';
import { CareerJobsProvider } from '@/components/career/CareerJobsContext';
import { listPublishedJobPostings } from '@/libs/career/CareerRepository';
import { listSectionKeysByPage } from '@/libs/cms/Sections';

type BuildOptions = Omit<BuildPageSectionsOptions, 'page' | 'keys' | 'extra'>;

/**
 * Composes the career page from its CMS layout and section content.
 */
export async function buildCareerSections(options: BuildOptions): Promise<React.ReactNode> {
  const jobs = await listPublishedJobPostings(options.locale);

  const sections = await buildPageSections({
    page: 'career',
    keys: listSectionKeysByPage('career'),
    ...options,
  });

  return <CareerJobsProvider jobs={jobs}>{sections}</CareerJobsProvider>;
}

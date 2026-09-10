import type { BuildPageSectionsOptions } from '@/components/sections/buildPageSections';
import { buildPageSections } from '@/components/sections/buildPageSections';
import { listSectionKeysByPage } from '@/libs/cms/Sections';

type BuildOptions = Omit<BuildPageSectionsOptions, 'page' | 'keys'>;

// Composes the distribution page from its CMS layout and section content.
export function buildDistributionSections(options: BuildOptions): Promise<React.ReactNode> {
  return buildPageSections({
    page: 'distribution',
    keys: listSectionKeysByPage('distribution'),
    ...options,
  });
}

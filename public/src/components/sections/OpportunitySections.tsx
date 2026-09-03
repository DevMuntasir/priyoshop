import type { BuildPageSectionsOptions } from '@/components/sections/buildPageSections';
import { buildPageSections } from '@/components/sections/buildPageSections';
import { listSectionKeysByPage } from '@/libs/cms/Sections';

type BuildOptions = Omit<BuildPageSectionsOptions, 'page' | 'keys'>;

// Composes the Opportunity page from its CMS layout and section content.
export async function buildOpportunitySections(options: BuildOptions): Promise<React.ReactNode> {
  return await buildPageSections({
    page: 'opportunity',
    keys: listSectionKeysByPage('opportunity'),
    ...options,
  });
}

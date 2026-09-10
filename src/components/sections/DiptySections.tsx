import type { BuildPageSectionsOptions } from '@/components/sections/buildPageSections';
import { buildPageSections } from '@/components/sections/buildPageSections';
import { listSectionKeysByPage } from '@/libs/cms/Sections';

type BuildOptions = Omit<BuildPageSectionsOptions, 'page' | 'keys'>;

// Composes the Dipty brand page from its CMS layout and section content.
export function buildDiptySections(options: BuildOptions): Promise<React.ReactNode> {
  return buildPageSections({
    page: 'dipty',
    keys: listSectionKeysByPage('dipty'),
    ...options,
  });
}

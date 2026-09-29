import type { BuildPageSectionsOptions } from '@/components/sections/buildPageSections';
import { buildPageSections } from '@/components/sections/buildPageSections';
import { listSectionKeysByPage } from '@/libs/cms/Sections';

type BuildOptions = Omit<BuildPageSectionsOptions, 'page' | 'keys'>;

// Composes the about page from its CMS layout and section content.
export function buildAboutSections(options: BuildOptions): Promise<React.ReactNode> {
  return buildPageSections({
    page: 'about',
    keys: listSectionKeysByPage('about'),
    ...options,
  });
}

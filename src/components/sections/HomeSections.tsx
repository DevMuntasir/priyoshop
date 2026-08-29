import type { BuildPageSectionsOptions } from '@/components/sections/buildPageSections';
import { buildPageSections } from '@/components/sections/buildPageSections';
import { ScrollVan } from '@/components/ui/ScrollVan';
import { listSectionKeysByPage } from '@/libs/cms/Sections';

type BuildOptions = Omit<BuildPageSectionsOptions, 'page' | 'keys' | 'extra'>;

// Composes the home page from its CMS layout and section content.
export function buildHomeSections(options: BuildOptions): Promise<React.ReactNode> {
  return buildPageSections({
    page: 'home',
    keys: listSectionKeysByPage('home'),
    extra: { scrollVan: <ScrollVan /> },
    ...options,
  });
}

import type { BuildPageSectionsOptions } from '@/components/sections/buildPageSections';
import { buildPageSections } from '@/components/sections/buildPageSections';
import { listSectionKeysByPage } from '@/libs/cms/Sections';

type BuildOptions = Omit<BuildPageSectionsOptions, 'page' | 'keys'>;

// Composes the retail-finance page from its CMS layout and section content.
export function buildRetailFinanceSections(options: BuildOptions): Promise<React.ReactNode> {
  return buildPageSections({
    page: 'retailFinance',
    keys: listSectionKeysByPage('retailFinance'),
    ...options,
  });
}

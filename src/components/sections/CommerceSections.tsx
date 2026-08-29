import type { BuildPageSectionsOptions } from '@/components/sections/buildPageSections';
import { buildPageSections } from '@/components/sections/buildPageSections';
import { listSectionKeysByPage } from '@/libs/cms/Sections';

type BuildOptions = Omit<BuildPageSectionsOptions, 'page' | 'keys' | 'extra'>;

// Composes the commerce page from its CMS layout and section content.
export function buildCommerceSections(options: BuildOptions): Promise<React.ReactNode> {
  return buildPageSections({
    page: 'commerce',
    keys: listSectionKeysByPage('commerce'),
    // extra: {
    //   commerceRoadScroll: <RoadScrollHero config={{ videoSrc: '/video/road-drive.mp4' }} />,
    // },
    ...options,
  });
}

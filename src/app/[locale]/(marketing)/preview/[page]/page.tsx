import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { buildAboutSections } from '@/components/sections/AboutSections';
import { buildBusinessSections } from '@/components/sections/BusinessSections';
import type { BuildPageSectionsOptions } from '@/components/sections/buildPageSections';
import { buildCommerceSections } from '@/components/sections/CommerceSections';
import { buildDiptySections } from '@/components/sections/DiptySections';
import { buildDistributionSections } from '@/components/sections/DistributionSections';
import { buildHomeSections } from '@/components/sections/HomeSections';
import { buildImpactSections } from '@/components/sections/ImpactSections';
import { buildOpportunitySections } from '@/components/sections/OpportunitySections';
import { buildRetailFinanceSections } from '@/components/sections/RetailFinanceSections';
import { PreviewBridge } from '@/components/sections/PreviewBridge';
import { PreviewSectionSlot } from '@/components/sections/PreviewSectionSlot';
import { getActor } from '@/libs/auth/Rbac';
import type { PageKey } from '@/libs/cms/Pages';
import { isPageKey } from '@/libs/cms/Pages';
import { isSectionKey } from '@/libs/cms/Sections';

// Internal, auth-only live-preview surface for the CMS editor. Not indexable.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type BuildOptions = Omit<BuildPageSectionsOptions, 'page' | 'keys'>;

const BUILDERS: Record<PageKey, (options: BuildOptions) => Promise<React.ReactNode>> = {
  home: buildHomeSections,
  about: buildAboutSections,
  business: buildBusinessSections,
  commerce: buildCommerceSections,
  distribution: buildDistributionSections,
  retailFinance: buildRetailFinanceSections,
  dipty: buildDiptySections,
  impact: buildImpactSections,
  opportunity: buildOpportunitySections,
  portfolio: async () => null,
};

type PreviewPageProps = {
  params: Promise<{ locale: string; page: string }>;
  searchParams: Promise<{ focus?: string }>;
};

export default async function PreviewPage(props: PreviewPageProps) {
  const { locale, page } = await props.params;
  setRequestLocale(locale);

  if (!isPageKey(page)) {
    notFound();
  }

  // Gate the preview surface behind a valid session; never expose it publicly.
  const actor = await getActor();
  if (!actor) {
    notFound();
  }

  const { focus } = await props.searchParams;
  const focusKey = focus && isSectionKey(focus) ? focus : undefined;

  const sections = await BUILDERS[page]({
    locale,
    forceIncludeKey: focusKey,
    wrapEditable: (key, data) => <PreviewSectionSlot sectionKey={key} initial={data} />,
  });

  return <PreviewBridge>{sections}</PreviewBridge>;
}

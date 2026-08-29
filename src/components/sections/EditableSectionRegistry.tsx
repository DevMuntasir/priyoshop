'use client';

import { CommerceBenifits } from '@/components/business/commerce/CommerceBenefits';
import { CommerceFaq } from '@/components/business/commerce/CommerceFaq';
import { CommerceHero } from '@/components/business/commerce/CommerceHero';
import { CommerceHowWork } from '@/components/business/commerce/CommerceHowWork';
import { CommerceRetail } from '@/components/business/commerce/CommerceRetail';
import { CommerceStories } from '@/components/business/commerce/CommerceStories';
// import { DiptyBrandMatters } from '@/components/business/dipty/DiptyBrandMatters';
import { DiptyDownloadApp } from '@/components/business/dipty/DiptyDownloadApp';
import { DiptyFaq } from '@/components/business/dipty/DiptyFaq';
import { DiptyHero } from '@/components/business/dipty/DiptyHero';
import { DiptyIntro } from '@/components/business/dipty/DiptyIntro';
// import { DiptyMedia } from '@/components/business/dipty/DiptyMedia';
import { DiptyProducts } from '@/components/business/dipty/DiptyProducts';
import { DiptyQuality } from '@/components/business/dipty/DiptyQuality';
import { DiptyWhyRetailers } from '@/components/business/dipty/DiptyWhyRetailers';
import { DistributionBrandGrowth } from '@/components/business/distribution/DistributionBrandGrowth';
import { DistributionCoverage } from '@/components/business/distribution/DistributionCoverage';
import { DistributionFaq } from '@/components/business/distribution/DistributionFaq';
import { DistributionHero } from '@/components/business/distribution/DistributionHero';
import { DistributionHowWork } from '@/components/business/distribution/DistributionHowWork';
import { DistributionHubModel } from '@/components/business/distribution/DistributionHubModel';
import { DistributionImpact } from '@/components/business/distribution/DistributionImpact';
import { DistributionPartnerBanner } from '@/components/business/distribution/DistributionPartnerBanner';
// import { DistributionPartnerForm } from '@/components/business/distribution/DistributionPartnerForm';
import { DistributionProcessFlow } from '@/components/business/distribution/DistributionProcessFlow';
import { RetailFinanceCedit } from '@/components/business/retail-finance/RetailFinanceCedit';
import { RetailFinanceHero } from '@/components/business/retail-finance/RetailFinanceHero';
import { RetailFinanceHowWork } from '@/components/business/retail-finance/RetailFinanceHowWork';
import { RetailFinanceIntro } from '@/components/business/retail-finance/RetailFinanceIntro';
import { RetailFinancePartners } from '@/components/business/retail-finance/RetailFinancePartners';
import { RetailFinanceStories } from '@/components/business/retail-finance/RetailFinanceStories';
import { AppBanner } from '@/components/sections/app-banner/AppBanner';
import { Awards } from '@/components/sections/awards/Awards';
import { Backers } from '@/components/sections/backers/Backers';
import { Blogs } from '@/components/sections/blogs/Blogs';
import { Brands } from '@/components/sections/brands/Brands';
import { Career } from '@/components/sections/career/Career';
import {
  DistributionSteps,
  DistributionVideoA,
  DistributionVideoB,
} from '@/components/sections/distribution';
import { Ecosystems } from '@/components/sections/ecosystems/Ecosystems';
import { HeroOne } from '@/components/sections/hero/Hero-one';
import { ImpactGreenHub } from '@/components/impact/ImpactGreenHub';
import { ImpactHero } from '@/components/impact/ImpactHero';
import { ImpactInitiative } from '@/components/impact/ImpactInitiative';
import { ImpactNetwork } from '@/components/impact/ImpactNetwork';
import { ImpactPartnerBanner } from '@/components/impact/ImpactPartnerBanner';
import { ImpactSustainability } from '@/components/impact/ImpactSustainability';
import { ImpactWomen } from '@/components/impact/ImpactWomen';
import { Impact } from '@/components/sections/impact/Impact';
import { Infrastructure } from '@/components/sections/infrastructure/infrastucture';
import { Media } from '@/components/sections/media/Media';
import { OpportunityDistribution } from '@/components/opportunity/OpportunityDistribution';
import { OpportunityGrowth } from '@/components/opportunity/OpportunityGrowth';
import { OpportunityHero } from '@/components/opportunity/OpportunityHero';
import { OpportunityServing } from '@/components/opportunity/OpportunityServing';
import { OpportunityStats } from '@/components/opportunity/OpportunityStats';
import { Opportunity } from '@/components/sections/opportunity/Opportunity';
import { Retail } from '@/components/sections/retail/Retail';
import { Timeline } from '@/components/sections/timeline/Timeline';
import { EmbeddedHero, EmbeddedPartners } from '@/components/ui/Embaded';
import type { ResolvedSection, SectionKey } from '@/libs/cms/Sections';
import { OpportunityHub } from '../opportunity/OpportunityHub';
import { OpportunityDipty } from '../opportunity/OpportunityDipty';
import { CommerceDeliveryRoad } from '../business/commerce/CommerceDeliveryRoad';
import { CommerceBanner } from '../business/commerce/CommerceBanner';
// import { DiptyBrandMatters } from '../business/dipty/DiptyBrandMatters';

// Single source of truth for rendering a CMS-editable section from its resolved
// data, on the client. Used by the live-preview slot so a section looks the same
// in preview as on the public page.
export const EDITABLE_SECTION_RENDERERS: Record<
  SectionKey,
  (data: ResolvedSection) => React.ReactNode
> = {
  ecosystems: (data) => <Ecosystems data={data} />,
  brands: (data) => <Brands data={data} />,
  awards: (data) => <Awards data={data} />,
  backers: (data) => <Backers data={data} />,
  retail: (data) => <Retail data={data} />,
  blogs: (data) => <Blogs data={data} />,
  media: (data) => <Media data={data} />,
  opportunity: (data) => <Opportunity data={data} />,
  impact: (data) => <Impact data={data} />,
  timeline: (data) => <Timeline data={data} />,
  career: (data) => <Career data={data} />,
  appBanner: (data) => <AppBanner data={data} />,
  hero: (data) => <HeroOne data={data} />,
  embeddedHero: (data) => <EmbeddedHero data={data} />,
  embeddedPartners: (data) => <EmbeddedPartners data={data} />,
  infrastructure: (data) => <Infrastructure data={data} />,
  distributionSteps: (data) => <DistributionSteps data={data} />,
  distributionVideoA: (data) => <DistributionVideoA data={data} />,
  distributionVideoB: (data) => <DistributionVideoB data={data} />,
  commerceHero: (data) => <CommerceHero data={data} />,
  commerceRetail: (data) => <CommerceRetail data={data} />,
  commerceHowWork: (data) => <CommerceHowWork data={data} />,
  commerceBenefits: (data) => <CommerceBenifits data={data} />,
  commerceStories: (data) => <CommerceStories data={data} />,
  commerceDelivery: (data) => <CommerceDeliveryRoad data={data} />,
  commerceBanner: (data) => <CommerceBanner data={data} />,
  commerceFaq: (data) => <CommerceFaq data={data} />,

  distributionHero: (data) => <DistributionHero data={data} />,
  distributionCoverage: (data) => <DistributionCoverage data={data} />,
  distributionHubModel: (data) => <DistributionHubModel data={data} />,
  distributionProcessFlow: (data) => <DistributionProcessFlow data={data} />,
  distributionHowWork: (data) => <DistributionHowWork data={data} />,
  distributionImpact: (data) => <DistributionImpact data={data} />,
  distributionBrandGrowth: (data) => <DistributionBrandGrowth data={data} />,
  distributionFaq: (data) => <DistributionFaq data={data} />,
  distributionPartnerBanner: (data) => <DistributionPartnerBanner data={data} />,
  // distributionPartnerForm: (data) => <DistributionPartnerForm data={data} />,
  retailFinanceHero: (data) => <RetailFinanceHero data={data} />,
  retailFinanceIntro: (data) => <RetailFinanceIntro data={data} />,
  retailFinancePartners: (data) => <RetailFinancePartners data={data} />,
  retailFinanceCedit: (data) => <RetailFinanceCedit data={data} />,
  retailFinanceHowWork: (data) => <RetailFinanceHowWork data={data} />,
  retailFinanceStories: (data) => <RetailFinanceStories data={data} />,
  retailFinanceFaq: (data) => <CommerceFaq data={data} />,
  retailFinancePartnerBanner: (data) => <DistributionPartnerBanner data={data} />,
  diptyHero: (data) => <DiptyHero data={data} />,
  diptyIntro: (data) => <DiptyIntro data={data} />,
  diptyWhyRetailers: (data) => <DiptyWhyRetailers data={data} />,
  diptyProducts: (data) => <DiptyProducts data={data} />,
  // diptyBrandMatters: (data) => <DiptyBrandMatters data={data} />,
  diptyQuality: (data) => <DiptyQuality data={data} />,
  diptyDownloadApp: (data) => <DiptyDownloadApp data={data} />,
  // diptyMedia: (data) => <DiptyMedia data={data} />,
  diptyFaq: (data) => <DiptyFaq data={data} />,
  // diptyPartnerForm: (data) => <DistributionPartnerForm data={data} />,
  opportunityHero: (data) => <OpportunityHero data={data} />,
  opportunityStats: (data) => <OpportunityStats data={data} />,
  opportunityGrowth: (data) => <OpportunityGrowth data={data} />,
  opportunityDistribution: (data) => <OpportunityDistribution data={data} />,
  opportunityHub: (data) => <OpportunityHub data={data} />,
  opportunityDipty: (data) => <OpportunityDipty data={data} />,
  opportunityServing: (data) => <OpportunityServing data={data} />,
  // opportunityPartnerForm: (data) => <DistributionPartnerForm data={data} />,
  impactHero: (data) => <ImpactHero data={data} />,
  impactNetwork: (data) => <ImpactNetwork data={data} />,
  impactGreenHub: (data) => <ImpactGreenHub data={data} />,
  impactSustainability: (data) => <ImpactSustainability data={data} />,
  impactWomen: (data) => <ImpactWomen data={data} />,
  impactPartnerBanner: (data) => <ImpactPartnerBanner data={data} />,
  // impactInitiative: (data) => <ImpactInitiative data={data} />,

};

export const renderEditableSection = (key: SectionKey, data: ResolvedSection): React.ReactNode =>
  EDITABLE_SECTION_RENDERERS[key](data);

// Client-component wrapper around the renderer map so server code (e.g.
// buildPageSections) can render an editable section without calling a client
// function — a server component may only reference this module as JSX.
export function EditableSection(props: { sectionKey: SectionKey; data: ResolvedSection }) {
  return <>{renderEditableSection(props.sectionKey, props.data)}</>;
}

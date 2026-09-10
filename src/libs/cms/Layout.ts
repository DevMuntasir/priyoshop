import type { PageKey } from './Pages';

export type LayoutEntry = {
  key: string;
  label: string;
  defaultOrder: number;
  contentEditable: boolean;
};

export const PAGE_LAYOUT: Record<PageKey, LayoutEntry[]> = {
  home: [
    { key: 'hero', label: 'Hero', defaultOrder: 10, contentEditable: true },
    { key: 'ecosystems', label: 'Ecosystems', defaultOrder: 20, contentEditable: true },
    { key: 'distributionSteps', label: 'Distribution steps', defaultOrder: 30, contentEditable: true },
    { key: 'distributionVideoA', label: 'Distribution video (YouTube)', defaultOrder: 32, contentEditable: true },
    { key: 'distributionVideoB', label: 'Distribution video (local)', defaultOrder: 34, contentEditable: true },
    { key: 'retail', label: 'Retail', defaultOrder: 40, contentEditable: true },
    { key: 'brands', label: 'Brands', defaultOrder: 50, contentEditable: true },
    { key: 'embeddedHero', label: 'Embedded finance', defaultOrder: 60, contentEditable: true },
    { key: 'embeddedPartners', label: 'Strategic partners', defaultOrder: 65, contentEditable: true },
    { key: 'infrastructure', label: 'Infrastructure', defaultOrder: 68, contentEditable: true },
    { key: 'impact', label: 'Impact', defaultOrder: 70, contentEditable: true },
    { key: 'opportunity', label: 'Opportunity', defaultOrder: 80, contentEditable: true },
    { key: 'awards', label: 'Awards', defaultOrder: 90, contentEditable: true },
    { key: 'backers', label: 'Backers', defaultOrder: 100, contentEditable: true },
    { key: 'appBanner', label: 'App banner', defaultOrder: 110, contentEditable: true },
    { key: 'media', label: 'Media', defaultOrder: 120, contentEditable: true },
    { key: 'blogs', label: 'Blogs', defaultOrder: 130, contentEditable: true },
    { key: 'timeline', label: 'Timeline', defaultOrder: 140, contentEditable: true },
    { key: 'career', label: 'Career', defaultOrder: 150, contentEditable: true },
    { key: 'scrollVan', label: 'Delivery van', defaultOrder: 160, contentEditable: false },
  ],
  about: [],
  business: [],
  commerce: [
    { key: 'commerceHero', label: 'Hero', defaultOrder: 10, contentEditable: true },
    { key: 'commerceStories', label: 'Success stories', defaultOrder: 20, contentEditable: true },
    { key: 'commerceRetail', label: 'Retail video', defaultOrder: 30, contentEditable: true },
    { key: 'commerceRoadScroll', label: 'Road scroll video', defaultOrder: 40, contentEditable: false },
    { key: 'commerceHowWork', label: 'How it works', defaultOrder: 50, contentEditable: true },
    { key: 'commerceDelivery', label: 'Delivery', defaultOrder: 60, contentEditable: true },
    { key: 'commerceBenefits', label: 'Benefits', defaultOrder: 70, contentEditable: true },
    { key: 'commerceBanner', label: 'Banner', defaultOrder: 80, contentEditable: true },

    { key: 'commerceFaq', label: 'FAQ', defaultOrder: 90, contentEditable: true },
  ],
  distribution: [
    { key: 'distributionHero', label: 'Hero', defaultOrder: 10, contentEditable: true },
    { key: 'distributionCoverage', label: 'Coverage', defaultOrder: 20, contentEditable: true },
    { key: 'distributionHubModel', label: 'Hub model', defaultOrder: 30, contentEditable: true },
    { key: 'distributionProcessFlow', label: 'Distribution process flow', defaultOrder: 35, contentEditable: true },
    { key: 'distributionHowWork', label: 'How it works', defaultOrder: 50, contentEditable: true },
    { key: 'distributionImpact', label: 'Impact', defaultOrder: 40, contentEditable: true },
    { key: 'distributionBrandGrowth', label: 'Brand growth video', defaultOrder: 60, contentEditable: true },
    { key: 'distributionFaq', label: 'FAQ', defaultOrder: 70, contentEditable: true },
    { key: 'distributionPartnerBanner', label: 'Partner banner', defaultOrder: 80, contentEditable: true },
    // { key: 'distributionPartnerForm', label: 'Partner form', defaultOrder: 90, contentEditable: true },
  ],
  retailFinance: [
    { key: 'retailFinanceHero', label: 'Hero', defaultOrder: 10, contentEditable: true },
    { key: 'retailFinanceIntro', label: 'Intro', defaultOrder: 20, contentEditable: true },
    { key: 'retailFinancePartners', label: 'Credit partners', defaultOrder: 30, contentEditable: true },
    { key: 'retailFinanceHowWork', label: 'How it works', defaultOrder: 40, contentEditable: true },
    { key: 'retailFinanceFaq', label: 'FAQ', defaultOrder: 60, contentEditable: true },
    { key: 'retailFinanceStories', label: 'Success stories', defaultOrder: 70, contentEditable: true },
    { key: 'retailFinancePartnerBanner', label: 'Partner banner', defaultOrder: 80, contentEditable: true },
  ],
  dipty: [
    { key: 'diptyHero', label: 'Hero', defaultOrder: 10, contentEditable: true },
    { key: 'diptyIntro', label: 'About Dipty', defaultOrder: 20, contentEditable: true },
    { key: 'diptyWhyRetailers', label: 'Why retailers choose Dipty', defaultOrder: 30, contentEditable: true },
    { key: 'diptyProducts', label: 'Product collection', defaultOrder: 40, contentEditable: true },
    { key: 'diptyBrandMatters', label: 'Why private label matters', defaultOrder: 50, contentEditable: true },
    { key: 'diptyQuality', label: 'Quality pillars', defaultOrder: 60, contentEditable: true },
    // { key: 'diptyMedia', label: 'Media & press', defaultOrder: 80, contentEditable: true },
    { key: 'diptyFaq', label: 'FAQ', defaultOrder: 70, contentEditable: true },
    { key: 'diptyDownloadApp', label: 'Download app banner', defaultOrder: 80, contentEditable: true },
    // { key: 'diptyPartnerForm', label: 'Partner form', defaultOrder: 100, contentEditable: true },
  ],
  impact: [
    { key: 'impactHero', label: 'Hero', defaultOrder: 10, contentEditable: true },
    { key: 'impactNetwork', label: 'Green hub network', defaultOrder: 20, contentEditable: true },
    { key: 'impactGreenHub', label: 'Green hub story', defaultOrder: 30, contentEditable: true },
    { key: 'impactSustainability', label: 'Sustainability', defaultOrder: 40, contentEditable: true },
    { key: 'impactWomen', label: "Women's impact", defaultOrder: 50, contentEditable: true },
    { key: 'impactPartnerBanner', label: 'Partner banner', defaultOrder: 60, contentEditable: true },
    { key: 'impactInitiative', label: 'Green hub initiative', defaultOrder: 70, contentEditable: true },
  ],
  opportunity: [
    { key: 'opportunityHero', label: 'Hero', defaultOrder: 10, contentEditable: true },
    { key: 'opportunityStats', label: 'Opportunities in Bangladesh', defaultOrder: 20, contentEditable: true },
    { key: 'opportunityGrowth', label: 'Growth & possibilities', defaultOrder: 30, contentEditable: true },
    { key: 'opportunityDistribution', label: 'Distribution structure', defaultOrder: 40, contentEditable: true },
    { key: 'opportunityHub', label: 'Hub model', defaultOrder: 50, contentEditable: false },
    { key: 'opportunityDipty', label: 'Dipty', defaultOrder: 60, contentEditable: true },
    { key: 'opportunityServing', label: 'Serving retailers', defaultOrder: 70, contentEditable: true },
    { key: 'opportunityPartnerForm', label: 'Partner form', defaultOrder: 80, contentEditable: true },
  ],
  portfolio: [],
};

export const listLayout = (page: PageKey): LayoutEntry[] => PAGE_LAYOUT[page];

export const isLayoutKey = (page: PageKey, key: string): boolean =>
  PAGE_LAYOUT[page].some((entry) => entry.key === key);

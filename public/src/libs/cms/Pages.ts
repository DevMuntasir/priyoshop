
export const PAGE_KEYS = ['home', 'about', 'business', 'commerce', 'distribution', 'retailFinance', 'dipty', 'impact', 'opportunity', 'portfolio'] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

export const isPageKey = (value: string): value is PageKey =>
  (PAGE_KEYS as readonly string[]).includes(value);

export type PageDef = {
  key: PageKey;
  label: string;
  path: string;
};

export const PAGE_REGISTRY: Record<PageKey, PageDef> = {
  home: { key: 'home', label: 'Home', path: '/' },
  about: { key: 'about', label: 'About', path: '/about' },
  business: { key: 'business', label: 'Business', path: '/business' },
  commerce: { key: 'commerce', label: 'Commerce', path: '/business/commerce' },
  distribution: { key: 'distribution', label: 'Distribution', path: '/business/distribution' },
  retailFinance: { key: 'retailFinance', label: 'Retail finance', path: '/business/retail-finance' },
  dipty: { key: 'dipty', label: 'Dipty', path: '/business/dipty' },
  impact: { key: 'impact', label: 'Impact', path: '/impact' },
  opportunity: { key: 'opportunity', label: 'Opportunity', path: '/opportunity' },
  portfolio: { key: 'portfolio', label: 'Portfolio', path: '/portfolio' },
};

export const getPageDef = (key: PageKey): PageDef => PAGE_REGISTRY[key];

export const listPageDefs = (): PageDef[] => PAGE_KEYS.map((key) => PAGE_REGISTRY[key]);

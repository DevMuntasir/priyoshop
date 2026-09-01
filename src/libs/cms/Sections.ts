import { AWARDS } from '@/components/sections/awards/data';
import { BACKERS } from '@/components/sections/backers/data';
import { BRANDS } from '@/components/sections/brands/data';
import { ECOSYSTEMS } from '@/components/sections/ecosystems/data';
import type { PageKey } from './Pages';
import type { ResponsiveSectionStyle } from './StyleTokens';
import { makeDefaultStyle } from './StyleTokens';

export const SECTION_KEYS = [
  'ecosystems',
  'brands',
  'awards',
  'backers',
  'retail',
  'blogs',
  'media',
  'opportunity',
  'impact',
  'timeline',
  'career',
  'appBanner',
  'hero',
  'embeddedHero',
  'embeddedPartners',
  'infrastructure',
  'distributionSteps',
  'distributionVideoA',
  'distributionVideoB',
  'commerceHero',
  'commerceRetail',
  'commerceHowWork',
  'commerceBenefits',
  'commerceDelivery',
  'commerceStories',
  'commerceFaq',
  'commerceBanner',
  'distributionHero',
  'distributionCoverage',
  'distributionHubModel',
  'distributionProcessFlow',
  'distributionHowWork',
  'distributionImpact',
  'distributionBrandGrowth',
  'distributionFaq',
  'distributionPartnerBanner',
  // 'distributionPartnerForm',
  'retailFinanceHero',
  'retailFinanceIntro',
  'retailFinancePartners',
  'retailFinanceCedit',
  'retailFinanceHowWork',
  'retailFinanceStories',
  'retailFinanceFaq',
  'retailFinancePartnerBanner',
  'diptyHero',
  'diptyIntro',
  'diptyWhyRetailers',
  'diptyProducts',
  // 'diptyBrandMatters',
  'diptyQuality',
  'diptyDownloadApp',
  // 'diptyMedia',
  'diptyFaq',
  // 'diptyPartnerForm',
  'opportunityHero',
  'opportunityStats',
  'opportunityGrowth',
  'opportunityDistribution',
  'opportunityServing',
  // 'opportunityPartnerForm',
  'impactHero',
  'impactNetwork',
  'impactGreenHub',
  'impactSustainability',
  'impactWomen',
  'impactPartnerBanner',
  // 'impactInitiative',
  'opportunityHub',
  'opportunityDipty'
] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export const isSectionKey = (value: string): value is SectionKey =>
  (SECTION_KEYS as readonly string[]).includes(value);

export type ItemKind =
  | 'logo'
  | 'award'
  | 'ecosystem'
  | 'card'
  | 'post'
  | 'news'
  | 'metric'
  | 'goal'
  | 'timeline'
  | 'gallery'
  | 'stat'
  | 'slide'
  | 'faq'
  | 'video'
  | 'product'
  | 'feature';

export type LogoItem = { name: string; logo: string };
export type AwardItem = { name: string; caption: string; logo: string };
export type EcosystemItem = {
  title: string;
  body: string;
  image: string;
  imageAlt?: string;
  ctaLabel?: string;
  href?: string;
  reverse?: boolean;
};

export type SectionItem = {
  name?: string;
  logo?: string;
  caption?: string;
  title?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
  href?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  /** CTA button tone (hero slides). */
  ctaTone?: 'auto' | 'light' | 'dark';
  reverse?: boolean;
  /** Description text (hero slides, ecosystems). */
  description?: string;
  value?: string;
  tag?: string;
  date?: string;
  year?: string;
  size?: 'short' | 'tall';
  column?: 'a' | 'b';
  /** Text color override (hero slides). */
  textColor?: string;
  /** Description color override (hero slides). */
  descriptionColor?: string;
  /** Title/heading size (hero slides). */
  textSize?: string;
  /** Description size (hero slides). */
  descriptionSize?: string;
  /** Maximum content width (hero slides). */
  contentWidth?: string;
  /** Words within the title that receive the accent color (hero slides). */
  accentWords?: string;
  /** Accent-word color (hero slides). */
  accentColor?: string;
  /** Accent gradient start color (hero slides). */
  accentGradientFrom?: string;
  /** Accent gradient end color (hero slides). */
  accentGradientTo?: string;
  /** Slide background image (overrides gradient). */
  slideBackgroundImage?: string;
  /** Slide background color or utility class. */
  slideBackgroundColor?: string;
  /** Slide alignment (left/center). */
  slideAlign?: 'left' | 'center';
  /** Local video path (video items, e.g. success stories). */
  videoPath?: string;
  groupImages?: string[]
};

export type SectionHeadingContent = {
  eyebrow?: string;
  title: string;
  titleTrail?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  backgroundImage?: string;
  rotatingWords?: string[];
  /** YouTube id (distribution video block A). */
  videoId?: string;
  /** Local video path (distribution video block B). */
  videoPath?: string;
  /** Legacy hero text color retained for slide-data migration. */
  textColor?: string;
  /** Legacy hero title size retained for slide-data migration. */
  textSize?: string;
  /** Legacy hero alignment retained for slide-data migration. */
  slideAlign?: 'left' | 'center';
};

export type SectionContent = {
  heading: SectionHeadingContent;
  items: SectionItem[];
  format?: 'hero-slides-v2';
};

export type ResolvedSection = {
  key: SectionKey;
  enabled: boolean;
  order: number;
  style: ResponsiveSectionStyle;
  heading: SectionHeadingContent;
  items: SectionItem[];
};

export type SectionEditorHints = {
  titleTrail?: boolean;
  sectionCta?: boolean;
  secondaryCta?: boolean;
  backgroundImage?: boolean;
  rotatingWords?: boolean;
  /** Show text color / size / alignment fields for a section heading. */
  textStyle?: boolean;
  headingOnly?: boolean;
  /** Hide section-level heading fields and edit only the section items. */
  itemsOnly?: boolean;
  /** Show YouTube-id and local-video-path fields (distribution video blocks). */
  video?: boolean;
};

export type SectionDef = {
  key: SectionKey;
  label: string;
  page: PageKey;
  itemKind: ItemKind;
  defaultOrder: number;
  defaultStyle: ResponsiveSectionStyle;
  defaultContent: SectionContent;
  editor?: SectionEditorHints;
};


export const SECTION_REGISTRY: Record<SectionKey, SectionDef> = {
  ecosystems: {
    key: 'ecosystems',
    label: 'Ecosystems',
    page: 'home',
    itemKind: 'ecosystem',
    defaultOrder: 20,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'Ecosystem at a Glance',
        title: 'Our Business & Ecosystem',
        description: 'Empowering MSMEs through technology and seamless supply chains.',
      },
      items: ECOSYSTEMS,
    },
  },
  brands: {
    key: 'brands',
    label: 'Brands',
    page: 'home',
    itemKind: 'logo',
    defaultOrder: 50,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        title: 'Trusted by 40+ Brands',
        description: 'One B2B Platform for All Your Retail Business Needs',
      },
      items: BRANDS,
    },
  },
  awards: {
    key: 'awards',
    label: 'Awards',
    page: 'home',
    itemKind: 'award',
    defaultOrder: 90,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: { title: 'Awards & Recognition', titleTrail: 'Moments' },
      items: AWARDS,
    },
    editor: { titleTrail: true },
  },
  backers: {
    key: 'backers',
    label: 'Backers',
    page: 'home',
    itemKind: 'logo',
    defaultOrder: 100,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        eyebrow: 'PriyoShop Investors',
        title: 'Meet Our Backers',
        description: 'Meet our investors who drive us to achieve greater things.',
      },
      items: BACKERS,
    },
  },
  retail: {
    key: 'retail',
    label: 'Retail',
    page: 'home',
    itemKind: 'card',
    defaultOrder: 40,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        eyebrow: 'PriyoShop Retail',
        title: 'Data-Driven Retail Infrastructure',
        description:
          'PriyoShop combines commerce, logistics, embedded finance, and data intelligence to build a smarter retail ecosystem for Bangladesh.',
        ctaLabel: 'Learn More',
      },
      items: [
        { image: '/career/1.png', title: 'Commerce', body: 'A unified retail storefront' },
        { image: '/career/2.png', title: 'Logistics', body: 'Last-mile delivery at scale' },
        { image: '/career/3.png', title: 'Embedded finance', body: 'Credit where it is needed' },
        { image: '/career/4.png', title: 'Data intelligence', body: 'Insight across the network' },
      ],
    },
    editor: { sectionCta: true },
  },
  blogs: {
    key: 'blogs',
    label: 'Blogs',
    page: 'home',
    itemKind: 'post',
    defaultOrder: 130,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: { eyebrow: 'Insights', title: 'Read our Blogs', ctaLabel: 'Read All Blogs' },
      items: [
        {
          title: "Five ways smart restocking boosts a corner shop's monthly margin",
          date: '08 Jun 2026',
          image: '/blogs/1.png',
        },
        {
          title: 'What last-mile logistics looks like across 48 districts',
          date: '29 May 2026',
          image: '/blogs/2.png',
        },
        {
          title: 'Working capital, explained: stocking more without the cash-flow gap',
          date: '14 May 2026',
          image: '/blogs/3.png',
        },
      ],
    },
    editor: { sectionCta: true },
  },
  media: {
    key: 'media',
    label: 'Media',
    page: 'home',
    itemKind: 'news',
    defaultOrder: 120,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        eyebrow: 'Media & News',
        title: 'Top Headlines Are Taking About Us',
        description:
          'Get the latest news from PriyoShop, revolutionizing retail in Bangladesh with innovative commerce, logistics, finance, and data solutions.',
        ctaLabel: 'Read All News',
      },
      items: [
        {
          name: 'The Business Standard',
          logo: '/icons/bs.svg',
          title: 'PriyoShop, insightgenie and community bank launch AI credit scoring for MSMEs',
          date: '03 Sep, 2025',
          image: '/blogs/1.png',
        },
        {
          name: 'The Business Standard',
          logo: '/icons/bs.svg',
          title: 'PriyoShop named among the top 100 fastest-growing companies of 2024',
          date: '03 Sep, 2025',
          image: '/blogs/2.png',
        },
        {
          name: 'The Business Standard',
          logo: '/icons/bs.svg',
          title: 'How PriyoShop is rewiring retail distribution across Bangladesh',
          date: '03 Sep, 2025',
          image: '/blogs/3.png',
        },
      ],
    },
    editor: { sectionCta: true },
  },
  opportunity: {
    key: 'opportunity',
    label: 'Opportunity',
    page: 'home',
    itemKind: 'metric',
    defaultOrder: 80,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        title: 'Opportunities in Bangladesh',
        description: 'One B2B Platform for All Your Retail Business Needs',
        backgroundImage: '/opportunities/1.png',
      },
      items: [
        { value: '6M', name: 'MSMEs' },
        { value: '$200B', name: 'Annual GMV by MSMEs' },
        { value: '$2.8B', name: 'Financial Gap' },
      ],
    },
    editor: { backgroundImage: true },
  },
  impact: {
    key: 'impact',
    label: 'Impact',
    page: 'home',
    itemKind: 'goal',
    defaultOrder: 70,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        title: 'Creating Impact Beyond Commerce',
        description:
          'PriyoShop empowers retailers, women entrepreneurs, and green hubs with technology-led commerce that strengthens communities beyond every transaction.',
        ctaLabel: 'Learn more',
        backgroundImage: '/impact/section.png',
        ctaHref: '/impact',
      },
      items: [
        { value: '8', title: 'Decent work and economic growth', image: '/impact/1.png' },
        { value: '12', title: 'Responsible consumption and production', image: '/impact/2.png' },
        { value: '1', title: 'No poverty', image: '/impact/3.png' },
        { value: '9', title: 'Industry, innovation and infrastructure', image: '/impact/4.png' },
        { value: '13', title: 'Climate action', image: '/impact/5.png' },
      ],
    },
  },
  timeline: {
    key: 'timeline',
    label: 'Timeline',
    page: 'home',
    itemKind: 'timeline',
    defaultOrder: 140,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: { eyebrow: 'Our Journey', title: 'How the Journey Started' },
      items: [
        { year: '2017', title: "PriyoShop Started It's Journey", logo: '/timeline/1.svg' },
        { year: '2018', title: 'First 1,000 Retailers', logo: '/timeline/2.svg' },
        { year: '2019', title: 'Expanded to All Divisions', logo: '/timeline/3.svg' },
        { year: '2020', title: 'Launched PriyoShop App', logo: '/timeline/4.svg' },
        { year: '2021', title: '100,000+ Retailers', logo: '/timeline/5.svg' },
        { year: '2022', title: '20+ Hubs Operational', logo: '/timeline/6.svg' },
        { year: '2023', title: '30+ Hubs Operational', logo: '/timeline/7.svg' },
        { year: '2024', title: '40+ Hubs & Counting…', logo: '/timeline/8.svg' },
      ],
    },
  },
  career: {
    key: 'career',
    label: 'Career',
    page: 'home',
    itemKind: 'gallery',
    defaultOrder: 150,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        eyebrow: 'Career',
        title: 'Grow With a Team that Grows Together',
        description:
          'Join a workplace where innovation, collaboration, and continuous learning help people build meaningful careers and create lasting impact.',
        ctaLabel: 'View Current Opening',
        ctaHref: '/career',
      },
      items: [
        { image: '/career/1.png', imageAlt: 'PriyoShop team members at work' },
        { image: '/career/5.png', imageAlt: 'PriyoShop award celebration' },
        { image: '/career/3.png', imageAlt: 'PriyoShop event performance' },
        { image: '/career/4.png', imageAlt: 'PriyoShop speaker on stage' },
        { image: '/career/6.png', imageAlt: 'PriyoShop team collaboration' },
        { image: '/career/7.png', imageAlt: 'PriyoShop team outing' },
      ],
    },
    editor: { sectionCta: true },
  },
  appBanner: {
    key: 'appBanner',
    label: 'App banner',
    page: 'home',
    itemKind: 'card',
    defaultOrder: 110,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'One Mobile App',
        title: 'One App for Smarter Retail Growth',
        description: 'Manage sourcing, financing, and business growth through a single digital platform.',
        backgroundImage: '/app-banner/bg.png'
      },
      items: [{
        image: '/app-banner/play.png',
        ctaLabel: 'play store',
        href: '#',
      }],

    },
    editor: { headingOnly: true },
  },
  hero: {
    key: 'hero',
    label: 'Hero',
    page: 'home',
    itemKind: 'slide',
    defaultOrder: 10,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: { title: 'Hero slides' },
      items: ['Distribution Partner', 'Credit Partner', 'Retails Partner'].map((accentWords) => ({
        title: `Bangladeshs\nLeading ${accentWords}`,
        description:
          'We connect five million MSMEs to leading brands through a tech-driven distribution platform',
        ctaLabel: 'Join Us',
        ctaSecondaryLabel: 'Watch Our Story',
        ctaTone: 'dark',
        accentWords,
        accentGradientFrom: '#dc2626',
        accentGradientTo: '#f59e0b',
        slideBackgroundColor: 'bg-hero-gradient',
        textColor: 'text-ps-ink-700',
        descriptionColor: 'text-ps-ink-700',
        textSize: 'text-[clamp(2.25rem,10vw,4.375rem)]',
        descriptionSize: 'text-ps-body',
        contentWidth: 'max-w-3xl',
        slideAlign: 'left',
      })),
      format: 'hero-slides-v2',
    },
    editor: { itemsOnly: true },
  },
  embeddedHero: {
    key: 'embeddedHero',
    label: 'Embedded finance',
    page: 'home',
    itemKind: 'card',
    defaultOrder: 60,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        title: 'Embedded\nFinance',
        description: 'Unlock Growth & Smart Retail Finance',
        ctaLabel: 'Learn More',
      },
      items: [],
    },
    editor: { headingOnly: true, sectionCta: true },
  },
  embeddedPartners: {
    key: 'embeddedPartners',
    label: 'Strategic partners',
    page: 'home',
    itemKind: 'logo',
    defaultOrder: 65,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: { title: 'Strategic Partners' },
      items: [
        { name: '', logo: '/embedded/1.png' },
        { name: '', logo: '/embedded/2.png' },
        { name: '', logo: '/embedded/3.png' },
        { name: '', logo: '/embedded/4.png' },
      ],
    },
  },
  infrastructure: {
    key: 'infrastructure',
    label: 'Infrastructure',
    page: 'home',
    itemKind: 'card',
    defaultOrder: 68,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        eyebrow: 'PriyoShop Retail',

        title: 'Building Data-Driven Retail Infrastructure',
        description:
          'Connecting retailers, brands, distribution, finance and media through a unified platform powered by real-time retail intelligence.',
      },
      items: [
        { image: '/infrastucture/1.png', imageAlt: 'Retail infrastructure overview' },
        { image: '/infrastucture/2.png', imageAlt: 'Logistics infrastructure' },
        { image: '/infrastucture/3.png', imageAlt: 'Data-driven retail operations' },
        { image: '/infrastucture/4.png', imageAlt: 'Connected retail network' },
      ],
    },
  },
  distributionSteps: {
    key: 'distributionSteps',
    label: 'Distribution steps',
    page: 'home',
    itemKind: 'card',
    defaultOrder: 30,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: { title: 'Retail growth steps' },
      items: [
        {
          title: 'Digitalisation',
          body: 'Helping MSMEs manage sourcing and inventory with a fully digital platform.',
          image: '/ecosystem/ecosystem-a.png',
          imageAlt: 'Warehouse staff managing inventory',
        },
        {
          title: 'Sales Booster',
          body: 'Increase retail sales through better product access and reliable restocking.',
          image: '/ecosystem/ecosystem-a.png',
          imageAlt: 'Stacked goods ready for distribution',
        },
        {
          title: 'Time Saver',
          body: 'Save hours every week with streamlined ordering and fast doorstep delivery.',
          image: '/ecosystem/ecosystem-a.png',
          imageAlt: 'Fast last-mile delivery',
        },
        {
          title: 'Sales Booster',
          body: 'Increase retail sales through better product access and reliable restocking.',
          image: '/ecosystem/ecosystem-a.png',
          imageAlt: 'Stacked goods ready for distribution',
        },
      ],
    },
  },
  distributionVideoA: {
    key: 'distributionVideoA',
    label: 'Distribution video (YouTube)',
    page: 'home',
    itemKind: 'card',
    defaultOrder: 32,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        title: 'Last mile distribution in Bangladesh',
        description:
          'Revolutionizing B2B distribution by integrating advanced technology solutions to streamline operations, enhance supply chain visibility, and improve customer engagement.',
        videoPath: '/video/1.mp4',
      },
      items: [],
    },
    editor: { headingOnly: true, video: true },
  },
  distributionVideoB: {
    key: 'distributionVideoB',
    label: 'Distribution video (local)',
    page: 'home',
    itemKind: 'card',
    defaultOrder: 34,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        title: 'One B2B Platform for All Your Retail Business Needs',
        description: 'One B2B Platform for All Your Retail Business Needs',
        videoPath: '/video/1.mp4',
      },
      items: [],
    },
    editor: { headingOnly: true, video: true },
  },
  commerceHero: {
    key: 'commerceHero',
    label: 'Hero',
    page: 'commerce',
    itemKind: 'metric',
    defaultOrder: 10,
    defaultStyle: makeDefaultStyle({ align: 'left' }),

    defaultContent: {

      heading: {

        title: "Building the Future of ~Retail Distribution~",
        description:
          'PriyoShop is creating a smarter infrastructure layer for brands, retailers, and MSME growth.',
        ctaLabel: 'Install App',
      },
      items: [
        { value: '296', name: 'Brands' },
        { value: '200k', name: 'MSMEs' },
        { value: '1428', name: 'Route Coverage' },
        // { value: '296', name: 'Brands' },
      ],
    },
    editor: { sectionCta: true },
  },
  commerceBanner: {
    key: 'commerceHero',
    label: 'Hero',
    page: 'commerce',
    itemKind: 'metric',
    defaultOrder: 10,
    defaultStyle: makeDefaultStyle({ align: 'left' }),

    defaultContent: {

      heading: {
        eyebrow: "PriyoShop Retail App",
        title: "One App for Everyday Retail Growth",
        description:
          'PriyoShop helps retailers restock faster, access credit, and manage business needs easily. ',
        ctaLabel: 'Install App',
        ctaHref: '#'
      },
      items: [
        { value: '296', name: 'Brands' },
        { value: '200k', name: 'MSMEs' },
        { value: '1428', name: 'Route Coverage' },
        // { value: '296', name: 'Brands' },
      ],
    },
    editor: { sectionCta: true },
  },
  commerceRetail: {
    key: 'commerceRetail',
    label: 'Retail video',
    page: 'commerce',
    itemKind: 'card',
    defaultOrder: 20,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'What PriyoShop Retail Does',
        title: 'Delivering to Retailers Across Bangladesh',
        description:
          'PriyoShop supplies FMCG products directly to retailers’ doorsteps, making it easier for them to restock branded items without closing their shops. With PriyoShop, retailers can order what they need without leaving their stores.',
        videoPath: '/video/1.mp4',
      },
      items: [],
    },
    editor: { headingOnly: true, video: true },
  },
  commerceHowWork: {
    key: 'commerceHowWork',
    label: 'How the app works',
    page: 'commerce',
    itemKind: 'card',
    defaultOrder: 40,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'Hub Model',
        title: 'How the app works',
        description:
          'Thousands of retailers across Bangladesh use the PriyoShop Retail App to order products, access credit, and restock their shops easily.',
      },
      items: [
        { title: 'Install Retail App', image: '/business/w-1.png' },
        { title: 'Enter Phone Number', image: '/business/w-2.png' },
        { title: 'Complete KYC', image: '/business/w-3.png' },
        { title: 'Get Access to Thousands of SKU', image: '/business/w-4.png' },
      ],
    },
  },
  commerceBenefits: {
    key: 'commerceBenefits',
    label: 'Benefits',
    page: 'commerce',
    itemKind: 'card',
    defaultOrder: 50,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'Facilities',
        title: 'Empowering Retailers Through Infrastructure',
        description: 'Our Hub Model streamlines supply chains and enhances financial services, helping small businesses thrive and grow across Bangladesh.      '
      },
      items: [
        { title: 'Thousands of Products', body: 'All groceries essentials are available on one platform', image: '/business/f5.png' },
        { title: 'Best in Quality', body: 'Eliminating intermediaries, connecting 296+ brands to last-mile retailers.', image: '/business/f4.png' },
        { title: 'Wholesale Pricing', body: 'Retailers get clear, low prices without bargaining or hidden charges.', image: '/business/f3.png' },
        { title: 'Delivery across Bangladesh', body: 'Retail grocery products are delivered directly to store locations.', image: '/business/f2.png' },
        { title: 'Easy Credit Access', body: 'Restock confidently with our hassle-free credit facilities for retailers.', image: '/business/f6.png' },
        { title: 'Helpful Support', body: 'Our dedicated support team is always available to answer your questions.', image: '/business/f1.png' },
      ],
    },
  },
  commerceDelivery: {
    key: 'commerceBenefits',
    label: 'Benefits',
    page: 'commerce',
    itemKind: 'card',
    defaultOrder: 50,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'Facilities',
        title: '~Empowering Retailers~ Through Nationwide Distribution',
        description: 'PriyoShop helps neighborhood retailers access products faster, reduce stock gaps, and serve customers better across Bangladesh.'
      },
      items: [
        { title: 'Thousands of Products', body: 'All groceries essentials are available on one platform', image: '/business/f1.png' },
        { title: 'Best in Quality', body: 'Eliminating intermediaries, connecting 296+ brands to last-mile retailers.', image: '/business/f2.png' },
        { title: 'Wholesale Pricing', body: 'Retailers get clear, low prices without bargaining or hidden charges.', image: '/business/f3.png' },
        { title: 'Delivery across Bangladesh', body: 'Retail grocery products are delivered directly to store locations.', image: '/business/f4.png' },
        { title: 'Easy Credit Access', body: 'Restock confidently with our hassle-free credit facilities for retailers.', image: '/business/f5.png' },
        { title: 'Helpful Support', body: 'Our dedicated support team is always available to answer your questions.', image: '/business/f6.png' },
      ],
    },
  },
  commerceStories: {
    key: 'commerceStories',
    label: 'Success stories',
    page: 'commerce',
    itemKind: 'video',
    defaultOrder: 60,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'Our Story',
        title: 'Building  ~Stronger~ ~Retail~ Businesses  Across Bangladesh ',
        description: 'We help neighborhood retailers reduce stock-outs, order products easily, and access the support they need to run stronger, more resilient businesses. '
      },
      items: [

      ],
    },
  },
  commerceFaq: {
    key: 'commerceFaq',
    label: 'FAQ',
    page: 'commerce',
    itemKind: 'faq',
    defaultOrder: 70,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'FAQ',
        title: 'Frequently Asked Questions',
        description:
          "If you can't find a answer that you're looking for, feel free to drop us a message.",
      },
      items: [
        { title: 'Can retailers outside Dhaka use the service?', body: 'Yes, delivery is available in major districts of Bangladesh.' },
        { title: 'Is the app only for large retail businesses?', body: 'No, retailers of every size can order wholesale groceries through the PriyoShop app.' },
      ],
    },
  },
  distributionHero: {
    key: 'distributionHero',
    label: 'Hero',
    page: 'distribution',
    itemKind: 'metric',
    defaultOrder: 10,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        title: '~Powering brand distribution~ with smart hubs and nationwide reach.',
        description:
          'We help brands reach more businesses by ensuring smooth delivery across regions. From marketing to logistics, we support your growth journey.',
        ctaLabel: 'Install App',
      },
      items: [
        { value: '42', name: 'Hubs' },
        { value: '16', name: 'Districts' },
        { value: '1458', name: 'Routes' },
        { value: '200K+', name: 'Retailers' },
      ],
    },
    editor: { sectionCta: true },
  },
  distributionCoverage: {
    key: 'distributionCoverage',
    label: 'Coverage',
    page: 'distribution',
    itemKind: 'card',
    defaultOrder: 20,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'About Distribution',
        title: '~What is~ PriyoShop Distribution?',
        description:
          'PriyoShop Distribution connects brands directly with neighborhood retailers through a technology-driven hub-and-route network, improving product availability, delivery speed, market reach and retail execution across Bangladesh.',
        videoPath: '/video/1.mp4',
        backgroundImage: '/distribution/about.png'
      },
      items: [],
    },
    editor: { headingOnly: true, video: true },
  },
  distributionHubModel: {
    key: 'distributionHubModel',
    label: 'Hub model',
    page: 'distribution',
    itemKind: 'card',
    defaultOrder: 30,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'Hub',
        title: 'Our Hub Network',
      },
      items: [
        {
          title: 'Strategically Located Hubs',
          body: 'Placed in key regions to ensure maximum coverage and speed.',
          image: '/about/12.png',
        },
        {
          title: 'High Capacity Operations',
          body: 'Designed to handle large volumes with efficiency and accuracy.',
          image: '/about/10.png',
        },
        {
          title: 'Smart Inventory Management',
          body: 'Real-time stock visibility for better availability.',
          image: '/about/13.png',
        },
        {
          title: 'Skilled Local Workforce',
          body: 'Dedicated teams driving operational excellence.',
          image: '/about/15.png',
        },
        {
          title: 'Green & Sustainable Infrastructure',
          body: 'Solar-powered hubs and eco-friendly operations.',
          image: '/about/14.png',
        },
      ],
    },
  },
  distributionProcessFlow: {
    key: 'distributionProcessFlow',
    label: 'Distribution process flow',
    page: 'distribution',
    itemKind: 'card',
    defaultOrder: 35,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        eyebrow: 'Process Flow',
        title: 'How PriyoShop\nPowers\nDistribution?',
        description:
          'From brand partnership to retail shelf, PriyoShop manages the full distribution journey through smart operations, optimized delivery and data-driven market intelligence.',
      },
      items: [
        {
          title: 'Brand Partnership',
          body: 'We partner with brands to understand their distribution goals, target markets and product availability needs.',
          image: '/retail/5.png',
        },
        {
          title: 'Inventory & Hub Operations',
          body: 'Products are received, stored and managed through PriyoShop’s hub network for faster fulfilment.',
          image: '/retail/2.png',
        },
        {
          title: 'Smart Order Management',
          body: 'Retailer orders are captured through digital channels and processed through PriyoShop’s technology platform.',
          image: '/retail/3.png',
        },
        {
          title: 'Distribution & Last-Mile Delivery',
          body: 'Orders are routed through optimized delivery paths and delivered directly to retailers.',
          image: '/retail/4.png',
        },
        {
          title: 'Retail Availability',
          body: 'Products reach retail stores on time, helping retailers keep shelves stocked and serve customers better.',
          image: '/retail/6.png',
        },
        {
          title: 'Data & Market Intelligence',
          body: 'Sales trends, retailer demand and order insights help brands make smarter distribution and business decisions.',
          image: '/retail/7.png',
        },
      ],
    },
  },
  distributionHowWork: {
    key: 'distributionHowWork',
    label: 'How it works',
    page: 'distribution',
    itemKind: 'card',
    defaultOrder: 40,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'How it Works',
        title: 'Why Partners Choose PriyoShop',
        description:
          'Thousands of retailers in Bangladesh rely on PriyoShop to streamline their wholesale ordering process.',
      },
      items: [
        { title: 'Real-time demand analytics optimize supply chain.', image: '/business/w-1.png' },
        { title: 'Digitalization order reduces manual inefficiencies by 30-40%.', image: '/business/w-2.png' },
        { title: 'Direct access to millions of MSMEs ensures wider market penetration.', image: '/business/w-3.png' },
        { title: 'DOOH: In-store digital ad at retail shops to enhance brand visibility.', image: '/business/w-4.png' },
      ],
    },
  },
  distributionImpact: {
    key: 'distributionImpact',
    label: 'Impact',
    page: 'distribution',
    itemKind: 'card',
    defaultOrder: 50,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'Distribution Impact',
        title: 'Tech Driven Distribution',
        backgroundImage: '/distribution/impact.png',
        description:
          'PriyoShop uses technology to make distribution faster, smarter, and more transparent from retailer orders and inventory visibility to route planning, delivery tracking and market intelligence.',
      },
      items: [
        { title: 'Real-time inventory visibility' },
        { title: 'Smart order management' },
        { title: 'Route optimization & tracking' },
        { title: 'Sales & performance dashboard' },
        { title: 'Demand forecasting & analytics' },
        { title: 'Seamless integration with partners' },
      ],
    },
  },
  distributionBrandGrowth: {
    key: 'distributionBrandGrowth',
    label: 'Brand growth video',
    page: 'distribution',
    itemKind: 'card',
    defaultOrder: 60,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        title: 'Together with Brands, Growing Retail',
        description:
          'PriyoShop’s distribution infrastructure helps brands expand market reach, improve product availability, reduce delivery inefficiencies and serve retailers faster across Bangladesh.',
        videoPath: '/video/1.mp4',
      },
      items: [],
    },
    editor: { headingOnly: true, video: true },
  },
  distributionFaq: {
    key: 'distributionFaq',
    label: 'FAQ',
    page: 'distribution',
    itemKind: 'faq',
    defaultOrder: 70,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'FAQ',
        title: 'Frequently Asked Questions',
        description:
          "If you can’t find an answer that you’re looking for, feel free to drop us a message.",
        titleTrail: 'Got anymore questions?',
        ctaLabel: 'Get in Touch',
        ctaHref: '/contact',
      },
      items: [
        {
          title: 'Can retailers outside Dhaka use the service?',
          body: 'Yes, delivery is available in major districts of Bangladesh.',
        },
        {
          title: 'Is the app only for large retail businesses?',
          body: 'No, retailers of every size can order wholesale groceries through the PriyoShop app.',
        },
      ],
    },
    editor: { titleTrail: true, sectionCta: true },
  },
  distributionPartnerBanner: {
    key: 'distributionPartnerBanner',
    label: 'Partner banner',
    page: 'distribution',
    itemKind: 'card',
    defaultOrder: 80,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        title: 'Wants to partner with us?',
        description:
          'Interested in partnering? Join us to unlock exclusive benefits and grow together. Let’s achieve great results as partners.',
        ctaLabel: 'Contact Us',
        ctaHref: '/contact',
      },
      items: [],
    },
    editor: { headingOnly: true, sectionCta: true },
  },
  // distributionPartnerForm: {
  //   key: 'distributionPartnerForm',
  //   label: 'Partner form',
  //   page: 'distribution',
  //   itemKind: 'card',
  //   defaultOrder: 90,
  //   defaultStyle: makeDefaultStyle({ align: 'center' }),
  //   defaultContent: {
  //     heading: {
  //       eyebrow: 'Join Us',
  //       title: 'Partner With Us',
  //       description: 'Join us as an Exclusive Partner',
  //     },
  //     items: [],
  //   },
  //   editor: { headingOnly: true },
  // },
  retailFinanceHero: {
    key: 'retailFinanceHero',
    label: 'Hero',
    page: 'retailFinance',
    itemKind: 'metric',
    defaultOrder: 10,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        title: 'Embedded Finance\n for ~Smarter Retail Growth~',
        description:
          'Embedded Credit lets businesses offer seamless financing options directly within their platforms, boosting sales and customer satisfaction effortlessly.',
        ctaLabel: 'Install App',
        backgroundImage: '/retail/bg.png'
      },

      items: [
        { value: '16', name: 'Districts Coverage' },
        { value: '1458', name: 'Retailer' },
        { value: '15+ Cr', name: 'Credit Enrolled' },
      ],
    },
    editor: { sectionCta: true },
  },
  retailFinanceIntro: {
    key: 'retailFinanceIntro',
    label: 'Intro',
    page: 'retailFinance',
    itemKind: 'card',
    defaultOrder: 20,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'What is Embedded Credit',
        title: 'What is ~Embedded Credit?~',
        description:
          'Embedded Finance connects retail ordering, retailer data, credit scoring and financial partners into one simple system. This allows retailers to get faster access to credit, while brands benefit from better product availability, higher order frequency and stronger retail growth.',
        videoPath: '/video/1.mp4',
        backgroundImage: '/retail/about.png'
      },
      items: [],
    },
    editor: { headingOnly: true, video: true },
  },
  retailFinancePartners: {
    key: 'retailFinancePartners',
    label: 'Credit partners',
    page: 'retailFinance',
    itemKind: 'logo',
    defaultOrder: 30,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'Credit Partners',
        title: 'Our Embedded Credit Partners',
        description:
          'Our Embedded Credit Partners provide seamless financing options integrated directly into your purchasing process, helping retailers access credit easily and grow their business without hassle.',
      },
      items: [
        { name: 'BRAC Bank', logo: '/brands/1.svg' },
        { name: 'LankaBangla Finance', logo: '/brands/2.svg' },
        { name: 'Partner 3', logo: '/brands/3.svg' },
        { name: 'Partner 4', logo: '/brands/4.svg' },
      ],
    },
  },
  retailFinanceCedit: {
    key: 'retailFinanceCedit',
    label: 'Why credit matters',
    page: 'retailFinance',
    itemKind: 'feature',
    defaultOrder: 35,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        eyebrow: 'Importance of Credit',
        title: 'Why Credit Matters for Retailers',
        description:
          'See how our Hub Model helps small retailers thrive by streamlining supply chains and enhancing financial access with innovative technology, driving growth and inclusion throughout Bangladesh.',
      },
      items: [
        {
          title: 'Reduce Stock-Outs',
          body: 'Credit helps retailers keep essential products available when customers need them.',
          image: '/retail/credit-1.png',
        },
        {
          title: 'Improve Product Availability',
          body: 'Retailers can stock more SKUs and offer better choices to customers.',
          image: '/retail/credit-2.png',
        },
        {
          title: 'Manage Cash Flow Better',
          body: 'Flexible credit support reduces daily cash pressure and keeps business moving.',
          image: '/retail/credit-3.png',
        },
        {
          title: 'Place Bigger Orders',
          body: 'Retailers can buy more products at once and increase sales opportunities.',
          image: '/retail/credit-4.png',
        },
        {
          title: 'Grow More Consistently',
          body: 'Reliable credit access helps small retailers build stronger, more stable businesses.',
          image: '/retail/credit-5.png',
        },
      ],
    },
  },
  retailFinanceHowWork: {
    key: 'retailFinanceHowWork',
    label: 'How it works',
    page: 'retailFinance',
    itemKind: 'card',
    defaultOrder: 40,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'Process Flow',
        title: 'How PriyoShop Credit works?',
        description:
          'PriyoShop Embedded Credit empowers small businesses with seamless access to credit, streamlining purchases and boosting growth through innovative financial solutions tailored for Bangladeshs market.',
      },
      items: [
        { title: 'Real-time demand analytics optimize supply chain.', image: '/retail/1.png' },
        { title: 'Digitalization order reduces manual inefficiencies by 30-40%.', image: '/retail/2.png' },
        { title: 'Direct access to millions of MSMEs ensures wider market penetration.', image: '/retail/3.png' },
        { title: 'DOOH: In-store digital ad at retail shops to enhance brand visibility.', image: '/retail/4.png' },
        { title: 'DOOH: In-store digital ad at retail shops to enhance brand visibility.', image: '/retail/5.png' },
      ],
    },
  },
  retailFinanceStories: {
    key: 'retailFinanceStories',
    label: 'Success stories',
    page: 'retailFinance',
    itemKind: 'video',
    defaultOrder: 70,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'Why Retailers Love PriyoShop',
        title: 'Success Stories from Our Retailers',
        description:
          'Thousands of retail businesses in Bangladesh use the PriyoShop app to simplify their wholesale orders.',
      },
      items: [
        { title: 'How PriyoShop grew my store', videoPath: '/video/1.mp4' },
        { title: 'Restocking without the hassle', videoPath: '/video/1.mp4' },
        { title: 'Faster delivery, happier customers', videoPath: '/video/1.mp4' },
      ],
    },
  },
  retailFinanceFaq: {
    key: 'retailFinanceFaq',
    label: 'FAQ',
    page: 'retailFinance',
    itemKind: 'faq',
    defaultOrder: 60,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'FAQ',
        title: 'Frequently Asked Questions',
        description:
          "If you can't find a answer that you're looking for, feel free to drop us a message.",
      },
      items: [
        { title: 'Can retailers outside Dhaka use the service?', body: 'Yes, delivery is available in major districts of Bangladesh.' },
        { title: 'Is the app only for large retail businesses?', body: 'No, retailers of every size can order wholesale groceries through the PriyoShop app.' },
      ],
    },
  },
  retailFinancePartnerBanner: {
    key: 'retailFinancePartnerBanner',
    label: 'Partner banner',
    page: 'retailFinance',
    itemKind: 'card',
    defaultOrder: 80,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        title: 'Wants to partner with us?',
        description:
          'Interested in partnering? Join us to unlock exclusive benefits and grow together. Let’s achieve great results as partners.',
        ctaLabel: 'Contact Us',
        ctaHref: '/contact',
      },
      items: [],
    },
    editor: { headingOnly: true, sectionCta: true },
  },
  diptyHero: {
    key: 'diptyHero',
    label: 'Hero',
    page: 'dipty',
    itemKind: 'card',
    defaultOrder: 10,

    defaultStyle: makeDefaultStyle({ align: 'left', bgColor: 'cream', paddingY: 'lg' }),
    defaultContent: {
      heading: {
        title: '*Quality that builds trust*, value that grows your business',
        description:
          'Premium quality products crafted by PriyoShop to help your retail business thrive.',
      },
      items: [],
    },
    editor: { headingOnly: true },
  },
  diptyIntro: {
    key: 'diptyIntro',
    label: 'About Dipty',
    page: 'dipty',
    itemKind: 'card',
    defaultOrder: 20,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'About Dipty',
        title: 'What is *Dipty*',
        description:
          'Dipty is a private-label brand of PriyoShop, designed for the everyday needs of Bangladesh’s neighborhood retailers and their customers. By offering quality staples through PriyoShop’s retail infrastructure, Dipty helps retailers access dependable products, serve customers better, and grow their business with confidence.',
        videoPath: '/video/1.mp4',
      },
      items: [],
    },
    editor: { headingOnly: true, video: true },
  },
  diptyWhyRetailers: {
    key: 'diptyWhyRetailers',
    label: 'Why retailers choose Dipty',
    page: 'dipty',
    itemKind: 'feature',
    defaultOrder: 30,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'Importance of Dipty',
        title: 'Why Retailers Choose Dipty?',
        description:
          'Dipty gives retailers access to quality everyday essentials that customers trust and buy regularly.',
      },
      items: [
        {
          title: 'Premium-Quality Staples',
          body: 'Carefully selected products that help retailers serve customers with better taste, quality and reliability.',
          image: '/dipty/1.svg'
        },
        {
          title: 'Natural & Safe Products',
          body: 'Made for everyday family needs with a focus on purity, safety and customer trust.',
          image: '/dipty/2.svg'

        },
        {
          title: 'Better Value for Retailers',
          body: 'Competitive pricing helps retailers maintain good margins while offering affordable products to customers.',
          image: '/dipty/3.svg'

        },
        {
          title: 'Trusted Quality Standards',
          body: 'Every product is selected and checked to ensure consistency, reliability and long-term customer confidence.',
          image: '/dipty/4.svg'

        },
      ],
    },
  },
  diptyProducts: {
    key: 'diptyProducts',
    label: 'Product collection',
    page: 'dipty',
    itemKind: 'product',
    defaultOrder: 40,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'Product Line',
        title: "Explore Dipty's Product Collection",
        description:
          'Discover our wide range of premium FMCG products, carefully selected to meet all your everyday needs in one convenient spot.',
        ctaLabel: 'Install Our App Now',
        ctaHref: '/contact',
        ctaSecondaryLabel: 'To Place Order',
        backgroundImage: '/dipty/CTA.png'
      },
      items: [
        { title: 'Dipty Atash Rice', value: '25kg', tag: 'Rice', caption: 'P-598430D', name: 'PriyoShop', image: '/dipty/1.png' },
        { title: 'Dipty Miniket Rice', value: '25kg', tag: 'Rice', caption: 'P-598431D', name: 'PriyoShop', image: '/dipty/1.png' },
        { title: 'Dipty Red Lentil', value: '10kg', tag: 'Lentil', caption: 'P-598432D', name: 'PriyoShop', image: '/dipty/1.png' },
      ],
    },
    editor: { sectionCta: true, secondaryCta: true },
  },
  // diptyBrandMatters: {
  //   key: 'diptyBrandMatters',
  //   label: 'Why private label matters',
  //   page: 'dipty',
  //   itemKind: 'card',
  //   defaultOrder: 50,
  //   defaultStyle: makeDefaultStyle(),
  //   defaultContent: {
  //     heading: {
  //       eyebrow: 'Why Choose Our Brand',
  //       title: 'Why Private Label Brand Matters',
  //       description:
  //         'PriyoShop empowers thousands of Bangladeshi retailers by simplifying their wholesale ordering.',
  //     },
  //     items: [
  //       { title: 'Better Margin', body: 'Higher profit potential on every sale.', image: '/business/f6.png' },
  //       { title: 'Price Stability', body: 'We control pricing to keep you competitive.', image: '/business/f3.png' },
  //       { title: 'Consistent Quality', body: 'Every batch meets our quality standards.', image: '/business/f4.png' },
  //       { title: 'Retailer Focused', body: 'Built to support your business growth.', image: '/business/f1.png' },
  //     ],
  //   },
  // },
  diptyQuality: {
    key: 'diptyQuality',
    label: 'Quality pillars',
    page: 'dipty',
    itemKind: 'card',
    defaultOrder: 60,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'Quality & Trust',
        title: 'Quality Standards Retailers Can Trust',
        description:
          'We follow strict quality control at every step—from sourcing to packaging—to ensure safe and reliable products.',
      },
      items: [
        { title: 'Carefully Sourced', body: 'Collected from trusted sources for better product quality.', image: '/dipty/8.svg' },
        { title: 'Clean & Safe Packing', body: 'Packed with care to keep products safe for customers.', image: '/dipty/9.svg' },
        { title: 'Quality Checked', body: 'Checked regularly to maintain trust and consistency.', image: '/dipty/10.svg' },
      ],
    },
  },
  diptyDownloadApp: {
    key: 'diptyDownloadApp',
    label: 'Download app banner',
    page: 'dipty',
    itemKind: 'card',
    defaultOrder: 70,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        title: 'Wants to download our app?',
        description:
          "Interested in partnering? Join us to unlock exclusive benefits and grow together. Let's achieve great results as partners.",
        ctaLabel: 'Download Now',
        ctaHref: '/timeline/app-debug%20(1).apk',
      },
      items: [],
    },
    editor: { headingOnly: true, sectionCta: true },
  },
  // diptyMedia: {
  //   key: 'diptyMedia',
  //   label: 'Media & press',
  //   page: 'dipty',
  //   itemKind: 'news',
  //   defaultOrder: 70,
  //   defaultStyle: makeDefaultStyle({ align: 'center' }),
  //   defaultContent: {
  //     heading: {
  //       eyebrow: 'Media & Press',
  //       title: 'Media & Press Center',
  //       description: 'Stay updated with our daily roundup of top news stories.',
  //     },
  //     items: [
  //       { title: "Introducing PriyoShop's first white-label brand – Dipty", date: '01 Jan, 2025', name: 'By Reporter', image: '/blogs/1.png', href: '/media' },
  //       { title: 'Dipty brings premium staples to neighbourhood retail shops', date: '01 Jan, 2025', name: 'By Reporter', image: '/blogs/2.png', href: '/media' },
  //       { title: 'How private-label FMCG is changing wholesale margins', date: '01 Jan, 2025', name: 'By Reporter', image: '/blogs/3.png', href: '/media' },
  //     ],
  //   },
  // },
  diptyFaq: {
    key: 'diptyFaq',
    label: 'FAQ',
    page: 'dipty',
    itemKind: 'faq',
    defaultOrder: 80,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'FAQ',
        title: 'Frequently Asked Questions',
        description:
          "If you can't find a answer that you're looking for, feel free to drop us a message.",
      },
      items: [
        { title: 'What is Dipty Brand?', body: 'Dipty is a home-own FMCG brand from Bangladesh.' },
        { title: 'When can I order Dipty Rice?', body: 'Dipty Rice can be ordered anytime through the PriyoShop app.' },
        { title: 'How is the quality of Dipty Rice maintained during packaging?', body: 'Every batch is packed in quality-assured facilities with strict hygiene control.' },
        { title: 'What types of products are available under Dipty?', body: 'Dipty offers premium everyday staples, starting with rice and expanding to other FMCG essentials.' },
        { title: 'Why should retailers choose the Dipty brand?', body: 'Dipty gives retailers better margins, stable pricing, and consistent quality on every order.' },
        { title: 'What makes Dipty different from regular wholesale brands?', body: 'As a private label, Dipty is built for retailers first — pricing and supply are controlled end to end.' },
        { title: 'Are Dipty products safe and hygienically packed?', body: 'Yes, all products are tested for purity and packed in certified facilities.' },
        { title: 'Want to know more about Dipty?', body: 'Reach out to our team through the contact page and we will get back to you.' },
      ],
    },
  },
  // diptyPartnerForm: {
  //   key: 'diptyPartnerForm',
  //   label: 'Partner form',
  //   page: 'dipty',
  //   itemKind: 'card',
  //   defaultOrder: 90,
  //   defaultStyle: makeDefaultStyle({ align: 'center' }),
  //   defaultContent: {
  //     heading: {
  //       eyebrow: 'Join Us',
  //       title: 'Partner With Us',
  //       description: 'Join us as an Exclusive Partner',
  //     },
  //     items: [],
  //   },
  //   editor: { headingOnly: true },
  // },
  opportunityHero: {
    key: 'opportunityHero',
    label: 'Hero',
    page: 'opportunity',
    itemKind: 'card',
    defaultOrder: 10,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        title: 'A Massive *Retail*\n *Opportunity* in a Rapidly Growing Market',
        description:
          "Bangladesh is one of the most promising retail growth markets in emerging economies—powered by a large consumer base, a dense retail network, and increasing demand for efficient distribution, data, and financial access.",
        backgroundImage: '/opportunities/op-bg.png',
      },
      items: [],
    },
    editor: { headingOnly: true, backgroundImage: true },
  },
  opportunityStats: {
    key: 'opportunityStats',
    label: 'Opportunities in Bangladesh',
    page: 'opportunity',
    itemKind: 'stat',
    defaultOrder: 20,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        title: 'Opportunities all over in Bangladesh',
        description: 'One B2B Platform for All Your Retail Business Needs',
        backgroundImage: '/opportunities/1.png',
      },
      items: [
        { value: '5M', name: 'MSMEs', logo: '/opportunities/1.svg' },
        { value: '$200B', name: 'Annual GMV by MSMEs', logo: '/opportunities/2.svg' },
        { value: '$2.8B', name: 'Financial Gap', logo: '/opportunities/3.svg' },
      ],
    },
  },
  opportunityGrowth: {
    key: 'opportunityGrowth',
    label: 'Growth & possibilities',
    page: 'opportunity',
    itemKind: 'stat',
    defaultOrder: 30,
    defaultStyle: makeDefaultStyle({
      align: 'center',
    }),

    defaultContent: {
      heading: {
        eyebrow: 'Opportunities',
        title: 'Opportunities, Growth & Possibilities',
        description:
          "We identify key market hurdles and deliver targeted solutions that help businesses thrive at every phase.",
      },
      items: [
        { value: '7%', name: 'GDP', logo: '/opportunities/4.svg' },
        { value: '5M', name: 'MSMEs', logo: '/opportunities/5.svg' },
        { value: '$200B', name: 'Annual GMV by MSMEs', logo: '/opportunities/6.svg' },
        { value: '$300B', name: 'Annual GMV by MSMEs', logo: '/opportunities/7.svg' },
        { value: '$400B', name: 'Annual GMV by MSMEs', logo: '/opportunities/8.svg' },
        { value: '$500B', name: 'Annual GMV by MSMEs', logo: '/opportunities/9.svg' },
      ],

    },
  },
  opportunityDistribution: {
    key: 'opportunityDistribution',
    label: 'Distribution structure',
    page: 'opportunity',
    itemKind: 'card',
    defaultOrder: 40,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'Our Distribution Structure',
        title: 'Distribution Structure',
        description: 'One B2B Platform for All Your Retail Business Needs',
        videoPath: '/video/1.mp4',
        backgroundImage: '/opportunities/city.png',
      },
      items: [],
    },
    editor: { headingOnly: true, video: true },
  },
  opportunityHub: {
    key: 'opportunityHub',
    label: 'Opportunity Hub',
    page: 'opportunity',
    itemKind: 'card',
    defaultOrder: 50,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        title: 'Retailer segment-based opportunity',
        eyebrow: 'Hub Model',
        description:
          'Our Hub Model streamlines supply chains and enhances financial access for small businesses, driving growth and inclusion throughout Bangladesh.',

      },
      items: [
        {
          title: 'General Trade / Grocery Stores',
          description: 'High restocking frequency and wide product assortment around consistent demand.',
          image: '/opportunities/hub.png',
        },
        {
          title: 'General Trade / Grocery Stores',
          description: 'High restocking frequency and wide product assortment around consistent demand.',
          image: '/opportunities/hub.png',
        },
        {
          title: 'General Trade / Grocery Stores',
          description: 'High restocking frequency and wide product assortment around consistent demand.',
          image: '/opportunities/hub.png',
        },
        {
          title: 'General Trade / Grocery Stores',
          description: 'High restocking frequency and wide product assortment around consistent demand.',
          image: '/opportunities/hub.png',
        },
        {
          title: 'General Trade / Grocery Stores',
          description: 'High restocking frequency and wide product assortment around consistent demand.',
          image: '/opportunities/hub.png',
        },
        {
          title: 'General Trade / Grocery Stores',
          description: 'High restocking frequency and wide product assortment around consistent demand.',
          image: '/opportunities/hub.png',
        },
      ],
    },
    editor: { headingOnly: true, backgroundImage: true },
  },
  opportunityDipty: {
    key: 'opportunityDipty',
    label: '',
    page: 'opportunity',
    itemKind: 'card',
    defaultOrder: 60,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        title: 'Why Bangladesh matters for brands?',
        eyebrow: 'Importance of Dipty',
      },
      items: [
        {
          title: 'High Market Reach Potential',
          description: 'Access millions of retailers and consumers across the country.',
          image: '/opportunities/hub.png',
        },
        {
          title: 'General Trade / Grocery Stores',
          description: 'High restocking frequency and wide product assortment around consistent demand.',
          image: '/opportunities/hub.png',
        },
        {
          title: 'General Trade / Grocery Stores',
          description: 'High restocking frequency and wide product assortment around consistent demand.',
          image: '/opportunities/hub.png',
        },
        {
          title: 'General Trade / Grocery Stores',
          description: 'High restocking frequency and wide product assortment around consistent demand.',
          image: '/opportunities/hub.png',
        },

      ],
    },
    editor: { headingOnly: true, backgroundImage: true },
  },
  opportunityServing: {
    key: 'opportunityServing',
    label: 'Serving retailers',
    page: 'opportunity',
    itemKind: 'card',
    defaultOrder: 70,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        title: 'Serving *5 Million Retailers*\nAcross the Bangladesh',
        description:
          'We are empowering millions of MSMEs nationwide with the digital tools and reliable supply chains they need to thrive.',
        backgroundImage: '/opportunities/people.png',
      },
      items: [],
    },
    editor: { headingOnly: true, backgroundImage: true },
  },
  // opportunityPartnerForm: {
  //   key: 'opportunityPartnerForm',
  //   label: 'Partner form',
  //   page: 'opportunity',
  //   itemKind: 'card',
  //   defaultOrder: 80,
  //   defaultStyle: makeDefaultStyle({ align: 'center' }),
  //   defaultContent: {
  //     heading: {
  //       eyebrow: 'Join Us',
  //       title: 'Partner With Us',
  //       description: 'Join us as an Exclusive Partner',
  //     },
  //     items: [],
  //   },
  //   editor: { headingOnly: true },
  // },
  impactHero: {
    key: 'impactHero',
    label: 'Hero',
    page: 'impact',
    itemKind: 'card',
    defaultOrder: 10,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        title: 'Driving Sustainable Retail *Growth Across Bangladesh*',
        description:
          'From electric vehicles to sustainable hubs, PriyoShop is pioneering eco-friendly logistics in Bangladesh to meet global Sustainable Development Goals.',
      },
      items: [{ value: '42', name: 'Hubs' },
      { value: '16', name: 'Districts' },
      { value: '1458', name: 'Routes' },
      { value: '200K+', name: 'Retailers' },],
    },
    editor: { headingOnly: true },
  },
  impactNetwork: {
    key: 'impactNetwork',
    label: 'Green hub network',
    page: 'impact',
    itemKind: 'card',
    defaultOrder: 20,
    defaultStyle: makeDefaultStyle({ align: 'center' }),
    defaultContent: {
      heading: {
        eyebrow: 'About GreenHub',
        title: 'What is ~Green Hub for PriyoShop?~',
        description:
          'Our Green Hub Network connects local businesses with sustainable resources and eco-friendly solutions, helping them grow responsibly while supporting a healthier planet.',
      },
      items: [],
    },
    editor: { headingOnly: true },
  },
  impactGreenHub: {
    key: 'impactGreenHub',
    label: 'Green hub story',
    page: 'impact',
    itemKind: 'card',
    defaultOrder: 30,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        title: "Sustainable Infrastructure, Inclusive Impact",
        videoPath: '/video/1.mp4',
        description: 'PriyoShop is building a cleaner and more efficient retail network by using greener operations, smarter delivery, and better support for retailers across Bangladesh.',
        backgroundImage: '/ecosystem/ecosystem-a.png',

      },
      items: [
        {
          title: 'By integrating renewable energy sources',
          body: '(like solar power) and energy-efficient lighting, a green hub significantly cuts greenhouse gas emissions compared to fossil-fuel-reliant traditional warehouses.',
          image: '/impact/n1.png',
          imageAlt: 'PriyoShop green hub with solar panels and EV fleet',
        },
        {
          title: 'While the initial setup requires investment,',
          image: '/impact/n1.png',

          body: 'green hubs utilize smart energy management, eco-friendly packaging, and waste reduction systems that drastically lower long-term utility and material expenses.',
        },
        {
          image: '/impact/n1.png',

          title: 'Green hubs are specifically designed',
          body: 'to seamlessly integrate with electric vehicle (EV) fleets, utilizing specialized charging infrastructure to ensure zero-emission last-mile deliveries.',
        },
      ],
    },
    editor: { video: true, backgroundImage: true },
  },
  impactSustainability: {
    key: 'impactSustainability',
    label: 'Sustainability',
    page: 'impact',
    itemKind: 'goal',
    defaultOrder: 40,
    defaultStyle: makeDefaultStyle({ align: 'left' }),
    defaultContent: {
      heading: {
        eyebrow: 'Sustainability',
        title: 'Our Impact Pillars',
        description:
          "Connecting commerce, finance, technology, and sustainability to strengthen Bangladesh’s retail ecosystem.",
      },
      items: [
        {
          title: 'Embedded Finance', body: 'Unlocking working capital for retailers historically excluded from formal credit',
          image: '/impact/1.svg',
          groupImages: [
            '/impact/1.png',
            '/impact/2.png'
          ]
        },
        {
          body: 'Eliminating intermediaries, connecting 296+ brands to last-mile retailers.',
          groupImages: [
            '/impact/1.png',
            '/impact/2.png'
          ],

          title: 'Direct Brand Procurement', image: '/impact/2.svg'
        },
        {
          groupImages: [
            '/impact/1.png',
            '/impact/2.png',

          ],
          body: '43+ hubs and a handful of employees enabling seamless, round-the-clock fulfilment.',
          title: 'Logistics Infrastructure', image: '/impact/3.svg'
        },
        {
          groupImages: [
            '/impact/1.png',
            '/impact/2.png'
          ],
          body: 'Bringing data visibility and predictability to a fragmented ecosystem.', title: 'Retail Intelligence',
          image: '/impact/4.svg'
        },
        {
          groupImages: [
            '/impact/1.png',
            '/impact/2.png'
          ],
          body: 'Equipping small retailers with payments, ordering, and inventory systems.',
          title: 'Digital Commerce Tools', image: '/impact/5.svg'
        },
        {
          groupImages: [
            '/impact/1.png',
            '/impact/2.png'
          ],
          body: 'Delivering through EVs, setting up green hubs across the country to use natural energy efficiently.', title: 'Sustainable Energy Usage', image: '/impact/6.svg'
        },
      ],
    },
  },
  impactWomen: {
    key: 'impactWomen',
    label: "Women's impact",
    page: 'impact',
    itemKind: 'video',
    defaultOrder: 50,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        eyebrow: 'Why Retailers Love PriyoShop',
        title: "Women's Impact",
        description:
          "The Women's Impact section celebrates PriyoShop's dedication to empowering women through inclusive opportunities, supporting female entrepreneurs, and fostering gender equality in every aspect of our business.",
      },
      items: [
        { title: 'Empowering women entrepreneurs', videoPath: '/video/1.mp4' },
        { title: 'Female retailers growing with PriyoShop', videoPath: '/video/1.mp4' },
        { title: 'Gender equality across our business', videoPath: '/video/1.mp4' },
        { title: 'Gender equality across our business', videoPath: '/video/1.mp4' },
        { title: 'Gender equality across our business', videoPath: '/video/1.mp4' },
      ],
    },
  },
  impactPartnerBanner: {
    key: 'impactPartnerBanner',
    label: 'Partner banner',
    page: 'impact',
    itemKind: 'card',
    defaultOrder: 60,
    defaultStyle: makeDefaultStyle(),
    defaultContent: {
      heading: {
        title: "Let's Build A More Inclusive and Sustainable Retail Future Together",
        description: 'Partner with PriyoShop and be a part of the change.',
        ctaLabel: 'Partner with us',
        ctaHref: '/contact',
        backgroundImage: '/impact/banner.png',
      },
      items: [],
    },
    editor: { headingOnly: true, sectionCta: true, backgroundImage: true },
  },
  // impactInitiative: {
  //   key: 'impactInitiative',
  //   label: 'Green hub initiative',
  //   page: 'impact',
  //   itemKind: 'gallery',
  //   defaultOrder: 60,
  //   defaultStyle: makeDefaultStyle({ align: 'center' }),
  //   defaultContent: {
  //     heading: {
  //       eyebrow: 'Why Retailers Love PriyoShop',
  //       title: 'Our Green Hub Initiative',
  //     },
  //     items: [
  //       { image: '/ecosystem/ecosystem-a.png', imageAlt: 'Green hub facility with solar rooftop' },
  //       { image: '/ecosystem/ecosystem-b.png', imageAlt: 'EV fleet outside a green hub' },
  //       { image: '/ecosystem/ecosystem-c.png', imageAlt: 'Green hub surrounded by trees' },
  //       { image: '/ecosystem/ecosystem-a.png', imageAlt: 'Green hub delivery operations' },
  //     ],
  //   },
  // },
};

export const getSectionDef = (key: SectionKey): SectionDef => SECTION_REGISTRY[key];

/** Converts the legacy special hero heading into independently editable slides. */
export const normalizeSectionContent = (
  key: SectionKey,
  content: SectionContent,
): SectionContent => {
  if (key !== 'hero' || content.format === 'hero-slides-v2') {
    return content;
  }

  const legacyHeading = content.heading;
  const accentOptions =
    legacyHeading.rotatingWords && legacyHeading.rotatingWords.length > 0
      ? legacyHeading.rotatingWords
      : [undefined];
  const headingSlides: SectionItem[] = accentOptions.map((accentWords) => ({
    title: accentWords ? `${legacyHeading.title} ${accentWords}` : legacyHeading.title,
    description: legacyHeading.description,
    ctaLabel: legacyHeading.ctaLabel,
    href: legacyHeading.ctaHref,
    ctaSecondaryLabel: legacyHeading.ctaSecondaryLabel,
    ctaSecondaryHref: legacyHeading.ctaSecondaryHref,
    ctaTone: legacyHeading.backgroundImage ? 'light' : 'dark',
    accentWords,
    accentGradientFrom: accentWords ? '#dc2626' : undefined,
    accentGradientTo: accentWords ? '#f59e0b' : undefined,
    slideBackgroundImage: legacyHeading.backgroundImage,
    slideBackgroundColor: 'bg-hero-gradient',
    textColor: legacyHeading.textColor ?? 'text-ps-ink-700',
    descriptionColor: legacyHeading.textColor ?? 'text-ps-ink-700',
    textSize: legacyHeading.textSize ?? 'text-[clamp(2.25rem,10vw,4.375rem)]',
    descriptionSize: 'text-ps-body',
    contentWidth: 'max-w-3xl',
    slideAlign: legacyHeading.slideAlign ?? 'left',
  }));
  const existingSlides = content.items.map((item) => ({
    ...item,
    ctaLabel: item.ctaLabel ?? legacyHeading.ctaLabel,
    href: item.href ?? legacyHeading.ctaHref,
    ctaSecondaryLabel: item.ctaSecondaryLabel ?? legacyHeading.ctaSecondaryLabel,
    ctaSecondaryHref: item.ctaSecondaryHref ?? legacyHeading.ctaSecondaryHref,
    ctaTone: item.ctaTone ?? (item.slideBackgroundImage ? 'light' : 'dark'),
    slideBackgroundColor: item.slideBackgroundColor ?? 'bg-hero-gradient',
    descriptionColor: item.descriptionColor ?? item.textColor,
    descriptionSize: item.descriptionSize ?? 'text-ps-body',
    contentWidth: item.contentWidth ?? 'max-w-3xl',
  }));

  return {
    heading: { title: 'Hero slides' },
    items: [...headingSlides, ...existingSlides],
    format: 'hero-slides-v2',
  };
};

export const listSectionDefs = (): SectionDef[] => SECTION_KEYS.map((key) => SECTION_REGISTRY[key]);

/**
 * Section keys that render on the given marketing page.
 * @param page The marketing page to filter by.
 * @returns The keys of sections belonging to that page.
 */
export const listSectionKeysByPage = (page: PageKey): SectionKey[] =>
  SECTION_KEYS.filter((key) => SECTION_REGISTRY[key].page === page);

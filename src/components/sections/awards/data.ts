export type Award = {
  name: string;
  caption: string;
  logo: string;
  slug?: string;
  coverImage?: string;
  coverImageAlt?: string;
  organization?: string;
  year?: string;
  category?: string;
  description?: string;
  externalUrl?: string;
};

/* Drop matching logo files under `public/awards/`. Order here drives the
   grid and default listings. */
export const AWARDS: Award[] = [
  {
    name: 'ICT Champion Award',
    slug: 'ict-champion-award',
    caption: 'Champion at South Asia University Innovation Summit',
    logo: '/awards/4.png',
    coverImage: '/awards/4.png',
    coverImageAlt: 'ICT Champion Award trophy presentation',
    organization: 'South Asia University & ICT Division',
    year: '2024',
    category: 'Technology & Innovation',
    description:
      'PriyoShop was crowned Champion at the prestigious South Asia University Innovation Summit for pioneering digital B2B supply chain solutions across Bangladesh. The jury recognized our high-impact embedded finance technology and seamless logistics network empowering over 5 million MSMEs.',
    externalUrl: 'https://priyoshop.com',
  },
  {
    name: 'Microsoft for Startups',
    slug: 'microsoft-for-startups',
    caption: 'Selected for Microsoft for Startups Global Growth Accelerator',
    logo: '/awards/3.png',
    coverImage: '/awards/3.png',
    coverImageAlt: 'Microsoft for Startups certificate of achievement',
    organization: 'Microsoft',
    year: '2024',
    category: 'Global Accelerator',
    description:
      'Selected by Microsoft for Startups Founders Hub for enterprise innovation and scalable architecture. PriyoShop leverages Microsoft Cloud infrastructure and advanced AI models to optimize procurement, routing, and inventory forecasting for small retail merchants.',
    externalUrl: 'https://startups.microsoft.com',
  },
  {
    name: 'UNDP Youth Co:Lab Feature',
    slug: 'undp-youth-colab-feature',
    caption: 'UNDP Featured PriyoShop for Sustainable MSME Development',
    logo: '/awards/2.png',
    coverImage: '/awards/2.png',
    coverImageAlt: 'United Nations Development Programme recognition banner',
    organization: 'United Nations Development Programme (UNDP)',
    year: '2023',
    category: 'Social Impact',
    description:
      'The United Nations Development Programme recognized PriyoShop for driving socio-economic transformation and financial inclusion across rural and suburban retail communities, helping neighborhood mom-and-pop shops achieve sustainable income growth.',
    externalUrl: 'https://undp.org',
  },
  {
    name: 'Google for Startups Accelerator',
    slug: 'google-for-startups-accelerator',
    caption: 'Graduated from Google for Startups Accelerator Program',
    logo: '/awards/1.png',
    coverImage: '/awards/1.png',
    coverImageAlt: 'Google for Startups badge and showcase',
    organization: 'Google',
    year: '2023',
    category: 'Ecosystem & Tech',
    description:
      'Graduated from the selective Google for Startups Accelerator. PriyoShop worked closely with Google engineers and product leaders to enhance retail logistics algorithms, mobile app performance, and machine learning infrastructure.',
    externalUrl: 'https://startup.google.com',
  },
  {
    name: 'Bangladesh Innovation Award',
    slug: 'bangladesh-innovation-award',
    caption: 'Best B2B Retail & Supply Chain Solution of the Year',
    logo: '/awards/5.png',
    coverImage: '/awards/5.png',
    coverImageAlt: 'Bangladesh Innovation Award ceremony',
    organization: 'Bangladesh Brand Forum',
    year: '2023',
    category: 'Retail & Distribution',
    description:
      'Awarded Best B2B Retail & Supply Chain Solution at the Bangladesh Innovation Awards for revolutionizing the informal retail sector with next-day deliveries and transparent wholesale pricing.',
    externalUrl: 'https://bangladeshbrandforum.com',
  },
  {
    name: 'FinTech Pioneer Recognition',
    slug: 'fintech-pioneer-recognition',
    caption: 'Recognized for Digital Microlending & Retailer Financial Inclusion',
    logo: '/awards/6.png',
    coverImage: '/awards/6.png',
    coverImageAlt: 'FinTech Pioneer Award plaque',
    organization: 'FinTech Summit Bangladesh',
    year: '2022',
    category: 'Financial Inclusion',
    description:
      'Honored at the FinTech Summit for breakthrough credit assessment and embedded working capital finance that empowers unbanked retailers to expand their product variety without collateral hurdles.',
    externalUrl: 'https://priyoshop.com',
  },
  {
    name: 'Smart Logistics Excellence',
    slug: 'smart-logistics-excellence',
    caption: 'Excellence in Micro-Hub Fulfillment & Fleet Electrification',
    logo: '/awards/7.png',
    coverImage: '/awards/7.png',
    coverImageAlt: 'Smart Logistics Excellence award',
    organization: 'Logistics Leadership Forum',
    year: '2022',
    category: 'Logistics',
    description:
      'Celebrated for pioneering electric three-wheeler cargo distribution and smart micro-hub fulfillment across Dhaka and regional districts, cutting delivery transit times while shrinking carbon emissions.',
    externalUrl: 'https://priyoshop.com',
  },
  {
    name: 'Sustainable Commerce Honor',
    slug: 'sustainable-commerce-honor',
    caption: 'Leadership in Green Distribution & Community Resilience',
    logo: '/awards/8.png',
    coverImage: '/awards/8.png',
    coverImageAlt: 'Sustainable Commerce Honor ceremony photo',
    organization: 'Global Green Growth Forum',
    year: '2022',
    category: 'Sustainability',
    description:
      'Acknowledged for integrating green supply-chain principles into everyday FMCG logistics, reducing food waste through automated demand matching and promoting local brands.',
    externalUrl: 'https://priyoshop.com',
  },
];

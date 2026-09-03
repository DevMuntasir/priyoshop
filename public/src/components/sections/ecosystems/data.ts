import type { EcosystemItem } from '@/libs/cms/Sections';

/* Default ecosystem cards. Drop the matching images under `public/ecosystem/`.
   Used as the CMS fallback when no admin override exists; editable from the
   admin portal once a section override is saved. */
export const ECOSYSTEMS: EcosystemItem[] = [
  {
    title: 'Retail Business',
    body: 'B2B platform empowering millions of MSMEs with faster restocking and smart supply chain.',
    image: '/ecosystem/ecosystem-a.png',
    ctaLabel: 'Learn More',
    href: '/ecosystem/retail',
  },
  {
    title: 'Smart Distribution',
    body: 'Partnering with leading brands to streamline and simplify last-mile distribution across Bangladesh.',
    image: '/ecosystem/ecosystem-b.png',
    ctaLabel: 'Learn More',
    href: '/ecosystem/distribution',
    reverse: true,
  },
  {
    title: 'Home Brand',
    body: 'Building affordable, quality in-house products tailored for everyday retail needs.',
    image: '/ecosystem/ecosystem-c.png',
    ctaLabel: 'Learn More',
    href: '/ecosystem/home-brand',
  },
];

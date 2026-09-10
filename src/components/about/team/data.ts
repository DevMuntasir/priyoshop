export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;

  ctaText?: string;
  ctaHref?: string;
};

export type TeamConfig = {
  badge: string;
  title: string;
  description: string;
  coreTeamTitle: string;
  members: TeamMember[];
};

/* Drop the matching member photos under `public/about/team/`. Leave `image`
   empty until a photo is provided; the card renders a placeholder instead. */
export const TEAM_CONFIG: TeamConfig = {
  badge: 'Our Founders',
  title: 'Meet the Team',
  description:
    'PriyoShop was founded to build the retail infrastructure layer that empowers MSMEs and transforms how brands and retailers grow across Bangladesh.',
  coreTeamTitle: 'Core Team',
  members: [
    {
      id: '1',
      name: 'Ashikul Alam Khan',
      role: 'Founder & CEO',
      image: '/team/1.png',
      ctaText: 'LinkedIn',
      ctaHref: 'https://www.linkedin.com/in/ashikul-alam-khan-1a0b3b1a4/',
    },
    {
      id: '2',
      name: 'Dipty Mandal',
      role: 'Co-founder & CMO',
      image: '/team/2.png',
      ctaText: 'LinkedIn',
      ctaHref: 'https://www.linkedin.com/in/dipty-mandal-1a0b3b1a4/',
    }
  ],
};

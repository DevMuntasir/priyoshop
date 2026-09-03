export type Award = {
  name: string;
  caption: string;
  logo: string;
};

/* Drop the matching logo files under `public/awards/`. Order here drives the
   grid, filling left-to-right across two rows of four. */
export const AWARDS: Award[] = [
  { name: 'ICT Award', caption: 'Champion at South Asia University', logo: '/awards/4.png' },
  { name: 'Microsoft for Startups', caption: 'Microsoft for Startups', logo: '/awards/3.png' },
  { name: 'UNDP', caption: 'UNDP Featured PriyoShop', logo: '/awards/2.png' },
  { name: 'Google for Startups', caption: 'Google for Startups', logo: '/awards/1.png' },
  { name: 'ICT Award', caption: 'Champion at South Asia University', logo: '/awards/1.png' },
  { name: 'Microsoft for Startups', caption: 'Microsoft for Startups', logo: '/awards/2.png' },
  { name: 'UNDP', caption: 'UNDP Featured PriyoShop', logo: '/awards/3.png' },
  { name: 'Google for Startups', caption: 'Google for Startups', logo: '/awards/4.png' },
];

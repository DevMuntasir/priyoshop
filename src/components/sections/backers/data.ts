export type Backer = {
  name: string;
  logo: string;
};

/* Drop the matching logo files under `public/brands/`. Order here drives the
   top row; the bottom row reuses the same set in reverse for visual variety. */
export const BACKERS: Backer[] = [
  { name: 'Unilever', logo: '/backers/1.svg' },
  { name: 'Danish', logo: '/backers/2.svg' },
  { name: 'Marico', logo: '/backers/3.svg' },
  { name: 'Shuddho', logo: '/backers/4.svg' },
  { name: 'ACI', logo: '/backers/5.svg' },
  { name: 'Coca-Cola', logo: '/backers/6.svg' },
  { name: 'Coca-Cola', logo: '/backers/7.svg' },
  { name: 'Coca-Cola', logo: '/backers/8.svg' },
  { name: 'Coca-Cola', logo: '/backers/9.svg' },
  { name: 'Coca-Cola', logo: '/backers/10.svg' },
];

export type Brand = {
  name: string;
  logo: string;
};

/* Drop the matching logo files under `public/brands/`. Order here drives the
   top row; the bottom row reuses the same set in reverse for visual variety. */
export const BRANDS: Brand[] = [
  { name: 'Unilever', logo: '/brands/1.svg' },
  { name: 'Danish', logo: '/brands/2.svg' },
  { name: 'Marico', logo: '/brands/3.svg' },
  { name: 'Shuddho', logo: '/brands/4.svg' },
  { name: 'ACI', logo: '/brands/5.svg' },
  { name: 'Coca-Cola', logo: '/brands/6.svg' },
  // { name: 'Reckitt Benckiser', logo: '/brands/7.svg' },
  // { name: 'Reckitt Benckiser', logo: '/brands/8.svg' },
  // { name: 'Reckitt Benckiser', logo: '/brands/9.svg' },
  // { name: 'Reckitt Benckiser', logo: '/brands/10.svg' },
  // { name: 'Reckitt Benckiser', logo: '/brands/11.svg' },
];

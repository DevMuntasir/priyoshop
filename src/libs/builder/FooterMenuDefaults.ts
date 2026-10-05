import type { FooterSettings, MenuItem } from './Types';

/** Footer branding shown before an admin saves custom settings. */
export const defaultFooterSettings: FooterSettings = {
  logoUrl: '',
  logoAlt: 'PriyoShop',
  socialLinks: [
    { id: 'x', platform: 'x', label: 'X', href: '#' },
    { id: 'instagram', platform: 'instagram', label: 'Instagram', href: '#' },
    { id: 'linkedin', platform: 'linkedin', label: 'LinkedIn', href: '#' },
    { id: 'facebook', platform: 'facebook', label: 'Facebook', href: '#' },
  ],
};

/** Footer columns shown before an admin saves custom footer navigation. */
export const defaultFooterMenuItems: MenuItem[] = [
  {
    id: 'about',
    label: 'ABOUT',
    children: [
      { id: 'investor-relations', label: 'Investor Relations', href: '/pages/investor-relations' },
      { id: 'press-release', label: 'Press Release', href: '/news' },
      { id: 'career', label: 'Career', href: '/career' },
    ],
  },
  {
    id: 'useful-link',
    label: 'USEFUL LINK',
    children: [
      { id: 'terms-of-service', label: 'Terms of Service', href: '/pages/terms-of-service' },
      { id: 'privacy-policy', label: 'Privacy Policy', href: '/pages/privacy-policy' },
      { id: 'return-policy', label: 'Return Policy', href: '/pages/return-policy' },
      { id: 'join-us', label: 'Join Us', href: '/career' },
    ],
  },
  {
    id: 'contact-us',
    label: 'CONTACT US',
    children: [
      { id: 'phone', label: 'Phone: 09610989922', href: 'tel:+8809610989922' },
      { id: 'email', label: 'Email: support@priyoshop.com', href: 'mailto:support@priyoshop.com' },
    ],
  },
];

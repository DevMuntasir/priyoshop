import type { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

export const AppConfig = {
  name: 'PriyoShop',
  title: "PriyoShop — Bangladesh's #1 B2B commerce platform",
  description:
    'PriyoShop connects 5 million MSMEs to leading brands through a tech-driven distribution platform — fair prices, next-day restocking and a smarter supply chain.',
  twitterHandle: 'priyoshop',
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
    localePrefix,
  },
};


export const OrgConfig = {
  legalName: 'PriyoShop',
  logoPath: '/icons/logo.svg',
  sameAs: ['https://www.facebook.com/priyoshop', 'https://www.linkedin.com/company/priyoshop'],
};

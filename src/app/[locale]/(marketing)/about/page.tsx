import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildAboutSections } from '@/components/sections/AboutSections';
import { buildPageMetadata } from '@/utils/Seo';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: AboutPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return await buildPageMetadata({
    path: '/about',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function AboutPage(props: AboutPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return await buildAboutSections({ locale });
}


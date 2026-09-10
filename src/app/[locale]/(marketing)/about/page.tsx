import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildPageMetadata } from '@/utils/Seo';
import AboutCTA from '@/components/about/AboutCTA';
import WhatDrivesUs from '@/components/about/AboutDrives';
import { AboutHero } from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import Infrastructure from '@/components/about/infrastructure/Infrastructure';
import { Team } from '@/components/about/team/Team';

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

  return (
    <>
      <AboutHero />
      <AboutStory />
      <Infrastructure />
      <Team />
      <WhatDrivesUs />
      <AboutCTA />
    </>
  );
}


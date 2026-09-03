import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildPageMetadata } from '@/utils/Seo';
import { AboutHero } from '@/components/about/AboutHero';
import Infrastructure from '@/components/about/infrastructure/Infrastructure';
import { Team } from '@/components/about/team/Team';
import { Career } from '@/components/sections/career/Career';
import { getSection } from '@/libs/cms/ContentRepository';
import AboutStory from '@/components/about/AboutStory';
import WhatDrivesUs from '@/components/about/AboutDrives';
import AboutCTA from '@/components/about/AboutCTA';

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

export default async function About(props: AboutPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const career = await getSection('career', locale);

  return (
    <>
      <AboutHero />
      <AboutStory />
      <Infrastructure />
      <Team />
      <WhatDrivesUs />
      <Career data={career} />
      <AboutCTA />
    </>
  );
}


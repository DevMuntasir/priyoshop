import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Benefits } from '@/components/career/Benefits';
import { CareerHero } from '@/components/career/CareerHero';
import { CareerInspiration } from '@/components/career/CareerInspiration';
import { CareerValues } from '@/components/career/CareerValues';
import { CareerVideoBanner } from '@/components/career/CareerVideoBanner';
import { LifeAtPriyoShop } from '@/components/career/LifeAtPriyoShop';
import { OpenPositions } from '@/components/career/OpenPositions';
import { WhyWorkHere } from '@/components/career/WhyWorkHere';
import { JsonLd } from '@/components/seo/JsonLd';
import { listPublishedJobPostings } from '@/libs/career/CareerRepository';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

export const revalidate = 3600;

type CareerPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: CareerPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Career' });

  return await buildPageMetadata({
    path: '/career',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function CareerPage(props: CareerPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Career' });

  const jobs = await listPublishedJobPostings(locale);

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: t('breadcrumb_home'), path: '' },
      { name: t('title'), path: '/career' },
    ],
    locale,
  );

  return (
    <div className="">
      <JsonLd data={breadcrumb} />
      <CareerHero locale={locale} />
      <CareerVideoBanner locale={locale} poster="/career/7.png" />
      <CareerInspiration locale={locale} />
      <WhyWorkHere locale={locale} />
      <CareerValues locale={locale} />
      <Benefits locale={locale} />
      <LifeAtPriyoShop locale={locale} />
      <OpenPositions
        jobs={jobs}
        locale={locale}
        title={t('open_positions_title')}
        allLabel={t('category_all_label')}
        vacancyLabel={t('vacancy_label')}
        deadlineLabel={t('deadline_label')}
        applyLabel={t('apply_label')}
        loadMoreLabel={t('load_more')}
      />
    </div>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AwardsExplorer } from '@/components/awards/AwardsExplorer';
import { AwardsHero } from '@/components/awards/AwardsHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { listAwards } from '@/libs/awards/AwardService';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

export const revalidate = 3600;

type AwardsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: AwardsPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'AwardsPage' });

  return await buildPageMetadata({
    path: '/awards',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function AwardsPage(props: AwardsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'AwardsPage' });

  const awards = await listAwards(locale);

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: t('breadcrumb_home'), path: '' },
      { name: t('breadcrumb_title'), path: '/awards' },
    ],
    locale,
  );

  return (
    <>
      <div className="bg-section-gradient">
        <JsonLd data={breadcrumb} />
        <AwardsHero
          title={t('hero_title')}
          description={t('hero_description')}
          pill={t('hero_pill')}
        />
      </div>
      <AwardsExplorer
        awards={awards}
        allLabel={t('all_categories_chip')}
        loadMoreLabel={t('load_more')}
        emptyLabel={t('empty_message')}
      />
    </>
  );
}

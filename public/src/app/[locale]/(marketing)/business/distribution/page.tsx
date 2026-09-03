import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildDistributionSections } from '@/components/sections/DistributionSections';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

type DistributionPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: DistributionPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Distribution' });

  return await buildPageMetadata({
    path: '/business/distribution',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function Distribution(props: DistributionPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Distribution' });

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: t('breadcrumb_business'), path: '/business' },
      { name: t('title'), path: '/business/distribution' },
    ],
    locale,
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      {await buildDistributionSections({ locale })}
    </>
  );
}

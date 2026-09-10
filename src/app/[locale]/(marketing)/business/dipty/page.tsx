import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildDiptySections } from '@/components/sections/DiptySections';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

type DiptyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: DiptyPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Dipty' });

  return await buildPageMetadata({
    path: '/business/dipty',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function DiptyPage(props: DiptyPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Dipty' });

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: t('breadcrumb_business'), path: '/business' },
      { name: t('title'), path: '/business/dipty' },
    ],
    locale,
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      {await buildDiptySections({ locale })}
    </>
  );
}

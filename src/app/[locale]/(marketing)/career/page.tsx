import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildCareerSections } from '@/components/sections/CareerSections';
import { JsonLd } from '@/components/seo/JsonLd';
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

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: t('breadcrumb_home'), path: '' },
      { name: t('title'), path: '/career' },
    ],
    locale,
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      {await buildCareerSections({ locale })}
    </>
  );
}

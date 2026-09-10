import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildImpactSections } from '@/components/sections/ImpactSections';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

type ImpactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ImpactPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Impact' });

  return await buildPageMetadata({
    path: '/impact',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function ImpactPage(props: ImpactPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Impact' });

  const breadcrumb = buildBreadcrumbJsonLd([{ name: t('title'), path: '/impact' }], locale);

  return (
    <>
      <JsonLd data={breadcrumb} />
      {await buildImpactSections({ locale })}
    </>
  );
}

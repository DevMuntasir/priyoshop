import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildCommerceSections } from '@/components/sections/CommerceSections';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

type CommercePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: CommercePageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Commerce' });

  return await buildPageMetadata({
    path: '/business/commerce',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function Commerce(props: CommercePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Commerce' });

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: t('breadcrumb_business'), path: '/business' },
      { name: t('title'), path: '/business/commerce' },
    ],
    locale,
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      {await buildCommerceSections({ locale })}
    </>
  );
}

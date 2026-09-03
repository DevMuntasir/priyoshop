import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildRetailFinanceSections } from '@/components/sections/RetailFinanceSections';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

type RetailFinancePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: RetailFinancePageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'RetailFinance' });

  return await buildPageMetadata({
    path: '/business/retail-finance',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function RetailFinance(props: RetailFinancePageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'RetailFinance' });

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: t('breadcrumb_business'), path: '/business' },
      { name: t('title'), path: '/business/retail-finance' },
    ],
    locale,
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      {await buildRetailFinanceSections({ locale })}
    </>
  );
}

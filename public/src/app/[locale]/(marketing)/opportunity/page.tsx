import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildOpportunitySections } from '@/components/sections/OpportunitySections';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

type OpportunityPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: OpportunityPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Opportunity' });

  return await buildPageMetadata({
    path: '/opportunity',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function OpportunityPage(props: OpportunityPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Opportunity' });

  const breadcrumb = buildBreadcrumbJsonLd([{ name: t('title'), path: '/opportunity' }], locale);

  return (
    <>
      <JsonLd data={breadcrumb} />
      {await buildOpportunitySections({ locale })}
    </>
  );
}

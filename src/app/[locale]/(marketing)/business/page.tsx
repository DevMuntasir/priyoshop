import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/libs/I18nNavigation';
import { buildPageMetadata } from '@/utils/Seo';

type BusinessPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: BusinessPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Business' });

  return await buildPageMetadata({
    path: '/business',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function Business(props: BusinessPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Business' });

  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>

      <Link className="hover:text-blue-700" href="/business/commerce">
        {t('commerce_link')}
      </Link>
    </>
  );
}

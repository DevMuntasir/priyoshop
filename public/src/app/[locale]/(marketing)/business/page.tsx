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

export default async function BusinessPage(props: BusinessPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Business' });

  return (
    <main className="min-h-[70dvh] bg-ps-warm-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl rounded-ps-xl bg-white p-5 shadow-ps-soft sm:p-8 lg:p-10">
          <h1 className="font-display text-ps-h3 font-bold tracking-tight text-ps-black sm:text-ps-h2">
            {t('title')}
          </h1>
          <p className="mt-5 max-w-2xl font-body text-ps-body leading-relaxed text-ps-ink-600">
            {t('intro')}
          </p>

          <Link
            className="mt-7 inline-flex min-h-11 items-center rounded-full bg-ps-black px-6 font-body text-ps-sm font-semibold text-white no-underline transition-colors hover:bg-ps-ink-700"
            href="/business/commerce"
          >
            {t('commerce_link')}
          </Link>
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/libs/I18nNavigation';
import { buildPageMetadata } from '@/utils/Seo';

type PortfolioPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: PortfolioPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Portfolio' });

  return await buildPageMetadata({
    path: '/portfolio',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function PortfolioPage(props: PortfolioPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Portfolio',
  });

  return (
    <main className="min-h-[70dvh] bg-ps-warm-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-ps-h3 font-bold tracking-tight text-ps-black sm:text-ps-h2">
          {t('meta_title')}
        </h1>
        <p className="max-w-3xl font-body text-ps-body leading-relaxed text-ps-ink-600">
          {t('presentation')}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Link className="flex min-h-24 items-center rounded-ps-lg bg-white p-5 font-display text-ps-h6 font-bold text-ps-black shadow-ps-soft transition-transform hover:-translate-y-1" key={i} href={`/portfolio/${i}`}>
            {t('portfolio_name', { name: i })}
          </Link>
        ))}
        </div>
      </div>
    </main>
  );
}

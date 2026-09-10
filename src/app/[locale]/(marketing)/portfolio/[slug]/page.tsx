import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { JsonLd } from '@/components/seo/JsonLd';
import { routing } from '@/libs/I18nRouting';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import codeRabbitLogo from '@/public/assets/images/coderabbit-logo-light.svg';
import { buildPageMetadata } from '@/utils/Seo';

type PortfolioDetailPageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    Array.from({ length: 6 }, (_, i) => ({
      slug: `${i}`,
      locale,
    })),
  );
}

export async function generateMetadata(props: PortfolioDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const t = await getTranslations({ locale, namespace: 'PortfolioSlug' });

  return await buildPageMetadata({
    path: `/portfolio/${slug}`,
    locale,
    title: t('meta_title', { slug }),
    description: t('meta_description', { slug }),
  });
}

export default async function PortfolioDetailPage(props: PortfolioDetailPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'PortfolioSlug',
  });
  const tPortfolio = await getTranslations({ locale, namespace: 'Portfolio' });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { name: tPortfolio('meta_title'), path: '/portfolio' },
      { name: t('header', { slug }), path: `/portfolio/${slug}` },
    ],
    locale,
  );

  return (
    <main className="min-h-[70dvh] bg-ps-warm-white pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-40">
      <JsonLd data={breadcrumbJsonLd} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl rounded-ps-xl bg-white p-5 shadow-ps-soft sm:p-8 lg:p-10">
          <h1 className="font-display text-ps-h3 font-bold text-ps-black capitalize sm:text-ps-h2">{t('header', { slug })}</h1>
          <p className="mt-5 font-body text-ps-body leading-relaxed text-ps-ink-600">{t('content')}</p>

      <div className="mt-8 text-center font-body text-ps-sm text-ps-ink-600">
        {`${t('code_review_powered_by')} `}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025"
        >
          CodeRabbit
        </a>
      </div>

      <a href="https://www.coderabbit.ai?utm_source=next_js_starter&utm_medium=github&utm_campaign=next_js_starter_oss_2025">
        <Image className="mx-auto mt-2" src={codeRabbitLogo} alt="CodeRabbit" width={130} />
      </a>
        </article>
      </div>
    </main>
  );
}

export const dynamicParams = false;

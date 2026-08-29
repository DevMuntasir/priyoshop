import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { formatPostDate } from '@/components/media/formatPostDate';
import { NewsCard } from '@/components/news/NewsCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { Link } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';
import { listPublishedNewsPublicationSlugs } from '@/libs/news/NewsPublicationRepository';
import { decodeSlugParam } from '@/libs/news/newsSlug';
import { getPublishedNewsByPublicationSlug } from '@/libs/news/NewsPostRepository';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

export const revalidate = 3600;
export const dynamicParams = true;

type NewsPublicationPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await listPublishedNewsPublicationSlugs().catch(() => []);
  return routing.locales.flatMap((locale) => slugs.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata(props: NewsPublicationPageProps): Promise<Metadata> {
  const { locale, slug: rawSlug } = await props.params;
  const slug = decodeSlugParam(rawSlug);
  const t = await getTranslations({ locale, namespace: 'NewsPublication' });
  const result = await getPublishedNewsByPublicationSlug({ locale, slug });

  if (!result) {
    return { title: t('not_found_title'), robots: { index: false, follow: false } };
  }

  return await buildPageMetadata({
    path: `/news/publications/${slug}`,
    locale,
    title: t('meta_title', { publication: result.publication.name }),
    description: t('meta_description', { publication: result.publication.name }),
    ogImage: result.publication.logo || result.posts[0]?.coverImage || undefined,
  });
}

export default async function NewsPublicationPage(props: NewsPublicationPageProps) {
  const { locale, slug: rawSlug } = await props.params;
  const slug = decodeSlugParam(rawSlug);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'NewsPublication' });
  const tNews = await getTranslations({ locale, namespace: 'News' });
  const result = await getPublishedNewsByPublicationSlug({ locale, slug });

  if (!result) {
    notFound();
  }

  const latestDate = result.posts[0] ? formatPostDate(result.posts[0].publishedAt, locale) : null;
  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: tNews('breadcrumb_home'), path: '' },
      { name: tNews('title'), path: '/news' },
      { name: t('breadcrumb_publications'), path: '/news' },
      { name: result.publication.name, path: `/news/publications/${slug}` },
    ],
    locale,
  );

  return (
    <>
      <JsonLd data={breadcrumb} />

      <section className="bg-white pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="container mx-auto px-4">
          <Link
            href="/news"
            className="font-body text-ps-sm font-semibold text-ps-red-600 underline underline-offset-4"
          >
            {t('back_to_news')}
          </Link>

          <div className="mt-6 rounded-ps-xl bg-ps-cream p-6 ring-1 ring-ps-grey-200 ring-inset sm:p-8">
            {/* oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns */}
            <img
              src={result.publication.logo}
              alt={result.publication.logoAlt ?? result.publication.name}
              className="h-12 w-auto object-contain"
            />
            <h1 className="mt-6 font-display text-ps-h4 font-bold tracking-tight text-ps-black">
              {result.publication.name}
            </h1>
            <p className="mt-3 mb-0 max-w-2xl font-body text-ps-sm font-semibold text-ps-black-400">
              {t('page_description', { publication: result.publication.name })}
            </p>
            {latestDate && (
              <p className="mt-4 mb-0 font-body text-ps-xs font-semibold text-ps-ink-300">
                {t('latest_update', { date: latestDate })}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-t-4xl bg-white py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="m-0 font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
            {t('all_posts_title')}
          </h2>
          <div className="mt-8 grid gap-x-6 gap-y-6 sm:grid-cols-2">
            {result.posts.map((post) => (
              <NewsCard key={post.slug} post={post} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

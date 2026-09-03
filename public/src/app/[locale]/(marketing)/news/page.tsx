import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FeaturedNewsCarousel } from '@/components/news/FeaturedNewsCarousel';
import { NewsExplorer } from '@/components/news/NewsExplorer';
import { NewsHero } from '@/components/news/NewsHero';
import { NewsPublicationsMarquee } from '@/components/news/NewsPublicationsMarquee';
import { JsonLd } from '@/components/seo/JsonLd';
import {
  listFeaturedNewsPosts,
  listPublishedNewsPosts,
  listPublishedNewsPublications,
} from '@/libs/news/NewsPostRepository';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

export const revalidate = 3600;

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: NewsPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'News' });

  return await buildPageMetadata({
    path: '/news',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function NewsPage(props: NewsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'News' });

  const [featured, posts, publications] = await Promise.all([
    listFeaturedNewsPosts(locale),
    listPublishedNewsPosts(locale),
    listPublishedNewsPublications(),
  ]);

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: t('breadcrumb_home'), path: '' },
      { name: t('title'), path: '/news' },
    ],
    locale,
  );

  return (
    <>
      <div className="bg-section-gradient">
        <JsonLd data={breadcrumb} />
        <NewsHero locale={locale} />
        <FeaturedNewsCarousel
          posts={featured}
          locale={locale}
          readLabel={t('read_full_blog')}
        />
      </div>
      <NewsPublicationsMarquee
        publications={publications}
        title={t('publications_title')}
        description={t('publications_description')}
      />
      <NewsExplorer
        posts={posts}
        locale={locale}
        title={t('all_news_title')}
        description={t('all_news_description')}
        allLabel={t('all_news_chip')}
        loadMoreLabel={t('load_more')}
      />

    </>
  );
}

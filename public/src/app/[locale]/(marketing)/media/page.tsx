import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { BlogsExplorer } from '@/components/media/BlogsExplorer';
import { FeaturedPostCarousel } from '@/components/media/FeaturedPostCarousel';
import { MediaHero } from '@/components/media/MediaHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { listFeaturedPosts, listPublishedPosts } from '@/libs/media/BlogPostRepository';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

export const revalidate = 3600;

type MediaPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: MediaPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Media' });

  return await buildPageMetadata({
    path: '/media',
    locale,
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function MediaPage(props: MediaPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Media' });

  const [featured, posts] = await Promise.all([
    listFeaturedPosts(locale),
    listPublishedPosts(locale),
  ]);

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: t('breadcrumb_home'), path: '' },
      { name: t('title'), path: '/media' },
    ],
    locale,
  );

  return (
    <div className="bg-section-gradient">
      <JsonLd data={breadcrumb} />
      <MediaHero locale={locale} />
      <FeaturedPostCarousel
        posts={featured}
        locale={locale}
        readLabel={t('read_full_blog')}
        dashLabel={t('go_to_slide')}
      />
      <BlogsExplorer
        posts={posts}
        locale={locale}
        title={t('recent_blogs_title')}
        description={t('recent_blogs_description')}
        allLabel={t('all_blogs_chip')}
        loadMoreLabel={t('load_more')}
      />
    </div>
  );
}

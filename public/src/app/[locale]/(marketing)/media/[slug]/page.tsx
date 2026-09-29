import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ArticleBody } from '@/components/media/ArticleBody';
import { formatPostDate } from '@/components/media/formatPostDate';
import { SimilarBlogs } from '@/components/media/SimilarBlogs';
import { JsonLd } from '@/components/seo/JsonLd';
import { routing } from '@/libs/I18nRouting';
import { getPublishedPostBySlug, listPublishedSlugs, listSimilarPosts } from '@/libs/media/BlogPostRepository';
import { decodeSlugParam } from '@/libs/media/blogSlug';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

export const revalidate = 3600;
export const dynamicParams = true;

type BlogPostPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  // Prebuild published posts; new posts render on demand via dynamicParams.
  const slugs = await listPublishedSlugs().catch(() => []);
  return routing.locales.flatMap((locale) => slugs.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata(props: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug: rawSlug } = await props.params;
  const slug = decodeSlugParam(rawSlug);
  const post = await getPublishedPostBySlug(slug, locale);

  if (!post) {
    const t = await getTranslations({ locale, namespace: 'MediaSlug' });
    return { title: t('not_found_title'), robots: { index: false, follow: false } };
  }

  return await buildPageMetadata({
    path: `/media/${slug}`,
    locale,
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    ogImage: post.coverImage || undefined,
    ogType: 'article',
  });
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { locale, slug: rawSlug } = await props.params;
  const slug = decodeSlugParam(rawSlug);
  setRequestLocale(locale);

  const post = await getPublishedPostBySlug(slug, locale);
  if (!post) {
    notFound();
  }

  // `t` is the MediaSlug namespace; `tMedia` reuses keys already consumed on the listing page.
  const t = await getTranslations({ locale, namespace: 'MediaSlug' });
  const tMedia = await getTranslations({ locale, namespace: 'Media' });
  const similar = await listSimilarPosts({ slug, categories: post.categories, locale });

  const article = buildArticleJsonLd({
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    path: `/media/${slug}`,
    locale,
    image: post.coverImage || undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
  });

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: tMedia('breadcrumb_home'), path: '' },
      { name: tMedia('title'), path: '/media' },
      { name: post.title, path: `/media/${slug}` },
    ],
    locale,
  );

  return (
    <>
      <JsonLd data={[article, breadcrumb]} />

      <article className="min-w-0 bg-white pt-28 lg:pt-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-4xl">
            <h1 className="m-0 font-display text-ps-h5 leading-[1.25] font-bold wrap-break-word text-ps-black sm:text-ps-h4 lg:text-ps-h3">
              {post.title}
            </h1>
            <p className="mt-5 mb-0 max-w-3xl font-body text-ps-xs leading-relaxed font-semibold text-ps-black-400 sm:text-ps-sm">
              {post.excerpt}
            </p>
            <time
              dateTime={post.publishedAt}
              className="mt-4 block font-body text-ps-xs font-semibold text-ps-ink-300"
            >
              {formatPostDate(post.publishedAt, locale)}
            </time>
          </header>

          {post.coverImage && (
            <div className="mx-auto mt-10 max-w-4xl">
              {/* oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns */}
              <img
                src={post.coverImage}
                alt={post.coverImageAlt ?? post.title}
                className="aspect-video w-full rounded-ps-lg object-cover"
              />
            </div>
          )}

          <div className="mx-auto min-w-0 max-w-3xl pt-6 pb-16 lg:pb-24">
            <ArticleBody html={post.contentHtml} />
          </div>
        </div>
      </article>

      <SimilarBlogs
        posts={similar.slice(0, 6)}
        locale={locale}
        title={t('similar_blogs_title')}
        previousLabel={t('previous_slide')}
        nextLabel={t('next_slide')}
      />
    </>
  );
}

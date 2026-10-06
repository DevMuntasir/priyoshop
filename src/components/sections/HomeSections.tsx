import type { BuildPageSectionsOptions } from '@/components/sections/buildPageSections';
import { buildPageSections } from '@/components/sections/buildPageSections';
import { formatPostDate } from '@/components/media/formatPostDate';
import { ScrollVan } from '@/components/ui/ScrollVan';
import { listSectionKeysByPage } from '@/libs/cms/Sections';
import { getPathname } from '@/libs/I18nNavigation';
import { listPublishedPosts } from '@/libs/media/BlogPostRepository';
import { listPublishedNewsPosts } from '@/libs/news/NewsPostRepository';

type BuildOptions = Omit<
  BuildPageSectionsOptions,
  'page' | 'keys' | 'extra' | 'transformSection'
>;

function resolveNewsHref(options: { newsLink?: string; slug: string; locale: string }) {
  const link = options.newsLink?.trim();
  if (link) {
    return /^https?:\/\//i.test(link) ? link : `https://${link}`;
  }
  return getPathname({ locale: options.locale, href: `/news/${options.slug}` });
}

// Composes the home page from its CMS layout and section content.
export async function buildHomeSections(options: BuildOptions): Promise<React.ReactNode> {
  const [blogPosts, newsPosts] = await Promise.all([
    listPublishedPosts(options.locale),
    listPublishedNewsPosts(options.locale),
  ]);
  const mediaPath = getPathname({ locale: options.locale, href: '/media' });
  const newsPath = getPathname({ locale: options.locale, href: '/news' });

  return buildPageSections({
    page: 'home',
    keys: listSectionKeysByPage('home'),
    extra: { scrollVan: <ScrollVan /> },
    ...options,
    transformSection: (key, data) => {
      if (key === 'blogs') {
        return {
          ...data,
          heading: {
            ...data.heading,
            ctaHref:
              !data.heading.ctaHref ||
              data.heading.ctaHref === '/blogs' ||
              data.heading.ctaHref === '/media'
                ? mediaPath
                : data.heading.ctaHref,
          },
          items: blogPosts.slice(0, 3).map((post) => ({
            title: post.title,
            date: formatPostDate(post.publishedAt, options.locale),
            image: post.coverImage,
            imageAlt: post.coverImageAlt,
            href: getPathname({ locale: options.locale, href: `/media/${post.slug}` }),
          })),
        };
      }

      if (key === 'media') {
        return {
          ...data,
          heading: {
            ...data.heading,
            ctaHref:
              !data.heading.ctaHref || data.heading.ctaHref === '/news'
                ? newsPath
                : data.heading.ctaHref,
          },
          items: newsPosts.slice(0, 4).map((post) => ({
            name: post.publication?.name,
            logo: post.publication?.logo,
            title: post.title,
            date: formatPostDate(post.publishedAt, options.locale),
            image: post.coverImage,
            imageAlt: post.coverImageAlt,
            href: resolveNewsHref({
              newsLink: post.newsLink,
              slug: post.slug,
              locale: options.locale,
            }),
          })),
        };
      }

      return data;
    },
  });
}

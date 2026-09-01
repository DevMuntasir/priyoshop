'use client';

import { formatPostDate } from '@/components/media/formatPostDate';
import { Link } from '@/libs/I18nNavigation';
import type { NewsPostCard } from '@/libs/news/Types';

export type FeaturedNewsCarouselProps = {
  posts: NewsPostCard[];
  locale: string;
  readLabel: string;
};

function LeadFeaturedCard(props: {
  post: NewsPostCard;
  locale: string;
  readLabel: string;
}) {
  return (
    <Link
      href={`/news/${props.post.slug}`}
      className="group grid h-full min-w-0 overflow-hidden rounded-ps-xl bg-ps-black no-underline ring-1 ring-ps-black/10 ring-inset transition-transform duration-200 hover:-translate-y-1 hover:shadow-ps-soft lg:grid-cols-[1.2fr_0.95fr]"
    >
      <div className="aspect-[16/10] min-h-0 overflow-hidden bg-ps-grey-100 sm:aspect-video lg:aspect-auto lg:min-h-96">
        {props.post.coverImage && (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <img
            src={props.post.coverImage}
            alt={props.post.coverImageAlt ?? props.post.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-between gap-6 bg-ps-black p-5 text-white sm:p-8">
        <span className="font-body text-ps-xs font-semibold text-white/70">
          {formatPostDate(props.post.publishedAt, props.locale)}
        </span>
        <div className="space-y-6">
          {props.post.publication && (
            <div className="inline-flex w-fit rounded-ps-sm bg-white px-3 py-2">
              {/* oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns */}
              <img
                src={props.post.publication.logo}
                alt={props.post.publication.logoAlt ?? props.post.publication.name}
                className="h-7 w-auto object-contain"
              />
            </div>
          )}
          <h2 className="m-0 max-w-sm font-display text-ps-h6 leading-snug font-bold wrap-break-word text-white sm:text-ps-h5">
            {props.post.title}
          </h2>
          <span className="inline-flex w-fit items-center rounded-full bg-white px-5 py-3 font-body text-ps-sm font-semibold text-ps-black transition-colors group-hover:bg-ps-grey-100">
            {props.readLabel}
          </span>
        </div>
      </div>
    </Link>
  );
}

function CompactFeaturedCard(props: { post: NewsPostCard; locale: string }) {
  return (
    <Link
      href={`/news/${props.post.slug}`}
      className="group grid min-w-0 overflow-hidden rounded-ps-md bg-white no-underline ring-1 ring-ps-grey-200 ring-inset transition-transform duration-200 hover:-translate-y-1 hover:shadow-ps-soft sm:min-h-44 sm:grid-cols-[164px_minmax(0,1fr)]"
    >
      <div className="aspect-video overflow-hidden bg-ps-grey-100 sm:h-full sm:aspect-auto">
        {props.post.coverImage && (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <img
            src={props.post.coverImage}
            alt={props.post.coverImageAlt ?? props.post.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-3 p-4">
        {props.post.publication ? (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <div className="w-fit max-w-full border border-ps-grey-200 p-1">
            <img
              src={props.post.publication.logo}
              alt={props.post.publication.logoAlt ?? props.post.publication.name}
              className="h-7 w-auto max-w-28 object-contain"
            />
          </div>
        ) : (
          <div className="h-7" />
        )}
        <h3 className="m-0 line-clamp-3 font-body text-ps-body leading-snug font-semibold wrap-break-word text-ps-black sm:line-clamp-2">
          {props.post.title}
        </h3>
        <span className="font-body text-ps-xs font-semibold text-ps-ink-300">
          {formatPostDate(props.post.publishedAt, props.locale)}
        </span>
      </div>
    </Link>
  );
}

/* Featured news cards: lead story on the left with stacked supporting cards. */
export function FeaturedNewsCarousel(props: FeaturedNewsCarouselProps) {
  if (props.posts.length === 0) {
    return null;
  }

  const leadPost = props.posts[0];
  const sidePosts = props.posts.slice(1, 3);
  const extraPosts = props.posts.slice(3);

  return (
    <div className="container mx-auto px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
      <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.9fr)]">
        {leadPost && (
          <LeadFeaturedCard post={leadPost} locale={props.locale} readLabel={props.readLabel} />
        )}

        {sidePosts.length > 0 && (
          <div className="grid min-w-0 content-start gap-5">
            {sidePosts.map((post) => (
              <CompactFeaturedCard key={post.slug} post={post} locale={props.locale} />
            ))}
          </div>
        )}

      </div>

      {extraPosts.length > 0 && (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {extraPosts.map((post) => (
            <CompactFeaturedCard key={post.slug} post={post} locale={props.locale} />
          ))}
        </div>
      )}
    </div>
  );
}

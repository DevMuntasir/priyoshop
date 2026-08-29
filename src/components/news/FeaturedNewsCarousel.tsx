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
      className="group grid h-full overflow-hidden rounded-ps-xl bg-ps-black no-underline ring-1 ring-ps-black/10 ring-inset transition-transform duration-200 hover:-translate-y-1 hover:shadow-ps-soft lg:grid-cols-[1.25fr_0.95fr]"
    >
      <div className="min-h-72 overflow-hidden bg-ps-grey-100">
        {props.post.coverImage && (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <img
            src={props.post.coverImage}
            alt={props.post.coverImageAlt ?? props.post.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col justify-between gap-6 bg-ps-black p-6 text-white sm:p-8">
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
          <h2 className="m-0 max-w-sm font-display text-ps-h6 leading-snug font-bold text-white sm:text-ps-h5">
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
      className="group h-[175px] grid overflow-hidden rounded-ps-md bg-white no-underline ring-1 ring-ps-grey-200 ring-inset transition-transform duration-200 hover:-translate-y-1 hover:shadow-ps-soft sm:grid-cols-[164px_1fr]"
    >
      <div className="aspect-[16/10] overflow-hidden bg-ps-grey-100 sm:h-full sm:aspect-auto">
        {props.post.coverImage && (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <img
            src={props.post.coverImage}
            alt={props.post.coverImageAlt ?? props.post.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-3 p-3">
        {props.post.publication ? (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <div className='border-[1px] p-1'>
            <img
              src={props.post.publication.logo}
              alt={props.post.publication.logoAlt ?? props.post.publication.name}
              className="h-7 w-auto max-w-28 object-contain"
            />
          </div>
        ) : <div className='h-7'>

        </div>}
        <h3 className="m-0 line-clamp-2 font-body text-ps-body leading-snug font-semibold text-ps-black">
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
    <div className="container mx-auto px-4 pb-16">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
        {leadPost && <Link
          href={`/news/${leadPost.slug}`}
          className="group relative max-h-[375px]  h-full overflow-hidden rounded-ps-md  no-underline ring-1 ring-ps-black/10 ring-inset transition-transform duration-200 hover:-translate-y-1 hover:shadow-ps-soft "
        >
          <div className="min-h-72  overflow-hidden bg-ps-grey-100">
            {leadPost.coverImage && (
              // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
              <img
                src={leadPost.coverImage}
                alt={leadPost.coverImageAlt ?? leadPost.title}
                className=" object-contain transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </div>
          <div className=' absolute top-0 right-0 content-center max-w-[400px] z-20  bg-gradient-to-l to-transparent via-black/90 from-black   w-full h-full '>
            <div className="flex flex-col content-center max-w-[300px] ml-auto z-10  gap-6   p-6 text-white sm:p-8">
              <span className="font-body text-ps-xs font-semibold text-white/70">
                {formatPostDate(leadPost.publishedAt, props.locale)}
              </span>
              <div className="space-y-6">
                <h2 className="m-0 max-w-sm font-display text-ps-h6 leading-snug font-bold text-white ">
                  {leadPost.title}
                </h2>
                <span className="inline-flex mt-10 w-fit items-center rounded-full bg-white px-5 py-1.5 font-body text-ps-sm font-semibold text-ps-black transition-colors group-hover:bg-ps-grey-100">
                  {props.readLabel}
                </span>
              </div>
            </div>
          </div>

        </Link>}

        {sidePosts.length > 0 && (
          <div className="grid gap-5 content-start">
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

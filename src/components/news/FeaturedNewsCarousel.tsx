'use client';

import { formatPostDate } from '@/components/media/formatPostDate';
import { Link } from '@/libs/I18nNavigation';
import type { NewsPostCard } from '@/libs/news/Types';

export type FeaturedNewsCarouselProps = {
  posts: NewsPostCard[];
  locale: string;
  readLabel: string;
};

function resolveNewsHref(post: NewsPostCard) {
  const rawLink = post.newsLink?.trim();
  if (rawLink) {
    return {
      href: /^https?:\/\//i.test(rawLink) ? rawLink : `https://${rawLink}`,
      isExternal: true,
    };
  }
  return {
    href: `/news/${post.slug}`,
    isExternal: false,
  };
}

function LeadFeaturedCard(props: {
  post: NewsPostCard;
  locale: string;
  readLabel: string;
}) {
  const link = resolveNewsHref(props.post);
  const cardClassName = 'group  max-h-[300px] min-w-0 overflow-hidden rounded-ps-xl bg-ps-black no-underline ring-1 ring-ps-black/10 ring-inset transition-transform duration-200 hover:-translate-y-1 hover:shadow-ps-soft ';

  const cardContent = (
    <>
      <div className=" relative min-h-0 overflow-hidden bg-ps-grey-100 ">
        {props.post.coverImage && (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <img
            src={props.post.coverImage}
            alt={props.post.coverImageAlt ?? props.post.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className=' absolute h-full flex items-center w-full top-0 bg-gradient-to-l from-20% to-85% from-black/80 to-transparent'>
          <div className="flex max-w-1/2 ml-auto flex-col gap-4   text-white sm:p-8">
            <span className="font-body text-ps-xs font-semibold text-white/70">
              {formatPostDate(props.post.publishedAt, props.locale)}
            </span>
            <div className="space-y-3">

              {props.post.publication && (
                <div className="inline-flex w-fit rounded-ps-sm bg-white px-3 py-1">
                  {/* oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns */}
                  <img
                    src={props.post.publication.logo}
                    alt={props.post.publication.logoAlt ?? props.post.publication.name}
                    className="h-5 max-w-[100px] w-auto object-contain"
                  />
                </div>
              )}
              <h2 className="m-0 max-w-sm font-display text-ps-h6 lg:text-[25px] leading-snug font-bold wrap-break-word text-white line-clamp-5">
                {props.post.title}
              </h2>

              {/* <Button tone='light' size='sm' className=' !py-1' href={link.href} >

                {props.readLabel}
              </Button> */}

            </div>
          </div>
        </div>

      </div>

    </>
  );








  if (link.isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={link.href} className={cardClassName}>
      {cardContent}
    </Link>
  );
}

function CompactFeaturedCard(props: { post: NewsPostCard; locale: string }) {
  const link = resolveNewsHref(props.post);
  const cardClassName = 'group grid min-w-0 overflow-hidden rounded-ps-md bg-white no-underline ring-1 ring-ps-grey-200 ring-inset transition-transform duration-200 hover:-translate-y-1 hover:shadow-ps-soft max-h-[150px] sm:grid-cols-[164px_minmax(0,1fr)]';

  const cardContent = (
    <>
      <div className=" overflow-hidden bg-ps-grey-100 ">
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
          <div className="w-fit max-w-full border border-ps-grey-200 p-1">
            {/* oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns */}
            <img
              src={props.post.publication.logo}
              alt={props.post.publication.logoAlt ?? props.post.publication.name}
              className="h-5 w-auto max-w-28 object-contain"
            />
          </div>
        ) : (
          <div className="h-3" />
        )}
        <h3 className="m-0 line-clamp-3 font-body text-ps-xs  leading-snug font-semibold wrap-break-word text-ps-black sm:line-clamp-2">
          {props.post.title}
        </h3>
        <span className="font-body text-ps-xs font-semibold text-ps-ink-300">
          {formatPostDate(props.post.publishedAt, props.locale)}
        </span>
      </div>
    </>
  );

  if (link.isExternal) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClassName}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={link.href} className={cardClassName}>
      {cardContent}
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
    <div className="container mx-auto  pb-12  sm:pb-16 ">
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

import { formatPostDate } from '@/components/media/formatPostDate';
import { Link } from '@/libs/I18nNavigation';
import type { NewsPostCard as NewsPostCardData } from '@/libs/news/Types';

function resolveNewsHref(post: NewsPostCardData) {
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

/* Horizontal news card: square cover thumbnail left, two-line title and date right. */
export function NewsCard(props: { post: NewsPostCardData; locale: string }) {
  const link = resolveNewsHref(props.post);
  const cardClassName = 'group flex min-w-0 items-center gap-3 rounded-ps-md bg-white p-3 no-underline ring-1 ring-ps-grey-200 ring-inset transition-shadow hover:shadow-ps-soft sm:gap-4';

  const innerContent = (
    <>
      <div className="aspect-square w-24 shrink-0 overflow-hidden rounded-ps-sm bg-ps-grey-100 min-[380px]:w-28 sm:w-32">
        {props.post.coverImage && (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <img
            src={props.post.coverImage}
            alt={props.post.coverImageAlt ?? props.post.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        {props.post.publication && (
          <div className="max-w-30">
            {/* oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns */}
            <img
              src={props.post.publication.logo}
              alt={props.post.publication.logoAlt ?? props.post.publication.name}
              className="max-h-7 w-auto max-w-full"
            />
          </div>
        )}
        <h3 className="m-0 line-clamp-3 font-body text-ps-sm leading-snug font-bold wrap-break-word text-ps-black sm:line-clamp-2">
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
        {innerContent}
      </a>
    );
  }

  return (
    <Link href={link.href} className={cardClassName}>
      {innerContent}
    </Link>
  );
}

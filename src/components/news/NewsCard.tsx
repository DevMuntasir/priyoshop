import { Link } from '@/libs/I18nNavigation';
import { formatPostDate } from '@/components/media/formatPostDate';
import type { NewsPostCard as NewsPostCardData } from '@/libs/news/Types';

/* Horizontal news card: square cover thumbnail left, two-line title and date right. */
export function NewsCard(props: { post: NewsPostCardData; locale: string }) {
  const { post } = props;

  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex items-center gap-4 rounded-ps-md bg-white p-3 no-underline ring-1 ring-ps-grey-200 ring-inset transition-shadow hover:shadow-ps-soft"
    >
      <div className="aspect-square w-28 shrink-0 overflow-hidden rounded-ps-sm bg-ps-grey-100 sm:w-32">
        {post.coverImage && (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <img
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        {post.publication && (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <div className=' max-w-30'>
            <img
              src={post.publication.logo}
              alt={post.publication.logoAlt ?? post.publication.name}
              className="max-h-7 w-auto "
            />
          </div>
        )}
        <h3 className="m-0 line-clamp-2 font-body text-ps-sm leading-snug font-bold text-ps-black">
          {post.title}
        </h3>
        <span className="font-body text-ps-xs font-semibold text-ps-ink-300">
          {formatPostDate(post.publishedAt, props.locale)}
        </span>
      </div>
    </Link>
  );
}

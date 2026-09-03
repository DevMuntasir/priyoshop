import { Link } from '@/libs/I18nNavigation';
import type { BlogPostCard } from '@/libs/media/Types';
import { formatPostDate } from './formatPostDate';

/* Chrome-less blog card: rounded cover image, two-line title, muted date. */
export function BlogCard(props: { post: BlogPostCard; locale: string }) {
  const { post } = props;

  return (
    <Link href={`/media/${post.slug}`} className="group flex flex-col gap-3 no-underline">
      <div className="aspect-16/10 overflow-hidden rounded-ps-md bg-ps-grey-100">
        {post.coverImage && (
          // oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns
          <img
            src={post.coverImage}
            alt={post.coverImageAlt ?? post.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <h3 className="m-0 line-clamp-2 font-body text-ps-body leading-snug font-bold text-ps-black">
        {post.title}
      </h3>
      <span className="font-body text-ps-xs font-semibold text-ps-ink-300">
        {formatPostDate(post.publishedAt, props.locale)}
      </span>
    </Link>
  );
}

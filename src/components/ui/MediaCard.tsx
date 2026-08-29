import type * as React from 'react';
import { Icon } from './Icon';

export type MediaCardProps = {
  image?: string;
  imageAlt?: string;
  source?: React.ReactNode;
  /** Publisher logo; rendered in place of the text `source` when set. */
  sourceLogo?: string;
  sourceLogoAlt?: string;
  title: React.ReactNode;
  date?: React.ReactNode;
  href?: string;
  tone?: 'light' | 'dark';
  /** `vertical` stacks image over text (blogs); `horizontal` sits image beside text (news). */
  orientation?: 'vertical' | 'horizontal';
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/* Publisher logo when provided; otherwise the text source label. */
function SourceMark(props: {
  source?: React.ReactNode;
  sourceLogo?: string;
  sourceLogoAlt?: string;
}) {
  if (props.sourceLogo) {
    return (
      // oxlint-disable-next-line next/no-img-element -- arbitrary publisher logo; next/image needs remotePatterns we haven't configured
      <img
        src={props.sourceLogo}
        alt={props.sourceLogoAlt ?? ''}
        className="w-auto self-start object-contain"
      />
    );
  }
  if (props.source) {
    return (
      <span className="font-body text-ps-xs font-bold tracking-wide text-ps-red-600 uppercase">
        {props.source}
      </span>
    );
  }
  return null;
}

/* Media / blog card: image then source + clamped title + optional date.
   Vertical for "Read our Blogs"; horizontal for "Media & News". */
export function MediaCard({
  image,
  imageAlt = '',
  source,
  sourceLogo,
  sourceLogoAlt = '',
  title,
  date,
  href,
  tone = 'light',
  orientation = 'vertical',
  className = '',
  ...rest
}: MediaCardProps) {
  const dark = tone === 'dark';
  const horizontal = orientation === 'horizontal';

  return (
    <a
      href={href}
      className={`group flex h-full min-h-[260px] w-full overflow-hidden rounded-ps-xl no-underline transition-transform duration-200 duration-300 ease-out hover:-translate-y-1 hover:shadow-ps-card ${horizontal ? 'flex-col sm:flex-row' : 'flex-col'} ${dark ? 'bg-ps-ink-900 ring-1 ring-ps-line-dark ring-inset' : 'bg-white ring-1 ring-ps-grey-200 ring-inset'} ${className}`.trim()}
      {...rest}
    >
      <div
        className={`overflow-hidden overflow-hidden${image ? '' : 'bg-ps-grey-150'} ${horizontal ? 'aspect-16/10 sm:aspect-auto sm:w-1/2 sm:shrink-0' : 'aspect-16/10'}`}
      >
        {image && (
          // oxlint-disable-next-line next/no-img-element -- `image` is an arbitrary external URL; next/image requires remotePatterns we haven't configured
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover duration-500 group-hover:scale-110"
          />
        )}
      </div>
      <div
        className={`relative flex flex-col gap-3 p-6 ${horizontal ? 'sm:w-1/2 sm:justify-between sm:gap-4' : ''}`}
      >
        {horizontal && (
          <Icon
            name="arrow-up-right"
            className={`absolute top-6 right-6 size-5 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${dark ? 'text-ps-grey-150' : 'text-ps-ink-700'}`}
          />
        )}
        <SourceMark source={source} sourceLogo={sourceLogo} sourceLogoAlt={sourceLogoAlt} />
        <div>
          <h3
            className={`mb-4 line-clamp-3 font-body text-ps-body leading-snug font-semibold ${horizontal ? 'pr-8' : ''} ${dark ? 'text-ps-grey-150' : 'text-ps-ink-700'}`}
          >
            {title}
          </h3>
          {date && (
            <span
              className={`font-body text-ps-body font-semibold ${horizontal ? 'mt-0' : 'mt-2'} ${dark ? 'text-ps-ink-200' : 'text-ps-ink-300'}`}
            >
              {date}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

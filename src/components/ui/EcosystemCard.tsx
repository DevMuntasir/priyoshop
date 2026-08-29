'use client';

import type * as React from 'react';
import { Button } from './Button';

export type EcosystemCardProps = {
  title: React.ReactNode;
  body: React.ReactNode;
  image?: string;
  imageAlt?: string;
  /** Tailwind background class for the copy panel, e.g. `bg-ps-green-tint`. */
  panelClassName?: string;
  ctaLabel?: string;
  onCta?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  href?: string;
  reverse?: boolean;
  height?: number;
} & React.HTMLAttributes<HTMLDivElement>;

/* Two-pane feature card: a tinted copy panel beside a full-bleed image.
   Mirrors the Figma "ecosystem/card_01..04" family. */
export function EcosystemCard({
  title,
  body,
  image,
  imageAlt = '',
  panelClassName = 'bg-ps-green-tint',
  ctaLabel = 'Learn More',
  onCta,
  href,
  reverse = false,
  height = 348,
  className = '',
  style,
  ...rest
}: EcosystemCardProps) {
  const panel = (
    <div
      className={`flex shrink-0 grow-0 basis-auto flex-col justify-between gap-4 p-6 md:basis-[54%] md:p-12 ${panelClassName}`}
    >
      <div className="flex flex-col">
        <h3 className="m-0 font-body text-ps-h6 leading-snug font-bold text-ps-ink-700 md:text-ps-h4">
          {title}
        </h3>
        <p className="m-0 line-clamp-4 text-ps-xs md:text-ps-body font-body leading-normal font-semibold text-ps-black-400">
          {body}
        </p>
      </div>
      <Button
        variant="ghost"
        size="md"
        onClick={onCta}
        href={href}
        aria-label={typeof title === 'string' ? `${ctaLabel}: ${title}` : undefined}
        className="self-start pl-0 text-ps-xs md:text-ps-body font-body font-normal underline underline-offset-2"
      >
        {ctaLabel}
      </Button>
    </div>
  );

  const media = (
    <div
      className={`h-48 w-full flex-1 self-stretch overflow-hidden md:h-auto ${image ? '' : 'bg-ps-grey-150'}`}
    >
      {image && (
        // oxlint-disable-next-line next/no-img-element -- `image` is an arbitrary external URL; next/image requires remotePatterns we haven't configured
        <img src={image} alt={imageAlt} className="h-full w-full object-cover object-center" />
      )}
    </div>
  );

  return (
    <div
      className={`flex w-full max-w-[992px] flex-col overflow-hidden rounded-ps-xl bg-ps-warm-white ring-1 ring-ps-grey-300 ring-inset ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} md:h-(--ecosystem-card-h) ${className}`.trim()}
      style={{ '--ecosystem-card-h': `${height}px`, ...style } as React.CSSProperties}
      {...rest}
    >
      {panel}
      {media}
    </div>
  );
}

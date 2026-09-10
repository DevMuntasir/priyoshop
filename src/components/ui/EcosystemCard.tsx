'use client';

import type * as React from 'react';
import type { ResponsiveCardStyle } from '@/libs/cms/StyleTokens';
import { resolveCardStyle } from '@/libs/cms/StyleTokens';
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
  design?: ResponsiveCardStyle;
  className?: string;
  style?: React.CSSProperties;
};

/* Two-pane feature card: a tinted copy panel beside a full-bleed image.
   Mirrors the Figma "ecosystem/card_01..04" family. */
export function EcosystemCard(props: EcosystemCardProps) {
  const design = props.design ? resolveCardStyle(props.design) : null;
  const panelClassName = design
    ? `${design.panelClass} ${props.panelClassName ?? ''}`
    : `bg-ps-green-tint p-6 font-body font-semibold text-ps-ink-700 md:p-12 ${props.panelClassName ?? ''}`;
  const titleClassName = design
    ? design.titleClass
    : 'text-ps-h6 font-bold md:text-ps-h4';
  const panel = (
    <div
      className={`flex shrink-0 grow-0 basis-auto flex-col justify-between gap-4 md:basis-[65%] ${panelClassName}`.trim()}
    >
      <div className="flex flex-col">
        <h3 className={`m-0 leading-snug ${titleClassName}`.trim()}>{props.title}</h3>
        <p
          className={`mt-3 line-clamp-4 leading-normal ${design ? design.bodyClass : 'font-body text-ps-xs text-ps-black-400 md:text-ps-body lg:text-[18px]'}`.trim()}
        >
          {props.body}
        </p>
      </div>
      <Button
        variant="ghost"
        size="md"
        onClick={props.onCta}
        href={props.href}
        aria-label={
          typeof props.title === 'string'
            ? `${props.ctaLabel ?? 'Learn More'}: ${props.title}`
            : undefined
        }
        className={`self-start pl-0 underline underline-offset-2 ${design ? design.bodyClass : 'font-body text-ps-xs font-normal md:text-ps-body'}`.trim()}
        style={design ? { color: 'inherit', fontFamily: 'inherit' } : undefined}
      >
        {props.ctaLabel ?? 'Learn More'}
      </Button>
    </div>
  );

  const media = (
    <div
      className={`h-48 w-full flex-1 self-stretch overflow-hidden md:h-auto ${props.image ? '' : 'bg-ps-grey-150'}`}
    >
      {props.image && (
        // oxlint-disable-next-line next/no-img-element -- `image` is an arbitrary external URL; next/image requires remotePatterns we haven't configured
        <img
          src={props.image}
          alt={props.imageAlt ?? ''}
          className="h-full w-full object-cover object-center"
        />
      )}
    </div>
  );

  return (
    <div
      className={`flex w-full max-w-[982px] flex-col overflow-hidden bg-ps-warm-white ring-1 ring-ps-grey-300 ring-inset ${props.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} md:h-(--ecosystem-card-h) ${design?.cardClass ?? 'rounded-ps-xl'} ${props.className ?? ''}`.trim()}
      style={{ '--ecosystem-card-h': `${props.height ?? 348}px`, ...props.style } as React.CSSProperties}
    >
      {panel}
      {media}
    </div>
  );
}

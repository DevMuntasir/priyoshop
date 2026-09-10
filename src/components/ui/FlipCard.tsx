'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SectionHeading } from './SectionHeading';

type FlipCardProps = {
  img?: string;
  title?: string;
  caption?: string;
  /** Width/sizing utilities applied to the outer card so the parent track controls layout. */
  className?: string;
};

/**
 * Direction-aware flip card: an image front face that rotates to reveal a
 * titled caption on hover. Sizing is driven by the parent via `className`.
 *
 * @param props - Image, title, caption, and sizing className for the card.
 * @returns The flip card element.
 */
export function FlipCard(props: FlipCardProps) {
  return (
    <div
      className={cn(
        'group h-65 w-full overflow-visible sm:h-80 lg:h-96',
        props.className,
      )}
    >
      <div className="relative h-full w-full rounded-ps-lg transition-transform duration-300 transform-3d group-hover:transform-[rotateY(180deg)]">
        <div className="absolute flex h-full w-full items-center justify-center overflow-hidden rounded-ps-lg backface-hidden">
          <Image
            alt={props.title ?? 'img'}
            src={props.img ?? '/retail/1.png'}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 55vw, 45vw"
            className="object-cover"
          />
        </div>

        <div className="absolute flex h-full w-full transform-[rotateY(180deg)] flex-col justify-center overflow-hidden rounded-ps-lg border border-ps-gold-600 bg-ps-gold-500/10 p-6 text-white backface-hidden sm:p-8 lg:p-10">
          <SectionHeading
            title={props.title ?? 'Thousands of Products'}
            titleSize="h4"
            align="left"
            description={
              props.caption ??
              'PriyoShop combines commerce, logistics, embedded finance, and data intelligence to build a smarter.'
            }
            descriptionFontClass="!font-normal text-ps-black-400 text-ps-body"
          />
        </div>
      </div>
    </div>
  );
}

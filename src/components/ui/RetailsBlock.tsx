'use client';

import type { Align } from '@/libs/cms/StyleTokens';
import { Button } from './Button';
import { FlipCard } from './FlipCard';
import { Reveal, RevealGroup } from './Reveal';
import { SectionHeading } from './SectionHeading';

type RetailItem = {
  img: string;
  label: string;
  caption?: string;
};

export type RetailsBlockProps = {
  base?: string;
  align?: Align;
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: RetailItem[];
  cta?: string;
  ctaHref?: string;
};

const DEFAULT_ITEMS: RetailItem[] = [
  { img: '/career/1.png', label: 'Commerce', caption: 'A unified retail storefront' },
  { img: '/career/2.png', label: 'Logistics', caption: 'Last-mile delivery at scale' },
  { img: '/career/3.png', label: 'Embedded finance', caption: 'Credit where it is needed' },
  { img: '/career/4.png', label: 'Data intelligence', caption: 'Insight across the network' },
];

/* "Data-Driven Retail Infrastructure" — direction-aware hover cards in a
   peeking track that bleeds to the right viewport edge, mirroring NewsBlock. */
export function RetailsBlock({
  base = '',
  align = 'left',
  eyebrow = 'PriyoShop Retail',
  title = 'Data-Driven Retail Infrastructure',
  description = 'PriyoShop combines commerce, logistics, embedded finance, and data intelligence to build a smarter retail ecosystem for Bangladesh.',
  items = DEFAULT_ITEMS,
  cta = 'Learn More',
  ctaHref,
}: RetailsBlockProps) {
  return (
    <div className={`mx-auto px-6 md:px-0 w-full overflow-x-hidden py-12 sm:py-16 lg:py-20 ${base}`.trim()}>
      <div className="container mx-auto mb-8 flex flex-wrap items-start justify-between gap-6 sm:mb-11">
        <Reveal direction="left">
          <SectionHeading
            titleSize="h2"
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={align}
          />
        </Reveal>
        {cta ? (
          <Reveal direction="right" delay={0.15}>
            <Button variant="filled" tone="dark" href={ctaHref}>
              {cta}
            </Button>
          </Reveal>
        ) : null}
      </div>

      <div className="container relative mx-auto">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-white to-transparent sm:w-24"
        ></div>
        <RevealGroup
          stagger={0.1}
          className="mr-[calc(50%-50vw)] flex snap-x snap-mandatory scrollbar-none gap-6 overflow-x-auto scroll-smooth pb-4"
        >
          {items.map((item) => (
            <Reveal
              item
              direction="up"
              key={item.label}
              className="w-[calc((100%-1.5rem)/1.15)] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/1.8)] lg:w-[calc((100%-3rem)/2.2)]"
            >
              <FlipCard img={item.img} title={item.label} caption={item.caption} />
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import type { Align } from '@/libs/cms/StyleTokens';
import { Button } from './Button';
import { Icon } from './Icon';
import { MediaCard } from './MediaCard';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { SectionHeading } from './SectionHeading';

type NewsItem = {
  source: string;
  logo: string;
  ttl: string;
  date: string;
  img: string;
  href?: string;
};

export type NewsBlockProps = {
  base?: string;
  align?: Align;
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: NewsItem[];
  cta?: string;
  ctaHref?: string;
};

const DEFAULT_ITEMS: NewsItem[] = [
  {
    source: 'The Business Standard',
    logo: '/icons/bs.svg',
    ttl: 'PriyoShop, insightgenie and community bank launch AI credit scoring for MSMEs',
    date: '03 Sep, 2025',
    img: '/blogs/1.png',
  },
  {
    source: 'The Business Standard',
    logo: '/icons/bs.svg',
    ttl: 'PriyoShop named among the top 100 fastest-growing companies of 2024',
    date: '03 Sep, 2025',
    img: '/blogs/2.png',
  },
  {
    source: 'The Business Standard',
    logo: '/icons/bs.svg',
    ttl: 'How PriyoShop is rewiring retail distribution across Bangladesh',
    date: '03 Sep, 2025',
    img: '/blogs/3.png',
  },
];

/* "Media & News" — press headlines in a smooth, peeking carousel. The track
   bleeds past the container to the right viewport edge so cards slide in from
   the border; ~2 cards sit full with a 30% peek inviting the scroll. */
export function NewsBlock({
  base = '',
  align = 'left',
  eyebrow = 'Media & News',
  title = 'Top Headlines Are Taking About Us',
  description = 'Get the latest news from PriyoShop, revolutionizing retail in Bangladesh with innovative commerce, logistics, finance, and data solutions.',
  items = DEFAULT_ITEMS,
  cta = 'Read All News',
  ctaHref,
}: NewsBlockProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const card = track.firstElementChild;
    const step = card instanceof HTMLElement ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    const left = direction === 1 && atEnd ? -track.scrollLeft : direction * step;
    track.scrollBy({ left, behavior: 'smooth' });
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        scrollByCard(1);
      }
    }, 3500);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Section>
      <div className="mx-auto w-full overflow-hidden">
        <Reveal direction="left" className="mb-11 flex flex-wrap items-start justify-between gap-6">
          <SectionHeading
            titleSize="h2"
            eyebrow={eyebrow}
            title={title}
            description={description}
            align={align}
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => {
                scrollByCard(-1);
              }}
              className="flex size-12 items-center justify-center rounded-ps-pill ring-1 ring-ps-grey-300 transition-colors ring-inset hover:bg-ps-grey-100"
            >
              <Icon name="arrow-left" size={20} className="text-ps-ink-700" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => {
                scrollByCard(1);
              }}
              className="flex size-12 items-center justify-center rounded-ps-pill ring-1 ring-ps-grey-300 transition-colors ring-inset hover:bg-ps-grey-100"
            >
              <Icon name="arrow-right" size={20} className="text-ps-ink-700" />
            </button>
            {cta ? (
              <Button variant="filled" tone="dark" href={ctaHref}>
                {cta}
              </Button>
            ) : null}
          </div>
        </Reveal>
        <Reveal className="relative" delay={0.1}>
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r from-white to-transparent sm:w-24"
          />

          <div
            ref={trackRef}
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
            }}
            onTouchStart={() => {
              pausedRef.current = true;
            }}
            className="mr-[calc(50%-50vw)] flex snap-x snap-mandatory scrollbar-none gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {items.map((n) => (
              <MediaCard
                key={n.ttl}
                orientation="horizontal"
                image={`${base}${n.img}`}
                source={n.source}
                sourceLogo={n.logo}
                sourceLogoAlt={n.source}
                title={n.ttl}
                date={n.date}
                href={n.href ?? '#'}
                onClick={
                  n.href
                    ? undefined
                    : (e) => {
                        e.preventDefault();
                      }
                }
                className="w-[calc((100%-1.5rem)/1.15)] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/1.8)] lg:w-[calc((100%-3rem)/2)]"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

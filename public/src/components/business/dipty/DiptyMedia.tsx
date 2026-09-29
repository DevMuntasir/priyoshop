'use client';

import { animate, motion, useMotionValue } from 'motion/react';
import { useRef, useState } from 'react';
import { IconButton } from '@/components/ui/IconButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

type NewsItem = {
  title: string;
  date: string;
  reporter: string;
  image: string;
  href: string;
};

const SPRING = { type: 'spring', stiffness: 150, damping: 26 } as const;

export function DiptyMedia(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;
  const news: NewsItem[] = items.map(item => ({
    title: item.title ?? '',
    date: item.date ?? '',
    reporter: item.name ?? '',
    image: item.image ?? '',
    href: item.href ?? '/media',
  }));
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const x = useMotionValue(0);

  /* Track x that centers the slide at `index` inside the viewport. */
  const offsetForIndex = (index: number) => {
    const viewport = viewportRef.current;
    const child = trackRef.current?.children[index];
    if (!viewport || !(child instanceof HTMLElement)) {
      return 0;
    }
    return (viewport.clientWidth - child.clientWidth) / 2 - child.offsetLeft;
  };

  const goToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(news.length - 1, index));
    setActiveIndex(clamped);
    animate(x, offsetForIndex(clamped), SPRING);
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
        />

        <div ref={viewportRef} className="mt-12 overflow-hidden">
          <motion.div
            ref={trackRef}
            drag="x"
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80 || info.velocity.x < -400) {
                goToIndex(activeIndex + 1);
              } else if (info.offset.x > 80 || info.velocity.x > 400) {
                goToIndex(activeIndex - 1);
              } else {
                goToIndex(activeIndex);
              }
            }}
            style={{ x }}
            className="flex cursor-grab select-none  pb-2 active:cursor-grabbing sm:px-[10%]"
          >
            {news.map((item, index) => (
              <motion.article
                key={item.title}
                animate={{
                  scale: index === activeIndex ? 1 : 0.92,
                  opacity: index === activeIndex ? 1 : 0.1,
                }}
                transition={SPRING}
                className="grid w-full shrink-0 grid-cols-1 overflow-hidden rounded-ps-xl bg-ps-cream  sm:grid-cols-2"
              >
                {/* oxlint-disable-next-line next/no-img-element -- static press photo inside a drag carousel */}
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="h-full max-h-80 w-full object-cover"
                />
                <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
                  <p className="m-0 font-body text-ps-xs font-semibold text-ps-black-400">
                    {item.date}
                    {' '}
                    |
                    {' '}
                    {item.reporter}
                  </p>
                  <h3 className="m-0 font-display text-ps-h5 font-bold text-ps-black text-balance">
                    {item.title}
                  </h3>
                  <a
                    href={item.href}
                    className="font-body text-ps-sm font-semibold text-ps-red-600 underline underline-offset-4"
                  >
                    Read Full News
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          <IconButton
            disabled={activeIndex === 0}
            onClick={() => {
              goToIndex(activeIndex - 1);
            }}
            ariaLabel="Previous news"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </IconButton>
          <IconButton
            variant="filled"
            disabled={activeIndex === news.length - 1}
            onClick={() => {
              goToIndex(activeIndex + 1);
            }}
            ariaLabel="Next news"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </IconButton>
        </div>
      </div>
    </section>
  );
}

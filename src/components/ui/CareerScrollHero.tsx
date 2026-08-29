'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform, wrap } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { SectionHeading } from './SectionHeading';

/* -------------------------------------------------------------------------- */
/*  Types                                                                      */
/* -------------------------------------------------------------------------- */

type CardSize = 'short' | 'tall';
type GalleryImage = { src: string; alt: string; size?: CardSize };

/** Single JSON object the parent passes in — all copy + both image columns. */
export type CareerHeroContent = {
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  columnA: GalleryImage[];
  columnB: GalleryImage[];
};

/**
 * Per-axis card sizing. Vertical (lg+) varies the height; horizontal (< lg)
 * varies the width and lets the height fill the row — so the same "short/tall"
 * mix reads as a staggered gallery on either axis.
 */
const CARD_CLASS: Record<CardSize, { vertical: string; horizontal: string }> = {
  short: { vertical: 'h-[180px] w-full max-w-[180px]', horizontal: 'h-full w-[180px]' },
  tall: { vertical: 'h-[280px] w-full max-w-[180px]', horizontal: 'h-full w-[280px]' },
};

/** How many times the list is repeated to guarantee a gap-free loop. */
const LOOP_COPIES = 3;

/* -------------------------------------------------------------------------- */
/*  Breakpoint hook                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Tracks Tailwind's `lg` breakpoint (>= 1024px) so we can switch scroll axis.
 *
 * @returns `true` once the viewport is at least 1024px wide.
 */
function useIsLargeScreen() {
  const [isLg, setIsLg] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => {
      setIsLg(mq.matches);
    };
    update();
    mq.addEventListener('change', update);
    return () => {
      mq.removeEventListener('change', update);
    };
  }, []);

  return isLg;
}

/* -------------------------------------------------------------------------- */
/*  Animation logic — seamless infinite loop (works with mixed sizes)          */
/* -------------------------------------------------------------------------- */
/**
 * Turns scroll progress into an endlessly looping offset for one column. It
 * measures the real length of ONE sequence by diffing the offset of the first
 * card in copy #1 and copy #2 — on the active axis (left for horizontal, top
 * for vertical) — so it stays correct no matter how the cards are mixed, then
 * `wrap()`s the travel into that range for a forever, seam-free cycle.
 *
 * @param progress Scroll progress (0 -> 1) driving the loop.
 * @param direction `1` travels one way, `-1` the opposite way.
 * @param cycles How many full sequence-lengths it travels across 0 -> 1.
 * @param horizontal Measure/travel along x instead of y.
 * @returns Refs to anchor the first card of copy #1 and #2, plus the looping offset.
 */
function useInfiniteColumn(
  progress: MotionValue<number>,
  direction: 1 | -1,
  cycles: number,
  horizontal: boolean,
) {
  const firstRef = useRef<HTMLDivElement>(null); // first card of copy #1
  const secondRef = useRef<HTMLDivElement>(null); // first card of copy #2
  const [seq, setSeq] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (firstRef.current && secondRef.current) {
        const diff = horizontal
          ? secondRef.current.offsetLeft - firstRef.current.offsetLeft
          : secondRef.current.offsetTop - firstRef.current.offsetTop;
        setSeq(diff);
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (firstRef.current) {
      ro.observe(firstRef.current);
    }
    if (secondRef.current) {
      ro.observe(secondRef.current);
    }
    return () => {
      ro.disconnect();
    };
  }, [horizontal]);

  const raw = useTransform(progress, [0, 1], [0, direction * cycles * seq]);
  const offset = useTransform(raw, (v) => (seq ? wrap(-seq, 0, v) : 0));

  return { firstRef, secondRef, offset };
}

/* -------------------------------------------------------------------------- */
/*  UI primitive                                                               */
/* -------------------------------------------------------------------------- */

const ImageCard = ({
  img,
  horizontal,
  innerRef,
}: {
  img: GalleryImage;
  horizontal: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}) => (
  <div
    ref={innerRef}
    className={`${CARD_CLASS[img.size ?? 'tall'][horizontal ? 'horizontal' : 'vertical']} shrink-0 overflow-hidden rounded-2xl bg-neutral-100`}
  >
    {/* oxlint-disable-next-line next/no-img-element -- gallery `src` may be an arbitrary URL; next/image needs remotePatterns we haven't configured */}
    <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
  </div>
);

/* -------------------------------------------------------------------------- */
/*  One looping column (vertical) / row (horizontal)                           */
/* -------------------------------------------------------------------------- */

function LoopColumn({
  images,
  offset,
  firstRef,
  secondRef,
  horizontal,
  extraClass = '',
}: {
  images: GalleryImage[];
  offset: MotionValue<number>;
  firstRef: React.Ref<HTMLDivElement>;
  secondRef: React.Ref<HTMLDivElement>;
  horizontal: boolean;
  extraClass?: string;
}) {
  const len = images.length;
  const loop = Array.from({ length: LOOP_COPIES }, () => images).flat();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.div
        style={horizontal ? { x: offset } : { y: offset }}
        className={`absolute flex gap-4 ${horizontal ? 'inset-y-0 left-0 flex-row' : 'inset-x-0 top-0 flex-col'} ${extraClass}`}
      >
        {loop.map((img, i) => {
          let innerRef: React.Ref<HTMLDivElement> | undefined;
          if (i === 0) {
            innerRef = firstRef;
          } else if (i === len) {
            innerRef = secondRef;
          }
          return <ImageCard key={i} img={img} horizontal={horizontal} innerRef={innerRef} />;
        })}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  The reusable two-track infinite scroller                                   */
/* -------------------------------------------------------------------------- */

function ScrollImageColumns({
  columnA,
  columnB,
  /** Number of full sequence-loops travelled across the scroll. Higher = faster. */
  speed = 1.5,
  className = '',
  heightClassName = 'h-screen',
  /** External scroll progress (0 -> 1). Omit to self-track on scroll-through. */
  progress,
}: {
  columnA: GalleryImage[];
  columnB: GalleryImage[];
  speed?: number;
  className?: string;
  heightClassName?: string;
  progress?: MotionValue<number>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const isLg = useIsLargeScreen();
  const horizontal = !isLg; // < lg scrolls horizontally; lg+ stays vertical

  // Self-track: progress runs 0 -> 1 as the columns pass through the viewport,
  // which is what drives the smooth loop within a normal section.
  const local = useScroll({
    target: rootRef,
    offset: ['start end', 'end start'],
  });
  const source = progress ?? local.scrollYProgress;

  // Spring smoothing — keeps the loop buttery instead of jumpy.
  const smooth = useSpring(source, { stiffness: 60, damping: 22, mass: 0.55 });

  const cycles = prefersReduced ? 0 : speed;
  const colA = useInfiniteColumn(smooth, 1, cycles, horizontal); // one way
  const colB = useInfiniteColumn(smooth, -1, cycles, horizontal); // opposite way

  return (
    <div
      ref={rootRef}
      className={`grid gap-4 ${horizontal ? 'grid-rows-2' : 'grid-cols-2'} ${heightClassName} ${className}`}
    >
      <LoopColumn
        images={columnA}
        offset={colA.offset}
        firstRef={colA.firstRef}
        secondRef={colA.secondRef}
        horizontal={horizontal}
      />
      <LoopColumn
        images={columnB}
        offset={colB.offset}
        firstRef={colB.firstRef}
        secondRef={colB.secondRef}
        horizontal={horizontal}
        /* head-start so the second track sits offset from the first */
        extraClass={horizontal ? 'pl-10' : 'pt-10 lg:pt-16'}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  The full Career hero — single 100vh section                                */
/* -------------------------------------------------------------------------- */

export default function CareerScrollHero({ content }: { content: CareerHeroContent }) {
  return (
    // Capped at one viewport on large screens. Images move smoothly as the section scrolls past.
    <section className="z-20 mx-auto py-10 md:py-0  overflow-hidden rounded-t-ps-hero bg-ps-white  lg:h-screen lg:max-h-screen border-y-[1px]">
      <div className="container mx-auto flex flex-col items-center gap-10   lg:h-full lg:flex-row lg:justify-between lg:gap-8 lg:py-0">
        {/* Left: copy */}
        <div className='px-6 md:px-0 '>
          <SectionHeading
            eyebrow={content.badge}
            align='left'
            title={content.title}
            description={content.description}
          />
          {content.ctaLabel ? (
            <Button size="md" variant="filled" href={content.ctaHref} className="mt-7">
              {content.ctaLabel}
            </Button>
          ) : null}
        </div>

        {/* Right: infinite opposite-loop tracks — horizontal < lg, vertical lg+ */}
        <ScrollImageColumns
          columnA={content.columnA}
          columnB={content.columnB}
          speed={0.5}
          className="w-full shrink-0 lg:max-w-97.5"
          heightClassName="h-[60vh] lg:h-screen"
        />
      </div>
    </section>
  );
}

'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * FlipHeadline
 * -------------
 * Reproduces the PrigoShop "The Impact" hero animation: selected keywords in a
 * headline flip on the X-axis (like a card) to reveal a photo on the back face,
 * then flip back. Words flip ONE AT A TIME on a loop with a stagger between them.
 *
 * Mechanic per word:
 *   front face = gradient/colored text
 *   back face  = image, pre-rotated 180deg, sized to the word's own box
 *   animate rotateX: 0 -> 180 (hold) -> 360/0 (back to text)
 *
 * The flipping element is `inline-block` with `width: auto`, so the back-face
 * image always fills exactly the text's bounding box (that's why "Changes" and
 * "Empower" get differently-sized photos in the design).
 */

type Segment =
  | { type: 'text'; value: string }
  | {
      type: 'flip';
      value: string;
      /** Tailwind classes for the front text (gradient / color). */
      className?: string;
      /** Back-face image. */
      image: { src: string; alt: string };
    };

export type FlipLine = Segment[];

export type FlipHeadlineProps = {
  lines?: FlipLine[];
  /** Full visible duration of a single flip cycle (ms). */
  flipDuration?: number;
  /** How long the image (back face) stays visible mid-cycle (ms). */
  holdDuration?: number;
  /** Delay between one word finishing and the next starting (ms). */
  staggerDelay?: number;
};

// ---- Default content mirroring the design ---------------------------------

const DEFAULT_LINES: FlipLine[] = [
  [
    { type: 'text', value: 'Drive ' },
    {
      type: 'flip',
      value: 'Changes',
      className: 'bg-gradient-to-r from-rose-500 to-amber-400 bg-clip-text text-transparent',
      image: { src: '/hero/changes.jpg', alt: 'Driving change in communities' },
    },
  ],
  [
    {
      type: 'flip',
      value: 'Empower',
      className:
        'bg-gradient-to-r from-rose-500 via-orange-500 to-amber-400 bg-clip-text text-transparent',
      image: { src: '/hero/empower.jpg', alt: 'Women entrepreneurs collaborating' },
    },
    { type: 'text', value: ' Women' },
  ],
  [
    { type: 'text', value: 'Shaping the ' },
    {
      type: 'flip',
      value: 'Future',
      className: 'bg-gradient-to-r from-rose-500 to-amber-400 bg-clip-text text-transparent',
      image: { src: '/hero/future.jpg', alt: 'A hopeful future' },
    },
  ],
];

// ---- Word ------------------------------------------------------------------

function FlipWord({
  segment,
  isActive,
  flipDuration,
  holdDuration,
}: {
  segment: Extract<Segment, { type: 'flip' }>;
  isActive: boolean;
  flipDuration: number;
  holdDuration: number;
}) {
  const reduce = useReducedMotion();

  // Reduced-motion / no-flip: just render the text, never animate.
  if (reduce) {
    return <span className={segment.className}>{segment.value}</span>;
  }

  const half = flipDuration / 1000 / 2; // seconds for each 180deg half
  const total = half * 2 + holdDuration / 1000; // full cycle in seconds
  const cycleTimes = [0, half / total, (half + holdDuration / 1000) / total, 1];

  return (
    <span className="relative inline-block align-baseline" style={{ perspective: 800 }}>
      <motion.span
        className="relative inline-block transform-3d"
        animate={isActive ? { rotateX: [0, 180, 180, 360] } : { rotateX: 0 }}
        transition={
          isActive
            ? {
                duration: total,
                times: cycleTimes,
                ease: 'easeInOut',
              }
            : { duration: 0 }
        }
      >
        {/* FRONT — text (defines the box size). Fades out while the back face
            is showing so the gradient text never bleeds through the image
            (bg-clip-text defeats backface-visibility in some browsers). */}
        <motion.span
          className={segment.className}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          animate={isActive ? { opacity: [1, 0, 0, 1] } : { opacity: 1 }}
          transition={
            isActive ? { duration: total, times: cycleTimes, ease: 'easeInOut' } : { duration: 0 }
          }
        >
          {segment.value}
        </motion.span>

        {/* BACK — image, fills the same box, pre-rotated */}
        <span
          aria-hidden
          className="absolute inset-0 overflow-hidden rounded-full border-2 bg-white p-2"
          style={{
            transform: 'rotateX(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <Image
            src={segment.image.src}
            alt={segment.image.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />
        </span>
      </motion.span>
    </span>
  );
}

// ---- Headline --------------------------------------------------------------

/**
 * FlipTitle
 * ---------
 * The animated flip content WITHOUT a heading wrapper, so it can be dropped
 * into any heading element (e.g. SectionHeading's own `<h2>`). Owns the flip
 * sequencing/timer state.
 *
 * @param props - Flip lines and timing configuration.
 * @returns The sequenced flip headline content.
 */
export function FlipTitle(props: FlipHeadlineProps) {
  const lines = props.lines ?? DEFAULT_LINES;
  const flipDuration = props.flipDuration ?? 1600;
  const holdDuration = props.holdDuration ?? 900;
  const staggerDelay = props.staggerDelay ?? 600;

  // Flatten flip-words to build a sequence order.
  const flipIndices: string[] = [];
  for (const [li, line] of lines.entries()) {
    for (const [si, seg] of line.entries()) {
      if (seg.type === 'flip') {
        flipIndices.push(`${li}-${si}`);
      }
    }
  }

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let start: ReturnType<typeof setTimeout> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (!reduce && flipIndices.length > 0) {
      let i = 0;

      const cycle = () => {
        const key = flipIndices[i % flipIndices.length] ?? null;
        setActiveKey(key);

        // active window = full flip cycle; then clear + wait stagger; then next
        timeout = setTimeout(() => {
          setActiveKey(null);
          timeout = setTimeout(() => {
            i += 1;
            cycle();
          }, staggerDelay);
        }, flipDuration + holdDuration);
      };

      start = setTimeout(cycle, staggerDelay);
    }

    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, flipDuration, holdDuration, staggerDelay]);

  return (
    <>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((seg, si) =>
            seg.type === 'text' ? (
              <span key={si}>{seg.value}</span>
            ) : (
              <FlipWord
                key={si}
                segment={seg}
                isActive={activeKey === `${li}-${si}`}
                flipDuration={flipDuration}
                holdDuration={holdDuration}
              />
            ),
          )}
        </span>
      ))}
    </>
  );
}

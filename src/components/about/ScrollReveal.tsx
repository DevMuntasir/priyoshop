"use client";

import type { MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type ScrollOffset =
  | "start end"
  | "start center"
  | "start start"
  | "end end"
  | "end center"
  | "end start";

export type ScrollRevealConfig = {
  /** Optional pill above the headline (e.g. "About PriyoShop"). */
  badge?: string;
  /** The headline text that fills in on scroll. */
  text: string;
  /** Reveal granularity. Letter-by-letter ("char") by default. */
  granularity?: "char" | "word";
  /** Un-revealed color (start). Defaults to a soft gray. */
  fromColor?: string;
  /** Revealed color (end). Defaults to near-black. */
  toColor?: string;
  /**
   * How wide each unit's transition window is, in scroll-progress units
   * (0-1). Bigger = softer / more overlap between letters.
   */
  softness?: number;
  /**
   * scrollYProgress offset for the section. Controls when the fill
   * starts and ends relative to the viewport.
   * [start edge of element vs viewport, end edge ...]
   */
  offset?: [ScrollOffset, ScrollOffset];
  /** Section height. Defaults to '700px'. */
  height?: string;
  /** Tailwind height classes for responsive heights (e.g. 'h-[250px] sm:h-[350px] md:h-[500px]'). Overrides height. */
  heightClass?: string;
  /** Tailwind text size classes for the headline. Defaults to 'text-ps-h4 lg:text-ps-h2'. */
  textSize?: string;
};

/* ------------------------------------------------------------------ */
/* Single animated unit (a character or a word)                        */
/* ------------------------------------------------------------------ */

function Unit({
  children,
  progress,
  range,
  fromColor,
  toColor,
  reduce,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  fromColor: string;
  toColor: string;
  reduce: boolean;
}) {
  // useTransform interpolates between two color strings as scroll
  // progress passes through this unit's [start, end] window.
  const color = useTransform(progress, range, [fromColor, toColor]);

  if (reduce) {
    // Respect reduced-motion: show the final state, no scroll linking.
    return <span style={{ color: toColor }}>{children}</span>;
  }

  return <motion.span style={{ color }}>{children}</motion.span>;
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function ScrollReveal({ config }: { config: ScrollRevealConfig }) {
  const {
    badge,
    text,
    granularity = "char",
    fromColor = "#d1d1d6", // light gray
    toColor = "#101114", // near-black
    softness = .05,
    offset = ["start end", "end start"],
    height = "700px",
    heightClass,
    textSize = "text-ps-h4 lg:text-ps-h2",
  } = config;

  const targetRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
  });

  // Split into words; each word keeps its chars together so a single
  // word never breaks across two lines.
  const words = useMemo(() => text.split(" "), [text]);

  // Total animated units across the whole text. For "char" we count
  // every non-space character; for "word" we count words.
  const totalUnits = useMemo(() => {
    if (granularity === "word") {
      return words.length;
    }
    return words.reduce((acc, w) => acc + w.length, 0);
  }, [words, granularity]);

  // Distribute each unit's start so the first begins at progress 0 and
  // the last finishes at progress 1, with `softness` overlap.
  const step = totalUnits > 1 ? (1 - softness) / (totalUnits - 1) : 1;

  // Running index shared across words so the fill is continuous.
  let unitIndex = 0;

  return (
    <section
      ref={targetRef}
      className={`relative w-full pb-20 flex items-center ${heightClass || ''}`}
      style={{ height: heightClass ? undefined : height }}
    >
      <div className="sticky  h-fit flex flex-col items-center justify-center w-full px-6">
        {badge ? (
          <SectionHeading eyebrow={badge} title="" />
        ) : null}
        <p className={`container ${textSize} text-center font-display font-bold leading-snug tracking-tight`}>
          {words.map((word, wi) => {
            const isLast = wi === words.length - 1;

            if (granularity === "word") {
              const i = unitIndex;
              unitIndex += 1;
              const start = i * step;
              const range: [number, number] = [start, start + softness];
              return (
                <span key={wi}>
                  <span className="inline-block">
                    <Unit
                      progress={scrollYProgress}
                      range={range}
                      fromColor={fromColor}
                      toColor={toColor}
                      reduce={reduce}
                    >
                      {word}
                    </Unit>
                  </span>
                  {isLast ? "" : " "}
                </span>
              );
            }

            // char granularity (letter-by-letter)
            return (
              <span key={wi}>
                <span className="inline-block">
                  {/* eslint-disable-next-line unicorn/no-misused-spread */}
                  {[...word].map((ch, ci) => {
                    const i = unitIndex;
                    unitIndex += 1;
                    const start = i * step;
                    const range: [number, number] = [start, start + softness];
                    return (
                      <Unit
                        key={ci}
                        progress={scrollYProgress}
                        range={range}
                        fromColor={fromColor}
                        toColor={toColor}
                        reduce={reduce}
                      >
                        {ch}
                      </Unit>
                    );
                  })}
                </span>
                {isLast ? "" : " "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}

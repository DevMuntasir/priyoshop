'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentType, Key, ReactNode, Ref } from 'react';

/**
 * ScrollFocusStack — scroll-linked center-focus stack
 * ---------------------------------------------------
 * A tall track pins the section. Card motion is bound to the section's OWN
 * scroll progress, so:
 *   - Before the section is pinned/centered, progress = 0 -> first card sits
 *     still (no early stepping while the section scrolls into view).
 *   - While pinned, scrolling advances the cards through a center focus point.
 *   - After the track ends, the section unpins and the page scrolls on.
 *
 *   slot  0  -> centered, sharp, full size/opacity   (active)
 *   slot -1 -> above, blurred + smaller + faint       (previous)
 *   slot +1 -> below, blurred + smaller + faint       (upcoming)
 *
 * `snap` rounds progress to the nearest card so each one settles (with a spring
 * bounce) like a stepper — but driven by native scroll, so touch / keyboard /
 * trackpad all work for free. UI-agnostic: pass `renderItem`.
 */

type FocusStackConfig = {
  /** Scroll distance per item, in vh. Higher = slower / more deliberate. */
  vhPerItem?: number;
  /** Round to the nearest card (stepper feel). false = continuous follow. */
  snap?: boolean;
  itemHeight?: number;
  spacing?: number;
  maxBlur?: number;
  scaleK?: number;
  minScale?: number;
  opacityK?: number;
  hideBeyond?: number;
  spring?: { stiffness?: number; damping?: number; mass?: number };
};

const DEFAULTS = {
  vhPerItem: 10,
  snap: true,
  itemHeight: 348,
  maxBlur: 5,
  scaleK: 0.32,
  minScale: 0.84,
  opacityK: 0.9,
  hideBeyond: 1.7,
  spring: { stiffness: 120, damping: 14, mass: 0.5 },
};

type Resolved = typeof DEFAULTS & { spacing: number };

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export type ScrollFocusStackProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  header?: ReactNode;
  stage?: ComponentType<{ children: ReactNode }>;
  config?: FocusStackConfig;
  className?: string;
  gridClassName?: string;
  getKey?: (item: T, index: number) => Key;
};

function PassThrough({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function FocusSlot({
  i,
  index,
  cfg,
  children,
  slotRef,
}: {
  i: number;
  index: MotionValue<number>;
  cfg: Resolved;
  children: ReactNode;
  /** Attached to the first slot so the stack can measure live item height. */
  slotRef?: Ref<HTMLDivElement>;
}) {
  const slot = useTransform(index, (v) => i - v);

  const y = useTransform(slot, (s) => s * cfg.spacing);
  const scale = useTransform(slot, (s) => clamp(1 - Math.abs(s) * cfg.scaleK, cfg.minScale, 1));
  const opacity = useTransform(slot, (s) => {
    const d = Math.abs(s);
    return d > cfg.hideBeyond ? 0 : clamp(1 - d * cfg.opacityK, 0, 1);
  });
  const blur = useTransform(slot, (s) => Math.min(Math.abs(s), 1) * cfg.maxBlur);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const zIndex = useTransform(slot, (s) => Math.round(100 - Math.abs(s) * 10));

  return (
    <motion.div
      ref={slotRef}
      style={{ y, scale, opacity, filter, zIndex, willChange: 'transform, opacity, filter' }}
      className="absolute inset-x-0 top-0 flex justify-center"
    >
      {children}
    </motion.div>
  );
}

export function ScrollFocusStack<T>({
  items,
  renderItem,
  header,
  stage: Stage = PassThrough,
  config,
  className = '',
  gridClassName = 'relative mx-auto mt-8 w-full px-4 sm:mt-10 sm:px-6',
  getKey,
}: ScrollFocusStackProps<T>) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const n = items.length;

  // Live height of the first card. Lets the stack adapt when the rendered item
  // reflows across breakpoints, instead of relying on a fixed `itemHeight`.
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    const el = measureRef.current;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setMeasuredHeight(entry.contentRect.height);
      }
    });
    if (el) {
      observer.observe(el);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const cfg = useMemo<Resolved>(() => {
    const itemHeight =
      measuredHeight > 0 ? measuredHeight : (config?.itemHeight ?? DEFAULTS.itemHeight);
    // Keep the next/prev peek proportional to the live item height; an explicit
    // `spacing` still wins until we have a measurement.
    const spacing = measuredHeight
      ? Math.round(itemHeight * 0.82)
      : (config?.spacing ?? Math.round(itemHeight * 0.82));
    return {
      ...DEFAULTS,
      ...config,
      itemHeight,
      spacing,
      spring: reduced
        ? { stiffness: 200, damping: 40, mass: 1 }
        : { ...DEFAULTS.spring, ...config?.spring },
      maxBlur: reduced ? 0 : (config?.maxBlur ?? DEFAULTS.maxBlur),
      scaleK: reduced ? 0 : (config?.scaleK ?? DEFAULTS.scaleK),
    };
  }, [config, reduced, measuredHeight]);

  // progress: 0 the moment the section pins (centered), 1 just before it unpins.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const target = useTransform(scrollYProgress, (p) => {
    const raw = clamp(p, 0, 1) * Math.max(n - 1, 0);
    return cfg.snap ? Math.round(raw) : raw;
  });
  const index = useSpring(target, cfg.spring);

  return (
    <section
      ref={trackRef}
      style={{ height: `${n * cfg.vhPerItem}vh` }}
      className={className}
      aria-roledescription="carousel"
      aria-label="Ecosystem cards"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center md:justify-center overflow-hidden">
        <Stage>
          {header}
          <div className={gridClassName} style={{ height: cfg.itemHeight }}>
            {items.map((item, i) => (
              <FocusSlot
                key={getKey ? getKey(item, i) : i}
                i={i}
                index={index}
                cfg={cfg}
                slotRef={i === 0 ? measureRef : undefined}
              >
                {renderItem(item, i)}
              </FocusSlot>
            ))}
          </div>
        </Stage>
      </div>
    </section>
  );
}

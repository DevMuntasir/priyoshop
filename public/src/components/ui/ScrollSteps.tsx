'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { SectionHeading } from './SectionHeading';

/**
 * ScrollSteps — sticky two-column scrollytelling
 * ----------------------------------------------
 * Left:  vertical step list. Active step sharp + full opacity; others dim+blur.
 *        Crossfades smoothly with scroll.
 * Right: a CENTER-FOCUS image stack (not a flat strip):
 *        - upcoming image sits below: smaller + blurred + low opacity
 *        - on becoming active it springs into the viewport with a soft bounce,
 *          full size + sharp + opaque
 *        - then it lifts up and out as the next one takes over
 *        Tracks the SAME continuous scroll progress as the left text, so each
 *        image arrives in lockstep with its step (columns stay in sync).
 *
 * Section pins over a tall track and binds to its own scroll progress, so it
 * starts only once centered, then releases. Native scroll (touch / kbd / wheel).
 */

export type ScrollStep = {
  id?: string;
  label?: string; // "01" — auto 2-digit if omitted
  title: ReactNode;
  body: ReactNode;
  image: string;
  imageAlt?: string;
};

type ScrollStepsConfig = {
  vhPerStep?: number;
  imageHeight?: number;
  imageGap?: number;
  peek?: number; // px of the upcoming image visible below the active one
  // ----- image focus-stack -----
  imageBlur?: number; // max blur (px) for off-center images
  imageScaleK?: number; // size falloff per slot of distance
  imageMinScale?: number;
  imageOpacityFloor?: number; // upcoming/previous image opacity
  imageOpacityK?: number;
  imageHideBeyond?: number; // images beyond this slot distance are hidden
  imageSpring?: { stiffness?: number; damping?: number; mass?: number }; // bounce
  // ----- left text -----
  textMaxBlur?: number;
  textOpacityFloor?: number;
  textOpacityK?: number;
  textSpring?: { stiffness?: number; damping?: number; mass?: number };
};

const DEFAULTS = {
  vhPerStep: 100,
  imageHeight: 380,
  imageGap: 20,
  peek: 300,
  imageBlur: 5,
  imageScaleK: 0.12,
  imageMinScale: 0.86,
  imageOpacityFloor: 0.25,
  imageOpacityK: 0.7,
  imageHideBeyond: 1.7,
  imageSpring: { stiffness: 140, damping: 16, mass: 0.6 }, // soft bounce on settle
  textMaxBlur: 3,
  textOpacityFloor: 0.28,
  textOpacityK: 0.7,
  textSpring: { stiffness: 120, damping: 28, mass: 0.5 },
};

type Resolved = typeof DEFAULTS;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export type ScrollStepsProps = {
  steps: ScrollStep[];
  heading?: ReactNode;
  config?: ScrollStepsConfig;
  className?: string;
};

function ImageSlot({
  i,
  step,
  active,
  cfg,
}: {
  i: number;
  step: ScrollStep;
  active: MotionValue<number>;
  cfg: Resolved;
}) {
  const slot = useTransform(active, (v) => i - v); // 0 = in viewport (active)
  const spacing = cfg.imageHeight + cfg.imageGap;

  const y = useTransform(slot, (s) => s * spacing);
  const scale = useTransform(slot, (s) =>
    clamp(1 - Math.abs(s) * cfg.imageScaleK, cfg.imageMinScale, 1),
  );
  const opacity = useTransform(slot, (s) => {
    const d = Math.abs(s);
    return d > cfg.imageHideBeyond ? 0 : clamp(1 - d * cfg.imageOpacityK, cfg.imageOpacityFloor, 1);
  });
  const blur = useTransform(slot, (s) => Math.min(Math.abs(s), 1) * cfg.imageBlur);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const zIndex = useTransform(slot, (s) => Math.round(100 - Math.abs(s) * 10));

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        filter,
        zIndex,
        height: cfg.imageHeight,
        transformOrigin: 'center top',
        willChange: 'transform, opacity, filter',
      }}
      className="absolute inset-x-0 top-0 ml-auto w-[80%] overflow-hidden rounded-l-ps-xl rounded-r-none bg-ps-grey-150"
    >
      {/* oxlint-disable-next-line next/no-img-element -- `step.image` is an arbitrary URL; next/image needs remotePatterns we haven't configured */}
      <img src={step.image} alt={step.imageAlt ?? ''} className="h-full w-full object-cover" />
    </motion.div>
  );
}

const getListItems = (body: ReactNode): string[] => {
  if (typeof body !== 'string') {
    return [];
  }

  return body
    .split(/\r?\n/u)
    .map((line) => line.trim().replace(/^(?:[-*•]|\d+[.)])\s*/u, ''))
    .filter(Boolean);
};

function StepBody(props: { body: ReactNode; className?: string }) {
  const items = getListItems(props.body);

  if (items.length > 1) {
    return (
      <ul
        className={`m-0 max-w-sm list-disc space-y-1 pl-5 font-body text-ps-sm leading-relaxed text-ps-black-50 sm:text-base ${props.className ?? ''}`.trim()}
      >
        {items.map((item, index) => (
          <li key={`${index}-${item}`}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <p
      className={`m-0 max-w-sm font-body text-ps-sm leading-relaxed text-ps-black-50 sm:text-base ${props.className ?? ''}`.trim()}
    >
      {props.body}
    </p>
  );
}

function StepItem({
  i,
  step,
  label,
  active,
  cfg,
}: {
  i: number;
  step: ScrollStep;
  label: string;
  active: MotionValue<number>;
  cfg: Resolved;
}) {
  const dist = useTransform(active, (v) => Math.abs(i - v));
  const opacity = useTransform(dist, (d) =>
    Math.max(cfg.textOpacityFloor, 1 - d * cfg.textOpacityK),
  );
  const blur = useTransform(dist, (d) => Math.min(d, 1) * cfg.textMaxBlur);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.li
      style={{ opacity, filter, willChange: 'opacity, filter' }}
      className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6"
    >
      <span className="mt-0 font-body text-ps-h3 font-semibold text-ps-white tabular-nums sm:text-ps-h2 lg:text-ps-h1">
        {label}
      </span>
      <div>
        <h3 className="m-0 font-body text-xl font-bold text-ps-white sm:text-3xl">{step.title}</h3>
        <StepBody body={step.body} className="mt-2 sm:mt-3" />
      </div>
    </motion.li>
  );
}

function StoryHeading(props: { heading?: ReactNode }) {
  if (props.heading) {
    return <>{props.heading}</>;
  }

  return (
    <SectionHeading
      descriptionFontClass="font-normal"
      titleColor="text-white "
      className="max-w-full !font-normal md:sticky md:top-0 md:max-w-1/2"
      descriptionColor="text-ps-black-100"
      align="left"
      title="Distribution"
      description="Grow Your Retail Business with the Best FMCG Wholesale Distributor. MSMEs' one-stop platform for bulk FMCG supplies connect with top brands, access quality products, and get fast delivery right to the retail doorstep"
    />
  );
}

/**
 * Mobile fallback: the pinned scrollytelling is poor UX on a phone (text + a
 * tall image crammed into one viewport). Instead render a natural vertical
 * stack — each step shows its number/title/body followed by its image.
 *
 * @param props - The steps to render and the optional heading block.
 * @returns The vertically stacked mobile story.
 */
function ScrollStepsMobile(props: Pick<ScrollStepsProps, 'steps' | 'heading'>) {
  return (
    <section className="container mx-auto px-4 sm:px-6 md:hidden" aria-roledescription="scroll story">
      <StoryHeading heading={props.heading} />
      <ol className="m-0 mt-10 list-none space-y-12 p-0">
        {props.steps.map((s, i) => (
          <li key={s.id ?? i} className="space-y-5">
            <div className="grid grid-cols-[auto_1fr] gap-x-4">
              <span className="font-body text-ps-h3 font-semibold text-ps-white tabular-nums">
                {s.label ?? String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="m-0 font-body text-xl font-bold text-ps-white">{s.title}</h3>
                <StepBody body={s.body} className="mt-2" />
              </div>
            </div>
            <div className="overflow-hidden rounded-ps-xl bg-ps-grey-150">
              {/* oxlint-disable-next-line next/no-img-element -- arbitrary URL; next/image needs remotePatterns we haven't configured */}
              <img
                src={s.image}
                alt={s.imageAlt ?? ''}
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ScrollStepsDesktop({ steps, heading, config, className = '' }: ScrollStepsProps) {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const textListRef = useRef<HTMLOListElement>(null);
  const [textOffsets, setTextOffsets] = useState<number[]>([]);
  const n = steps.length;

  useEffect(() => {
    const list = textListRef.current;

    if (!list) {
      return;
    }

    const items = Array.from(list.querySelectorAll<HTMLElement>(':scope > li'));
    const measure = () => {
      const nextOffsets = items.map((item) => item.offsetTop);
      setTextOffsets((currentOffsets) =>
        currentOffsets.length === nextOffsets.length &&
          currentOffsets.every((offset, index) => offset === nextOffsets[index])
          ? currentOffsets
          : nextOffsets,
      );
    };
    const observer = new ResizeObserver(measure);

    observer.observe(list);
    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, [steps]);

  const cfg = useMemo<Resolved>(
    () => ({
      ...DEFAULTS,
      ...config,
      imageBlur: reduced ? 0 : (config?.imageBlur ?? DEFAULTS.imageBlur),
      imageScaleK: reduced ? 0 : (config?.imageScaleK ?? DEFAULTS.imageScaleK),
      textMaxBlur: reduced ? 0 : (config?.textMaxBlur ?? DEFAULTS.textMaxBlur),
      imageSpring: reduced
        ? { stiffness: 200, damping: 40, mass: 1 }
        : { ...DEFAULTS.imageSpring, ...config?.imageSpring },
      textSpring: reduced
        ? { stiffness: 200, damping: 40, mass: 1 }
        : { ...DEFAULTS.textSpring, ...config?.textSpring },
    }),
    [config, reduced],
  );
  const trackHeight = 100 + Math.max(n - 1, 0) * cfg.vhPerStep;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const raw = useTransform(scrollYProgress, (p) => clamp(p, 0, 1) * Math.max(n - 1, 0));

  // Left highlight: smooth, continuous.
  const activeText = useSpring(raw, cfg.textSpring);
  const textY = useTransform(activeText, (value) => {
    if (textOffsets.length === 0) {
      return 0;
    }

    const boundedValue = clamp(value, 0, textOffsets.length - 1);
    const lowerIndex = Math.floor(boundedValue);
    const upperIndex = Math.ceil(boundedValue);
    const progress = boundedValue - lowerIndex;
    const lowerOffset = textOffsets[lowerIndex] ?? 0;
    const upperOffset = textOffsets[upperIndex] ?? lowerOffset;

    return -(lowerOffset + (upperOffset - lowerOffset) * progress);
  });
  // Right image: tracks the SAME continuous progress as the left text, so each
  // image slides/fades in in lockstep with its step (not snapped) — the spring
  // adds a soft settle without decoupling the columns.
  const activeImage = useSpring(raw, cfg.imageSpring);

  // Peek (the upcoming-image sliver below the active one) shrinks to 0 over the
  // final step, since the last image has nothing to reveal underneath it.
  const viewportH = useTransform(raw, (v) => {
    const t = clamp(v - (n - 2), 0, 1);
    return cfg.imageHeight + cfg.imageGap + cfg.peek * (1 - t);
  });

  return (
    <section
      ref={trackRef}
      style={{ height: `${trackHeight}vh` }}
      className={`hidden md:block ${className} `}
      aria-roledescription="scroll story"
    >
      <div className="sticky top-20 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StoryHeading heading={heading} />
        </div>

        <div className="container mx-auto mt-8 grid grid-cols-1 gap-8 px-4 sm:mt-14 sm:px-6 md:grid-cols-2 md:gap-12 lg:px-8">
          {/* LEFT — heading + steps */}
          <motion.div className="overflow-hidden" style={{ height: viewportH }}>
            <motion.ol
              ref={textListRef}
              style={{ y: textY, willChange: 'transform' }}
              className="m-0 list-none space-y-6 p-0 sm:space-y-10"
            >
              {steps.map((s, i) => (
                <StepItem
                  key={s.id ?? i}
                  i={i}
                  step={s}
                  label={s.label ?? String(i + 1).padStart(2, '0')}
                  active={activeText}
                  cfg={cfg}
                />
              ))}
            </motion.ol>
          </motion.div>

          {/* RIGHT — center-focus image stack, bleeding to the right viewport edge */}
          <motion.div
            className="relative -pt-[10px] mr-[calc(50%-50vw)] overflow-hidden rounded-l-ps-xl rounded-r-none"
            style={{ height: viewportH }}
          >
            {steps.map((s, i) => (
              <ImageSlot key={s.id ?? i} i={i} step={s} active={activeImage} cfg={cfg} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ScrollSteps(props: ScrollStepsProps) {
  return (
    <div className="relative">
      <ScrollStepsMobile steps={props.steps} heading={props.heading} />
      <ScrollStepsDesktop {...props} />
    </div>
  );
}

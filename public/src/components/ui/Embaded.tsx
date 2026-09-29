'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { useRef } from 'react';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';
import { Button } from './Button';
import { SectionHeading } from './SectionHeading';

const EASE = [0.22, 1, 0.36, 1] as const;

const textItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function EmbeddedHero(props: { data: ResolvedSection }) {
  const { heading, style } = props.data;
  const resolved = resolveSectionStyle(style);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const inView = useInView(sectionRef, {
    once: true,
    margin: '0px 0px -15% 0px',
  });

  // Pointer position over the section, normalised to -0.5..0.5 and smoothed.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const springX = useSpring(px, { stiffness: 140, damping: 18, mass: 0.4 });
  const springY = useSpring(py, { stiffness: 140, damping: 18, mass: 0.4 });

  // Tilt the whole scene in 3D, and keep the interaction subtle.
  const rotateY = useTransform(springX, [-0.5, 0.5], [10, -10]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [-7, 7]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  const animate = reduce || inView ? 'show' : 'hidden';

  return (
    <div
      ref={sectionRef}
      className={`container hidden lg:block mx-auto px-4 pb-12 sm:px-6 sm:pb-16 lg:pb-20 ${resolved.wrapperClass}`.trim()}
    >
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="w-full"
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="aspect-998/412 w-full"
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        >
          <div className="relative mx-auto box-border h-full w-full overflow-hidden rounded-ps-lg bg-white bg-[url('/embedded/bg.png')] bg-cover bg-center px-1">
            {/* Left-side copy — heading, subtitle and CTA stagger in on reveal. */}
            <motion.div
              style={{ translateZ: 80 }}
              initial="hidden"
              animate={animate}
              variants={{
                hidden: {},
                show: { transition: { delayChildren: 0.35, staggerChildren: 0.12 } },
              }}
              className="absolute inset-y-0 left-5 z-50 flex w-[calc(100%-2.5rem)] w-full flex-col justify-end
               gap-1 lg:gap-2 mt-10 lg:mt-0 sm:left-8 sm:w-[55%] sm:gap-3 sm:py-10 lg:left-12 lg:w-[45%] lg:gap-4 lg:py-12"
            >
              <motion.h2
                variants={textItem}
                className="font-display text-[clamp(2rem,8vw,3.5rem)] leading-[1] font-extrabold tracking-tight whitespace-pre-line text-white drop-shadow-md text-ps-h4 lg:text-ps-h1 lg:text-ps-display"
              >
                {heading.title}
              </motion.h2>
              <motion.p
                variants={textItem}
                className="max-w-[25ch] lg:max-w-[35ch] leading-[1] md:leading-[1.2] font-body text-ps-sm font-medium text-white/90 sm:text-base"
              >
                {heading.description}
              </motion.p>
              {heading.ctaLabel ? (
                <motion.div variants={textItem}>
                  <Button className=' py-1 mt-2' size="sm" href={heading.ctaHref}>
                    {heading.ctaLabel}
                  </Button>
                </motion.div>
              ) : null}
            </motion.div>

            {/* Frosted blur strip fading up from the bottom edge. */}

          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function EmbeddedPartners(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);

  return (
    <div className={`container mt-6 mx-auto px-4 sm:px-6 ${resolved.wrapperClass}`.trim()}>
      <div className="mt-0 sm:mt-15 mb-10 sm:mb-0">
        <SectionHeading title={heading.title} className=" " titleSize="h2" align={resolved.align} />
        <div className="mt-8 grid grid-cols-2 justify-items-center gap-5 sm:mt-10 sm:flex sm:justify-center">
          {items.map((item, i) => (
            <div
              key={`${item.logo}-${i}`}
              className={`flex h-20 lg:h-30  w-full bg-section-gradient items-center justify-center border-ps-gold-500/50 border rounded-ps-sm lg:rounded-ps-md px-4  sm:px-6  `}
            >
              {/* oxlint-disable-next-line next/no-img-element -- static brand logo; next/image adds no value for a small inline mark */}
              <img
                src={item.logo}
                alt={item.name ?? ''}
                className="max-h-10 w-auto object-contain sm:max-h-12"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

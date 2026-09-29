'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { HTMLMotionProps, Variants } from 'motion/react';
import type * as React from 'react';
import { cn } from '@/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

type RevealProps = {
  children: React.ReactNode;
  /** Direction the content travels in from. */
  direction?: RevealDirection;
  /** Travel distance in pixels for directional reveals. */
  distance?: number;
  /** Seconds before the animation starts. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
  /** Negative bottom margin so the reveal fires slightly before fully in view. */
  margin?: string;
  /** Render as a child item of a RevealGroup (inherits stagger timing). */
  item?: boolean;
  className?: string;
} & HTMLMotionProps<'div'>;

function offset(direction: RevealDirection, distance: number) {
  switch (direction) {
    case 'up': {
      return { y: distance, scale: 0.96 };
    }
    case 'down': {
      return { y: -distance, scale: 0.96 };
    }
    case 'left': {
      return { x: distance, scale: 0.96 };
    }
    case 'right': {
      return { x: -distance, scale: 0.96 };
    }
    case 'scale': {
      return { scale: 0.85 };
    }
    case 'fade': {
      return {};
    }
    default: {
      return {};
    }
  }
}

/*
 * Reveals its children once they scroll into view with a clearly visible
 * slide + scale + blur-in from the given direction. Respects reduced-motion.
 * Pass `item` to participate in a parent RevealGroup's staggered timeline
 * instead of self-triggering.
 */
export function Reveal({
  children,
  direction = 'up',
  distance = 64,
  delay = 0,
  duration = 0.8,
  margin = '0px 0px -12% 0px',
  item = false,
  className,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: reduce
      ? { opacity: 0 }
      : { opacity: 0, filter: 'blur(12px)', ...offset(direction, distance) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration, ease: EASE, delay },
    },
  };

  if (item) {
    return (
      <motion.div variants={variants} className={cn(className)} {...rest}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: React.ReactNode;
  /** Delay between each child's reveal. */
  stagger?: number;
  /** Delay before the first child reveals. */
  delayChildren?: number;
  margin?: string;
  className?: string;
} & HTMLMotionProps<'div'>;

/*
 * Staggers the reveal of any nested `<Reveal item />` children once the group
 * scrolls into view, so lists and grids cascade in instead of popping at once.
 */
export function RevealGroup({
  children,
  stagger = 0.14,
  delayChildren = 0.05,
  margin = '0px 0px -12% 0px',
  className,
  ...rest
}: RevealGroupProps) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

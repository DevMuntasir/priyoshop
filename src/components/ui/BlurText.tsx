'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import type { Easing } from 'motion/react';
import type * as React from 'react';
import { cloneElement, isValidElement, useRef } from 'react';

type AnimationStep = { filter: string; opacity: number; y: number };
type TextSegment = { content: React.ReactNode; text: string };

/**
 * Splits rich text while keeping the styling attached to each segment.
 * @param node - Text or styled text nodes.
 * @param animateBy - Segmentation mode.
 * @returns Styled text segments.
 */
function splitText(node: React.ReactNode, animateBy: 'words' | 'letters'): TextSegment[] {
  if (typeof node === 'string' || typeof node === 'number') {
    const text = String(node);
    const segments =
      animateBy === 'words'
        ? text.split(/(\s+)/u)
        : [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(text)].map(
            (segment) => segment.segment,
          );
    return segments.filter(Boolean).map((segment) => ({ content: segment, text: segment }));
  }
  if (Array.isArray(node)) {
    return node.flatMap((child: React.ReactNode) => splitText(child, animateBy));
  }
  if (isValidElement<{ children?: React.ReactNode }>(node)) {
    if (node.props.children === undefined) {
      return [{ content: node, text: '' }];
    }
    return splitText(node.props.children, animateBy).map((segment) => ({
      content: cloneElement(node, undefined, segment.content),
      text: segment.text,
    }));
  }
  return [];
}

/**
 * Reveals text with the React Bits staggered blur animation when it enters view.
 * @param props - Text content and animation settings.
 * @returns The animated text element.
 */
export function BlurText(props: {
  text?: string;
  children?: React.ReactNode;
  as?: 'h1' | 'h2' | 'p';
  className?: string;
  style?: React.CSSProperties;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  delay?: number;
  stepDuration?: number;
  threshold?: number;
  rootMargin?: NonNullable<Parameters<typeof useInView>[1]>['margin'];
  animationFrom?: AnimationStep;
  animationTo?: AnimationStep[];
  easing?: Easing;
  onAnimationComplete?: () => void;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const inView = useInView(ref, {
    once: true,
    amount: props.threshold ?? 0.1,
    margin: props.rootMargin ?? '0px',
  });
  const reducedMotion = useReducedMotion();
  const Tag = props.as ?? 'p';
  const segments = splitText(props.children ?? props.text ?? '', props.animateBy ?? 'words');
  const from = props.animationFrom ?? {
    filter: 'blur(10px)',
    opacity: 0,
    y: props.direction === 'bottom' ? 50 : -50,
  };
  const steps = props.animationTo ?? [
    { filter: 'blur(5px)', opacity: 0.5, y: props.direction === 'bottom' ? -5 : 5 },
    { filter: 'blur(0px)', opacity: 1, y: 0 },
  ];
  const snapshots = [from, ...steps];
  const keyframes = {
    filter: snapshots.map((step) => step.filter),
    opacity: snapshots.map((step) => step.opacity),
    y: snapshots.map((step) => step.y),
  };
  const animatedCount = segments.filter((segment) => !/^\s+$/u.test(segment.text)).length;
  let animatedIndex = 0;

  return (
    <Tag ref={ref} className={props.className} style={props.style}>
      {reducedMotion ? (
        (props.children ?? props.text)
      ) : (
        <>
          <span className="sr-only">{props.children ?? props.text}</span>
          <span aria-hidden="true">
            {segments.map((segment, index) => {
              if (/^\s+$/u.test(segment.text)) {
                return segment.text;
              }
              const order = animatedIndex;
              animatedIndex += 1;
              return (
                <motion.span
                  key={`${index}-${segment.text}`}
                  className="inline-block"
                  initial={from}
                  animate={inView ? keyframes : from}
                  transition={{
                    duration: (props.stepDuration ?? 0.35) * steps.length,
                    times: snapshots.map((_, step) =>
                      steps.length === 0 ? 0 : step / steps.length,
                    ),
                    delay: (order * (props.delay ?? 200)) / 1000,
                    ease: props.easing ?? 'linear',
                  }}
                  onAnimationComplete={
                    inView && order === animatedCount - 1 ? props.onAnimationComplete : undefined
                  }
                >
                  {segment.content}
                </motion.span>
              );
            })}
          </span>
        </>
      )}
    </Tag>
  );
}

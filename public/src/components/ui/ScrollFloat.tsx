'use client';

import type * as React from 'react';
import { cloneElement, isValidElement, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollFloatTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'div'
  | 'p';

export type ScrollFloatProps = {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  as?: ScrollFloatTag;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Extracts plain text from a React node tree for accessible naming.
 */
function extractPlainText(node: React.ReactNode): string {
  if (node == null || typeof node === 'boolean') {
    return '';
  }
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractPlainText).join('');
  }
  if (isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode; text?: string }>;
    if (element.props) {
      if (typeof element.props.text === 'string') {
        return element.props.text;
      }
      if (element.props.children) {
        return extractPlainText(element.props.children);
      }
    }
  }
  return '';
}

/**
 * Splits text or nested React nodes into character spans while preserving
 * natural word boundaries for responsive wrapping.
 */
function splitIntoChars(node: React.ReactNode, keyPrefix = 'sf'): React.ReactNode {
  if (node == null || typeof node === 'boolean') {
    return node;
  }

  if (typeof node === 'string' || typeof node === 'number') {
    const text = String(node);
    const words = text.split(/(\s+)/u);

    return words.map((word, wIdx) => {
      if (/^\s+$/u.test(word)) {
        return word;
      }

      return (
        <span key={`${keyPrefix}-w-${wIdx}`} className="inline-block whitespace-nowrap">
          {word.split('').map((char, cIdx) => (
            <span key={`${keyPrefix}-c-${wIdx}-${cIdx}`} className="char inline-block">
              {char}
            </span>
          ))}
        </span>
      );
    });
  }

  if (Array.isArray(node)) {
    return node.map((child, idx) => splitIntoChars(child, `${keyPrefix}-${idx}`));
  }

  if (isValidElement(node)) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    if (element.props && 'children' in element.props && element.props.children) {
      return cloneElement(element, {
        children: splitIntoChars(element.props.children, `${keyPrefix}-el`),
      });
    }
    return element;
  }

  return node;
}

/**
 * ScrollFloat component from React Bits.
 *
 * Animates text characters with a floating spring effect on scroll using GSAP ScrollTrigger.
 */
export function ScrollFloat(props: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const scroller = props.scrollContainerRef?.current ?? window;
    const animationDuration = props.animationDuration ?? 1;
    const ease = props.ease ?? 'back.inOut(2)';
    const scrollStart = props.scrollStart ?? 'center bottom+=50%';
    const scrollEnd = props.scrollEnd ?? 'bottom bottom-=40%';
    const stagger = props.stagger ?? 0.03;

    const ctx = gsap.context(() => {
      const charElements = el.querySelectorAll('.char');
      if (charElements.length === 0) {
        return;
      }

      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        },
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [
    props.scrollContainerRef,
    props.animationDuration,
    props.ease,
    props.scrollStart,
    props.scrollEnd,
    props.stagger,
  ]);

  const splitText = splitIntoChars(props.children);
  const plainText = extractPlainText(props.children).trim();
  const Component = props.as ?? 'h2';
  const containerClasses = `scroll-float ${props.containerClassName ?? ''} ${props.className ?? ''}`.trim();
  const textClasses = `scroll-float-text ${props.textClassName ?? ''}`.trim();

  return (
    <Component
      ref={containerRef as React.Ref<HTMLElement & HTMLHeadingElement>}
      className={containerClasses}
      style={props.style}
      aria-label={plainText || undefined}
    >
      <span className={textClasses} aria-hidden={plainText ? 'true' : undefined}>
        {splitText}
      </span>
      {plainText ? <span className="sr-only">{plainText}</span> : null}
    </Component>
  );
}

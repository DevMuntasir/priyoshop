'use client';

import { motion, useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const MOBILE_MAX_WIDTH = 768;

/**
 * Tracks whether the viewport is narrow enough to need the mobile layout.
 * @returns Whether the viewport currently matches the mobile breakpoint.
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH - 1}px)`);
    const update = () => {
      setIsMobile(query.matches);
    };
    update();
    query.addEventListener('change', update);
    return () => {
      query.removeEventListener('change', update);
    };
  }, []);

  return isMobile;
}

export type RollingNumberProps = {
  /** target number, e.g. 296, 100, 1428 */
  value: number;
  prefix?: string;
  suffix?: string;
  /** height of one digit in px on desktop — should match the font's line height */
  height?: number;
  /** height of one digit in px on mobile; defaults to ~65% of `height` */
  heightMobile?: number;
  /** delay between each digit landing (cascade), in seconds */
  stagger?: number;
  /** roll duration in seconds */
  duration?: number;
  className?: string;
};

export function RollingNumber({
  value,
  prefix = '',
  suffix = '',
  height = 42,
  heightMobile,
  stagger = 0.12,
  duration = 1.7,
  className = '',
}: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();

  const cellHeight = isMobile ? (heightMobile ?? Math.round(height * 0.65)) : height;

  // `value` is always numeric, so splitting by code point is safe here.
  // oxlint-disable-next-line typescript/no-misused-spread
  const chars = [...String(value)];

  return (
    <span
      ref={ref}
      style={{ fontSize: cellHeight }}
      className={`inline-flex items-end leading-none tabular-nums ${className}`}
    >
      {prefix && <span>{prefix}</span>}

      {chars.map((c, i) => {
        const isDigit = c >= '0' && c <= '9';

        if (!isDigit) {
          return <span key={i}>{c}</span>;
        }

        const n = Number(c);

        return (
          <span key={i} style={{ height: cellHeight, overflow: 'hidden', display: 'inline-flex' }}>
            {/* ei reel ta 0->9 stack kore, target digit porjonto glide kore */}
            <motion.span
              style={{ display: 'flex', flexDirection: 'column' }}
              initial={{ y: 0 }}
              animate={inView ? { y: -n * cellHeight } : { y: 0 }}
              transition={
                reduce ? { duration: 0 } : { duration, ease: [0.16, 1, 0.3, 1], delay: i * stagger }
              }
            >
              {Array.from({ length: 10 }).map((_, k) => (
                <span
                  key={k}
                  style={{
                    height: cellHeight,
                    lineHeight: `${cellHeight}px`,
                    textAlign: 'center',
                  }}
                >
                  {k}
                </span>
              ))}
            </motion.span>
          </span>
        );
      })}

      {suffix && <span>{suffix}</span>}
    </span>
  );
}

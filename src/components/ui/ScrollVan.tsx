'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type ScrollVanProps = {
  /** Rendered width of the van in px. Height scales to keep the SVG ratio. */
  size?: number;
  /** Horizontal inset kept clear at each edge, in px. */
  edgePadding?: number;
  className?: string;
};

/*
 * ScrollVan — a van pinned to the bottom of the viewport that drives across the
 * screen with page scroll: hard left at the top of the page, hard right once
 * the page is fully scrolled.
 */
export function ScrollVan(props: ScrollVanProps) {
  const size = props.size ?? 80;
  const edgePadding = props.edgePadding ?? 16;
  const reduced = useReducedMotion();

  // Whole-document scroll progress (0 at top, 1 at the very bottom).
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.5 });

  // Track viewport width so travel distance stays correct across resizes.
  const [viewportWidth, setViewportWidth] = useState(0);
  useEffect(() => {
    const update = () => {
      setViewportWidth(window.innerWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  const x = useTransform(progress, (p) => {
    const travel = Math.max(viewportWidth - size - edgePadding * 2, 0);
    return p * travel;
  });

  return (
    <div
      className={`pointer-events-none hidden md:block fixed -inset-x-10 -bottom-[14px] z-40 ${props.className ?? ''}`}
      style={{ paddingLeft: edgePadding, paddingRight: edgePadding }}
      aria-hidden
    >
      <motion.div style={{ x: reduced ? 0 : x, width: size, willChange: 'transform' }}>
        <Image
          src="/timeline/Car3.svg"
          alt=""
          width={size}
          height={size}
          className="h-auto w-full"
          priority
        />
      </motion.div>
    </div>
  );
}

'use client';

import type { MotionValue } from 'motion/react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';
import Image from 'next/image';
import type * as React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type RoadStop = { x: number; y: number; edge: number };

/** Connects the rendered milestones in chronological order. */
function buildRoad(stops: RoadStop[]) {
  return stops
    .map((stop, index) => {
      const previous = stops[index - 1];
      if (!previous) {
        return `M ${stop.x} ${stop.y}`;
      }
      if (Math.abs(stop.x - previous.x) > 1 || Math.abs(stop.edge - stop.x) < 1) {
        return `L ${stop.x} ${stop.y}`;
      }
      const direction = stop.edge > stop.x ? 1 : -1;
      const radius = Math.min(40, (stop.y - previous.y) / 2);
      const shoulder = stop.edge - radius * direction;
      return `H ${shoulder} Q ${stop.edge} ${previous.y} ${stop.edge} ${previous.y + radius} V ${stop.y - radius} Q ${stop.edge} ${stop.y} ${shoulder} ${stop.y} H ${stop.x}`;
    })
    .join(' ');
}

function moveVan(props: {
  path: SVGPathElement | null;
  progress: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  rotation: MotionValue<number>;
  direction: MotionValue<number>;
  stopDistances: number[];
  activeIndex: React.RefObject<number>;
  revealedIndex: React.RefObject<number>;
  onMilestoneReached: (index: number) => void;
  onActiveChange: (index: number) => void;
}) {
  if (!props.path) {
    return;
  }
  const length = props.path.getTotalLength();
  const distance = Math.max(0, Math.min(1, props.progress)) * length;
  const point = props.path.getPointAtLength(distance);
  const before = props.path.getPointAtLength(Math.max(0, distance - 1));
  const after = props.path.getPointAtLength(Math.min(length, distance + 1));
  const dx = after.x - before.x;
  const angle = (Math.atan2(after.y - before.y, dx) * 180) / Math.PI;
  props.x.set(point.x);
  props.y.set(point.y);
  props.direction.set(dx < 0 ? -1 : 1);
  props.rotation.set(dx < 0 ? angle - 180 : angle);

  // Reveal only after arrival; retain the furthest reached stop on reverse scroll.
  let reached = -1;
  for (const [index, stopDistance] of props.stopDistances.entries()) {
    if (stopDistance <= distance + 0.5) {
      reached = index;
    }
  }
  if (reached > props.revealedIndex.current) {
    props.revealedIndex.current = reached;
    props.onMilestoneReached(reached);
  }
  if (reached !== props.activeIndex.current) {
    props.activeIndex.current = reached;
    props.onActiveChange(reached);
  }
}

export function TimelineRoad(props: {
  trackRef: React.RefObject<HTMLDivElement | null>;
  onActiveChange: (index: number) => void;
  onMilestoneReached: (index: number) => void;
}) {
  const [path, setPath] = useState('');
  const stopDistances = useRef<number[]>([]);
  const activeIndex = useRef(0);
  const revealedIndex = useRef(-1);
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: props.trackRef,
    offset: ['start 75%', 'end 55%'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotation = useMotionValue(0);
  const direction = useMotionValue(1);

  // Wait for the parent's ref to attach before measuring and observing the track.
  useEffect(() => {
    const track = props.trackRef.current;
    if (!track) {
      return;
    }
    const measure = () => {
      const bounds = track.getBoundingClientRect();
      const desktop = window.matchMedia('(min-width: 1024px)').matches;
      const stops = [...track.querySelectorAll<HTMLElement>('[data-timeline-stop]')].map(
        (node, index) => {
          const rect = node.getBoundingClientRect();
          const center = rect.left - bounds.left + rect.width / 2;
          // At a U-turn both stops share the outside edge of the preceding row.
          const turnRow = Math.floor(Math.max(0, index - 1) / 3);
          return {
            x: center,
            y: rect.top - bounds.top + rect.height / 2,
            edge: desktop ? (turnRow % 2 === 0 ? bounds.width + 24 : -24) : center,
          };
        },
      );
      const measuringPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      stopDistances.current = stops.map((_, index) => {
        measuringPath.setAttribute('d', buildRoad(stops.slice(0, index + 1)));
        return measuringPath.getTotalLength();
      });
      setPath(buildRoad(stops));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    for (const item of track.querySelectorAll('li')) {
      observer.observe(item);
    }
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [props.trackRef]);

  useMotionValueEvent(progress, 'change', (value) => {
    moveVan({
      path: pathRef.current,
      progress: reducedMotion ? 0 : value,
      x,
      y,
      rotation,
      direction,
      stopDistances: stopDistances.current,
      activeIndex,
      revealedIndex,
      onMilestoneReached: props.onMilestoneReached,
      onActiveChange: props.onActiveChange,
    });
  });

  useLayoutEffect(() => {
    moveVan({
      path: pathRef.current,
      progress: reducedMotion ? 0 : progress.get(),
      x,
      y,
      rotation,
      direction,
      stopDistances: stopDistances.current,
      activeIndex,
      revealedIndex,
      onMilestoneReached: props.onMilestoneReached,
      onActiveChange: props.onActiveChange,
    });
  }, [path, reducedMotion, progress, x, y, rotation, direction, props.onActiveChange, props.onMilestoneReached]);

  if (!path) {
    return null;
  }

  return (
    <>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        <path d={path} fill="none" stroke="white" strokeWidth={16} strokeLinecap="round" />
        <path
          ref={pathRef}
          d={path}
          fill="none"
          stroke="#2b2d31"
          strokeWidth={12}
          strokeLinecap="round"
        />
        <path d={path} fill="none" stroke="#f8c200" strokeWidth={2} strokeDasharray="6 8" />
      </svg>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-20"
        style={{ x, y }}
      >
        <motion.div
          className="-mt-6 -ml-9 h-12 w-18 lg:-mt-8 lg:-ml-12 lg:h-16 lg:w-24"
          style={{ rotate: rotation, scaleX: direction }}
        >
          <Image
            src="/timeline/van1.png"
            alt=""
            width={96}
            height={64}
            className="size-full object-contain"
          />
        </motion.div>
      </motion.div>
    </>
  );
}

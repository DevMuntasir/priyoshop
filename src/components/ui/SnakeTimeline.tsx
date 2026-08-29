'use client';

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from 'motion/react';
import type { MotionValue } from 'motion/react';
import * as React from 'react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/* Responsive columns — fewer nodes per row on small screens           */
/* ------------------------------------------------------------------ */

/** Viewport buckets, aligned to Tailwind's `md`/`lg`/`xl` breakpoints. */
type Breakpoint = 'mobile' | 'md' | 'lg' | 'xl';

/** Min widths (px) at which each breakpoint takes over. */
const BREAKPOINTS: { name: Breakpoint; min: number }[] = [
  { name: 'xl', min: 1280 },
  { name: 'lg', min: 1024 },
  { name: 'md', min: 768 },
  { name: 'mobile', min: 0 },
];

/**
 * Tracks which viewport bucket the window currently falls into.
 * @returns The active breakpoint, recomputed on resize.
 */
function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg');

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const match = BREAKPOINTS.find((b) => width >= b.min);
      setBreakpoint(match?.name ?? 'mobile');
    };
    update();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  return breakpoint;
}

/** Per-breakpoint multiplier applied to the configured traveling-image size. */
const TRAVELING_IMAGE_SCALE: Record<Breakpoint, number> = {
  mobile: 1.8,
  md: 1.15,
  lg: 1,
  xl: 0.9,
};

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type TimelineItem = {
  year: string;
  title: string;
  /** Any node — a lucide icon, an <img>, an svg, whatever. */
  icon: React.ReactNode;
};

export type SnakeTimelineConfig = {
  items: TimelineItem[];
  /** Items per row before the line snakes back. Default 3. */
  columns?: number;
  /** Brand colour for the line + icons. Map this to your `ps-` token. */
  accentColor?: string;
  /** Faint guide colour showing where the line will go. */
  trackColor?: string;
  /** Show the soft "where the line goes" guide. Default true. */
  showGuide?: boolean;
  /** Show the glowing dot that travels along the drawn head. Default true. */
  showTravelingDot?: boolean;
  /** Custom image (e.g. a car PNG) to ride the head instead of the dot. */
  travelingImage?: string;
  /** Size of the traveling image in viewBox units. Default 40. */
  travelingImageSize?: number;
  /** Vertical nudge of the traveling image along the road normal (+down). Default 0. */
  travelingImageOffset?: number;
  /** Total scroll distance, in vh. Default = 120 + items.length * 28. */
  scrollVh?: number;
  /** Stroke width in viewBox units. Default 5. */
  lineWidth?: number;
  /** How early a node reveals before the head reaches it (0–0.1). Default 0.05. */
  revealLead?: number;
  /** Show directional arrows on the straight segments between nodes. Default true. */
  showArrows?: boolean;
  /** Render the track as a highway road instead of a single line. Default 'line'. */
  variant?: 'line' | 'road';
  /** Asphalt band width in viewBox units (road variant). Default lineWidth * 5. */
  roadWidth?: number;
  /** Asphalt surface colour (road variant). */
  roadColor?: string;
  /** Shoulder / edge-line colour (road variant). */
  roadEdgeColor?: string;
  /** Dashed centre-line colour (road variant). */
  roadDashColor?: string;
};

/* ------------------------------------------------------------------ */
/* Layout maths — boustrophedon (snake) grid + smooth path             */
/* ------------------------------------------------------------------ */

const VIEW_W = 1000;
const SIDE = 175; // keep nodes inside so U-turns don't clip
const TOP = 110;
const ROW_GAP = 215;
const BOTTOM = 95; // room for the text under the last row

type Node = TimelineItem & { x: number; y: number; row: number; ltr: boolean };

/** Arrow sitting on a straight (same-row) segment, pointing along the flow. */
type Arrow = { x: number; y: number; dir: 1 | -1 };

function buildLayout(items: TimelineItem[], columns: number, rowGap: number = ROW_GAP) {
  const cols = Math.max(1, columns);
  const rows = Math.ceil(items.length / cols);
  const colGap = cols > 1 ? (VIEW_W - SIDE * 2) / (cols - 1) : 0;
  const viewH = TOP + (rows - 1) * rowGap + BOTTOM;

  const nodes: Node[] = items.map((item, i) => {
    const row = Math.floor(i / cols);
    const posInRow = i % cols;
    const ltr = row % 2 === 0; // even rows L→R, odd rows R→L
    // keep partial rows aligned to the snake edge so U-turns stay round
    const col = ltr ? posInRow : cols - 1 - posInRow;
    return {
      ...item,
      row,
      ltr,
      x: SIDE + col * colGap,
      y: TOP + row * rowGap,
    };
  });

  // Build one continuous path: straight within a row, hairpin between rows.
  const turn = rowGap * 0.62;
  let d = '';
  const arrows: Arrow[] = [];
  for (const [i, n] of nodes.entries()) {
    if (i === 0) {
      d += `M ${n.x} ${n.y}`;
      continue;
    }
    const prev = nodes[i - 1];
    if (!prev) {
      continue;
    }
    if (n.row === prev.row) {
      d += ` L ${n.x} ${n.y}`;
      // arrow at the segment midpoint, pointing along the row direction
      arrows.push({ x: (prev.x + n.x) / 2, y: n.y, dir: prev.ltr ? 1 : -1 });
    } else {
      // outward bulge: right edge if leaving an L→R row, else left edge
      const bulge = prev.ltr ? turn : -turn;
      d += ` C ${prev.x + bulge} ${prev.y}, ${n.x + bulge} ${n.y}, ${n.x} ${n.y}`;
    }
  }

  return { nodes, path: d, viewH, arrows };
}

/* ------------------------------------------------------------------ */
/* Single node — owns its own scroll-linked reveal                     */
/* ------------------------------------------------------------------ */

function TimelineNode({
  node,
  frac,
  progress,
  accentColor,
  viewH,
  revealLead,
}: {
  node: Node;
  frac: number;
  progress: MotionValue<number>;
  accentColor: string;
  viewH: number;
  revealLead: number;
}) {
  const start = Math.max(0, frac - revealLead);
  const end = Math.max(start + 0.001, frac - revealLead * 0.15);

  const reveal = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(reveal, [0, 1], [0.65, 1]);
  const y = useTransform(reveal, [0, 1], [16, 0]);

  return (
    <div
      className="absolute"
      style={{
        left: `${(node.x / VIEW_W) * 100}%`,
        top: `${(node.y / viewH) * 100}%`,
        transform: 'translate(-50%, -50%)', // plain CSS — keep off Framer's transform
      }}
    >
      <motion.div
        className="relative flex flex-col items-center"
        style={{ opacity: reveal, scale, y }}
      >
        {/* icon coin — sits exactly on the line point */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)] ring-1 ring-black/5 sm:h-16 sm:w-16"
          style={{ color: accentColor }}
        >
          <span className="[&>img]:h-5 [&>img]:w-5 sm:[&>img]:h-7 sm:[&>img]:w-7 [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-7 sm:[&>svg]:w-7">
            {node.icon}
          </span>
        </div>

        {/* label — hangs below, doesn't affect centring */}
        <div className="absolute top-full mt-2 w-28 text-center sm:mt-3 sm:w-44">
          <div className="font-display text-ps-body leading-none font-extrabold text-ps-black sm:text-ps-h5">
            {node.year}
          </div>
          <div className="mt-1 font-body text-xs leading-snug font-semibold text-ps-black-400 sm:text-ps-xs">
            {node.title}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Single arrow — reveals once the head passes its segment             */
/* ------------------------------------------------------------------ */

function TimelineArrow({
  arrow,
  frac,
  progress,
  accentColor,
  viewH,
}: {
  arrow: Arrow;
  frac: number;
  progress: MotionValue<number>;
  accentColor: string;
  viewH: number;
}) {
  const reveal = useTransform(progress, [Math.max(0, frac - 0.04), frac], [0, 1]);

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        left: `${(arrow.x / VIEW_W) * 100}%`,
        top: `${(arrow.y / viewH) * 100}%`,
        transform: `translate(-50%, -50%) scaleX(${arrow.dir})`,
        opacity: reveal,
        color: accentColor,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 12h13M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* The SVG track — road/line strokes plus the traveling sprite         */
/* ------------------------------------------------------------------ */

type TravelingSprite = {
  dotX: MotionValue<number>;
  dotY: MotionValue<number>;
  angle: MotionValue<number>;
  flipX: MotionValue<number>;
};

function RoadTrack(props: {
  path: string;
  pathRef: React.RefObject<SVGPathElement | null>;
  roadEdgeColor: string;
  roadColor: string;
  roadDashColor: string;
  roadWidth: number;
  lineWidth: number;
}) {
  return (
    <>
      {/* white shoulder lines (wider band peeking out on both edges) */}
      <path
        d={props.path}
        fill="none"
        stroke={props.roadEdgeColor}
        strokeWidth={props.roadWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* asphalt surface */}
      <path
        ref={props.pathRef}
        d={props.path}
        fill="none"
        stroke={props.roadColor}
        strokeWidth={Math.max(1, props.roadWidth - props.lineWidth * 1.6)}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* dashed centre line */}
      <path
        d={props.path}
        fill="none"
        stroke={props.roadDashColor}
        strokeWidth={Math.max(0.8, props.lineWidth * 0.5)}
        strokeLinecap="butt"
        strokeDasharray={`${props.lineWidth * 2.2} ${props.lineWidth * 3}`}
      />
    </>
  );
}

function LineTrack(props: {
  path: string;
  pathRef: React.RefObject<SVGPathElement | null>;
  showGuide: boolean;
  trackColor: string;
  accentColor: string;
  lineWidth: number;
  progress: MotionValue<number>;
}) {
  return (
    <>
      {props.showGuide && (
        <path
          d={props.path}
          fill="none"
          stroke={props.trackColor}
          strokeWidth={props.lineWidth}
          strokeLinecap="round"
        />
      )}
      <motion.path
        ref={props.pathRef}
        d={props.path}
        fill="none"
        stroke={props.accentColor}
        strokeWidth={props.lineWidth}
        strokeLinecap="round"
        style={{ pathLength: props.progress }}
      />
    </>
  );
}

function TravelingMarker(props: {
  sprite: TravelingSprite;
  travelingImage?: string;
  travelingImageSize: number;
  travelingImageOffset: number;
  showTravelingDot: boolean;
  accentColor: string;
  lineWidth: number;
}) {
  const { dotX, dotY, angle, flipX } = props.sprite;

  if (props.travelingImage) {
    return (
      <motion.g style={{ x: dotX, y: dotY, rotate: angle, scaleX: flipX }}>
        <image
          href={props.travelingImage}
          x={-props.travelingImageSize / 2}
          y={-props.travelingImageSize / 2 + props.travelingImageOffset}
          width={props.travelingImageSize}
          height={props.travelingImageSize}
          preserveAspectRatio="xMidYMid meet"
        />
      </motion.g>
    );
  }

  if (!props.showTravelingDot) {
    return null;
  }

  return (
    <>
      <motion.circle
        cx={dotX}
        cy={dotY}
        r={props.lineWidth * 2.6}
        fill={props.accentColor}
        opacity={0.18}
      />
      <motion.circle cx={dotX} cy={dotY} r={props.lineWidth * 1.15} fill={props.accentColor} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Config normalisation — every default lives here, keeping the        */
/* component body free of branching                                     */
/* ------------------------------------------------------------------ */

function resolveConfig(config: SnakeTimelineConfig) {
  const lineWidth = config.lineWidth ?? 3;
  const variant = config.variant ?? 'line';
  const isRoad = variant === 'road';
  return {
    items: config.items,
    columns: config.columns ?? 3,
    accentColor: config.accentColor ?? '#E11D48',
    trackColor: config.trackColor ?? '#333',
    showGuide: config.showGuide ?? true,
    showTravelingDot: config.showTravelingDot ?? true,
    travelingImage: config.travelingImage,
    travelingImageSize: config.travelingImageSize ?? 40,
    travelingImageOffset: config.travelingImageOffset ?? 0,
    lineWidth,
    revealLead: config.revealLead ?? 0.05,
    isRoad,
    roadColor: config.roadColor ?? '#2b2d31',
    roadEdgeColor: config.roadEdgeColor ?? '#ffffff',
    roadDashColor: config.roadDashColor ?? '#f8c200',
    roadWidth: config.roadWidth ?? lineWidth * 5,
    // arrows clutter the road surface — off by default in road mode
    showArrows: config.showArrows ?? !isRoad,
    scrollVh: config.scrollVh ?? 120 + config.items.length * 28,
  };
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function SnakeTimeline({ config }: { config: SnakeTimelineConfig }) {
  const {
    items,
    columns,
    accentColor,
    trackColor,
    showGuide,
    showTravelingDot,
    travelingImage,
    travelingImageSize,
    travelingImageOffset,
    lineWidth,
    revealLead,
    isRoad,
    roadColor,
    roadEdgeColor,
    roadDashColor,
    roadWidth,
    showArrows,
    scrollVh,
  } = resolveConfig(config);

  // On phones the configured columns overflow; snake at most 2 per row and
  // give each row more vertical room so labels don't collide with the row below.
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === 'mobile';
  const effectiveColumns = isMobile ? Math.min(2, columns) : columns;
  const rowGap = isMobile ? ROW_GAP * 1.4 : ROW_GAP;
  // The marker reads differently per screen — scale it per breakpoint so it
  // stays prominent on phones without dominating large desktops.
  const effectiveImageSize = travelingImageSize * TRAVELING_IMAGE_SCALE[breakpoint];

  const { nodes, path, viewH, arrows } = useMemo(
    () => buildLayout(items, effectiveColumns, rowGap),
    [items, effectiveColumns, rowGap],
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // 0 → 1 across the whole tall track while the inner stays pinned
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Measure each node's fraction along the real path (robust to any shape)
  const [fracs, setFracs] = useState<number[]>(() =>
    nodes.map((_, i) => (nodes.length > 1 ? i / (nodes.length - 1) : 0)),
  );
  const [arrowFracs, setArrowFracs] = useState<number[]>(() => arrows.map(() => 0));
  const [pathLen, setPathLen] = useState(0);

  useLayoutEffect(() => {
    const p = pathRef.current;
    if (!p) {
      return;
    }
    const total = p.getTotalLength();
    setPathLen(total);

    const SAMPLES = 600;
    const fracAt = (px: number, py: number) => {
      let bestLen = 0;
      let bestDist = Infinity;
      for (let i = 0; i <= SAMPLES; i += 1) {
        const len = (i / SAMPLES) * total;
        const pt = p.getPointAtLength(len);
        const dx = pt.x - px;
        const dy = pt.y - py;
        const dist = dx * dx + dy * dy;
        if (dist < bestDist) {
          bestDist = dist;
          bestLen = len;
        }
      }
      return total > 0 ? bestLen / total : 0;
    };

    setFracs(nodes.map((node) => fracAt(node.x, node.y)));
    setArrowFracs(arrows.map((arrow) => fracAt(arrow.x, arrow.y)));
  }, [nodes, arrows, path]);

  // Glowing dot / image that rides the drawn head
  const dotX = useMotionValue(nodes[0]?.x ?? 0);
  const dotY = useMotionValue(nodes[0]?.y ?? 0);
  const angle = useMotionValue(0);
  // Mirror horizontally on leftward travel so the van faces its direction while
  // staying upright. The flip lands at the downward U-turn apex (van pointing
  // straight down), where a horizontal mirror is visually seamless — so the
  // row-to-row turn reads as one smooth rotation along the road curve.
  const flipX = useMotionValue(1);
  useMotionValueEvent(progress, 'change', (v) => {
    const p = pathRef.current;
    if (!p || pathLen === 0) {
      return;
    }
    const clamped = Math.min(1, Math.max(0, v));
    const len = clamped * pathLen;
    const pt = p.getPointAtLength(len);
    dotX.set(pt.x);
    dotY.set(pt.y);
    // tangent of the road at the head, sampled just ahead
    const ahead = p.getPointAtLength(Math.min(pathLen, len + 1));
    const a = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
    const goingLeft = ahead.x - pt.x < 0;
    flipX.set(goingLeft ? -1 : 1);
    // Keep the van upright like a real car on a banked turn: the tilt stays
    // within ±90° (wheels always down, never upside down). On leftward travel
    // it is mirrored, so its heading mirrors to `180 - a` to track the tangent.
    angle.set(goingLeft ? 180 - a : a);
  });

  return (
    <section ref={trackRef} style={{ height: `${scrollVh}vh` }} className="relative w-full">
      <div className="sticky md:top-[50px] top-[200px] flex w-full items-center justify-center px-4">
        <div className="relative w-full max-w-7xl" style={{ aspectRatio: `${VIEW_W} / ${viewH}` }}>
          {/* The line */}
          <svg
            viewBox={`0 0 ${VIEW_W} ${viewH}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            {isRoad ? (
              <RoadTrack
                path={path}
                pathRef={pathRef}
                roadEdgeColor={roadEdgeColor}
                roadColor={roadColor}
                roadDashColor={roadDashColor}
                roadWidth={roadWidth}
                lineWidth={lineWidth}
              />
            ) : (
              <LineTrack
                path={path}
                pathRef={pathRef}
                showGuide={showGuide}
                trackColor={trackColor}
                accentColor={accentColor}
                lineWidth={lineWidth}
                progress={progress}
              />
            )}
            <TravelingMarker
              sprite={{ dotX, dotY, angle, flipX }}
              travelingImage={travelingImage}
              travelingImageSize={effectiveImageSize}
              travelingImageOffset={travelingImageOffset}
              showTravelingDot={showTravelingDot}
              accentColor={accentColor}
              lineWidth={lineWidth}
            />
          </svg>

          {/* The arrows */}
          {showArrows &&
            arrows.map((arrow, i) => (
              <TimelineArrow
                key={`arrow-${i}`}
                arrow={arrow}
                frac={arrowFracs[i] ?? 0}
                progress={progress}
                accentColor={accentColor}
                viewH={viewH}
              />
            ))}

          {/* The nodes */}
          {nodes.map((node, i) => (
            <TimelineNode
              key={`${node.year}-${i}`}
              node={node}
              frac={fracs[i] ?? 0}
              progress={progress}
              accentColor={accentColor}
              viewH={viewH}
              revealLead={revealLead}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

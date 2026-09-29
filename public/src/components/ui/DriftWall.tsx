'use client';

import type * as React from 'react';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import './DriftWall.css';

export type DriftWallItem = {
  image: string;
  title?: string;
  href?: string;
};

export type DriftWallProps = {
  items?: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  radius?: number;
  tilt?: number;
  turn?: number;
  roll?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  pauseOnHover?: boolean;
  lift?: number;
  fade?: number;
  dim?: number;
  grayscale?: boolean;
  overlayColor?: string;
  className?: string;
  style?: React.CSSProperties;
};

const DEFAULT_ITEMS: DriftWallItem[] = [
  { image: '/career/1.png', title: 'Commerce & Retail' },
  { image: '/career/2.png', title: 'Logistics Network' },
  { image: '/career/3.png', title: 'Fintech Innovations' },
  { image: '/career/4.png', title: 'Data Intelligence' },
  { image: '/career/5.png', title: 'Team Awards' },
  { image: '/career/6.png', title: 'Collaboration' },
  { image: '/career/7.png', title: 'Annual Gathering' },
  { image: '/career/8.png', title: 'Office Culture' },
  { image: '/career/all.png', title: 'PriyoShop Team' },
  { image: '/career/a.webp', title: 'Innovation' },
  { image: '/career/aa.png', title: 'Retail Growth' },
  { image: '/career/b.jpeg', title: 'Leadership' },
  { image: '/career/bg.jpg', title: 'Modern Workspace' },
  { image: '/about/1.png', title: 'Impact' },
  { image: '/about/people.png', title: 'Community' },
];

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function columnFactor(index: number, variance: number): number {
  const pseudo = ((index * 0.618_033_988_7 + 0.35) % 1) * 2 - 1;
  return 1 + variance * pseudo;
}

/**
 * 3D perspective drifting wall of media tiles with smooth physics, mouse parallax, and hover lift.
 *
 * @param props Configuration options for the DriftWall.
 * @returns An interactive 3D media wall component.
 */
export function DriftWall(props: DriftWallProps) {
  const items = props.items ?? DEFAULT_ITEMS;
  const columns = props.columns ?? 5;
  const tileWidth = props.tileWidth ?? 200;
  const tileHeight = props.tileHeight ?? 132;
  const gap = props.gap ?? 18;
  const radius = props.radius ?? 14;
  const tilt = props.tilt ?? 16;
  const turn = props.turn ?? -14;
  const roll = props.roll ?? 0;
  const perspective = props.perspective ?? 1200;
  const depth = props.depth ?? 120;
  const speed = props.speed ?? 42;
  const direction = props.direction ?? 'up';
  const variance = props.variance ?? 0.45;
  const parallax = props.parallax ?? 0.6;
  const pauseOnHover = props.pauseOnHover ?? false;
  const lift = props.lift ?? 64;
  const fade = props.fade ?? 0.6;
  const dim = props.dim ?? 0.55;
  const grayscale = props.grayscale ?? false;
  const overlayColor = props.overlayColor ?? '#060010';
  const className = props.className ?? '';
  const { style } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const planeRef = useRef<HTMLDivElement | null>(null);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  const offsetsRef = useRef<number[]>([]);
  const velocitiesRef = useRef<number[]>([]);
  const hoveredColRef = useRef<number>(-1);
  const wallHoveredRef = useRef<boolean>(false);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pointerDampedRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastTsRef = useRef<number | null>(null);

  const [containerHeight, setContainerHeight] = useState(600);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
    };
  }, []);

  const columnItems = useMemo(() => {
    const cols: DriftWallItem[][] = Array.from({ length: columns }, () => []);
    for (const [i, item] of items.entries()) {
      const target = cols[i % columns];
      if (target) {
        target.push(item);
      }
    }
    return cols.map((col) => (col.length ? col : items.slice(0, 1)));
  }, [items, columns]);

  const columnMeta = useMemo(() => {
    const unit = tileHeight + gap;
    return columnItems.map((col) => {
      const copyHeight = Math.max(unit, col.length * unit);
      const copies = Math.max(2, Math.ceil((containerHeight * 1.6) / copyHeight) + 1);
      return { copyHeight, copies };
    });
  }, [columnItems, tileHeight, gap, containerHeight]);

  useLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const ro = new ResizeObserver(([entry]) => {
      if (entry) {
        setContainerHeight(entry.contentRect.height || 600);
      }
    });
    ro.observe(containerRef.current);
    return () => {
      ro.disconnect();
    };
  }, []);

  const baseVelocities = useMemo(() => {
    const dirSign = direction === 'up' ? 1 : -1;
    return columnItems.map((_, c) => {
      const altSign = c % 2 === 0 ? 1 : -1;
      return speed * columnFactor(c, variance) * dirSign * altSign;
    });
  }, [columnItems, speed, direction, variance]);

  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);

  const applyPlaneTransform = useCallback(
    (px: number, py: number) => {
      const plane = planeRef.current;
      if (!plane) {
        return;
      }
      plane.style.transform =
        `translate(-50%, -50%) scale(1.18) ` +
        `rotateX(${tilt + py}deg) rotateY(${turn + px}deg) rotateZ(${roll}deg) ` +
        `translateZ(${-depth}px)`;
    },
    [tilt, turn, roll, depth],
  );

  useEffect(() => {
    const animate = (ts: number) => {
      if (lastTsRef.current === null) {
        lastTsRef.current = ts;
      }
      const dt = Math.min(0.05, Math.max(0, ts - lastTsRef.current) / 1000);
      lastTsRef.current = ts;

      const maxTilt = parallax * 8;
      const targetX = pointerRef.current.x * maxTilt;
      const targetY = -pointerRef.current.y * maxTilt;
      const damp = 1 - Math.exp(-dt / 0.12);
      pointerDampedRef.current.x += (targetX - pointerDampedRef.current.x) * damp;
      pointerDampedRef.current.y += (targetY - pointerDampedRef.current.y) * damp;
      applyPlaneTransform(pointerDampedRef.current.x, pointerDampedRef.current.y);

      if (reduced) {
        for (let c = 0; c < trackRefs.current.length; c += 1) {
          const el = trackRefs.current[c];
          const meta = columnMeta[c];
          if (el && meta) {
            el.style.transform = `translate3d(0, ${-(offsetsRef.current[c] ?? 0)}px, 0)`;
          }
        }
      } else {
        for (let c = 0; c < trackRefs.current.length; c += 1) {
          const meta = columnMeta[c];
          if (!meta) {
            continue;
          }
          const paused = wallHoveredRef.current && pauseOnHover;
          const factor = paused || hoveredColRef.current === c ? 0 : 1;
          const target = (baseVelocities[c] ?? 0) * factor;

          const ease = 1 - Math.exp(-dt / (target === 0 ? 0.16 : 0.28));
          velocitiesRef.current[c] =
            (velocitiesRef.current[c] ?? 0) +
            (target - (velocitiesRef.current[c] ?? 0)) * ease;
          let next =
            (offsetsRef.current[c] ?? 0) + (velocitiesRef.current[c] ?? 0) * dt;
          next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
          offsetsRef.current[c] = next;

          const el = trackRefs.current[c];
          if (el) {
            el.style.transform = `translate3d(0, ${-next}px, 0)`;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [baseVelocities, columnMeta, pauseOnHover, parallax, reduced, applyPlaneTransform]);

  const activate = useCallback((id: string, index: number) => {
    activeIdRef.current = id;
    hoveredColRef.current = index;
    setActiveId(id);
  }, []);

  const release = useCallback(() => {
    activeIdRef.current = null;
    hoveredColRef.current = -1;
    setActiveId(null);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }
      if (parallax > 0 && !reduced) {
        pointerRef.current = {
          x: (e.clientX - rect.left) / rect.width - 0.5,
          y: (e.clientY - rect.top) / rect.height - 0.5,
        };
      }
      const hit = document.elementFromPoint(e.clientX, e.clientY);
      const tile = hit && 'closest' in hit ? (hit.closest('[data-tile-id]') as HTMLElement | null) : null;
      if (!tile) {
        return;
      }
      const id = tile.dataset.tileId;
      if (!id || id === activeIdRef.current) {
        return;
      }
      activeIdRef.current = id;
      hoveredColRef.current = Number(tile.dataset.col);
      setActiveId(id);
    },
    [parallax, reduced],
  );

  const handlePointerLeaveWall = useCallback(() => {
    wallHoveredRef.current = false;
    pointerRef.current = { x: 0, y: 0 };
    release();
  }, [release]);

  const cssVars = useMemo(
    () =>
      ({
        '--dw-tile-w': `${tileWidth}px`,
        '--dw-tile-h': `${tileHeight}px`,
        '--dw-gap': `${gap}px`,
        '--dw-radius': `${radius}px`,
        '--dw-perspective': `${perspective}px`,
        '--dw-lift': `${lift}px`,
        '--dw-dim': dim,
        '--dw-gray': grayscale ? 1 : 0,
        '--dw-overlay': overlayColor,
        '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`,
        ...style,
      }) as React.CSSProperties,
    [tileWidth, tileHeight, gap, radius, perspective, lift, dim, grayscale, overlayColor, fade, style],
  );

  const renderTile = (item: DriftWallItem, id: string, colIndex: number) => {
    const inner = (
      <span className="drift-wall__inner">
        {/* oxlint-disable-next-line next/no-img-element */}
        <img
          src={item.image}
          alt={item.title ?? ''}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <span className="drift-wall__overlay" aria-hidden="true" />
      </span>
    );
    const commonProps = {
      className: `drift-wall__tile${activeId === id ? ' is-active' : ''}`,
      'data-tile-id': id,
      'data-col': colIndex,
      onFocus: () => activate(id, colIndex),
      onBlur: release,
    };
    if (item.href) {
      return (
        <a key={id} href={item.href} target="_blank" rel="noreferrer noopener" {...commonProps}>
          {inner}
        </a>
      );
    }
    return (
      <button
        type="button"
        key={id}
        aria-label={item.title ?? 'tile'}
        onClick={() => {
          activate(id, colIndex);
        }}
        {...commonProps}
      >
        {inner}
      </button>
    );
  };

  const rootClass = ['drift-wall', reduced ? 'drift-wall--reduced' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={rootClass}
      style={cssVars}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        wallHoveredRef.current = true;
      }}
      onPointerLeave={handlePointerLeaveWall}
      aria-label="Drifting wall of tiles"
    >
      <div ref={planeRef} className="drift-wall__plane">
        {columnItems.map((col, c) => {
          const meta = columnMeta[c];
          if (!meta) {
            return null;
          }
          const copies = Array.from({ length: meta.copies });
          return (
            <div className="drift-wall__col" key={`col-${c}`}>
              <div
                className="drift-wall__track"
                ref={(el) => {
                  trackRefs.current[c] = el;
                }}
              >
                {copies.map((_, copyIndex) =>
                  col.map((item, itemIndex) =>
                    renderTile(item, `${c}-${copyIndex}-${itemIndex}`, c),
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DriftWall;

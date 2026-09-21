'use client';

import type React from 'react';
import type { AccordionGalleryItem, AccordionGalleryProps } from './AccordionGallery.types';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './AccordionGallery.css';

export type { AccordionGalleryItem, AccordionGalleryProps } from './AccordionGallery.types';

const DEFAULT_ITEMS: AccordionGalleryItem[] = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  { image: 'https://picsum.photos/id/1018/900/1200', label: 'Ridgeline', link: '#' },
  { image: 'https://picsum.photos/id/1039/900/1200', label: 'Falls', link: '#' },
  { image: 'https://picsum.photos/id/1043/900/1200', label: 'Harbour', link: '#' },
  { image: 'https://picsum.photos/id/1044/900/1200', label: 'Skyline', link: '#' },
];

function getPanelRotation(index: number, activeIndex: number, tilt: number) {
  if (index === activeIndex) {
    return 0;
  }
  if (index < activeIndex) {
    return tilt;
  }
  return -tilt;
}

function getMediaShift(index: number, activeIndex: number, parallax: number, mediaSize: number) {
  if (index === activeIndex) {
    return 0;
  }
  const clampedDrift = Math.max(-1.5, Math.min(1.5, activeIndex - index));
  return clampedDrift * parallax * mediaSize * 0.06;
}

type AnimatePanelOptions = {
  tl: gsap.core.Timeline;
  panel: HTMLElement;
  media: HTMLElement | null;
  bar: HTMLElement | SVGElement | null;
  text: HTMLElement | null;
  index: number;
  active: number;
  vertical: boolean;
  tilt: number;
  parallax: number;
  mediaSize: number;
  grayscale: boolean;
  showLabels: boolean;
  duration: number;
  ease: string;
  prefersReduced: boolean;
  stagger: number;
  grow: number;
};

function animateSinglePanel(options: AnimatePanelOptions) {
  const isActive = options.index === options.active;
  const rot = getPanelRotation(options.index, options.active, options.tilt);
  const rotProp = options.vertical ? { rotateX: -rot } : { rotateY: rot };

  options.tl.to(
    options.panel,
    { flexGrow: isActive ? options.grow : 1, ...rotProp, duration: options.duration, ease: options.ease },
    0
  );

  if (options.media) {
    const shift = getMediaShift(options.index, options.active, options.parallax, options.mediaSize);
    const gray = options.grayscale && !isActive ? 1 : 0;
    const shiftX = options.vertical ? 0 : shift;
    const shiftY = options.vertical ? shift : 0;

    options.tl.to(
      options.media,
      {
        xPercent: -50,
        yPercent: -50,
        x: shiftX,
        y: shiftY,
        '--ag-gray': gray,
        '--ag-dim': isActive ? 0 : 0.35,
        duration: options.duration,
        ease: options.ease,
      },
      0
    );
  }

  if (options.showLabels) {
    const animatedElements = [options.bar, options.text].filter(Boolean);
    if (animatedElements.length > 0) {
      if (isActive) {
        options.tl.to(
          animatedElements,
          {
            opacity: 1,
            x: 0,
            duration: options.duration,
            ease: options.ease,
            stagger: options.prefersReduced ? 0 : options.stagger,
          },
          0
        );
      } else {
        options.tl.to(
          animatedElements,
          {
            opacity: 0,
            x: -14,
            duration: options.duration * 0.6,
            ease: options.ease,
          },
          0
        );
      }
    }
  }
}

/**
 * Renders an interactive 3D accordion gallery powered by GSAP.
 * @param props - Gallery configuration and items.
 * @returns Accordion gallery component.
 */
export function AccordionGallery(props: AccordionGalleryProps) {
  const items = props.items ?? DEFAULT_ITEMS;
  const count = items.length;
  const initialIndex = Math.min(Math.max(props.defaultIndex ?? 0, 0), Math.max(count - 1, 0));

  const [internalActive, setInternalActive] = useState(initialIndex);
  const active = props.activeIndex ?? internalActive;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | SVGElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);
  const mediaSizeRef = useRef(320);

  const vertical = props.orientation === 'vertical';
  const expandRatio = props.expandRatio ?? 0.52;
  const duration = props.duration ?? 0.6;
  const ease = props.ease ?? 'power3.out';
  const tilt = props.tilt ?? 8;
  const parallax = props.parallax ?? 0.5;
  const grayscale = props.grayscale ?? true;
  const showLabels = props.showLabels ?? true;
  const stagger = props.stagger ?? 0.06;
  const trigger = props.trigger ?? 'hover';
  const gap = props.gap ?? 10;
  const radius = props.radius ?? 16;
  const height = props.height ?? 460;
  const accentColor = props.accentColor ?? '#ffffff';
  const overlayColor = props.overlayColor ?? '#060010';
  const textColor = props.textColor ?? '#ffffff';

  const updateActive = (nextIndex: number) => {
    if (props.activeIndex === undefined) {
      setInternalActive(nextIndex);
    }
    props.onActiveChange?.(nextIndex);
  };

  const applyLayout = (animate: boolean) => {
    const panels = panelRefs.current;
    if (panels.length === 0) {
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
    const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
    const mediaSize = mediaSizeRef.current;

    tlRef.current?.kill();
    const dur = animate && !prefersReduced ? duration : 0;
    const tl = gsap.timeline();

    for (let i = 0; i < panels.length; i += 1) {
      const panel = panels[i];
      if (!panel) {
        continue;
      }

      animateSinglePanel({
        tl,
        panel,
        media: mediaRefs.current[i] ?? null,
        bar: barRefs.current[i] ?? null,
        text: textRefs.current[i] ?? null,
        index: i,
        active,
        vertical,
        tilt,
        parallax,
        mediaSize,
        grayscale,
        showLabels,
        duration: dur,
        ease,
        prefersReduced,
        stagger,
        grow,
      });
    }

    tlRef.current = tl;
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el) {
      return;
    }

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty('--ag-media-size', `${size}px`);
      applyLayout(!firstRunRef.current);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => {
      ro.disconnect();
    };
  }, [gap, count, expandRatio, vertical, active, duration, ease, tilt, parallax, grayscale, showLabels, stagger]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
  }, [active, count, expandRatio, duration, ease, vertical, tilt, parallax, grayscale, showLabels, stagger]);

  useEffect(() => () => {
    tlRef.current?.kill();
  }, []);

  const galleryStyle = {
    '--ag-accent': accentColor,
    '--ag-overlay': overlayColor,
    '--ag-text': textColor,
    '--ag-gap': `${gap}px`,
    '--ag-radius': `${radius}px`,
    height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`,
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? ' accordion-gallery--vertical' : ''}${props.className ? ` ${props.className}` : ''}`}
      style={galleryStyle}
      aria-label="Image accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active;
        const hasDescription = Boolean(item.description);

        return (
          <button
            key={item.id ?? item.label ?? i}
            type="button"
            ref={(el: HTMLButtonElement | null) => {
              panelRefs.current[i] = el;
            }}
            className={`ag-panel text-left${isActive ? ' ag-panel--active' : ''}`}
            style={{ borderRadius: `${radius}px` }}
            onClick={(e) => {
              if (i !== active) {
                e.preventDefault();
                updateActive(i);
              }
            }}
            onMouseEnter={() => {
              if (trigger === 'hover') {
                updateActive(i);
              }
            }}
            onFocus={() => {
              updateActive(i);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                updateActive((i + 1) % count);
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                updateActive((i - 1 + count) % count);
              }
            }}
            aria-current={isActive ? 'true' : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(el) => {
                  mediaRefs.current[i] = el;
                }}
              >
                {/* oxlint-disable-next-line next/no-img-element -- GSAP 3D perspective accordion requires native img with fluid parent scaling */}
                <img src={item.image} alt={item.alt || item.label || ''} draggable="false" />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>

            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                {hasDescription ? (
                  <>
                    {props.showQuoteIcon && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 36 28"
                        className="h-6 w-8 shrink-0 text-white/80"
                        ref={(el: SVGSVGElement | null) => {
                          barRefs.current[i] = el;
                        }}
                      >
                        <path
                          fill="currentColor"
                          d="M0 17.7C0 8.8 4.4 3 13.1 0l2.1 4.2c-4.6 1.7-7.2 4.5-7.7 8.4h6.1V28H0V17.7Zm20.8 0C20.8 8.8 25.2 3 33.9 0l2.1 4.2c-4.6 1.7-7.2 4.5-7.7 8.4h6.1V28H20.8V17.7Z"
                        />
                      </svg>
                    )}
                    <span
                      className="ag-panel__story-content"
                      ref={(el) => {
                        textRefs.current[i] = el;
                      }}
                    >
                      <h3 className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">
                        {item.label}
                      </h3>
                      <p className="font-body text-xs leading-relaxed text-white/90 sm:text-sm">
                        {item.description}
                      </p>
                    </span>
                  </>
                ) : (
                  <span className="ag-panel__label-row">
                    <span
                      className="ag-panel__bar"
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                    />
                    <span
                      className="ag-panel__text"
                      ref={(el) => {
                        textRefs.current[i] = el;
                      }}
                    >
                      {item.label}
                    </span>
                  </span>
                )}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

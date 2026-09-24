'use client';

import type React from 'react';
import type { AccordionGalleryItem, AccordionGalleryProps } from './AccordionGallery.types';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import type { ParsedVideo } from '@/utils/Video';
import { parseVideoSource } from '@/utils/Video';

import './AccordionGallery.css';

export type { AccordionGalleryItem, AccordionGalleryProps } from './AccordionGallery.types';

const DEFAULT_ITEMS: AccordionGalleryItem[] = [
  { image: 'https://picsum.photos/id/1015/900/1200', label: 'Canyon', link: '#' },
  {
    video: 'https://www.youtube.com/watch?v=0B2MieWr4rE',
    image: 'https://picsum.photos/id/1018/900/1200',
    label: 'PriyoShop Story',
    description: 'Empowering retail innovation across Bangladesh.',
  },
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

function AccordionVideoPlayer(props: {
  parsedVideo: ParsedVideo;
  poster?: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="ag-panel__video-wrapper">
      {props.parsedVideo.type === 'youtube' ? (
        <iframe
          src={`${props.parsedVideo.embedUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={props.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="size-full border-0 object-cover"
        />
      ) : (
        <video
          src={props.parsedVideo.src}
          poster={props.poster}
          aria-label={props.title}
          autoPlay
          controls
          playsInline
          className="size-full object-cover"
        >
          <track kind="captions" />
        </video>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          props.onClose();
        }}
        aria-label="Close video"
        className="ag-panel__video-close"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

function AccordionPlayOverlay(props: { isActive: boolean }) {
  if (props.isActive) {
    return (
      <span className="ag-panel__play-btn group/play" aria-hidden="true">
        <span className="ag-panel__play-icon">
          <svg viewBox="0 0 24 24" className="size-7 translate-x-0.5 fill-current">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    );
  }

  return (
    <span className="ag-panel__video-badge" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="size-3.5 fill-current">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

function AccordionPanelLabel(props: {
  item: AccordionGalleryItem;
  showQuoteIcon?: boolean;
  barRef: (el: HTMLElement | SVGElement | null) => void;
  textRef: (el: HTMLElement | null) => void;
}) {
  if (props.item.description) {
    return (
      <span className="ag-panel__label" aria-hidden="true">
        {props.showQuoteIcon && (
          <svg
            aria-hidden="true"
            viewBox="0 0 36 28"
            className="h-6 w-8 shrink-0 text-white/80"
            ref={props.barRef}
          >
            <path
              fill="currentColor"
              d="M0 17.7C0 8.8 4.4 3 13.1 0l2.1 4.2c-4.6 1.7-7.2 4.5-7.7 8.4h6.1V28H0V17.7Zm20.8 0C20.8 8.8 25.2 3 33.9 0l2.1 4.2c-4.6 1.7-7.2 4.5-7.7 8.4h6.1V28H20.8V17.7Z"
            />
          </svg>
        )}
        <span className="ag-panel__story-content" ref={props.textRef}>
          <h3 className="font-display text-lg font-semibold leading-tight text-white sm:text-xl">
            {props.item.label}
          </h3>
          <p className="font-body text-xs leading-relaxed text-white/90 sm:text-sm">
            {props.item.description}
          </p>
        </span>
      </span>
    );
  }

  return (
    <span className="ag-panel__label" aria-hidden="true">
      <span className="ag-panel__label-row">
        <span className="ag-panel__bar" ref={props.barRef} />
        <span className="ag-panel__text" ref={props.textRef}>
          {props.item.label}
        </span>
      </span>
    </span>
  );
}

function AccordionPanel(props: {
  item: AccordionGalleryItem;
  index: number;
  active: number;
  count: number;
  trigger: 'hover' | 'click';
  radius: number;
  isPlaying: boolean;
  showLabels: boolean;
  showQuoteIcon?: boolean;
  onSelect: (index: number) => void;
  onPlay: (index: number) => void;
  onCloseVideo: () => void;
  panelRef: (el: HTMLElement | null) => void;
  mediaRef: (el: HTMLElement | null) => void;
  barRef: (el: HTMLElement | SVGElement | null) => void;
  textRef: (el: HTMLElement | null) => void;
}) {
  const isActive = props.index === props.active;
  const rawVideo = props.item.video || props.item.videoPath;
  const parsedVideo = rawVideo ? parseVideoSource(rawVideo) : null;
  const hasVideo = Boolean(parsedVideo);
  const poster =
    props.item.image ||
    props.item.videoPoster ||
    (parsedVideo?.type === 'youtube' ? parsedVideo.thumbnailUrl : '/career/1.png');

  if (props.isPlaying && parsedVideo) {
    return (
      <div
        ref={props.panelRef}
        className="ag-panel text-left ag-panel--active ag-panel--playing"
        style={{ borderRadius: `${props.radius}px` }}
      >
        <AccordionVideoPlayer
          parsedVideo={parsedVideo}
          poster={poster}
          title={props.item.label || props.item.alt || 'Video player'}
          onClose={props.onCloseVideo}
        />
      </div>
    );
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      props.onSelect((props.index + 1) % props.count);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      props.onSelect((props.index - 1 + props.count) % props.count);
    }
  };

  return (
    <button
      type="button"
      ref={props.panelRef}
      className={`ag-panel text-left${isActive ? ' ag-panel--active' : ''}`}
      style={{ borderRadius: `${props.radius}px` }}
      onClick={(e) => {
        if (!isActive) {
          e.preventDefault();
          props.onSelect(props.index);
        } else if (hasVideo) {
          props.onPlay(props.index);
        }
      }}
      onMouseEnter={() => {
        if (props.trigger === 'hover') {
          props.onSelect(props.index);
        }
      }}
      onFocus={() => {
        props.onSelect(props.index);
      }}
      onKeyDown={handleKeyDown}
      aria-current={isActive ? 'true' : undefined}
      aria-label={props.item.label}
    >
      <span className="ag-panel__frame">
        <span className="ag-panel__media" ref={props.mediaRef}>
          {/* oxlint-disable-next-line next/no-img-element -- GSAP 3D perspective accordion requires native img with fluid parent scaling */}
          <img src={poster} alt={props.item.alt || props.item.label || ''} draggable="false" />
        </span>
        <span className="ag-panel__overlay" aria-hidden="true" />
      </span>

      {hasVideo && <AccordionPlayOverlay isActive={isActive} />}

      {props.showLabels && (
        <AccordionPanelLabel
          item={props.item}
          showQuoteIcon={props.showQuoteIcon}
          barRef={props.barRef}
          textRef={props.textRef}
        />
      )}
    </button>
  );
}

function resolveGalleryConfig(props: AccordionGalleryProps) {
  return {
    items: props.items ?? DEFAULT_ITEMS,
    expandRatio: props.expandRatio ?? 0.52,
    duration: props.duration ?? 0.6,
    ease: props.ease ?? 'power3.out',
    tilt: props.tilt ?? 8,
    parallax: props.parallax ?? 0.5,
    grayscale: props.grayscale ?? true,
    showLabels: props.showLabels ?? true,
    stagger: props.stagger ?? 0.06,
    trigger: props.trigger ?? 'hover',
    gap: props.gap ?? 10,
    radius: props.radius ?? 16,
    height: props.height ?? 460,
    accentColor: props.accentColor ?? '#ffffff',
    overlayColor: props.overlayColor ?? '#060010',
    textColor: props.textColor ?? '#ffffff',
  };
}

/**
 * Renders an interactive 3D accordion gallery powered by GSAP with image and video support.
 * @param props - Gallery configuration and items.
 * @returns Accordion gallery component.
 */
export function AccordionGallery(props: AccordionGalleryProps) {
  const config = resolveGalleryConfig(props);
  const {
    items,
    expandRatio,
    duration,
    ease,
    tilt,
    parallax,
    grayscale,
    showLabels,
    stagger,
    trigger,
    gap,
    radius,
    height,
    accentColor,
    overlayColor,
    textColor,
  } = config;
  const count = items.length;
  const initialIndex = Math.min(Math.max(props.defaultIndex ?? 0, 0), Math.max(count - 1, 0));

  const [internalActive, setInternalActive] = useState(initialIndex);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
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

  const updateActive = (nextIndex: number) => {
    if (playingIndex !== null && playingIndex !== nextIndex) {
      setPlayingIndex(null);
    }
    if (props.activeIndex === undefined) {
      setInternalActive(nextIndex);
    }
    props.onActiveChange?.(nextIndex);
  };

  useEffect(() => {
    if (playingIndex !== null && playingIndex !== active) {
      setPlayingIndex(null);
    }
  }, [active, playingIndex]);

  useEffect(() => {
    if (playingIndex === null) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPlayingIndex(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playingIndex]);

  useEffect(() => {
    const currentItem = items[active];
    const itemVideo = currentItem?.video || currentItem?.videoPath;
    if ((props.videoAutoplay || currentItem?.videoAutoplay) && itemVideo) {
      setPlayingIndex(active);
    }
  }, [active, items, props.videoAutoplay]);

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
      aria-label="Image and video accordion gallery"
    >
      {items.map((item, i) => (
        <AccordionPanel
          key={item.id ?? item.label ?? i}
          item={item}
          index={i}
          active={active}
          count={count}
          trigger={trigger}
          radius={radius}
          isPlaying={playingIndex === i}
          showLabels={showLabels}
          showQuoteIcon={props.showQuoteIcon}
          onSelect={updateActive}
          onPlay={setPlayingIndex}
          onCloseVideo={() => setPlayingIndex(null)}
          panelRef={(el) => {
            panelRefs.current[i] = el;
          }}
          mediaRef={(el) => {
            mediaRefs.current[i] = el;
          }}
          barRef={(el) => {
            barRefs.current[i] = el;
          }}
          textRef={(el) => {
            textRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}



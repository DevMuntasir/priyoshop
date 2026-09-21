'use client';

import type React from 'react';
import { useEffect, useRef } from 'react';
import './ScrollExpand.css';

export type ScrollExpandProps = {
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  alt?: string;
  title?: React.ReactNode;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
}

export function ScrollExpand(props: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);

  const startWidth = props.startWidth ?? 42;
  const startHeight = props.startHeight ?? 58;
  const startRadius = props.startRadius ?? 24;
  const endRadius = props.endRadius ?? 0;
  const mediaZoom = props.mediaZoom ?? 1.35;
  const scrollDistance = props.scrollDistance ?? 1.2;
  const holdDistance = props.holdDistance ?? 0.35;
  const smoothing = props.smoothing ?? 0.1;
  const overlayScrim = props.overlayScrim ?? 0.45;
  const useWindowScroll = props.useWindowScroll ?? false;
  const enabled = props.enabled ?? true;

  const propsRef = useRef({
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  });

  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  };

  const applyProgress = (p: number) => {
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) {
      return;
    }
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    media.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;

    if (scrimRef.current) {
      scrimRef.current.style.opacity = `${c.overlayScrim * e}`;
    }

    if (titleRef.current) {
      const out = smoothstep(0.4, 0.88, p);
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${-28 * out}px, 0) scale(${1 + 0.06 * out})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.12, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.68, 1, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - inn)}px, 0)`;
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) {
        return;
      }
      stage.style.height = `${stageH}px`;
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;

      const w = root.clientWidth || stageH;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) {
        return 1;
      }
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const { top } = track.getBoundingClientRect();
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) {
        return;
      }
      running = true;
      if (!raf) {
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [useWindowScroll]);

  const mediaType = props.mediaType ?? 'image';

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${props.className ?? ''}`.trim()}
      style={props.style}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {mediaType === 'video' ? (
              <video
                ref={mediaRef as React.RefObject<HTMLVideoElement | null>}
                className="scroll-expand__media"
                src={props.src}
                poster={props.poster}
                aria-label={props.alt ?? 'Video playback'}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              // oxlint-disable-next-line next/no-img-element
              <img
                ref={mediaRef as React.RefObject<HTMLImageElement | null>}
                className="scroll-expand__media"
                src={props.src}
                alt={props.alt ?? ''}
                draggable={false}
              />
            )}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {props.children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {props.children}
              </div>
            ) : null}
          </div>
          {props.title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {props.title}
            </div>
          ) : null}
          {props.scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {props.scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

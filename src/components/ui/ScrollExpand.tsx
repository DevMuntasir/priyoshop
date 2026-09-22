'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { parseVideoSource } from '@/utils/Video';
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
  const [isMuted, setIsMuted] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement | HTMLIFrameElement | null>(null);
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

  const lastAppliedRef = useRef(-1);

  const applyProgress = (p: number) => {
    if (Math.abs(p - lastAppliedRef.current) < 0.0002) {
      return;
    }
    lastAppliedRef.current = p;

    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!frame || !media) {
      return;
    }
    const c = propsRef.current;

    const e = smoothstep(0, 1, p);

    const w = c.startWidth + (100 - c.startWidth) * e;
    const h = c.startHeight + (100 - c.startHeight) * e;
    const r = c.startRadius + (c.endRadius - c.startRadius) * e;

    frame.style.width = `${w}%`;
    frame.style.height = `${h}%`;
    frame.style.borderRadius = `${r}px`;

    const zoom = c.mediaZoom + (1 - c.mediaZoom) * e;
    media.style.transform = `translate3d(-50%, -50%, 0) scale(${zoom})`;

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
    let stageW = 0;
    let cachedTrackTop = 0;
    let running = false;
    let isIntersecting = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      stageW = c.useWindowScroll ? window.innerWidth : root.clientWidth;
      if (stageH <= 0) {
        return;
      }
      stage.style.height = `${stageH}px`;
      stage.style.setProperty('--se-stage-w', `${stageW}px`);
      stage.style.setProperty('--se-stage-h', `${stageH}px`);
      track.style.height = `${stageH * (1 + Math.max(0, c.scrollDistance) + Math.max(0, c.holdDistance))}px`;

      const w = root.clientWidth || stageW;
      stage.style.setProperty('--se-title-size', `${clamp(w * 0.075, 20, 84)}px`);

      if (c.useWindowScroll) {
        cachedTrackTop = track.getBoundingClientRect().top + window.scrollY;
      }
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) {
        return 1;
      }
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = cachedTrackTop - window.scrollY;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      target = readProgress();
      const c = propsRef.current;

      if (c.smoothing <= 0 || reduceMotion) {
        current = target;
        running = false;
      } else {
        const k = 1 - Math.exp(-1 / (60 * c.smoothing));
        current += (target - current) * k;
        if (Math.abs(target - current) < 0.0005) {
          current = target;
          running = false;
        }
      }

      applyProgress(current);

      if (running) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
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
      if (!isIntersecting) {
        const p = readProgress();
        if ((p === 0 && current === 0) || (p === 1 && current === 1)) {
          return;
        }
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

    const videoEl = mediaRef.current instanceof HTMLVideoElement ? mediaRef.current : null;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) {
          return;
        }
        isIntersecting = entry.isIntersecting;

        if (isIntersecting) {
          if (propsRef.current.useWindowScroll && trackRef.current) {
            cachedTrackTop = trackRef.current.getBoundingClientRect().top + window.scrollY;
          }
          if (videoEl && videoEl.paused) {
            videoEl.play().catch(() => {});
          }
          kick();
        } else {
          if (videoEl && !videoEl.paused) {
            videoEl.pause();
          }
        }
      },
      { rootMargin: '300px 0px 300px 0px', threshold: 0 }
    );

    io.observe(track);

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      io.disconnect();
      if (videoEl) {
        videoEl.pause();
      }
    };
  }, [useWindowScroll]);

  const mediaType = props.mediaType ?? 'image';
  const parsedVideo = mediaType === 'video' ? parseVideoSource(props.src) : null;

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${props.className ?? ''}`.trim()}
      style={props.style}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {mediaType === 'video' && parsedVideo ? (
              parsedVideo.type === 'youtube' ? (
                <iframe
                  ref={mediaRef as unknown as React.RefObject<HTMLIFrameElement | null>}
                  className="scroll-expand__media border-0 pointer-events-none"
                  src={`${parsedVideo.embedUrl}?autoplay=1&mute=1&loop=1&playlist=${parsedVideo.videoId}&controls=0&modestbranding=1&playsinline=1`}
                  title={props.alt ?? 'Video playback'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <video
                  ref={mediaRef as React.RefObject<HTMLVideoElement | null>}
                  className="scroll-expand__media"
                  src={parsedVideo.src}
                  poster={props.poster}
                  aria-label={props.alt ?? 'Video playback'}
                  preload="metadata"
                  muted={isMuted}
                  loop
                  playsInline
                />
              )
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
            {mediaType === 'video' && parsedVideo?.type === 'direct' ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted((prev) => {
                    const next = !prev;
                    if (mediaRef.current && 'muted' in mediaRef.current) {
                      (mediaRef.current as HTMLVideoElement).muted = next;
                    }
                    return next;
                  });
                }}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                className="absolute bottom-5 right-5 z-20 flex size-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80 hover:scale-110"
              >
                {isMuted ? (
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            ) : null}
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

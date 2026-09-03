'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useAnimationFrame, useScroll } from 'framer-motion';

/**
 * RoadScrollHero
 * ----------------------------------------------------------------------
 * Pinned, scroll-scrubbed video hero. The user's scroll position drives
 * `video.currentTime` directly, so scroll speed *is* playback speed —
 * no separate "speed" logic needed. A lerp on progress + a per-frame
 * time-jump cap keep the scrub silky instead of snapping to raw scroll
 * pixels.
 *
 * NOTE on assets: video/poster are referenced by URL (config.videoSrc /
 * config.posterSrc), not embedded as base64 — drop the files in /public
 * (e.g. /videos/road-drive.mp4, /images/road-poster.webp) and point the
 * config at them. Keep the source video short (5-8s), h264, with a tight
 * GOP (keyframe every ~5 frames, no B-frames) so seeking stays smooth:
 *
 *   ffmpeg -i in.mp4 -vf "scale=1280:720" -c:v libx264 -crf 23 -bf 0 \
 *     -g 5 -keyint_min 5 -sc_threshold 0 -an -movflags +faststart out.mp4
 *
 * Swap the `ps-*` utility classes below for your actual PriyoShop design
 * tokens (ps-red / ps-cream / ps-ink etc.) — placeholders are used here
 * since the exact token names weren't available in this context.
 */

export interface RoadScrollHeroConfig {
  videoSrc: string;
  posterSrc: string;
  /** Scroll distance (in vh) the pinned section occupies on desktop. */
  pinHeightVh: number;
  /** Scroll distance (in vh) on viewports <= 760px. */
  pinHeightVhMobile: number;
  /** Lerp factor for progress smoothing. Lower = slower, silkier catch-up. */
  ease: number;
  /** Max seconds of footage the scrub is allowed to jump in one frame. */
  maxTimeStepSec: number;
  objectPosition: string;
  eyebrow: string;
  heading: ReactNode;
  subheading: string;
  scrollCueLabel: string;
}

const DEFAULT_CONFIG: RoadScrollHeroConfig = {
  videoSrc: '/video/road-drive.mp4',
  posterSrc: '/video/road-drive.mp4',
  pinHeightVh: 560,
  pinHeightVhMobile: 420,
  ease: 0.055,
  maxTimeStepSec: 0.09,
  objectPosition: '50% 45%',
  eyebrow: '',
  heading: (
    <>

    </>
  ),
  subheading:
    '',
  scrollCueLabel: '',
};

interface RoadScrollHeroProps {
  config?: Partial<RoadScrollHeroConfig>;
}

export default function RoadScrollHero({ config = {} }: RoadScrollHeroProps) {
  const cfg: RoadScrollHeroConfig = { ...DEFAULT_CONFIG, ...config };

  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const durationRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastAppliedTimeRef = useRef(0);
  const seekingRef = useRef(false);
  const pendingSeekRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  });

  // Respect prefers-reduced-motion and pick the mobile scroll runway.
  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const widthMq = window.matchMedia('(max-width: 760px)');
    setReduceMotion(motionMq.matches);
    setIsMobile(widthMq.matches);

    const onMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    const onWidthChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    motionMq.addEventListener('change', onMotionChange);
    widthMq.addEventListener('change', onWidthChange);
    return () => {
      motionMq.removeEventListener('change', onMotionChange);
      widthMq.removeEventListener('change', onWidthChange);
    };
  }, []);

  // Wire up the video: stay paused, only ever seek via scroll.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();

    const onReady = () => {
      if (video.duration && isFinite(video.duration)) {
        durationRef.current = video.duration;
        // Prime the decoder: a paused video that has never played won't paint
        // seeked frames in Chrome/Safari. A muted play() then immediate pause()
        // forces the first frame to render so scroll-scrubbing is visible.
        video
          .play()
          .then(() => video.pause())
          .catch(() => { });
        setReady(true);
      }
    };
    const seekTo = (time: number) => {
      if (seekingRef.current) {
        pendingSeekRef.current = time;
        return;
      }
      seekingRef.current = true;
      video.currentTime = time;
    };
    const onSeeked = () => {
      seekingRef.current = false;
      if (pendingSeekRef.current !== null) {
        const t = pendingSeekRef.current;
        pendingSeekRef.current = null;
        seekTo(t);
      }
    };

    video.addEventListener('loadedmetadata', onReady);
    video.addEventListener('canplay', onReady);
    video.addEventListener('seeked', onSeeked);
    // Small/cached files can fire loadedmetadata before this effect runs, so the
    // listeners above would miss it and `ready` would stay false forever. If the
    // video already has its metadata, wire it up right away.
    if (video.readyState >= 1) onReady();
    return () => {
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('seeked', onSeeked);
    };
  }, []);

  function seekTo(time: number) {
    const video = videoRef.current;
    if (!video) return;
    if (seekingRef.current) {
      pendingSeekRef.current = time;
      return;
    }
    seekingRef.current = true;
    video.currentTime = time;
  }

  useAnimationFrame(() => {
    const target = scrollYProgress.get();
    const ease = reduceMotion ? 1 : cfg.ease;

    currentProgressRef.current += (target - currentProgressRef.current) * ease;
    if (Math.abs(currentProgressRef.current - target) < 0.0008) {
      currentProgressRef.current = target;
    }

    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${currentProgressRef.current * 100}%`;
    }

    if (!ready) return;

    const safeDuration = Math.max(0.05, durationRef.current - 0.05);
    let time = currentProgressRef.current * safeDuration;

    // Cap how far currentTime can jump per frame — even a hard flick-scroll
    // should read as "fast but smooth," never a hard cut.
    const delta = time - lastAppliedTimeRef.current;
    if (Math.abs(delta) > cfg.maxTimeStepSec) {
      time = lastAppliedTimeRef.current + Math.sign(delta) * cfg.maxTimeStepSec;
    }
    lastAppliedTimeRef.current = time;

    seekTo(time);
  });

  const pinHeight = isMobile ? cfg.pinHeightVhMobile : cfg.pinHeightVh;

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${pinHeight}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1a1a18]">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: cfg.objectPosition }}
          src={cfg.videoSrc}
          poster={cfg.posterSrc}
          muted
          playsInline
          preload="auto"
        />

        {/* Vignette for text legibility — swap gradients for ps- tokens as needed */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,8,6,.55) 0%, rgba(10,8,6,0) 34%),' +
              'linear-gradient(to right, rgba(10,8,6,.42) 0%, rgba(10,8,6,0) 42%),' +
              'linear-gradient(to bottom, rgba(10,8,6,.25) 0%, rgba(10,8,6,0) 22%)',
          }}
        />

        <div className="absolute left-[6vw] bottom-[16vh] z-10 max-w-[520px] text-ps-cream">
          <span className="mb-4 inline-block rounded-full border border-white/25 bg-ps-red/25 px-3.5 py-1.5 text-[13px] font-semibold tracking-wide text-pink-100">
            {cfg.eyebrow}
          </span>
          <h1 className="text-[clamp(2.1rem,5vw,3.4rem)] font-bold leading-[1.15] [text-shadow:0_4px_22px_rgba(0,0,0,.45)]">
            {cfg.heading}
          </h1>
          <p className="mt-4 max-w-[440px] text-[1.05rem] leading-relaxed text-ps-cream/90 [text-shadow:0_2px_14px_rgba(0,0,0,.5)]">
            {cfg.subheading}
          </p>
        </div>

        <div className="absolute bottom-[5vh] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[13px] tracking-wide text-ps-cream/85 [text-shadow:0_2px_10px_rgba(0,0,0,.5)]">
          <span>{cfg.scrollCueLabel}</span>
          <span className={reduceMotion ? '' : 'animate-bounce'}>↓</span>
        </div>

        <div className="absolute bottom-[2.2vh] left-[6vw] right-[6vw] z-10 h-[3px] overflow-hidden rounded-full bg-white/25">
          <div ref={progressFillRef} className="h-full w-0 rounded-full bg-ps-red" />
        </div>
      </div>
    </div>
  );
}

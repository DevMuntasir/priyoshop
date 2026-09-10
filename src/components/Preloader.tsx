"use client";

/**
 * Preloader.tsx — PriyoShop brand preloader
 * --------------------------------------------------------------------------
 * A full-screen load overlay built around the PriyoShop bag-and-heart mark.
 * The bag is "set down" with a small bounce, the heart then beats (lub-dub)
 * as a continuous signature, a progress line fills, and the overlay lifts
 * away like a curtain to reveal the page.
 *
 * Two modes:
 *   • Auto (default)  — fills to ~90% over `config.minDuration`, then jumps to 100% and
 *                        exits once the page actually finishes loading (`window.load`),
 *                        capped by `config.maxDuration` as a safety timeout. Shown only
 *                        once per browser session (sessionStorage-gated).
 *   • Controlled      — pass `progress` (0–100); the overlay exits at 100.
 *
 * Patterns kept consistent with the rest of the codebase:
 *   • All tunable values live in a single `config` prop with named constants.
 *   • Uses Framer Motion only; wraps no existing primitives.
 *   • Honors prefers-reduced-motion (no drop / beat, simple fade instead).
 */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";

/* -------------------------------------------------------------------------- */
/* Config                                                                     */
/* -------------------------------------------------------------------------- */

export type PreloaderConfig = {
  /** Minimum time the loader stays up in auto mode (ms), for animation smoothness. */
  minDuration: number;
  /** Max time to wait for the real `window.load` signal before forcing exit (ms). */
  maxDuration: number;
  /** One full lub-dub cycle length (s). */
  beatDuration: number;
  /** Small line under the wordmark. Set to "" to hide. */
  caption: string;
  /** Background + brand colours. Override to theme. */
  colors: {
    bg: string;
    bgTint: string;
    red: string;
    redSoft: string;
    ink: string;
    track: string;
    captionText: string;
  };
};

export const DEFAULT_PRELOADER_CONFIG: PreloaderConfig = {
  minDuration: 500,
  maxDuration: 3500,
  beatDuration: 1.1,
  caption: "Loading your favorites…",
  colors: {
    bg: "#ffffff",
    bgTint: "#fff5f6",
    red: "#EE2F47",
    redSoft: "#ff6175",
    ink: "#1A1A1A",
    track: "#f0e3e5",
    captionText: "#9a8c8e",
  },
};

export type PreloaderProps = {
  /** Called once the exit animation has finished. */
  onComplete?: () => void;
  /** Controlled progress 0–100. Omit to auto-simulate over minDuration. */
  progress?: number;
  /** Partial override of the defaults above. */
  config?: Partial<PreloaderConfig>;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/* Logo                                                                       */
/* -------------------------------------------------------------------------- */

function BrandMark({
  beat,
  beatDuration,
}: {
  beat: boolean;
  beatDuration: number;
}) {
  // Heart appears instantly, then the scale runs the infinite lub-dub —
  // two quick squeezes followed by a rest.
  const heartAnimate = beat
    ? { opacity: 1, scale: [1, 1.2, 1, 1.12, 1, 1] }
    : { opacity: 1, scale: 1 };

  const heartTransition = beat
    ? {
      opacity: { duration: 0 },
      scale: {
        duration: beatDuration,
        times: [0, 0.12, 0.22, 0.34, 0.46, 1],
        ease: "easeInOut" as const,
        repeat: Infinity,
      },
    }
    : { duration: 0 };

  return (
    <svg viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[104px] h-auto block">
      <path d="M2.27497 7.12744L0 33.0629L5.90204 35.6108L4.88789 7.26774L2.27497 7.12744Z" fill="#EE2F47" />
      <path d="M11.0037 4.80196C11.0034 3.56251 11.3236 2.51072 11.825 1.78881C12.3298 1.06484 12.9875 0.675588 13.724 0.674268C13.8661 0.674268 14.0968 0.688632 14.2467 0.71986L14.308 0.733793C14.4691 0.523113 14.644 0.331934 14.8303 0.160985L14.3834 0.0598228C14.1897 0.0197979 13.9127 2.38186e-06 13.7241 2.38186e-06C12.7317 -0.00131712 11.8603 0.545692 11.2685 1.40571C10.673 2.26794 10.3287 3.44845 10.3281 4.80212V6.47862L11.004 6.53521V4.80196H11.0037Z" fill="#1A1A1A" />
      <path d="M14.5973 4.80211C14.5966 3.56265 14.9174 2.51086 15.4186 1.78895C15.5778 1.56023 15.7526 1.36524 15.9399 1.20529C16.1503 1.02583 16.376 0.89125 16.6149 0.802256C16.8385 0.718541 17.0741 0.674846 17.3176 0.674553C17.4599 0.674553 17.7746 0.688926 17.9247 0.720154L18.6475 0.81882C19.5467 1.00252 20.3822 1.62035 20.9898 2.33552C21.5984 3.04952 21.9729 3.93857 21.9811 4.8131L21.9978 7.45578L22.0011 7.94472L22.0019 8.12491L22.2838 8.14749L22.6784 8.17945L22.677 8.00103L22.6741 7.51251L22.6571 4.8068C22.6441 3.7446 22.2009 2.71788 21.5052 1.89891C20.8085 1.08052 19.8527 0.37928 18.7839 0.15863L18.0611 0.0598124C17.8674 0.0197874 17.5059 9.1816e-07 17.3174 9.1816e-07C16.7856 -0.000438916 16.2892 0.157162 15.8514 0.435137C15.6294 0.576031 15.4226 0.74698 15.2347 0.945199C15.1008 1.08609 14.976 1.23989 14.8621 1.4057C14.266 2.26793 13.9219 3.44844 13.9219 4.80211V7.47147L14.5973 7.52571V4.80211Z" fill="#1A1A1A" />
      <path d="M32.3166 30.4924L29.8103 8.75653L28.9036 8.68308L23.5237 8.24823L22.6787 8.17933L22.6937 10.5317C22.809 10.627 22.8828 10.7716 22.8828 10.9328C22.8828 11.2209 22.6495 11.4542 22.3618 11.4542C22.0743 11.4542 21.8408 11.2209 21.8408 10.9328C21.8408 10.7774 21.9095 10.6384 22.0174 10.5427L22.0183 10.5426L22.0024 8.12479L21.157 8.05632L19.0828 7.88845L18.4068 7.83377L15.4429 7.59391L14.5979 7.52544V9.93588C14.7047 10.0316 14.7725 10.1718 14.7725 10.3291C14.7725 10.4176 14.751 10.5014 14.7129 10.5745C14.628 10.7383 14.4594 10.85 14.2658 10.85C14.0723 10.85 13.9039 10.7383 13.8187 10.5745C13.7807 10.5014 13.7586 10.4178 13.7586 10.3291C13.7586 10.1778 13.8221 10.0419 13.9225 9.94658V7.4712L13.0773 7.40244L11.004 7.23456L10.3281 7.18002L6.19577 6.84575L5.50781 6.79004L7.07542 31.4301L7.36633 36L31.4351 30.6896L32.2159 30.5173L32.3172 30.4951L32.3166 30.4924Z" fill="#EE2F47" />
      <path d="M22.6929 10.5318L22.6941 10.6935H22.6936L22.6924 10.5316L22.6779 8.17953L22.2833 8.14758L22.0014 8.125L22.0173 10.5428L22.0164 10.5429C21.9085 10.6386 21.8398 10.7778 21.8398 10.933C21.8398 11.2211 22.0733 11.4544 22.3608 11.4544C22.6485 11.4544 22.8818 11.2211 22.8818 10.933C22.8819 10.7715 22.8081 10.6271 22.6929 10.5318Z" fill="white" />
      <path d="M14.5972 9.93602V9.7315V7.52544L13.9217 7.47119V9.7315V9.94658C13.8212 10.0419 13.7578 10.1778 13.7578 10.3291C13.7578 10.4176 13.7799 10.5014 13.8179 10.5745C13.903 10.7383 14.0715 10.85 14.265 10.85C14.4586 10.85 14.6272 10.7383 14.7121 10.5745C14.7502 10.5014 14.7717 10.4178 14.7717 10.3291C14.7717 10.1719 14.7039 10.0318 14.5972 9.93602Z" fill="white" />
      <motion.path
        d="M23.9156 15.8756C22.4671 14.463 20.4033 14.3733 19.1309 15.5991C17.5987 14.3793 15.5568 14.479 14.4056 15.8971C13.1699 17.4187 13.4294 19.8803 14.9849 21.3962L20.2859 26.5595L24.4949 21.3745C25.7302 19.8518 25.4709 17.3905 23.9156 15.8756Z"
        fill="white"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={beat ? { opacity: 1, scale: 1 } : false}
        animate={heartAnimate}
        transition={heartTransition}
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Preloader                                                                  */
/* -------------------------------------------------------------------------- */

const SESSION_KEY = "ps_preloader_seen";

export default function Preloader({
  onComplete,
  progress,
  config: configOverride,
  className = "",
}: PreloaderProps) {
  const config: PreloaderConfig = {
    ...DEFAULT_PRELOADER_CONFIG,
    ...configOverride,
    colors: { ...DEFAULT_PRELOADER_CONFIG.colors, ...configOverride?.colors },
  };
  const c = config.colors;

  const reduceMotion = useReducedMotion();
  const isControlled = typeof progress === "number";

  const [visible, setVisible] = useState(true);
  const [autoPct, setAutoPct] = useState(0);
  const startRef = useRef<number | null>(null);

  const pct = Math.min(100, Math.max(0, isControlled ? progress : autoPct));

  // Auto progress: ease toward ~90% quickly; the jump to 100 is driven by the
  // real readiness signal below, not by this timer.
  useEffect(() => {
    let raf = 0;
    if (!isControlled) {
      const tick = (t: number) => {
        startRef.current ??= t;
        const elapsed = t - startRef.current;
        const ratio = Math.min(1, elapsed / config.minDuration);
        setAutoPct(Math.round((1 - (1 - ratio) ** 3) * 90));
        if (ratio < 1) {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    }
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [isControlled, config.minDuration]);

  // Skip entirely on repeat visits within the same session.
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) {
        setVisible(false);
      }
    } catch {
      // sessionStorage unavailable (privacy mode etc.) — fall back to showing it.
    }
  }, []);

  // Dismiss on the real readiness signal (page fully loaded), bounded by a
  // minimum floor (animation smoothness) and a maximum safety timeout.
  useEffect(() => {
    let maxTimer: ReturnType<typeof setTimeout> | undefined;
    let dismissed = isControlled || !visible;
    const start = Date.now();

    const dismiss = () => {
      if (dismissed) {
        return;
      }
      dismissed = true;
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, config.minDuration - elapsed);
      setTimeout(() => {
        setAutoPct(100);
        setTimeout(() => {
          setVisible(false);
        }, 350);
      }, remaining);
    };

    if (!dismissed) {
      if (document.readyState === "complete") {
        dismiss();
      } else {
        window.addEventListener("load", dismiss);
        maxTimer = setTimeout(dismiss, config.maxDuration);
      }
    }

    return () => {
      window.removeEventListener("load", dismiss);
      clearTimeout(maxTimer);
    };
  }, [isControlled, visible, config.minDuration, config.maxDuration]);

  // Controlled mode: caller drives `progress`, exit once it reaches 100.
  useEffect(() => {
    let id: ReturnType<typeof setTimeout> | undefined;
    if (isControlled && pct >= 100) {
      id = setTimeout(() => {
        setVisible(false);
      }, 350);
    }
    return () => {
      clearTimeout(id);
    };
  }, [isControlled, pct]);

  // Mark the session once the overlay has been shown, and lock body scroll
  // only while it's genuinely visible.
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
    }
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  const overlayVariants: Variants = {
    initial: { y: 0 },
    exit: reduceMotion
      ? { opacity: 0, transition: { duration: 0.4 } }
      : { y: "-101%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } },
  };


  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.output
          id="ps-preloader"
          key="ps-preloader"
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-7 ${className}`}
          style={{
            background: `radial-gradient(120% 90% at 50% 38%, ${c.bg} 55%, ${c.bgTint} 100%)`,
            willChange: "transform",
          }}
          variants={overlayVariants}
          initial="initial"
          animate="initial"
          exit="exit"
          aria-live="polite"
          aria-label={`Loading PriyoShop, ${Math.round(pct)} percent`}
        >
          {/* logo + glow + ring */}
          <div className="relative flex items-center justify-center">
            {!reduceMotion && (
              <>
                <motion.span
                  className="pointer-events-none absolute h-[200px] w-[200px] rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${c.red}29, ${c.red}00 65%)`,
                  }}
                  animate={{ scale: [1, 1.15, 1, 1, 1], opacity: [0.7, 1, 0.7, 0.7, 0.7] }}
                  transition={{
                    duration: config.beatDuration,
                    times: [0, 0.12, 0.46, 0.99, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </>
            )}

            <div className="origin-bottom">
              <BrandMark beat={!reduceMotion} beatDuration={config.beatDuration} />
            </div>
          </div>

          {/* wordmark */}
          <div className="flex items-baseline gap-px text-[26px] font-bold tracking-[-0.02em]">
            <Image src="/icons/logo.svg" width={150} height={50} alt="logo" />
          </div>

          {/* progress + caption */}
          <div className="flex flex-col items-center gap-3.5">
            <div
              className="h-[3px] w-[132px] overflow-hidden rounded-full"
              style={{ background: c.track }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${c.red}, ${c.redSoft})` }}
                animate={{ width: `${pct}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
            {config.caption && (
              <span className="text-xs font-medium font-body" style={{ color: c.captionText }}>
                {/* {config.caption} */}
                Loading...
              </span>
            )}
          </div>
        </motion.output>
      )}
    </AnimatePresence>
  );
}

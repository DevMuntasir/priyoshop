'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type ClickToPlayVideoProps = {
  /** Path to local video file, e.g. `/videos/demo.mp4`. */
  videoPath: string;
  /** Optional thumbnail image path. If not provided, video will show first frame. */
  poster?: string;
  title: string;
  className?: string;
};

// Centered play icon with a ring of text rotating around it.
function PlayButton() {
  return (
    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-105">
      {/* Rotating text ring */}
      <svg
        viewBox="0 0 200 200"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 animate-spin animation-duration-[14s] sm:size-48"
        aria-hidden
      >
        <defs>
          <path
            id="play-ring"
            d="M 100,100 m -82,0 a 82,82 0 1,1 164,0 a 82,82 0 1,1 -164,0"
            fill="none"
          />
        </defs>

        <text className="fill-ps-black font-body text-[10px] font-semibold uppercase">
          <textPath href="#play-ring" startOffset="0%" textLength="515">
            Press to watch the full video • Press to watch the full video •
          </textPath>
        </text>
      </svg>

      {/* Static white circle and play icon */}
      <svg
        viewBox="0 0 200 200"
        className="relative size-40 sm:size-48"
        aria-hidden
      >
        <circle cx="100" cy="100" r="65" fill="white" />
        <polygon points="88,72 88,128 130,100" fill="#1a1a1a" />
      </svg>
    </span>
  );
}

// Plays a local video file behind a poster with a play button. Pressing the
// button starts the video; a ring of text rotates around the play icon, and
// the frame grows smoothly from a narrow centered box to full width.
export function ClickToPlayVideo(props: ClickToPlayVideoProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && !entry.isIntersecting && playing && videoRef.current) {
          videoRef.current.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    // eslint-disable-next-line @typescript-eslint/consistent-return
    return () => {
      observer.disconnect();
    };
  }, [playing]);

  return (
    <div ref={containerRef} className={`flex justify-center  ${props.className ?? ''}`}>
      {/* Starts as a narrow centered frame and grows to full width on play. */}
      <div
        onTransitionEnd={() => {
          if (playing) {
            containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }}
        className={`relative  w-full overflow-hidden  transition-[max-width,max-height] duration-700 ease-in-out aspect-video ${playing ? 'max-w-full max-h-screen' : 'max-w-3xl  rounded-ps-xl'}`}
      >
        {playing ? (
          <video
            ref={videoRef}
            src={props.videoPath}
            poster={props.poster}
            aria-label={props.title}
            autoPlay
            className="w-full h-full object-cover"
          >
            <track kind="captions" />
          </video>
        ) : (
          <button
            type="button"
            onClick={() => {
              setPlaying(true);
              setTimeout(() => {
                void videoRef.current?.play();
              }, 0);
            }}
            aria-label={`Play video: ${props.title}`}
            className="group absolute inset-0 size-full cursor-pointer"
          >
            {props.poster && (
              <Image
                src={props.poster}
                alt={props.title}
                fill
                className="absolute inset-0 object-cover"
              />
            )}
            <span className="absolute inset-0 bg-ps-black/40" />
            <PlayButton />
          </button>
        )}
      </div>
    </div>
  );
}

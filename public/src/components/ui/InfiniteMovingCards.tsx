'use client';

import type * as React from 'react';
import { cn } from '@/lib/utils';

const SPEED_DURATION: Record<'fast' | 'normal' | 'slow', string> = {
  fast: '20s',
  normal: '40s',
  slow: '80s',
};

export type InfiniteMovingCardsProps = {
  items: React.ReactNode[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
};

export function InfiniteMovingCards(props: InfiniteMovingCardsProps) {
  const {
    items,
    direction = 'left',
    speed = 'slow',
    pauseOnHover = true,
    className = '',
  } = props;

  // ডিরেকশন পরিবর্তনের মূল লজিক (X-axis transform)
  const startX = direction === 'left' ? '0px' : 'calc(-50% - 0.5rem)';
  const endX = direction === 'left' ? 'calc(-50% - 0.5rem)' : '0px';

  const style: React.CSSProperties & Record<`--${string}`, string> = {
    '--animation-duration': SPEED_DURATION[speed],
    '--animation-start-x': startX,
    '--animation-direction-x': endX,
  };

  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden',
        '[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <ul
        className={cn(
          'flex w-max min-w-full gap-3 shrink-0 flex-nowrap  animate-scroll',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
        )}
        style={style}
      >
        {[...items, ...items].map((item, index) => (
          <li key={index} className="shrink-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

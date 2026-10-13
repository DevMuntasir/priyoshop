'use client';

import { useReducedMotion } from 'motion/react';
import { useRef, useState } from 'react';
import type * as React from 'react';
import { TimelineRoad } from './TimelineRoad';

export type TimelineItem = {
  year: string;
  title: string;
  icon: React.ReactNode;
};

export function SnakeTimeline(props: { items: TimelineItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedIndex, setRevealedIndex] = useState(-1);
  const reducedMotion = useReducedMotion();

  return (
    <div ref={trackRef} className="relative mt-10 sm:mt-12 lg:mx-10">
      <TimelineRoad
        trackRef={trackRef}
        onActiveChange={setActiveIndex}
        onMilestoneReached={setRevealedIndex}
      />
      <ol className="relative m-0 grid list-none gap-y-7 p-0 lg:grid-cols-3 lg:gap-y-12">
        {props.items.map((item, index) => {
          const row = Math.floor(index / 3);
          const reverse = row % 2 === 1;
          const active = index === activeIndex;
          const revealed = reducedMotion || index <= revealedIndex;
          const column = reverse ? 3 - (index % 3) : (index % 3) + 1;
          const placement: React.CSSProperties & {
            '--timeline-column': number;
            '--timeline-row': number;
          } = {
            '--timeline-column': column,
            '--timeline-row': row + 1,
          };

          return (
            <li
              key={`${item.year}-${index}`}
              style={placement}
              aria-current={active ? 'step' : undefined}
              className="relative min-w-0 pl-17 sm:pl-22 lg:col-start-(--timeline-column) lg:row-start-(--timeline-row) lg:px-4 lg:pt-24"
            >
              <div
                data-timeline-stop
                aria-hidden="true"
                className={`absolute top-2 left-0 z-10 flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 sm:top-0 sm:size-14 lg:left-1/2 lg:size-16 lg:-translate-x-1/2 transition-shadow duration-300 motion-reduce:transition-none ${active ? 'ring-2 ring-ps-red-500 shadow-lg shadow-ps-red-500/15' : 'ring-black/10'}`}
              >
                <span className="flex items-center justify-center [&>img]:size-6 sm:[&>img]:size-8 [&>svg]:size-6 sm:[&>svg]:size-8">
                  {item.icon || <span className="size-2 rounded-full bg-ps-red-500" />}
                </span>
              </div>
              <article
                aria-hidden={!revealed}
                className={`relative h-full rounded-2xl border p-5 sm:p-6 transition-[opacity,translate,border-color,background-color,box-shadow] duration-500 motion-reduce:transition-none ${revealed ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'} ${active ? 'border-ps-red-500 bg-white shadow-lg shadow-ps-red-500/10 ring-1 ring-ps-red-500/20' : 'border-white/80 bg-white/70'}`}
              >
                <h3 className="m-0 font-display text-xl leading-snug font-bold text-pretty [overflow-wrap:anywhere] text-ps-black sm:text-2xl">
                  {item.year}
                </h3>
                {item.title && (
                  <p className="mt-3 mb-0 font-body text-sm leading-relaxed text-pretty [overflow-wrap:anywhere] text-ps-black-400 sm:text-base">
                    {item.title}
                  </p>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

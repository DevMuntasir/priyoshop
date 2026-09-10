'use client';

import Image from 'next/image';
import { useState } from 'react';

export type InspiringStory = {
  id: string;
  image: string;
  name: string;
  description: string;
};

/** Renders story cards that smoothly share the available horizontal space. */
export function InspiringStories(props: { stories: InspiringStory[] }) {
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const paginationStoryId = activeStoryId ?? props.stories[0]?.id;

  return (
    <div className="w-full max-w-5xl">
      <div
        className="flex flex-col gap-3 md:h-72 md:flex-row"
        onMouseLeave={() => setActiveStoryId(null)}
      >
        {props.stories.map((story) => {
          const isActive = activeStoryId === story.id;

          return (
            <article
              key={story.id}
              tabIndex={0}
              onMouseEnter={() => setActiveStoryId(story.id)}
              onFocus={() => setActiveStoryId(story.id)}
              onBlur={() => setActiveStoryId(null)}
              className={`group relative min-h-72 overflow-hidden rounded-2xl bg-ps-black outline-none transition-[flex-grow,box-shadow] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:ring-2 focus-visible:ring-ps-black focus-visible:ring-offset-4 motion-reduce:transition-none md:min-h-0 ${isActive ? 'md:flex-[2.75]' : 'md:flex-1'}`}
            >
              <Image
                src={story.image}
                alt={story.name}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className={`object-cover transition-[transform,filter] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${isActive ? 'scale-105' : 'scale-100'}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/5" />

              <div className="absolute inset-x-0 bottom-0 z-10 p-5 text-white sm:p-6">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 36 28"
                  className={`mb-3 h-7 w-9 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${isActive ? 'delay-200 md:translate-y-0 md:opacity-100' : 'delay-0 md:translate-y-4 md:opacity-0'}`}
                >
                  <path
                    fill="currentColor"
                    d="M0 17.7C0 8.8 4.4 3 13.1 0l2.1 4.2c-4.6 1.7-7.2 4.5-7.7 8.4h6.1V28H0V17.7Zm20.8 0C20.8 8.8 25.2 3 33.9 0l2.1 4.2c-4.6 1.7-7.2 4.5-7.7 8.4h6.1V28H20.8V17.7Z"
                  />
                </svg>

                <h3 className="font-display text-xl font-semibold leading-tight">{story.name}</h3>
                <p
                  className={`mt-2 overflow-hidden font-body text-sm leading-5 text-white/90 transition-[max-height,margin,opacity,transform] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:mt-0 ${isActive ? 'delay-300 md:mt-2 md:max-h-32 md:translate-y-0 md:opacity-100' : 'delay-0 md:max-h-0 md:translate-y-4 md:opacity-0'}`}
                >
                  {story.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div aria-hidden="true" className="mt-8 flex items-center justify-center gap-2">
        {props.stories.map((story) => (
          <span
            key={story.id}
            className={`h-1 rounded-full transition-[width,background-color] duration-300 ${paginationStoryId === story.id ? 'w-8 bg-ps-black' : 'w-2 bg-ps-grey-300'}`}
          />
        ))}
      </div>
    </div>
  );
}

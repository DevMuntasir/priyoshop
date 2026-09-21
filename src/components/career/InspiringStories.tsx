'use client';

import type { AccordionGalleryItem } from '@/components/ui/AccordionGallery';
import { useState } from 'react';
import { AccordionGallery } from '@/components/ui/AccordionGallery';

export type InspiringStory = {
  id: string;
  image: string;
  name: string;
  description: string;
};

/**
 * Renders employee story cards using the 3D AccordionGallery component with GSAP animations.
 * @param props - Story list props.
 * @returns Inspiring stories gallery.
 */
export function InspiringStories(props: { stories: InspiringStory[] }) {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const items: AccordionGalleryItem[] = props.stories.map((story) => ({
    id: story.id,
    image: story.image,
    label: story.name,
    description: story.description,
    alt: story.name,
  }));

  const activeStory = props.stories[activeStoryIndex] ?? props.stories[0];

  return (
    <div className="w-full max-w-5xl">
      <AccordionGallery
        items={items}
        defaultIndex={0}
        activeIndex={activeStoryIndex}
        onActiveChange={setActiveStoryIndex}
        height={380}
        gap={14}
        radius={20}
        expandRatio={0.58}
        trigger="hover"
        tilt={7}
        parallax={0.6}
        accentColor="#f95c19"
        overlayColor="#0a0713"
        textColor="#ffffff"
        grayscale
        showQuoteIcon
      />

      <div aria-hidden="true" className="mt-8 flex items-center justify-center gap-2">
        {props.stories.map((story, index) => (
          <button
            key={story.id}
            type="button"
            onClick={() => {
              setActiveStoryIndex(index);
            }}
            aria-label={story.name}
            className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
              activeStory?.id === story.id ? 'w-8 bg-ps-black' : 'w-2 bg-ps-grey-300 hover:bg-ps-grey-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import { useRef, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

// --- Icon primitives ---

function IconSun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function IconWarehouse() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-5" aria-hidden="true">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const CARD_ICONS = [<IconSun key="sun" />, <IconWarehouse key="wh" />, <IconBolt key="bolt" />];

// Default bullet labels when item doesn't supply sub-items
const DEFAULT_BULLETS = [
  'Sunlight-Friendly Hub Design',
  'Smarter Warehouse Operations',
  'Energy-Efficient Workflow',
];

/** Single hub card in the horizontal slider. */
function HubCard(props: { item: SectionItem; index: number }) {
  const { item } = props;
  const bullets = DEFAULT_BULLETS;

  return (
    <article style={{
      background: `url(${item.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',

    }} className="relative flex min-w-[calc(100vw-2rem)] snap-center flex-col overflow-hidden rounded-2xl border border-ps-black-100/30 shadow-sm sm:min-w-[600px] lg:min-w-[700px]">
      <div className=' bg-gradient-to-r from-white via-white to-transparent h-full'>
        <div className="flex max-w-[400px] h-full flex-col lg:flex-row lg:items-stretch">
          {/* Text column */}
          <div className="flex flex-1 flex-col gap-4 p-5 sm:p-8">
            <h3 className="m-0 font-display text-ps-h5 font-bold text-[#1B8A3E]">
              {item.imageAlt ?? item.title ?? `Hub ${props.index + 1}`}
            </h3>

            <p className="m-0 font-body text-ps-sm leading-relaxed text-ps-black-400 lg:text-ps-body">
              {item.body}
            </p>

            {/* Icon bullet list */}
            <ul className="mt-auto flex flex-col gap-3 pt-4">
              {bullets.map((label, i) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-[#1B8A3E]/20 bg-[#F0FBF4] text-[#1B8A3E]">
                    {CARD_ICONS[i % CARD_ICONS.length]}
                  </span>
                  <span className="font-body text-ps-sm font-medium leading-snug text-ps-black">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hub image */}

        </div>
      </div>

    </article>
  );
}

/**
 * Green Hub section — SectionHeading at top, then a horizontally scrollable
 * card slider showing each hub's story with icon bullets and a hub image.
 */
export function ImpactGreenHub(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;

  function scrollTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track || total === 0) return;
    const first = track.children[0] as HTMLElement | null;
    if (!first) return;
    const cardWidth = first.offsetWidth + 16; // 16px gap
    const idx = Math.round(track.scrollLeft / cardWidth);
    setActiveIndex(Math.min(Math.max(idx, 0), total - 1));
  }

  return (
    <section className={`overflow-hidden py-16 lg:py-24 ${resolved.wrapperClass}`.trim()}>
      {/* Section heading */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={heading.eyebrow ?? 'Hub Network'}
          title={heading.title}
          description={heading.description}
          align={resolved.align === 'center' ? 'center' : 'left'}
          titleSize="h2"
        />
      </div>

      {/* Horizontal snap slider */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="container mx-auto mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth px-4 pb-2 sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <HubCard key={item.title ?? index} item={item} index={index} />
        ))}
      </div>

      {/* Dot pagination */}
      {total > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex
                ? 'w-8 bg-ps-black'
                : 'w-3 bg-ps-black-200 hover:bg-ps-black-400'
                }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

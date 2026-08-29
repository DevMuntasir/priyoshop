'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import GridBackground from '@/components/ui/grid-background';
import { RotatingWords } from '@/components/ui/RotatingWords';
import type { ResolvedSection, SectionHeadingContent, SectionItem } from '@/libs/cms/Sections';
import { Stats } from '../stats/Stats';

const AUTOPLAY_MS = 6000;

const DEFAULT_TITLE_SIZE = 'text-[42px] sm:text-[58px] md:text-[60px] lg:text-[70px]';

// Resolves text color / size / alignment overrides into classes + inline style,
// shared by the designed default slide and admin-authored slides.
function resolveTextStyle(opts: {
  textColor?: string;
  textSize?: string;
  slideAlign?: 'left' | 'center';
  hasImage?: boolean;
}) {
  const isHex = Boolean(opts.textColor && opts.textColor.startsWith('#'));
  const colorStyle = isHex ? { color: opts.textColor } : undefined;

  let colorClass: string;
  if (opts.textColor && !isHex) {
    colorClass = opts.textColor;
  } else if (opts.hasImage) {
    colorClass = 'text-white';
  } else {
    colorClass = 'text-ps-ink-700';
  }

  const sizeClass = opts.textSize ?? DEFAULT_TITLE_SIZE;
  const alignClass =
    opts.slideAlign === 'center'
      ? 'items-center text-center'
      : 'items-center text-center md:items-start md:text-left';
  return { colorStyle, colorClass, sizeClass, alignClass };
}

// Section-level CTAs, shared across every slide (sourced from the heading).
function HeroCtas(props: { heading: SectionHeadingContent }) {
  const { heading } = props;
  if (!heading.ctaLabel && !heading.ctaSecondaryLabel) {
    return null;
  }
  return (
    <div className="z-10 mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap md:mt-14.5">
      {heading.ctaLabel ? (
        <Button
          size="lg"
          tone="dark"
          href={heading.ctaHref}
          className="w-full sm:w-fit"
          iconRight={
            // oxlint-disable-next-line next/no-img-element -- decorative inline icon; next/image is unnecessary for a static SVG glyph
            <img src="/icons/arrow.svg" alt="" />
          }
        >
          {heading.ctaLabel}
        </Button>
      ) : null}
      {heading.ctaSecondaryLabel ? (
        <Button
          iconRight={
            // oxlint-disable-next-line next/no-img-element -- decorative inline icon; next/image is unnecessary for a static SVG glyph
            <img src="/icons/play.svg" alt="" />
          }
          size="lg"
          variant="outlined"
          tone="dark"
          href={heading.ctaSecondaryHref}
          className="w-full sm:w-fit"
        >
          {heading.ctaSecondaryLabel}
        </Button>
      ) : null}
    </div>
  );
}

// Slide 1 — the original, already-designed hero: grid background, rotating words
// and the stats card. Markup kept identical to the pre-carousel version.
function DefaultSlide(props: { heading: SectionHeadingContent }) {
  const { heading } = props;
  const { colorStyle, colorClass, sizeClass, alignClass } = resolveTextStyle({
    textColor: heading.textColor,
    textSize: heading.textSize,
    slideAlign: heading.slideAlign,
  });
  return (
    <>
      <div className="absolute top-0 z-0 h-full w-full">
        <GridBackground>
          <div className={`flex flex-col gap-7 ${alignClass}`}>
            <h1
              className={`m-0 whitespace-pre-line font-display leading-[1.4] font-extrabold tracking-normal md:leading-[1.3] lg:leading-[1.4] ${sizeClass} ${colorClass}`}
              style={colorStyle}
            >
              {heading.title}{' '}
              {heading.rotatingWords && heading.rotatingWords.length > 0 ? (
                <RotatingWords
                  words={heading.rotatingWords}
                  className="bg-linear-to-r from-ps-red-500 to-ps-gold-500 bg-clip-text text-transparent"
                />
              ) : null}
            </h1>

            <p
              className={`mt-3 w-full font-body text-ps-sm leading-[1.55] font-semibold sm:text-ps-body lg:max-w-2xl ${colorClass}`}
              style={colorStyle}
            >
              {heading.description}
            </p>

            <HeroCtas heading={heading} />
          </div>
        </GridBackground>
      </div>
      <Stats />
    </>
  );
}

// An admin-authored slide: its own background image, text color, size and
// alignment. Falls back to the hero gradient when no image is set.
function CustomSlide(props: { slide: SectionItem; heading: SectionHeadingContent }) {
  const { slide, heading } = props;
  const hasImage = Boolean(slide.slideBackgroundImage);
  const { colorStyle, colorClass, sizeClass, alignClass } = resolveTextStyle({
    textColor: slide.textColor,
    textSize: slide.textSize,
    slideAlign: slide.slideAlign,
    hasImage,
  });

  return (
    <>
      {hasImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.slideBackgroundImage})` }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-hero-gradient" />
      )}

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-0">
          <div className={`flex flex-col gap-7 ${alignClass}`}>
            <h1
              className={`m-0 whitespace-pre-line font-display leading-[1.4] font-extrabold tracking-normal ${sizeClass} ${colorClass}`}
              style={colorStyle}
            >
              {slide.title}
            </h1>

            {slide.description ? (
              <p
                className={`mt-3 w-full font-body text-ps-sm leading-[1.55] font-semibold sm:text-ps-body lg:max-w-2xl ${colorClass}`}
                style={colorStyle}
              >
                {slide.description}
              </p>
            ) : null}

            <HeroCtas heading={heading} />
          </div>
        </div>
      </div>
    </>
  );
}

export function HeroOne(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;
  // Admin slides = items that carry slide content (title or a background image).
  const adminSlides = items.filter((item) => item.title ?? item.slideBackgroundImage);
  // Slide 0 is always the designed default; admin slides follow it.
  const total = adminSlides.length + 1;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (total <= 1) {
      return;
    }
    const timer = setInterval(() => {
      setCurrent((value) => (value + 1) % total);
    }, AUTOPLAY_MS);

    // eslint-disable-next-line @typescript-eslint/consistent-return
    return () => {
      clearInterval(timer);
    };
  }, [total]);

  // No admin slides → render the designed hero exactly as before, no carousel chrome.
  if (total <= 1) {
    return (
      <section className="relative mb-50 md:mb-0 flex min-h-[110vh]">
        <DefaultSlide heading={heading} />
      </section>
    );
  }

  return (
    <section className="relative mb-50 md:mb-0 min-h-[110vh]">
      {/* Slide 0: designed default */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${current === 0 ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <DefaultSlide heading={heading} />
      </div>

      {/* Admin slides */}
      {adminSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${current === index + 1 ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <CustomSlide slide={slide} heading={heading} />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-52 left-1/2 z-50 flex -translate-x-1/2 gap-3 md:bottom-28">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setCurrent(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${current === index ? 'w-8 bg-ps-red-500' : 'w-2 bg-ps-ink-700/30 hover:bg-ps-ink-700/50'}`}
          />
        ))}
      </div>
    </section>
  );
}

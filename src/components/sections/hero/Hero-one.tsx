'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { Stats } from '../stats/Stats';

const AUTOPLAY_MS = 6000;
const DEFAULT_TITLE_SIZE = 'text-[clamp(2.25rem,10vw,4.375rem)]';
const CONTENT_MAX_WIDTH: Record<string, string> = {
  'max-w-xl': '36rem',
  'max-w-2xl': '42rem',
  'max-w-3xl': '48rem',
  'max-w-4xl': '56rem',
  'max-w-full': '100%',
};

const resolveBackground = (value?: string) => {
  const background = value ?? '';
  const isCssColor = /^(#|rgb\(|hsl\(|oklch\(|var\()/u.test(background);
  return {
    className: isCssColor ? '' : background,
    style: isCssColor ? { backgroundColor: background } : undefined,
  };
};

function HeroCtas(props: { slide: SectionItem; defaultTone: 'light' | 'dark'; active: boolean }) {
  if (!props.slide.ctaLabel && !props.slide.ctaSecondaryLabel) {
    return null;
  }

  const tone =
    props.slide.ctaTone && props.slide.ctaTone !== 'auto'
      ? props.slide.ctaTone
      : props.defaultTone;
  return (
    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap md:mt-9">
      {props.slide.ctaLabel ? (
        <Button
          size="lg"
          tone={tone}
          href={props.slide.href}
          tabIndex={props.active ? undefined : -1}
          className="w-full sm:w-fit"
          iconRight={
            // oxlint-disable-next-line next/no-img-element -- decorative inline icon; next/image is unnecessary for a static SVG glyph
            <img src="/icons/arrow.svg" alt="" />
          }
        >
          {props.slide.ctaLabel}
        </Button>
      ) : null}
      {props.slide.ctaSecondaryLabel ? (
        <Button
          iconRight={
            // oxlint-disable-next-line next/no-img-element -- decorative inline icon; next/image is unnecessary for a static SVG glyph
            <img src="/icons/play.svg" alt="" />
          }
          size="lg"
          variant="outlined"
          tone={tone}
          href={props.slide.ctaSecondaryHref}
          tabIndex={props.active ? undefined : -1}
          className="w-full sm:w-fit"
        >
          {props.slide.ctaSecondaryLabel}
        </Button>
      ) : null}
    </div>
  );
}

function HeroSlide(props: { slide: SectionItem; active: boolean }) {
  const hasImage = Boolean(props.slide.slideBackgroundImage);
  const background = resolveBackground(props.slide.slideBackgroundColor);
  const align = props.slide.slideAlign ?? 'left';
  const titleColor = props.slide.textColor ?? (hasImage ? 'text-white' : 'text-ps-ink-700');
  const descriptionColor = props.slide.descriptionColor ?? titleColor;
  const contentWidth = props.slide.contentWidth ?? 'max-w-3xl';
  const accentColor =
    props.slide.accentGradientFrom && props.slide.accentGradientTo
      ? `linear-gradient(90deg, ${props.slide.accentGradientFrom}, ${props.slide.accentGradientTo})`
      : props.slide.accentColor;

  return (
    <>
      <div className={`absolute inset-0 ${background.className}`} style={background.style} />
      {hasImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${props.slide.slideBackgroundImage})` }}
          />
          {/* <div className="absolute inset-0 bg-linear-to-r from-black/60 to-black/10" /> */}
        </>
      ) : null}

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as={props.active ? 'h1' : 'h2'}
            title={props.slide.title ?? ''}
            description={props.slide.description}
            accentWords={props.slide.accentWords}
            appendAccentWords
            accentColor={accentColor}
            align={align}
            titleSize="custom"
            titleColor={titleColor}
            descriptionColor={descriptionColor}
            titleClassName={`whitespace-pre-line font-extrabold ${props.slide.textSize ?? DEFAULT_TITLE_SIZE}`}
            descriptionClassName={`max-w-full! ${props.slide.descriptionSize ?? 'text-ps-body'}`}
            className={`w-full gap-7 ${align === 'center' ? 'mx-auto' : ''}`}
            style={{ maxWidth: CONTENT_MAX_WIDTH[contentWidth] ?? CONTENT_MAX_WIDTH['max-w-3xl'] }}
            action={
              <HeroCtas
                slide={props.slide}
                defaultTone={hasImage ? 'light' : 'dark'}
                active={props.active}
              />
            }
          />
        </div>
      </div>
    </>
  );
}

export function HeroOne(props: { data: ResolvedSection }) {
  const t = useTranslations('HeroOnePage');
  const slides = props.data.items;
  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const activeIndex = total > 0 ? current % total : 0;

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

  if (total === 0) {
    return null;
  }

  return (
    <section className="relative mb-48 min-h-[100svh] sm:mb-24 lg:mb-0 lg:min-h-[100dvh]">
      {slides.map((slide, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: slides are stored and ordered positionally
        <div
          key={index}
          aria-hidden={activeIndex !== index}
          className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === index ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <HeroSlide slide={slide} active={activeIndex === index} />
        </div>
      ))}

      {total > 1 ? (
        <div className="absolute bottom-52 left-1/2 z-50 flex -translate-x-1/2 gap-1 sm:bottom-28 sm:gap-2">
          {slides.map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: slide controls follow positional slides
            <button
              key={index}
              type="button"
              onClick={() => {
                setCurrent(index);
              }}
              aria-label={t('slide_label', { number: index + 1 })}
              className={`relative min-h-11 min-w-11 rounded-full border-none bg-transparent after:absolute after:top-1/2 after:left-1/2 after:h-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:transition-all ${activeIndex === index ? 'after:w-8 after:bg-ps-red-500' : 'after:w-2 after:bg-ps-ink-700/30 hover:after:bg-ps-ink-700/50'}`}
            />
          ))}
        </div>
      ) : null}
      <Stats />
    </section>
  );
}

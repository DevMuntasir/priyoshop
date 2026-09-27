'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ResponsiveHeroBackground } from '@/components/ui/ResponsiveHeroBackground';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VideoModal } from '@/components/ui/VideoModal';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { extractYouTubeId } from '@/utils/Video';

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

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-colors duration-700"
    >
      <path
        d="M14.1482 9.625H0V7.875H14.1482L7.50254 1.22938L8.75 0L17.5 8.75L8.75 17.5L7.50254 16.2706L14.1482 9.625Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-colors duration-700"
    >
      <path
        d="M8.45833 15.7949L15.7949 11.0833L8.45833 6.37175V15.7949ZM11.0854 22.1667C9.55237 22.1667 8.11144 21.8758 6.76258 21.294C5.41372 20.7122 4.24044 19.9227 3.24275 18.9254C2.24506 17.9281 1.45512 16.7553 0.872958 15.407C0.290986 14.0587 0 12.6182 0 11.0854C0 9.55237 0.290889 8.11144 0.872667 6.76258C1.45444 5.41372 2.24399 4.24044 3.24129 3.24275C4.2386 2.24506 5.41139 1.45512 6.75967 0.872958C8.10794 0.290986 9.54849 0 11.0813 0C12.6143 0 14.0552 0.290888 15.4041 0.872666C16.7529 1.45444 17.9262 2.24399 18.9239 3.24129C19.9216 4.2386 20.7115 5.41139 21.2937 6.75967C21.8757 8.10794 22.1667 9.54849 22.1667 11.0813C22.1667 12.6143 21.8758 14.0552 21.294 15.4041C20.7122 16.7529 19.9227 17.9262 18.9254 18.9239C17.9281 19.9216 16.7553 20.7115 15.407 21.2937C14.0587 21.8757 12.6182 22.1667 11.0854 22.1667ZM11.0833 20.4167C13.6889 20.4167 15.8958 19.5125 17.7042 17.7042C19.5125 15.8958 20.4167 13.6889 20.4167 11.0833C20.4167 8.47778 19.5125 6.27083 17.7042 4.4625C15.8958 2.65417 13.6889 1.75 11.0833 1.75C8.47778 1.75 6.27083 2.65417 4.4625 4.4625C2.65417 6.27083 1.75 8.47778 1.75 11.0833C1.75 13.6889 2.65417 15.8958 4.4625 17.7042C6.27083 19.5125 8.47778 20.4167 11.0833 20.4167Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HeroCtas(props: {
  slide: SectionItem;
  defaultTone: 'light' | 'dark';
  active: boolean;
  onOpenVideo?: (videoPath: string, title?: string) => void;
}) {
  if (!props.slide.ctaLabel && !props.slide.ctaSecondaryLabel) {
    return null;
  }

  const tone =
    props.slide.ctaTone && props.slide.ctaTone !== 'auto'
      ? props.slide.ctaTone
      : props.defaultTone;

  const videoPath = props.slide.videoPath?.trim();
  const videoAction = props.slide.videoAction ?? 'secondary';

  const primaryHrefIsVideo = Boolean(
    extractYouTubeId(props.slide.href) || props.slide.href?.endsWith('.mp4'),
  );
  const primaryTriggersModal = Boolean(
    props.onOpenVideo &&
    ((videoPath &&
      (videoAction === 'primary' || videoAction === 'both' || !props.slide.ctaSecondaryLabel)) ||
      primaryHrefIsVideo),
  );
  const primaryVideoSource = videoPath || (primaryHrefIsVideo ? props.slide.href : '');

  const secondaryHrefIsVideo = Boolean(
    extractYouTubeId(props.slide.ctaSecondaryHref) ||
    props.slide.ctaSecondaryHref?.endsWith('.mp4'),
  );
  const secondaryTriggersModal = Boolean(
    props.onOpenVideo &&
    ((videoPath && (videoAction === 'secondary' || videoAction === 'both')) ||
      secondaryHrefIsVideo),
  );
  const secondaryVideoSource =
    videoPath || (secondaryHrefIsVideo ? props.slide.ctaSecondaryHref : '');

  return (
    <div className="mt-5 flex gap-4 sm:flex-wrap md:mt-9">
      {props.slide.ctaLabel ? (
        <Button
          size="lg"
          tone={tone}
          href={primaryTriggersModal ? undefined : props.slide.href}
          onClick={
            primaryTriggersModal && primaryVideoSource
              ? (event) => {
                event.preventDefault();
                props.onOpenVideo?.(primaryVideoSource, props.slide.title);
              }
              : undefined
          }
          tabIndex={props.active ? undefined : -1}
          className="w-full sm:w-fit"
          iconRight={primaryTriggersModal ? <PlayIcon /> : <ArrowIcon />}
        >
          {props.slide.ctaLabel}
        </Button>
      ) : null}
      {props.slide.ctaSecondaryLabel ? (
        <Button
          iconRight={<PlayIcon />}
          size="lg"
          variant="outlined"
          tone={tone}
          href={secondaryTriggersModal ? undefined : props.slide.ctaSecondaryHref}
          onClick={
            secondaryTriggersModal && secondaryVideoSource
              ? (event) => {
                event.preventDefault();
                props.onOpenVideo?.(secondaryVideoSource, props.slide.title);
              }
              : undefined
          }
          tabIndex={props.active ? undefined : -1}
          className="w-full sm:w-fit"
        >
          {props.slide.ctaSecondaryLabel}
        </Button>
      ) : null}
    </div>
  );
}

function HeroSlide(props: {
  slide: SectionItem;
  active: boolean;
  onOpenVideo?: (videoPath: string, title?: string) => void;
}) {
  const hasImage = Boolean(
    props.slide.slideBackgroundImage ||
    props.slide.slideBackgroundImageTablet ||
    props.slide.slideBackgroundImageLaptop ||
    props.slide.slideBackgroundImageDesktop,
  );
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
        <ResponsiveHeroBackground
          mobile={props.slide.slideBackgroundImage}
          tablet={props.slide.slideBackgroundImageTablet}
          laptop={props.slide.slideBackgroundImageLaptop}
          desktop={props.slide.slideBackgroundImageDesktop}
        />
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
            descriptionClassName={`max-w-full! ${props.slide.descriptionSize ?? 'text-ps-h2'}`}
            className={`w-full gap-7 ${align === 'center' ? 'mx-auto' : ''}`}
            style={{ maxWidth: CONTENT_MAX_WIDTH[contentWidth] ?? CONTENT_MAX_WIDTH['max-w-3xl'] }}
            scrollFloat={false}
            action={
              <HeroCtas
                slide={props.slide}
                defaultTone={hasImage ? 'light' : 'dark'}
                active={props.active}
                onOpenVideo={props.onOpenVideo}
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
  const [modalVideo, setModalVideo] = useState<{ videoPath: string; title?: string } | null>(null);
  const activeIndex = total > 0 ? current % total : 0;

  useEffect(() => {
    if (total <= 1 || modalVideo !== null) {
      return;
    }
    const timer = setInterval(() => {
      setCurrent((value) => (value + 1) % total);
    }, AUTOPLAY_MS);

    // eslint-disable-next-line @typescript-eslint/consistent-return
    return () => {
      clearInterval(timer);
    };
  }, [total, modalVideo]);

  if (total === 0) {
    return null;
  }

  return (
    <section className="relative min-h-[100svh] lg:min-h-[100dvh]">
      {slides.map((slide, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: slides are stored and ordered positionally
        <div
          key={index}
          aria-hidden={activeIndex !== index}
          className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === index ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <HeroSlide
            slide={slide}
            active={activeIndex === index}
            onOpenVideo={(videoPath, title) => {
              setModalVideo({ videoPath, title });
            }}
          />
        </div>
      ))}

      {total > 1 ? (
        <div className="absolute bottom-24 left-1/2 z-50 flex -translate-x-1/2 gap-1 sm:bottom-28 sm:gap-2">
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

      <VideoModal
        isOpen={Boolean(modalVideo)}
        onClose={() => setModalVideo(null)}
        videoPath={modalVideo?.videoPath}
        title={modalVideo?.title ?? t('video_player')}
        closeLabel={t('close_video')}
      />
    </section>
  );
}
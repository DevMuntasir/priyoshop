import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { Button } from '@/components/ui/Button';
import { RetailGrowthSteps } from '@/components/ui/RetailGrowthSteps';
import { Reveal } from '@/components/ui/Reveal';
import { ScrollAutoplayVideo } from '@/components/ui/ScrollAutoplayVideo';
import { ScrollExpand } from '@/components/ui/ScrollExpand';
import type { ScrollStep } from '@/components/ui/ScrollSteps';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ResolvedSection } from '@/libs/cms/Sections';

// The "Retail growth" step carousel on the black distribution panel.
export function DistributionSteps(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;
  const steps: ScrollStep[] = items.map((item, i) => ({
    label: String(i + 1).padStart(2, '0'),
    title: item.title ?? '',
    body: item.body ?? '',
    image: item.image ?? '',
    imageAlt: item.imageAlt ?? '',
  }));

  return (
    <div className="relative h-full max-h-full w-full overflow-x-clip rounded-t-ps-xl bg-ps-black py-12 sm:py-16 lg:py-20">
      <RetailGrowthSteps
        heading={
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6">
            <SectionHeading
              eyebrow={heading.eyebrow}
              eyebrowMode="light"
              title={heading.title}
              description={heading.description}
              descriptionFontClass="font-normal"
              titleColor="text-white"
              className="max-w-full !font-normal md:sticky md:top-0 md:max-w-1/2"
              descriptionColor="text-ps-black-100"
              align="left"
            />
            {heading.ctaLabel ? (
              <div className="shrink-0">
                <Button href={heading.ctaHref} variant="filled" tone="light">
                  {heading.ctaLabel}
                </Button>
              </div>
            ) : null}
          </div>
        }
        steps={steps}
      />
    </div>
  );
}

// A heading + autoplay YouTube video, on the same black panel.
export function DistributionVideoA(props: { data: ResolvedSection }) {
  const { heading } = props.data;
  const videoSource =
    heading.videoId?.trim() ||
    heading.videoPath?.trim() ||
    APP_VIDEOS.distribution.showcaseYouTubeId;
  const poster = heading.backgroundImage?.trim() || APP_VIDEOS.distribution.b2bPlatform.poster;

  return (
    <div className="bg-ps-black">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title={heading.title}
            titleColor=" text-ps-white"
            titleSize="h2"
            descriptionColor="text-ps-white font-display !font-normal text-ps-body"
            description={heading.description}
            align="center"
          />
        </Reveal>
        <Reveal direction="scale" delay={0.1}>
          <ScrollAutoplayVideo
            videoId={videoSource}
            poster={poster}
            title={heading.title || 'Video player'}
            className="mx-auto my-10 h-72 max-w-full overflow-hidden rounded-ps-xl sm:my-14 sm:h-96 lg:my-20 lg:h-125"
          />
        </Reveal>
      </div>
    </div>
  );
}

// A heading + scroll-expanding local/cloud video, closing the black panel.
export function DistributionVideoB(props: { data: ResolvedSection }) {
  const { heading } = props.data;
  const videoSource = heading.videoPath?.trim() || APP_VIDEOS.distribution.b2bPlatform.src;
  const poster = heading.backgroundImage?.trim() || APP_VIDEOS.distribution.b2bPlatform.poster;

  return (
    <div className="bg-ps-black pb-12 sm:pb-16 lg:pb-20">
      <div className="container mx-auto px-4 pt-12 pb-6 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title={<AccentedTitle text={heading.title} />}
            gradientWords="B2B Platform"
            titleColor="text-ps-white max-w-4xl"
            titleSize="h2"
            descriptionColor="text-ps-white font-display !font-normal text-ps-body"
            description={heading.description}
            align="center"
          />
        </Reveal>
      </div>

      <ScrollExpand
        src={videoSource}
        mediaType="video"
        poster={poster}
        alt={heading.title || 'PriyoShop B2B Platform'}
        useWindowScroll
        scrollHint="Scroll to expand"
        startWidth={58}
        startHeight={64}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.25}
        scrollDistance={1.2}
        holdDistance={0.3}
        overlayScrim={0.45}
      >
        <div className="max-w-2xl px-4 text-center">
          <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{heading.title}</h3>
          {heading.description ? (
            <p className="mt-3 text-sm text-ps-white/90 sm:text-base lg:text-lg">
              {heading.description}
            </p>
          ) : null}
          {heading.ctaLabel ? (
            <div className="mt-6 flex justify-center">
              <Button href={heading.ctaHref} variant="filled" tone="light">
                {heading.ctaLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </ScrollExpand>
    </div>
  );
}

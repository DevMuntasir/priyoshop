import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { Reveal } from '@/components/ui/Reveal';
import { ScrollExpand } from '@/components/ui/ScrollExpand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function DistributionBrandGrowth(props: { data: ResolvedSection }) {
  const videoSource = props.data.heading.videoPath?.trim() || APP_VIDEOS.distribution.brandGrowth.src;
  const poster = props.data.heading.backgroundImage?.trim() || APP_VIDEOS.distribution.brandGrowth.poster;

  return (
    <section className="relative w-full bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 pb-6 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title={<AccentedTitle text={props.data.heading.title} />}
            description={props.data.heading.description}
            eyebrow={props.data.heading.eyebrow}
            align="center"
          />
        </Reveal>
      </div>

      <ScrollExpand
        src={videoSource}
        mediaType="video"
        poster={poster}
        alt={props.data.heading.title || APP_VIDEOS.distribution.brandGrowth.title}
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
        {/* <div className="max-w-2xl px-4 text-center">
          <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{props.data.heading.title}</h3>
          {props.data.heading.description ? (
            <p className="mt-3 text-sm text-ps-white/90 sm:text-base lg:text-lg">
              {props.data.heading.description}
            </p>
          ) : null}
          {props.data.heading.ctaLabel ? (
            <div className="mt-6 flex justify-center">
              <Button href={props.data.heading.ctaHref} variant="filled" tone="light">
                {props.data.heading.ctaLabel}
              </Button>
            </div>
          ) : null}
        </div> */}
      </ScrollExpand>
    </section>
  );
}

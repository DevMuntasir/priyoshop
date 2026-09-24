import Image from 'next/image';
import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ScrollExpand } from '@/components/ui/ScrollExpand';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function DistributionCoverage(props: { data: ResolvedSection }) {
  const videoSource = props.data.heading.videoPath?.trim() || APP_VIDEOS.distribution.coverage.src;
  const poster = props.data.heading.backgroundImage?.trim() || APP_VIDEOS.distribution.coverage.poster;

  return (
    <section className="relative min-h-[80svh] w-full">
      <div className="container px-4 pt-14 sm:px-6 sm:pt-20 lg:px-8 ">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-center font-display text-ps-h2 font-semibold leading-[1.2]">
            <AccentedTitle text={props.data.heading.title} emClass="text-ps-gold-500" strongClass="text-ps-red-600" />
          </h1>

          <p className="mx-auto mt-5 max-w-4xl text-center font-body text-ps-body font-semibold">
            {props.data.heading.description}
          </p>
        </div>
        {props.data.heading.backgroundImage && (
          <Image
            alt=""
            src={props.data.heading.backgroundImage}
            width={1100}
            height={200}
            className="mt-10 h-auto w-full object-contain"
          />
        )}
      </div>
      <div className="bg-section-gradient">
        <ScrollExpand
          src={videoSource}
          mediaType="video"
          poster={poster}
          alt={props.data.heading.title || APP_VIDEOS.distribution.coverage.title}
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
      </div>
    </section>
  );
}

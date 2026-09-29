
import { ScrollExpand } from '@/components/ui/ScrollExpand';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function CommerceRetail(props: { data: ResolvedSection }) {
  const videoSource = props.data.heading.videoPath?.trim() || APP_VIDEOS.commerce.retail.src;
  const poster = props.data.heading.backgroundImage?.trim() || APP_VIDEOS.commerce.retail.poster;

  return (
    <section className="bg-section-gradient ">
      <ScrollExpand
        src={videoSource}
        mediaType="video"
        poster={poster}
        alt={props.data.heading.title || APP_VIDEOS.commerce.retail.title}
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

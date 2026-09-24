import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ScrollExpand } from '@/components/ui/ScrollExpand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function DiptyIntro(props: { data: ResolvedSection }) {
  const videoSource = props.data.heading.videoPath?.trim() || APP_VIDEOS.dipty.intro.src;
  const poster = props.data.heading.backgroundImage?.trim() || APP_VIDEOS.dipty.intro.poster;

  return (
    <section className="relative w-full">
      <div className="min-h-[45svh] bg-[url(/dipty/about.png)] bg-cover bg-center bg-no-repeat lg:min-h-[90dvh]">
        <div className="min-h-[45svh] bg-gradient-to-r from-white via-white to-white/50 md:from-transparent md:via-transparent md:to-transparent lg:min-h-[90dvh]">
          <div className="container flex min-h-[45svh] flex-col justify-center px-4 py-24 sm:px-6 lg:min-h-[90dvh] lg:px-8">
            <div className="w-full max-w-2xl lg:max-w-1/3">
              <SectionHeading
                eyebrow={props.data.heading.eyebrow}
                align="left"
                title={
                  <AccentedTitle
                    text={props.data.heading.title}
                    emClass="text-green-500"
                    gradientClass="text-green-500"
                  />
                }
                description={props.data.heading.description}
              />
            </div>
            {/* {props.data.heading.backgroundImage && (
              <Image
                alt=""
                src={props.data.heading.backgroundImage}
                width={1100}
                height={200}
                className="mt-10 h-auto w-full object-contain"
              />
            )} */}
          </div>
        </div>
      </div>
      <div className="w-full bg-section-gradient">
        <ScrollExpand
          src={videoSource}
          mediaType="video"
          poster={poster}
          alt={props.data.heading.title || APP_VIDEOS.dipty.intro.title}
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

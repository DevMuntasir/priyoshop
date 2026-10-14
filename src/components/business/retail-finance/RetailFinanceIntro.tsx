import Image from 'next/image';
import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ScrollExpand } from '@/components/ui/ScrollExpand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function RetailFinanceIntro(props: { data: ResolvedSection }) {
  const videoSource = props.data.heading.videoPath?.trim() || APP_VIDEOS.retailFinance.intro.src;
  const poster = props.data.heading.backgroundImage?.trim() || APP_VIDEOS.retailFinance.intro.poster;

  return (
    <section className="relative w-full space-y-14 py-14 sm:space-y-20 sm:py-20 lg:space-y-28 lg:py-32">
      <div className="container flex flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-14 lg:px-8">
        <SectionHeading
          title={
            <AccentedTitle
              text={props.data.heading.title}
              emClass="gradient-text inline-block"
            />
          }
          description={props.data.heading.description}
          eyebrow={props.data.heading.eyebrow}
          align="left"
        />
      </div>

      <div className="w-full ">
        {props.data.heading.backgroundImage && (
          <Image
            src={props.data.heading.backgroundImage}
            width={400}
            height={400}
            className="mx-auto h-auto w-full max-w-md object-contain"
            alt=""
          />
        )}
      </div>
      {/* <div className="w-full">
        <ScrollExpand
          src={videoSource}
          mediaType="video"
          poster={poster}
          alt={props.data.heading.title || APP_VIDEOS.retailFinance.intro.title}
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

        </ScrollExpand>
      </div> */}
    </section>
  );
}

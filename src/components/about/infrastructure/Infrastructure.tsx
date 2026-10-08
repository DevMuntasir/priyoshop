import { Reveal } from '@/components/ui/Reveal';
import { ScrollExpand } from '@/components/ui/ScrollExpand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { APP_VIDEOS } from '@/constants/Videos';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function Infrastructure(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);

  return (
    <section
      className={`${resolved.wrapperClass} min-h-[80svh] rounded-t-ps-xl bg-ps-black pt-14 sm:rounded-t-ps-hero sm:pt-20 lg:pt-24`}
    >
      <div className="container mx-auto px-4 pb-6 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow={props.data.heading.eyebrow}
            title={props.data.heading.title}
            titleSize="h2"
            titleColor="text-ps-white font-extrabold font-desktop"
            description={props.data.heading.description}
            eyebrowMode="light"
            descriptionColor="text-ps-white-600"
            align="center"
          />
        </Reveal>
      </div>

      <ScrollExpand
        src={props.data.heading.videoPath || APP_VIDEOS.about.infrastructure.src}
        mediaType="video"
        poster={props.data.heading.backgroundImage || APP_VIDEOS.about.infrastructure.poster}
        alt={props.data.heading.title}
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
      />
    </section>
  );
}

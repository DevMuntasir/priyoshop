import { Reveal } from '@/components/ui/Reveal';
import { ScrollExpand } from '@/components/ui/ScrollExpand';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { APP_VIDEOS } from '@/constants/Videos';

export function Infrastructure() {
  return (
    <section className="min-h-[80svh] rounded-t-ps-xl bg-ps-black pt-14 pb-12 sm:rounded-t-ps-hero sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
      <div className="container mx-auto px-4 pb-6 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Business Model"
            title="PriyoShop Infrastructure"
            titleSize="h2"
            titleColor="text-ps-white font-extrabold font-desktop"
            description="Platform and Technology-Based"
            eyebrowMode="light"
            descriptionColor="text-ps-white-600"
            align="center"
          />
        </Reveal>
      </div>

      <ScrollExpand
        src={APP_VIDEOS.about.infrastructure.src}
        mediaType="video"
        poster={APP_VIDEOS.about.infrastructure.poster}
        alt="PriyoShop Infrastructure Video"
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
          <h3 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            {APP_VIDEOS.about.infrastructure.title}
          </h3>
          <p className="mt-3 text-sm text-ps-white/90 sm:text-base lg:text-lg">
            Platform and Technology-Based
          </p>
        </div> */}
      </ScrollExpand>
    </section>
  );
}

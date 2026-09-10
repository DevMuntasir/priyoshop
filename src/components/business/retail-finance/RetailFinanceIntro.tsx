import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import Image from 'next/image';

export function RetailFinanceIntro(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <section className="relative w-full space-y-14 py-14 sm:space-y-20 sm:py-20 lg:space-y-28 lg:py-25">
      <div className="container flex flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-14 lg:px-8">
        <SectionHeading
          title={
            <AccentedTitle
              text={heading.title}
              emClass="gradient-text inline-block"
            />
          }
          description={heading.description}
          eyebrow={heading.eyebrow}
          align='left'
        />
        <div className="w-full lg:w-1/2">
          {heading.backgroundImage && <Image src={heading.backgroundImage} width={400} height={400} className="mx-auto h-auto w-full max-w-md object-contain" alt="" />}
        </div>
      </div>

      <div className="container mx-auto rounded-ps-xl bg-ps-cream px-4 sm:px-6 lg:px-10">
        <ClickToPlayVideo videoPath={heading.videoPath ?? '/video/1.mp4'} title={heading.title} />
      </div>
    </section>
  );
}

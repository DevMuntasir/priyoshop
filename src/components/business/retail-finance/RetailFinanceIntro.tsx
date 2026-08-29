import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import Image from 'next/image';

export function RetailFinanceIntro(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <section className="relative w-full py-25 space-y-28 ">
      <div className=" flex container gap-14">
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
        <div className='w-1/2'>
          {heading.backgroundImage && <Image src={heading.backgroundImage} width={400} height={400} className='w-full' alt='img' />}
        </div>
      </div>

      <div className="container mx-auto rounded-ps-xl bg-ps-cream px-4 sm:px-10">
        <ClickToPlayVideo videoPath={heading.videoPath ?? '/video/1.mp4'} title={heading.title} />
      </div>
    </section>
  );
}

import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import Image from 'next/image';

export function DiptyIntro(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <section className="relative w-full  ">
      <div className="min-h-[75svh] bg-[url(/dipty/about.png)] bg-cover bg-center bg-no-repeat lg:min-h-[90dvh]">

        <div className="container flex min-h-[75svh] flex-col justify-center px-4 py-24 sm:px-6 lg:min-h-[90dvh] lg:px-8">
          <div className="w-full max-w-2xl lg:max-w-1/3">

            <SectionHeading
              eyebrow={heading.eyebrow}
              align='left'
              title={<AccentedTitle
                text={heading.title}
                emClass="text-green-500"
                gradientClass=' text-green-500'
              />}
              description={heading.description}
            />
          </div>
          {heading.backgroundImage && <Image alt="" src={heading.backgroundImage} width={1100} height={200} className="mt-10 h-auto w-full object-contain" />}

        </div>
      </div>
      <div className="w-full bg-gradient-to-t from-[#E9F5E9] to-[#F7FAF7] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        <div className="mx-auto max-w-[1100px] rounded-ps-md bg-gradient-to-b from-transparent to-white p-3 sm:p-6 lg:p-8">
          <ClickToPlayVideo videoPath={heading.videoPath ?? '/video/1.mp4'} title={heading.title} />
        </div>
      </div>
    </section>
  );
}

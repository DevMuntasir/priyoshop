import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import type { ResolvedSection } from '@/libs/cms/Sections';
import Image from 'next/image';

export function DistributionCoverage(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <section className="relative min-h-[80svh] w-full">
      <div className="container px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-25">
        <div className="max-w-4xl mx-auto ">

          <h1 className="text-ps-h2 leading-[1.2] font-display  text-center font-semibold">
            <AccentedTitle text={heading.title} emClass="text-ps-gold-500" strongClass="text-ps-red-600" />
          </h1>

          <p className="text-ps-body  mt-5 max-w-4xl font-body font-semibold text-center ">
            {heading.description}
          </p>
        </div>
        {heading.backgroundImage && <Image alt="" src={heading.backgroundImage} width={1100} height={200} className="mt-10 h-auto w-full object-contain" />}

      </div>
      <div className="bg-section-gradient px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-25">
        <ClickToPlayVideo className="mx-auto w-full max-w-[1100px] rounded-ps-md bg-gradient-to-b from-transparent to-white p-3 sm:p-6 lg:p-8" videoPath={heading.videoPath ?? '/video/1.mp4'} title={heading.title} />


      </div>
    </section>
  );
}

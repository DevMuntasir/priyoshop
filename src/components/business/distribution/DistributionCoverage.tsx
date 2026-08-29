import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import type { ResolvedSection } from '@/libs/cms/Sections';
import Image from 'next/image';

export function DistributionCoverage(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <section className="relative w-full min-h-screen ">
      <div className="container py-25">
        <div className="max-w-4xl mx-auto ">

          <h1 className="text-ps-h2 leading-[1.2] font-display  text-center font-semibold">
            <AccentedTitle text={heading.title} emClass="text-ps-gold-500" strongClass="text-ps-red-600" />
          </h1>

          <p className="text-ps-body  mt-5 max-w-4xl font-body font-semibold text-center ">
            {heading.description}
          </p>
        </div>
        {heading.backgroundImage && <Image alt='img' src={heading.backgroundImage} width={1100} height={200} className='w-full mt-10 h-full' />}

      </div>
      <div className='bg-section-gradient py-25'>
        <ClickToPlayVideo className='p-8 bg-gradient-to-b from-transparent to-white max-w-[1100px] mx-auto  rounded-ps-md w-auto' videoPath={heading.videoPath ?? '/video/1.mp4'} title={heading.title} />


      </div>
    </section>
  );
}

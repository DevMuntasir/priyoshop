import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import Image from 'next/image';

export function DiptyIntro(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <section className="relative w-full  ">
      <div className='bg-[url(/dipty/about.png)] bg-center bg-cover bg-no-repeat h-[90vh]'>

        <div className="container py-25 h-screen content-center  ">
          <div className="max-w-1/3   ">

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
          {heading.backgroundImage && <Image alt='img' src={heading.backgroundImage} width={1100} height={200} className='w-full mt-10 h-full' />}

        </div>
      </div>
      <div className=' w-full bg-gradient-to-t to-[#F7FAF7] from-[#E9F5E9] py-20'>

        <div className='max-w-[1100px] mx-auto p-8 rounded-ps-md bg-gradient-to-b to-white from-transparent'>
          <ClickToPlayVideo videoPath={heading.videoPath ?? '/video/1.mp4'} title={heading.title} />
        </div>
      </div>
    </section>
  );
}

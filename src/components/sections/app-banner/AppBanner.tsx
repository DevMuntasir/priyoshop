'use client';


import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import Image from 'next/image';





export function AppBanner(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;

  return (
    <div className={`container mx-auto xl:py-20`}>

      <div className='  aspect-[7/3.2] p-10' style={{ backgroundImage: 'url(/app-banner/bg.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', margin: '0 auto' }}>
        <div className=' max-w-[480px] content-center pt-14 h-full  '>
          <SectionHeading
            title={heading.title}
            description={heading.description}
            align={style.base.align}
            titleSize='h3'

          />
          {items.map((item) => (
            item.image && <Image width={120} height={40} alt='banner' src={item.image} className=' mt-5' />
          ))}
        </div>
      </div>

    </div>
  );
}

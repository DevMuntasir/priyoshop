'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import Image from 'next/image';




export function CommerceBanner(props: { data: ResolvedSection }) {
  const { heading, style, items } = props.data;







  return (
    <div className={`container mx-auto xl:py-20`}>

      <div className='  aspect-[7/3.2] p-10' style={{ backgroundImage: 'url(/app-banner/bg.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', margin: '0 auto' }}>
        <div className=' max-w-[480px] content-center pt-16 h-full  '>
          <p className=' font-body font-semibold'>{heading.eyebrow}</p>
          <SectionHeading
            title={heading.title}
            description={heading.description}
            align={style.base.align}
            titleSize='h3'

          />
          <Image src="/app-banner/play.png" className='mt-5' width={120} height={50} alt='logo' />
          {items.map((item) => (
            item.image && <Image width={120} height={40} alt='banner' src={item.image} className=' mt-5' />
          ))}
        </div>
      </div>

    </div>
  );
}

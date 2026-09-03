'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import Image from 'next/image';




export function CommerceBanner(props: { data: ResolvedSection }) {
  const { heading, style, items } = props.data;







  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 xl:py-20">

      <div className="min-h-[28rem] rounded-ps-lg bg-ps-cream p-5 sm:p-8 lg:aspect-[7/3.2] lg:min-h-0 lg:p-10" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,.94), rgba(255,255,255,.35)), url(/app-banner/bg.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', margin: '0 auto' }}>
        <div className="flex h-full max-w-[480px] flex-col justify-center pt-10 lg:pt-16">
          <p className=' font-body font-semibold'>{heading.eyebrow}</p>
          <SectionHeading
            title={heading.title}
            description={heading.description}
            align={style.base.align}
            titleSize='h3'

          />
          <Image src="/app-banner/play.png" className='mt-5' width={120} height={50} alt='logo' />
          {items.map((item, index) => (
            item.image && <Image key={`${item.image}-${index}`} width={120} height={40} alt="" src={item.image} className="mt-5 h-auto max-w-full" />
          ))}
        </div>
      </div>

    </div>
  );
}

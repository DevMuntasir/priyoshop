import Image from 'next/image';
import Paragraph from '@/components/ui/Paragaraph';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function WhatDrivesUs(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);

  return (
    <section className={`${resolved.wrapperClass} bg-white py-10`}>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title={props.data.heading.title}
          description={props.data.heading.description}
          align="center"
          eyebrow={props.data.heading.eyebrow}
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
          {props.data.items.map((item) => (
            <div
              key={item.title}
              className="rounded-[24px] border border-[#E8E8E8] bg-white px-9 py-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-2"
            >
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#FFF3F0]">
                <Image
                  src={item.image || '/about/10.png'}
                  alt={item.imageAlt ?? item.title ?? ''}
                  width={84}
                  height={84}
                  className="h-20 w-20 object-contain"
                />
              </div>

              <SectionHeading title={item.title ?? ''} titleSize="h5" align="left" />
              <Paragraph text={item.description ?? ''} className="mt-5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

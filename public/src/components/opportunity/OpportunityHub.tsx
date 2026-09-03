import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';
import Image from 'next/image';
import { SectionHeading } from '../ui/SectionHeading';

export function OpportunityHub(props: { data: ResolvedSection }) {
  const { heading, style, items } = props.data;
  const resolved = resolveSectionStyle(style);
  const alignClass
    = resolved.align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <section className={`overflow-hidden bg-white pt-14 sm:pt-20 ${resolved.wrapperClass}`.trim()}>
      <div className={`container mx-auto flex flex-col px-4 ${alignClass}`}>
        <Reveal direction="up">
          <SectionHeading
            align={resolved.align || 'center'}
            title={heading.title}
            titleSize="h2"
            eyebrow={heading.eyebrow}
            description={heading.description}
            titleColor={resolved.titleColorClass}
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {items.map((item, index) => (
            <div key={index}>
              {
                item.title && item.description && item.image && (
                  <Reveal key={index} direction="up" className="border-[1px] border-ps-cream-yellow ">
                    <div className=' bg-ps-warm-white '>
                      <Image src={item.image} alt={'log'} width={300} height={200} className='w-full' />
                    </div>
                    <div className='p-4'>
                      {item.title && <h3 className="text-lg lg:text-2xl font-semibold mt-4">{item.title}</h3>}
                      {item.description && <p className="text-gray-600 mt-2">{item.description}</p>}
                    </div>
                  </Reveal>
                )}


            </div>
          ))}
        </div>
      </div>


    </section>
  );
}

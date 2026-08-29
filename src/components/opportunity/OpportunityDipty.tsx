import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';
import Image from 'next/image';
import { SectionHeading } from '../ui/SectionHeading';

export function OpportunityDipty(props: { data: ResolvedSection }) {
  const { heading, style, items } = props.data;
  const resolved = resolveSectionStyle(style);
  const alignClass
    = resolved.align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const data = [
    {
      icon: '',
      title: "Growing Consumption",
      description:
        "Rising incomes and aspirations are driving strong consumption growth.",
    },
    {
      icon: '',
      title: "Expanding Retail Demand",
      description:
        "Retailers are increasing stock, expanding categories, and serving more customers.",
    },
    {
      icon: '',
      title: "Technology Readiness",
      description:
        "Retailers are adopting digital tools, mobile ordering, and cashless payments.",
    },
    {
      icon: '',
      title: "Infrastructure-Led Transformation",
      description:
        "Modern infrastructure is unlocking efficiency, visibility, and scale across the market.",
    },
  ];
  return (
    <section className={`overflow-hidden bg-section-gradient pt-14 sm:pt-20 xl:pt-28 ${resolved.wrapperClass}`.trim()}>
      <div className={`container mx-auto flex flex-col px-4 ${alignClass}`}>
        <Reveal direction="up">
          <SectionHeading
            eyebrow={heading.eyebrow}
            align={resolved.align || 'center'}
            title={heading.title}
            titleSize="h2"
            description={heading.description}
            titleColor={resolved.titleColorClass}
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 xl:mt-20">
          {items.map((item, index) => (
            <>
              {
                item.title && item.description && item.image && (
                  <Reveal key={index} direction="up" className="border-[1px] bg-white border-ps-white-600 p-6 rounded-ps-md ">
                    <div className=' bg-ps-white-600 w-fit overflow-auto rounded-full '>
                      <Image src={item.image} alt={'log'} width={60} height={60} className='w-[60px] h-[60px] rounded-full' />
                    </div>
                    <div className=' text-left'>
                      {item.title && <h3 className="text-lg lg:text-2xl font-semibold mt-4">{item.title}</h3>}
                      {item.description && <p className="text-gray-600 mt-2">{item.description}</p>}
                    </div>
                  </Reveal>
                )}


            </>
          ))}
        </div>
      </div>

      <section className="px-4 py-10 bg-white rounded-t-ps-hero mt-20 py-28">
        <div className="relative mx-auto max-w-7xl rounded-[28px] border border-red-400 p-8 md:p-10 bg-section-gradient">
          {/* Floating Title */}
          <div className="absolute left-1/2 -top-5 -translate-x-1/2  px-3 ">
            <div className="rounded-full border border-red-400 bg-white px-6 py-2 text-xl font-semibold text-gray-900">
              Why Now?
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 pt-6 md:grid-cols-2 ">
            {data.map((item, index) => {

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-orange-100 bg-white p-10 text-center"
                >
                  {/* Icon Circle */}
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">

                  </div>

                  <h3 className="mb-4 text-3xl font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mx-auto max-w-md text-lg leading-8 text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
}


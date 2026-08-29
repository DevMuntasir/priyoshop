
import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';
import { SectionHeading } from '../ui/SectionHeading';
import Image from 'next/image';

export function OpportunityGrowth(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);

  return (
    <section className={`bg-white py-14 sm:py-24 ${resolved.wrapperClass}`.trim()}>
      <div className="container mx-auto ">
        <Reveal
          direction="up"
          className="flex flex-col justify-center py-20 items-center gap-5 text-center "
        >
          <SectionHeading
            align={resolved.align || 'center'}
            eyebrow={heading.eyebrow}
            title={heading.title}
            titleSize="h2"
            description={heading.description}
            titleColor={resolved.titleColorClass}
          />
        </Reveal>

        {items.length > 0 && (
          <div className="grid grid-cols-3 gap-8 text-left max-w-[900px] mx-auto ">
            {items.map((stat) => (
              <div
                key={`${stat.value}-${stat.name}`}
                className=" px-6 py-10 bg-ps-white-600 border-[1px] rounded-ps-md "

              >
                {stat.logo && stat.name && (
                  <div className="flex r">
                    <Image
                      src={stat.logo}
                      alt={stat.name}
                      width={100}
                      height={100}
                    />

                  </div>
                )}
                <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
                <p className="text-gray-600 mt-2">{stat.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

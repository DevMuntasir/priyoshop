
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal
          direction="up"
          className="flex flex-col items-center justify-center gap-5 py-10 text-center sm:py-16 lg:py-20"
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
          <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 text-left sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {items.map((stat) => (
              <div
                key={`${stat.value}-${stat.name}`}
                className="rounded-ps-md border border-ps-grey-200 bg-ps-white-600 px-5 py-7 sm:px-6 sm:py-10"

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

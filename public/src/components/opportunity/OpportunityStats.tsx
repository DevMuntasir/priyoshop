import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

type Stat = { value: string; label: string; icon: string };

export function OpportunityStats(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);
  const stats: Stat[] = items.map(item => ({
    value: item.value ?? '',
    label: item.name ?? '',
    icon: item.logo ?? '',
  }));

  return (
    <div className={`relative lg:mt-20 bg-white ${resolved.wrapperClass}`.trim()}>
      <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-10 lg:px-8">
        <Reveal direction="up">
          <SectionHeading
            align={resolved.align}
            title={heading.title}
            titleSize="h2"
            description={heading.description}
            titleColor={resolved.titleColorClass}
          />
        </Reveal>

        <RevealGroup
          stagger={0.12}
          delayChildren={0.1}
          className="mx-auto mt-12 grid w-full max-w-4xl h-[300px] grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <Reveal
              item
              direction="up"
              key={`${stat.label}-${i}`}
              className="
      rounded-ps-md
      p-[1px]
      bg-gradient-to-b
      from-transparent
      via-[#FFE7D6]
      to-[#FFC8A3]
      shadow-[0_10px_30px_rgba(255,170,90,0.08)]
      
    "
            >
              <div
                className=" relative
        flex h-full flex-col items-center gap-3
        rounded-[calc(var(--radius-ps-md)-1px)]
       bg-gradient-to-b
      from-white
        via-[#fbf2ec]
      to-[#fcede3]
        overflow-hidden
        text-center
        sm:gap-4
        pb-5
      "
              >
                {stat.icon && (
                  <Image
                    src={stat.icon}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full !h-[300px] absolute top-0 left-0 object-cover "
                  />
                )}

                {stat.value && (
                  <p className="mt-auto z-50 text-2xl font-bold text-white font-display font-extrabold text-ps-display sm:text-3xl lg:text-5xl">
                    {stat.value}
                  </p>

                )}

                {stat.label && (
                  <p className="z-50 text-sm font-semibold text-white sm:text-base lg:text-lg">
                    {stat.label}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}

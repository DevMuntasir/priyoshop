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
    <div className={`relative -mt-6 rounded-t-[35px] bg-white ${resolved.wrapperClass}`.trim()}>
      <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
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
          className="mx-auto mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
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
                className="
        flex h-full flex-col items-center gap-3
        rounded-[calc(var(--radius-ps-md)-1px)]
       bg-gradient-to-b
      from-white
        via-[#fbf2ec]
      to-[#fcede3]
        px-2
        py-6
        text-center
        sm:gap-4
        sm:px-6
        sm:py-8
      "
              >
                {stat.icon && (
                  <Image
                    src={stat.icon}
                    alt=""
                    width={100}
                    height={100}
                    className="size-16 sm:size-24 lg:size-32"
                  />
                )}

                <div className="font-display text-ps-h3 font-bold text-ps-red-600">
                  {stat.value}
                </div>

                <div className="font-body text-ps-xs font-semibold text-ps-black-400 sm:text-ps-sm">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </div>
    </div>
  );
}

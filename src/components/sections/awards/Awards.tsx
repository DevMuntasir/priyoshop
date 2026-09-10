import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { AwardCard } from '@/components/ui/AwardCard';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function Awards(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);

  return (
    <div className={resolved.wrapperClass}>
      <div className=" px-6  lg:px-0">
        <Reveal
          direction="scale"
          className="my-8 flex flex-col items-center  text-center sm:mb-11 "
        >
          {/* oxlint-disable-next-line next/no-img-element -- static decorative laurel mark */}
          <img src="/awards/icon.png" alt="" className="h-24 w-auto sm:h-32 lg:h-37.5" />
          {/* <h2 className="m-0 font-display leading-[1.4] font-bold tracking-tight text-balance text-ps-h3 lg:text-ps-h2">
            <span className="bg-linear-to-r from-ps-red-600 to-ps-gold-600 bg-clip-text text-transparent">
              {heading.title}
            </span>{' '}
            {heading.titleTrail ? (
              <span className={resolved.titleColorClass}>{heading.titleTrail}</span>
            ) : null}
          </h2> */}
          <SectionHeading
            title={<AccentedTitle text={heading.title} emClass='bg-linear-to-r from-ps-red-600 to-ps-gold-600 bg-clip-text text-transparent' />}
            description={heading.description}
            align={resolved.align}
            titleSize="h2"
            titleClassName=" font-bold"
          />
        </Reveal>

        <RevealGroup
          stagger={0.08}
          className="mx-auto mt-7 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <Reveal item direction="up" key={`${item.logo}-${index}`}>
              <AwardCard
                award={{
                  name: item.name ?? '',
                  caption: item.caption ?? '',
                  logo: item.logo ?? '',
                }}
              />
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal className="mt-8 flex justify-center sm:mt-11" delay={0.1}>
          <Button size="md" tone="dark">
            View More Awards
          </Button>
        </Reveal>
      </div>
    </div>
  );
}

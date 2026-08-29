import { Button } from '@/components/ui/Button';
import { InfiniteMovingCards } from '@/components/ui/InfiniteMovingCards';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

function LogoCard(props: { name: string; logo: string }) {
  return (
    <div className="flex h-20 w-36 items-center justify-center rounded-ps-md bg-ps-white px-4 sm:h-24 sm:w-52 sm:px-6">
      {/* oxlint-disable-next-line next/no-img-element -- static brand logo; next/image adds no value for a small inline mark */}
      <img
        src={props.logo}
        alt={props.name}
        className="max-h-10 w-auto object-contain sm:max-h-12"
      />
    </div>
  );
}

export function Brands(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);
  const cards = items.map((item, index) => (
    <LogoCard key={`${item.logo}-${index}`} name={item.name ?? ''} logo={item.logo ?? ''} />
  ));

  return (
    <div className={resolved.wrapperClass}>
      <Section>
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4 sm:mb-11 sm:gap-6">
          <Reveal direction="left">
            <SectionHeading
              titleSize="h2"
              title={heading.title}
              description={heading.description}
              align={resolved.align}
              titleColor={resolved.titleColorClass}
            />
          </Reveal>
          <Reveal direction="right" delay={0.15}>
            <Button variant="filled" tone="dark">
              View More Awards
            </Button>
          </Reveal>
        </div>

        <Reveal className="flex flex-col gap-4 sm:gap-6" delay={0.1}>
          <InfiniteMovingCards items={cards} direction="right" speed="slow" />
          <InfiniteMovingCards items={[...cards].toReversed()} direction="left" speed="slow" />
        </Reveal>
      </Section>
    </div>
  );
}

import Image from 'next/image';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

type Metric = { value: string; label: string };

function MetricCard(props: { metric: Metric; className?: string }) {
  return (
    <Reveal item direction="up" className={props.className}>
      <div className="font-display text-ps-h3 font-bold text-ps-red-600 ">
        {props.metric.value}
      </div>
      <div className="mt-1 font-body text-ps-xs font-semibold text-ps-black-400 sm:text-ps-sm">
        {props.metric.label}
      </div>
    </Reveal>
  );
}

export function Opportunity(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);
  const metrics: Metric[] = items.map((item) => ({
    value: item.value ?? '',
    label: item.name ?? '',
  }));

  console.log(resolved);

  // The middle card is emphasised, as in the original three-metric layout.
  const middle = Math.floor((metrics.length - 1) / 2);

  return (
    <div className={`relative lg:-mt-10   bg-white ${resolved.wrapperClass}`.trim()}>
      <Section>
        <div className={`flex flex-col `}>
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
            className="grid w-full max-w-3xl grid-cols-3 gap-3 sm:gap-8"
          >
            {metrics.map((metric, i) => (
              <MetricCard
                key={`${metric.label}-${i}`}
                metric={metric}
                className={`flex flex-col items-center justify-center rounded-ps-lg border-[1px] border-ps-gold-500/20 bg-ps-cream px-2 py-4 text-center sm:px-6 sm:py-5 ${i === middle ? 'sm:scale-110' : 'scale-100'}`}
              />
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Bangladesh illustration with the yellow wave sweeping beneath it */}
      {heading.backgroundImage ? (
        <Reveal className="relative w-full">
          <Image
            src={heading.backgroundImage}
            alt="Illustration of Bangladesh landmarks, transport and industries"
            width={1440}
            height={400}
            sizes="100vw"
            className="z-10 mx-auto h-auto w-full"
          />
          <Image
            src="/opportunities/wave.png"
            alt="Illustration of Bangladesh landmarks, transport and industries"
            width={1440}
            height={400}
            sizes="100vw"
            className="z-10 absolute -bottom-[330px] -rotate-6 scale-105  mx-auto h-auto w-full"
          />
        </Reveal>
      ) : null}
    </div>
  );
}

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
      <div className="font-display text-ps-h3 font-extrabold leading-none tracking-tight text-white">
        {props.metric.value}
      </div>
      <div className="mt-2 text-pretty font-body text-ps-xs font-semibold leading-tight text-white sm:text-ps-sm">
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

  return (
    <div className={`relative lg:-mt-10   bg-white ${resolved.wrapperClass}`.trim()}>
      <Section>
        <div className={`flex flex-col `}>
          <Reveal direction="up">
            <SectionHeading
              align={resolved.align}
              title={heading.title}
              titleSize="h2"
              titleClassName=' '
              description={heading.description}
              titleColor={resolved.titleColorClass}
              className=' max-w-[1020px]  mx-auto mb-6 '
            />
          </Reveal>

          <RevealGroup
            stagger={0.12}
            delayChildren={0.1}
            className="mt-8 grid w-full max-w-4xl grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-3 self-center sm:mt-10 sm:gap-4"
          >
            {metrics.map((metric, i) => (
              <MetricCard
                key={`${metric.label}-${i}`}
                metric={metric}

                className="flex min-h-24 flex-col items-center justify-center rounded-ps-md bg-[#2d8ca3]! px-3 py-4 text-center sm:min-h-28 sm:px-5 sm:py-5"
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

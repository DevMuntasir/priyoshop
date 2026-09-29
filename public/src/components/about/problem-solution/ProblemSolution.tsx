import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Image from 'next/image';

type ProblemSolutionPair = {
  problem: string;
  solution: string;
};

const PAIRS: ProblemSolutionPair[] = [
  {
    problem: 'Fragmented supply chain',
    solution: 'App-based ordering platform',
  },
  {
    problem: 'Time-consuming sourcing',
    solution: 'Nationwide distribution network',
  },
  {
    problem: 'Limited access to credit',
    solution: 'Embedded Credit',
  },
  {
    problem: 'Inefficient distribution',
    solution: 'Data-driven supply chain',
  },
];

function ProblemSolutionRow(props: { pair: ProblemSolutionPair; index: number }) {
  return (
    <Reveal item direction="up" delay={props.index * 0.1}>
      <div className="flex w-full items-center gap-2 sm:gap-3 md:gap-6 lg:gap-8">
        {/* Problem section */}
        <div className="flex flex-1 items-center gap-2 border border-ps-black-100/20 rounded-ps-md bg-linear-to-r to-10% from-transparent to-ps-white-600 px-2.5 py-2.5 sm:px-6 sm:py-4 md:py-5">
          <div className="shrink-0">
            <div className="flex h-6 w-6 items-center justify-center rounded-full sm:h-9 sm:w-9 md:h-10 md:w-10">
              <Image src="/about/close.svg" width="35" height="35" alt="icon" className="w-full grayscale-100  h-full" />
            </div>
          </div>
          <p className="font-body text-xs sm:text-ps-sm md:text-ps-body font-semibold text-ps-black line-clamp-2">
            {props.pair.problem}
          </p>
        </div>

        {/* Arrow section - hidden on mobile */}
        <div className="hidden md:flex shrink-0">
          <Image src="/about/arrow.svg" width="35" height="35" alt="icon" />
        </div>

        {/* Solution section */}
        <div className="flex flex-1 items-center gap-2 rounded-ps-md border border-ps-mint/40 bg-linear-to-r from-ps-mint to-ps-white-600 px-2.5 py-2.5 sm:px-6 sm:py-4 md:py-5">
          <div className="shrink-0">
            <div className="flex h-6 w-6 items-center justify-center rounded-full sm:h-9 sm:w-9 md:h-10 md:w-10">
              <Image src="/about/check.svg" width="35" height="35" alt="icon" className="w-full h-full" />
            </div>
          </div>
          <p className="font-body text-xs sm:text-ps-sm md:text-ps-body font-semibold text-ps-black line-clamp-2">
            {props.pair.solution}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

export function ProblemSolution() {
  return (
    <div className='bg-about-gradient py-8 sm:py-16 md:py-20 w-full'>
      <Section>
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
          <Reveal direction="up">
            <SectionHeading
              align="center"
              eyebrow="Company Overview"
              title="How PriyoShop Solves Problems"
              titleSize="h2"
              description="We identify key market challenges and deliver targeted solutions that empower businesses at every level."
            />
          </Reveal>

          <RevealGroup stagger={0.15} delayChildren={0.1} className="flex flex-col gap-3 sm:gap-4 md:gap-6">
            {PAIRS.map((pair, i) => (
              <ProblemSolutionRow key={i} pair={pair} index={i} />
            ))}
          </RevealGroup>
        </div>
      </Section>
    </div>
  );
}

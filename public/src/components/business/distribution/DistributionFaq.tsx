'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

function ChevronIcon(props: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-5 shrink-0 transition-transform duration-300 ${props.isOpen ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function FaqItem(props: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-ps-md border border-ps-grey-200 bg-[#f8f8f8] px-5 sm:px-7">
      <button
        type="button"
        aria-expanded={props.isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-5 py-5 text-left sm:py-6"
        onClick={props.onToggle}
      >
        <span className="font-body text-ps-sm leading-snug font-semibold text-ps-black">
          {props.question}
        </span>
        <ChevronIcon isOpen={props.isOpen} />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: props.isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="m-0 pb-5 font-body text-ps-xs leading-relaxed font-normal text-ps-ink-500 sm:pb-6">
            {props.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DistributionFaq(props: { data: ResolvedSection }) {
  const data = props.data;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container px-5 sm:px-8">
        <SectionHeading
          eyebrow={data.heading.eyebrow}
          title={data.heading.title}
          titleSize="h3"
          description={data.heading.description}
          descriptionFontClass="font-normal"
          align="center"
          className="mx-auto max-w-4xl"
        />

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:mt-12">
          {data.items.map((item, index) => (
            <FaqItem
              key={item.title}
              question={item.title ?? ''}
              answer={item.body ?? ''}
              isOpen={openIndex === index}
              onToggle={() => {
                setOpenIndex(openIndex === index ? -1 : index);
              }}
            />
          ))}
        </div>

        {(data.heading.titleTrail || data.heading.ctaLabel) && (
          <div className="mt-12 flex flex-col items-center gap-5 text-center sm:mt-14">
            {data.heading.titleTrail && (
              <h3 className="m-0 font-display text-ps-h5 font-bold text-ps-black">
                {data.heading.titleTrail}
              </h3>
            )}
            {data.heading.ctaLabel && (
              <Button href={data.heading.ctaHref ?? '/contact'}>
                {data.heading.ctaLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

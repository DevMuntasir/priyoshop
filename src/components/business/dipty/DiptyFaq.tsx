'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

function ChevronIcon(props: { isOpen: boolean }) {
  return (
    <svg
      className={`size-6 shrink-0 text-ps-black transition-transform duration-300 ${props.isOpen ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

/* Single accordion row: question header that toggles an expanding answer panel. */
function FaqItem(props: FaqItemProps) {
  return (
    <div className="rounded-ps-lg bg-ps-white-600 px-10 py-3">
      <button
        type="button"
        onClick={props.onToggle}
        aria-expanded={props.isOpen}
        className="flex w-full items-center justify-between gap-4 py-6 text-left cursor-pointer"
      >
        <span className="font-display text-ps-h6 font-bold text-ps-black">
          {props.question}
        </span>
        <ChevronIcon isOpen={props.isOpen} />
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: props.isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="m-0 pb-6 font-body text-ps-sm text-ps-black-400">
            {props.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function DiptyFaq(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          description={heading.description}
          align="center"
        />

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
          {items.map((faq, index) => (
            <FaqItem
              key={faq.title}
              question={faq.title ?? ''}
              answer={faq.body ?? ''}
              isOpen={openIndex === index}
              onToggle={() => {
                setOpenIndex(openIndex === index ? -1 : index);
              }}
            />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          <h3 className="m-0 font-display text-ps-h4 font-bold text-ps-black">
            Got anymore questions?
          </h3>
          <Button href="/contact" size="lg">
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}

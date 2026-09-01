'use client';

import { useEffect, useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

const AUTOPLAY_INTERVAL_MS = 4000;

export function DistributionHowWork(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;
  const STEPS = items.map((item, index) => ({
    id: index + 1,
    title: item.title ?? '',
    image: item.image ?? '',
  }));
  const stepCount = STEPS.length;
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(current => (current % stepCount) + 1);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [stepCount]);

  return (
    <section className="relative rounded-t-4xl bg-black py-12 sm:py-16 lg:py-20">
      <div className="flex flex-col justify-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16">
            <SectionHeading
              eyebrow={heading.eyebrow}
              eyebrowMode="light"
              titleColor="text-ps-white"
              align="left"
              title={heading.title}
              descriptionColor="text-ps-white-700"
              description={heading.description}
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-20">
            {/* Left: Image */}
            <div className="relative mx-auto aspect-[2/3] h-auto max-h-[600px] w-full max-w-[400px] overflow-hidden rounded-xl bg-ps-white-950 lg:h-[600px] lg:aspect-auto">
              {STEPS.map(step => (
                <img
                  key={step.id}
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                  style={{ opacity: activeStep === step.id ? 1 : 0 }}
                />
              ))}
            </div>

            {/* Right: Steps */}
            <div className="flex flex-col justify-between gap-8 py-2 h-fit">
              {STEPS.map((step) => {
                const isActive = activeStep === step.id;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(step.id)}
                    className="flex min-h-14 max-w-100 cursor-pointer items-stretch gap-4 border-none bg-transparent p-0 text-left sm:gap-6"
                  >
                    <div
                      className={`w-1 shrink-0 rounded-full transition-colors duration-500 ${isActive ? 'bg-ps-white' : 'bg-ps-white-700/50'
                        }`}
                    />

                    <h3
                      className={`self-center origin-left text-ps-h6 lg:text-ps-h5 font-bold transition-all duration-500 ${isActive ? 'text-ps-white scale-110' : 'text-ps-white-700/50 scale-100'
                        }`}
                    >
                      {step.title}
                    </h3>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

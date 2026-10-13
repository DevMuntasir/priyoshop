import Image from 'next/image';
import { toStepBodyHtml } from '@/libs/cms/StepBodyHtml';
import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Step = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export function RetailFinanceHowWork(props: { data: ResolvedSection; showStepDescriptions?: boolean }) {
  const { heading, items } = props.data;
  const steps: Step[] = items.map((item, index) => ({
    id: index + 1,
    title: item.title ?? '',
    description: props.showStepDescriptions ? item.body ?? item.description ?? '' : item.description ?? '',
    image: item.image ?? '',
  }));

  return (
    <div>
      <div className="container mx-auto grid grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <Reveal
          direction="up"
          className="flex flex-col justify-center py-20 items-start gap-5 lg:sticky lg:top-32"
        >
          <SectionHeading titleSize='h2' title={<>
            <AccentedTitle
              text={heading.title}
              emClass="bg-linear-to-r from-ps-gold-500 to-ps-red-500 bg-clip-text text-transparent"
            />


          </>} description={heading.description}
            eyebrow={heading.eyebrow}
            align='left' />
        </Reveal>
        {steps.length > 0 && (
          <div className="flex flex-col gap-8 ">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className="sticky py-8 lg:py-5"
                style={{ top: `calc(6rem + ${i * 0.25}rem)` }}
              >
                <Reveal direction="up" delay={0.1}>
                  <div className="w-full rounded-2xl overflow-hidden  ">
                    {/* Card image with step number overlay */}
                    <div className="relative aspect-square min-h-70 w-full max-w-[450px] overflow-hidden bg-transparent sm:min-h-[420px] lg:max-h-[600px]">
                      {step.image ? (
                        <Image
                          src={step.image}
                          alt={step.title}
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                      )}
                    </div>
                    {props.showStepDescriptions ? (
                      <div className="mt-5 max-w-[450px] space-y-3">
                        <h3 className="font-display text-ps-h5 font-bold text-ps-ink-700">{step.title}</h3>
                        <div
                          className="font-body text-ps-body text-ps-ink-700 [&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:my-3 [&_h2]:text-xl [&_h2]:font-bold [&_h3]:my-3 [&_h3]:text-lg [&_h3]:font-bold [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:max-w-full"
                          dangerouslySetInnerHTML={{ __html: toStepBodyHtml(step.description) }}
                        />
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

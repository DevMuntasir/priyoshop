import Image from 'next/image';
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

export function RetailFinanceHowWork(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;
  const steps: Step[] = items.map((item, index) => ({
    id: index + 1,
    title: item.title ?? '',
    description: item.description ?? '',
    image: item.image ?? '',
  }));

  return (
    <div>
      <div className="container mx-auto grid grid-cols-1 items-start gap-12 px-4 lg:grid-cols-2 lg:gap-16">
        <Reveal
          direction="up"
          className="flex flex-col justify-center py-20 items-start gap-5 lg:sticky lg:top-32"
        >
          <SectionHeading title={<>
            <AccentedTitle
              text={heading.title}
              emClass="bg-linear-to-r from-ps-gold-500 to-ps-red-500 bg-clip-text text-transparent"
            />

          </>} description={heading.description}
            eyebrow={heading.eyebrow}
            align='left' />
        </Reveal>
        {steps.length > 0 && (
          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className="sticky py-20"
                style={{ top: `calc(6rem + ${i * 2.25}rem)` }}
              >
                <Reveal direction="up" delay={0.1}>
                  <div className="w-full rounded-2xl overflow-hidden  ">
                    {/* Card image with step number overlay */}
                    <div className="relative w-full overflow-hidden bg-transparent" style={{ height: '100%', aspectRatio: 1, minHeight: '420px', maxHeight: '600px', maxWidth: '450px' }}>
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

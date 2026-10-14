import Image from 'next/image';
import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function RetailFinanceIntro(props: { data: ResolvedSection }) {
  return (
    <section className="relative w-full space-y-14 py-14 sm:space-y-20 sm:py-20 lg:space-y-28 lg:py-32">
      <div className="container flex flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:gap-14 lg:px-8">
        <SectionHeading
          title={
            <AccentedTitle
              text={props.data.heading.title}
              emClass="gradient-text inline-block"
            />
          }
          description={props.data.heading.description}
          eyebrow={props.data.heading.eyebrow}
          align="left"
        />
      </div>

      <div className="w-full container">
        {props.data.heading.backgroundImage && (
          <Image
            src={props.data.heading.backgroundImage}
            width={400}
            height={400}
            className="mx-auto h-auto w-full  object-contain"
            alt=""
          />
        )}
      </div>
    </section>
  );
}

import Image from 'next/image';
import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

export function RetailFinanceIntro(props: { data: ResolvedSection }) {
  return (
    <section className="relative md:mt-10 w-full space-y-14 py-14 sm:space-y-14 sm:py-20  lg:py-32">
      <div className="container flex flex-col gap-10   lg:flex-row lg:items-center lg:gap-14 ">
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

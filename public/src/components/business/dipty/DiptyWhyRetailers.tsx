import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import Image from 'next/image';



function FeatureCard(props: { feature: SectionItem; index: number }) {
  return (
    <article className="flex flex-col rounded-ps-md border border-ps-grey-200 bg-white p-6 shadow-[0_3px_12px_rgba(0,0,0,0.035)] sm:min-h-80 sm:p-10">
      {props.feature.image && <Image src={props.feature.image} width={80} height={80} alt="img" />}
      <h3 className="mt-6 font-display text-ps-h5 leading-tight font-bold text-ps-black">
        {props.feature.title}
      </h3>
      <p className="mt-4 max-w-lg font-body text-ps-body leading-relaxed text-ps-black-400">
        {props.feature.body}
      </p>
    </article>
  );
}

export function DiptyWhyRetailers(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;

  return (
    <section className="bg-white pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          titleSize="h2"
          description={heading.description}
          descriptionFontClass="text-ps-body font-normal"
          align="left"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:mt-24">
          {items.slice(0, 4).map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

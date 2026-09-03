'use client';

import FeaturesGrid from '@/components/business/commerce/FeaturesGrid';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';


export function CommerceBenifits(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;


  return (
    <section className="bg-about-gradient rounded-t-4xl py-20 ">
      <div className="container mx-auto px-4">
        <SectionHeading
          title={heading.title}
          titleColor=" w-full"
          eyebrow={heading.eyebrow}
          align="left"
          description={heading.description}
        />


        <FeaturesGrid features={items} />


      </div>
    </section>
  );
}

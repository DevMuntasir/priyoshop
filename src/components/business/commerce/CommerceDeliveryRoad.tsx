'use client';

import { AccentedTitle } from "@/components/ui/AccentedTitle";
import { Image } from "@/components/ui/Image";
import { Reveal } from "@/components/ui/Reveal";
import { ResolvedSection } from "@/libs/cms/Sections";

export function CommerceDeliveryRoad(props: { data: ResolvedSection }) {

  const { heading } = props.data
  return (
    <section className="relative bg-white pt-12 sm:pt-16 lg:pt-20">
      <div className="container relative z-10 -mb-8 px-4 sm:-mb-14 sm:px-6 lg:-mb-[100px] lg:px-8">

        <div className=" !max-w-[780px] ">

          <Reveal direction="up" >
            <h1
              className={`m-0 font-display leading-[1.35] font-extrabold text-ps-h4 sm:text-ps-h3 lg:text-ps-h2  '
                      `}
            >
              <AccentedTitle
                text={heading.title}
                emClass="text-gradient"
              />
            </h1>
          </Reveal>

          {heading.description && (
            <Reveal direction="up" delay={0.1}>
              <p className="mx-auto mt-7 max-w-2xl font-body text-ps-sm font-semibold text-ps-black-400 sm:text-ps-body">
                {heading.description}
              </p>
            </Reveal>
          )}

        </div>
      </div>
      <Image src="/about/village.png" width={1400} height={700} className="h-auto w-full object-cover" />
    </section>
  );
}

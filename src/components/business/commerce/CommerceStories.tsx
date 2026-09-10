'use client';
import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';

export type Story = {
  id: string;
  videoPath: string;
  poster?: string;
  title: string;
};



export function CommerceStories(props: { data: ResolvedSection }) {
  const { heading } = props.data;


  return (
    <section className="pt-20 overflow-hidden mt-10 sm:py-24 lg:py-32">
      <div className="container  mx-auto  gap-6 px-4">
        <div className="max-w-[500px]  w-full self-center z-10  ">
          <Reveal direction="up">
            <h1
              className={`m-0 font-display leading-[1.25] font-extrabold text-ps-h3 lg:text-ps-h2 xl:text-ps-h1 '
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
    </section>
  );
}

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';
import Image from 'next/image';

export function OpportunityDistribution(props: { data: ResolvedSection }) {
  const { heading, style } = props.data;
  const resolved = resolveSectionStyle(style);

  return (
    <section className={`bg-section-gradient  py-8 sm:py-12 ${resolved.wrapperClass}`.trim()}>
      <div className="container mx-auto px-4">
        <div className="rounded-[35px]   px-4 py-14 sm:px-10 sm:py-20">
          <Reveal direction="up">
            <SectionHeading

              title={heading.title}
              titleSize="h2"

              align={resolved.align}
              titleColor={resolved.titleColorClass}
            />
          </Reveal>
          <div className="flex justify-center p-8 mt-10 ">
            <div className="relative w-full max-w-6xl rounded-3xl border border-red-300 bg-ps-white p-5 ">
              {/* Top Label */}
              <div className="absolute left-1/2 -top-4 -translate-x-1/2 bg-white px-4 ">
                <span className="rounded-full border border-red-300 bg-white px-4 py-1 text-xs font-medium text-gray-700">
                  Distribution Structure
                </span>
              </div>

              {/* Image */}
              <div className="overflow-hidden rounded-2xl">
                {heading.backgroundImage && (
                  <Image
                    src={heading.backgroundImage}
                    alt="Distribution Structure"
                    className="h-full w-full object-cover"
                    width={800}
                    height={450}
                  />
                )}
              </div>
            </div>
          </div>
          {/* {heading.videoPath ? (
            <Reveal direction="scale" delay={0.1}>
              <ClickToPlayVideo
                videoPath={heading.videoPath}
                title="Distribution structure video"
                className="mx-auto mt-10 h-72 w-full max-w-5xl sm:mt-14 sm:h-96 lg:h-125"
              />
            </Reveal>
          ) : null} */}
        </div>
      </div>
    </section>
  );
}




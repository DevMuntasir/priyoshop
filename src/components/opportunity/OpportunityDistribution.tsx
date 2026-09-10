import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';
import Image from 'next/image';

const distributionIssues = [
  'No real-time data',
  'Manual & fragmented\noperations',
  'No embedded finance',
  'Limited scalability',
];

export function OpportunityDistribution(props: { data: ResolvedSection }) {
  const { heading, style } = props.data;
  const resolved = resolveSectionStyle(style);

  return (
    <section className={`bg-section-gradient  py-8 sm:py-12 ${resolved.wrapperClass}`.trim()}>
      <div className="container mx-auto px-4">
        <div className="lg:rounded-[35px] px-4 py-5 lg:px-10 lg:py-20">
          <Reveal direction="up">
            <SectionHeading

              title={heading.title}
              titleSize="h2"

              align={resolved.align}
              titleColor={resolved.titleColorClass}
            />
          </Reveal>
          <div className="mt-10 flex justify-center ">
            <div className="relative w-full ">
              <div className="rounded-3xl border border-red-300 bg-ps-white p-5">
                {/* Top Label */}
                <div className="absolute left-1/2 min-w-[200px] text-center -top-4 whitespace-normal -translate-x-1/2 bg-white lg:px-4 ">
                  <p className="block rounded-full border border-red-300 bg-white px-4 py-1 text-xs font-medium text-gray-700">
                    Distribution Structure
                  </p>
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

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {distributionIssues.map((issue) => (
                  <div
                    key={issue}
                    className="flex min-h-[210px] flex-col items-center justify-center rounded-[28px] border border-[#e5e1df] bg-[#f7f4f2] px-5 py-6 text-center shadow-[0_1px_0_rgba(0,0,0,0.02)]"
                  >
                    <div className="mb-6 h-16 w-16 rounded-full bg-[#d9d9d9]" />
                    <p className="max-w-[220px] text-lg font-medium leading-tight text-[#1a1a1a] sm:text-xl" style={{ whiteSpace: 'pre-line' }}>
                      {issue}
                    </p>
                  </div>
                ))}
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




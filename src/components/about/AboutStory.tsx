import { Image } from '@/components/ui/Image';
import Paragraph from '@/components/ui/Paragaraph';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function AboutStory(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);

  return (
    <div className={resolved.wrapperClass}>
      <Section>
        <div className="flex flex-col items-stretch gap-10 py-4 md:py-6 lg:flex-row lg:items-center lg:gap-16 lg:py-10">
          <div className="w-full lg:w-1/2">
            <SectionHeading
              eyebrow={props.data.heading.eyebrow}
              title={props.data.heading.title}
              align="left"
              titleSize="h2"
              titleColor="text-ps-black font-desktop"
            />
            <Paragraph
              text={props.data.heading.description ?? ''}
              lineHeight="relaxed"
              paragraphGap="lg"
              className="mt-5 max-w-[480px] font-body text-lg font-semibold text-[#444]"
            />
          </div>
          <div className="min-h-64 w-full rounded-ps-lg sm:min-h-80 lg:min-h-[400px] lg:w-1/2">
            <Image
              src={props.data.heading.backgroundImage || '/about/story.webp'}
              className="h-full w-full object-cover"
              alt={props.data.heading.title}
              width={400}
              height={400}
            />
          </div>
        </div>

        <div className="mt-12">
          <div className="w-full">
            <SectionHeading
              eyebrow={props.data.heading.secondaryEyebrow}
              title={props.data.heading.secondaryTitle ?? ''}
              align="center"
              titleSize="h2"
              titleColor="text-ps-black font-extrabold font-desktop"
            />
          </div>
          <div className="mt-10 flex w-full justify-center gap-6 sm:gap-10 lg:mt-20">
            {props.data.items.map((item) => (
              <div key={item.title} className="h-fit rounded-ps-sm border border-ps-grey-200 bg-gray-50 p-5 sm:p-8">
                <Image
                  src={item.image || '/about/v.svg'}
                  alt={item.imageAlt ?? item.title ?? ''}
                  width={80}
                  height={80}
                />
                <h5 className="my-3 font-display text-ps-h5 font-bold">{item.title}</h5>
                <p className="font-body font-semibold text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

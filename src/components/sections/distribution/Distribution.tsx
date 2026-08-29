import { ClickToPlayVideo } from '@/components/ui/ClickToPlayVideo';
import { RetailGrowthSteps } from '@/components/ui/RetailGrowthSteps';
import { Reveal } from '@/components/ui/Reveal';
import { ScrollAutoplayVideo } from '@/components/ui/ScrollAutoplayVideo';
import type { ScrollStep } from '@/components/ui/ScrollSteps';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';

// The "Retail growth" step carousel on the black distribution panel.
export function DistributionSteps(props: { data: ResolvedSection }) {
  const { items } = props.data;
  const steps: ScrollStep[] = items.map((item, i) => ({
    label: String(i + 1).padStart(2, '0'),
    title: item.title ?? '',
    body: item.body ?? '',
    image: item.image ?? '',
    imageAlt: item.imageAlt ?? '',
  }));

  return (
    <div className="max-h-full relative overflow-x-clip h-full w-full rounded-t-ps-xl bg-ps-black py-12 sm:py-16 lg:py-20">
      <RetailGrowthSteps steps={steps} />
    </div>
  );
}

// A heading + autoplay YouTube video, on the same black panel.
export function DistributionVideoA(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <div className="bg-ps-black">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title={heading.title}
            titleColor=" text-ps-white"
            titleSize="h2"
            descriptionColor="text-ps-white font-display !font-normal text-ps-body"
            description={heading.description}
            align="center"
          />
        </Reveal>
        {heading.videoId ? (
          <Reveal direction="scale" delay={0.1}>
            <ScrollAutoplayVideo
              videoId={heading.videoId}
              title="YouTube video player"
              className="mx-auto my-10 h-72 max-w-full overflow-hidden rounded-ps-xl sm:my-14 sm:h-96 lg:my-20 lg:h-125"
            />
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}

// A heading + click-to-play local video, closing the black panel.
export function DistributionVideoB(props: { data: ResolvedSection }) {
  const { heading } = props.data;

  return (
    <div className="bg-ps-black pb-12 sm:pb-16 lg:pb-20">
      <div className="px-4 py-12 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            title={heading.title}
            gradientWords="B2B Platform"
            titleColor=" text-ps-white max-w-4xl"
            titleSize="h2"
            descriptionColor="text-ps-white font-display !font-normal text-ps-body"
            description={heading.description}
            align="center"
          />
        </Reveal>
        {heading.videoPath ? (
          <Reveal direction="scale" delay={0.1}>
            <ClickToPlayVideo
              videoPath={heading.videoPath}
              title="YouTube video player"
              className="my-10 h-72 w-full sm:my-14 sm:h-96 lg:my-20 lg:h-125"
            />
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}

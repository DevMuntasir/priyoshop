import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import SnakeTimeline from '@/components/ui/SnakeTimeline';
import type { TimelineItem } from '@/components/ui/SnakeTimeline';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function Timeline(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);
  const timelineItems: TimelineItem[] = items.map((item) => ({
    year: item.year ?? '',
    title: item.title ?? '',
    icon: item.logo ? <Image src={item.logo} alt="" width={48} height={48} /> : null,
  }));

  return (
    <div className={`h-full bg-section-gradient ${resolved.wrapperClass}`.trim()}>
      <div className="container relative mx-auto py-20 h-full">
        <div className="px-6 md:px-0">
          <SectionHeading
            titleSize="h3"
            title={heading.title}
            eyebrow={heading.eyebrow}
            align={resolved.align}
          />
        </div>
        <SnakeTimeline
          config={{
            accentColor: 'var(--ps-primary)',
            columns: 3,
            variant: 'road',
            roadWidth: 18,
            travelingImage: '/timeline/van1.png',
            travelingImageSize: 100,
            travelingImageOffset: -2,
            items: timelineItems,
          }}
        />
      </div>
    </div>
  );
}

import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SnakeTimeline } from '@/components/ui/SnakeTimeline';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function Timeline(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const items = props.data.items.map((item) => ({
    year: item.year ?? '',
    title: item.title ?? '',
    icon: item.logo ? <Image src={item.logo} alt="" width={48} height={48} /> : null,
  }));

  return (
    <section className={`bg-section-gradient ${resolved.wrapperClass}`.trim()}>
      <div className="container mx-auto px-5 pb-12 sm:px-8 sm:pb-16 lg:pb-20">
        <SectionHeading
          titleSize="h3"
          title={props.data.heading.title}
          eyebrow={props.data.heading.eyebrow}
          description={props.data.heading.description}
          align={resolved.align}
        />
        <SnakeTimeline items={items} />
      </div>
    </section>
  );
}

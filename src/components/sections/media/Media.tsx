import { NewsBlock } from '@/components/ui/NewsBlock';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function Media(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);


  return (
    <div className={resolved.wrapperClass}>
      {/* <Carousel
        slides={slides}
        interval={4000}
        autoPlay
        showControls
        showIndicators
      /> */}
      <NewsBlock
        align={resolved.align}
        eyebrow={heading.eyebrow}
        title={heading.title}
        description={heading.description}
        cta={heading.ctaLabel}
        ctaHref={heading.ctaHref}
        items={items.map((item) => ({
          source: item.name ?? '',
          logo: item.logo ?? '',
          ttl: item.title ?? '',
          date: item.date ?? '',
          img: item.image ?? '',
          href: item.href,
        }))}
      />
    </div>
  );
}

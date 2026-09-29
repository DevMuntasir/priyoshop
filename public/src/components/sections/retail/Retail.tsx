import { RetailsBlock } from '@/components/ui/RetailsBlock';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function Retail(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);

  return (
    <RetailsBlock
      base={resolved.wrapperClass}
      align={resolved.align}
      eyebrow={heading.eyebrow}
      title={heading.title}
      description={heading.description}
      cta={heading.ctaLabel}
      ctaHref={heading.ctaHref}
      items={items.map((item) => ({
        img: item.image ?? '',
        label: item.title ?? '',
        caption: item.body,
      }))}
    />
  );
}

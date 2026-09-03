import { BlogsBlock } from '@/components/ui/BlogsBlock';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function Blogs(props: { data: ResolvedSection }) {
  const { heading, items, style } = props.data;
  const resolved = resolveSectionStyle(style);

  return (
    <div className={resolved.wrapperClass}>
      <BlogsBlock
        align={resolved.align}
        eyebrow={heading.eyebrow}
        title={heading.title}
        cta={heading.ctaLabel}
        ctaHref={heading.ctaHref}
        posts={items.map((item) => ({
          ttl: item.title ?? '',
          date: item.date ?? '',
          img: item.image ?? '',
          href: item.href,
        }))}
      />
    </div>
  );
}

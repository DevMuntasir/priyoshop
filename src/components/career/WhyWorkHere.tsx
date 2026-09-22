import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

/**
 * Left-aligned "Why you might love to work here?" section with CMS content.
 */
export function WhyWorkHere(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const heading = props.data.heading;

  return (
    <section className={resolved.wrapperClass}>
      <div className="container mx-auto mt-10 px-4 pb-16 lg:pb-20">
        {heading.eyebrow ? (
          <Badge variant="outline" className="mb-3">
            {heading.eyebrow}
          </Badge>
        ) : null}
        <SectionHeading
          title={heading.title}
          description={heading.description}
          align={resolved.align}
        />
      </div>
    </section>
  );
}

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

/**
 * Dynamic Career Hero section rendered from CMS content.
 */
export function CareerHero(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const heading = props.data.heading;

  return (
    <section className={resolved.wrapperClass}>
      <div className="container mx-auto flex min-h-[24rem] flex-col items-center justify-center px-4 pt-28 pb-14 text-center sm:px-6 sm:pt-32 lg:px-8 lg:pt-40 lg:pb-20">
        <div className="max-w-[800px]">
          {heading.eyebrow ? (
            <Badge variant="outline" className="mb-4">
              {heading.eyebrow}
            </Badge>
          ) : null}
          <SectionHeading
            title={heading.title}
            titleColor="font-extrabold"
            titleSize="display"
            titleClassName={resolved.titleSizeClass || undefined}
            description={heading.description}
            align={resolved.align}
          />
          {heading.ctaLabel ? (
            <Button
              variant="filled"
              tone="dark"
              size="md"
              href={heading.ctaHref || '#open-positions'}
              className="mt-7"
            >
              {heading.ctaLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

import { Button } from '@/components/ui/Button';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { SectionHeading } from '../ui/SectionHeading';
import { AccentedTitle } from '../ui/AccentedTitle';


export function OpportunityServing(props: { data: ResolvedSection }) {
  const heading = props.data.heading;
  const bgImage = heading.backgroundImage?.trim() || '/opportunities/banner.png';

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="relative container mx-auto overflow-hidden rounded-3xl bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-red-500 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-start gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:py-14">
          {/* Left Content */}
          <div className="max-w-2xl text-white">
            <SectionHeading
              title={
                <AccentedTitle
                  text={heading.title}
                  emClass="text-ps-gold-500"
                />
              }
              align="left"
              description={heading.description}
              titleSize="h2"
              titleColor="text-white"
              descriptionColor="text-white/90"
            />

            {(heading.ctaLabel || heading.ctaSecondaryLabel) && (
              <div className="mt-10 flex flex-wrap gap-4">
                {heading.ctaLabel && (
                  <Button href={heading.ctaHref} variant="filled" tone="light" size="lg">
                    {heading.ctaLabel}
                  </Button>
                )}

                {heading.ctaSecondaryLabel && (
                  <Button href={heading.ctaSecondaryHref} variant="outlined" tone="light" size="lg">
                    {heading.ctaSecondaryLabel}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="hidden w-full max-w-[400px] justify-center lg:flex lg:justify-end" />
        </div>
      </div>
    </section>
  );
}

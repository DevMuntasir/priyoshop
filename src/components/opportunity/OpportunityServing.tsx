import { Button } from '@/components/ui/Button';
import type { ResolvedSection } from '@/libs/cms/Sections';


export function OpportunityServing(props: { data: ResolvedSection }) {
  const { heading } = props.data;
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="relative container mx-auto overflow-hidden rounded-3xl bg-[url('/opportunities/banner.png')] bg-cover bg-center bg-no-repeat ">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-red-500 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-start gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:gap-10 lg:px-12 lg:py-14">
          {/* Left Content */}
          <div className="max-w-2xl text-white ">
            <h2 className="font-display text-ps-h4 font-bold leading-tight text-balance sm:text-ps-h3 lg:text-ps-h2">
              {heading.title}
            </h2>

            {heading.description && (
              <p className="mt-5 max-w-2xl font-body text-ps-body leading-relaxed text-white/90 sm:mt-6">
                {heading.description}
              </p>
            )}

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
          </div>

          {/* Right Image */}
          <div className="hidden w-full max-w-[400px] justify-center lg:flex lg:justify-end">

          </div>
        </div>
      </div>
    </section>
  );
}

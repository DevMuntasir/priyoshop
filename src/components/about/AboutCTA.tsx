import { Button } from '@/components/ui/Button';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function AboutCta(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const backgroundImage = props.data.heading.backgroundImage ?? '/about/p.png';

  return (
    <section
      className={`${resolved.wrapperClass} px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20`}
    >
      <div className="mx-auto max-w-6xl overflow-hidden rounded-ps-md shadow">
        <div
          className="bg-cover bg-center bg-no-repeat text-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="flex min-h-80 items-center bg-white/70 px-4 py-10 backdrop-blur-[2px] sm:px-6">
            <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
              <h2 className="font-display text-ps-h4 font-bold text-ps-black sm:text-ps-h3 md:text-ps-h2">
                {props.data.heading.title}
              </h2>

              <p className="mx-auto mt-5 max-w-[750px] font-body text-ps-sm leading-relaxed text-ps-black sm:mt-6 sm:text-ps-body">
                {props.data.heading.description}
              </p>

              {props.data.heading.ctaLabel ? (
                <Button href={props.data.heading.ctaHref} className="mt-5" size="lg">
                  {props.data.heading.ctaLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

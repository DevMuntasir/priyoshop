import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ResponsiveHeroBackground } from '@/components/ui/ResponsiveHeroBackground';
import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function AboutHero(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);

  return (
    <div className={resolved.wrapperClass}>
      <section className="relative mt-5 min-h-[32svh] w-full overflow-hidden lg:min-h-[100dvh]">
        <ResponsiveHeroBackground
          mobile={props.data.heading.backgroundImage}
          tablet={props.data.heading.backgroundImageTablet}
          laptop={props.data.heading.backgroundImageLaptop}
          desktop={props.data.heading.backgroundImageDesktop}
        />
        <div className="min-h-[32svh] bg-gradient-to-r from-white via-white/85 to-transparent lg:min-h-[100dvh]">
          <div className="container mx-auto flex min-h-[32svh] flex-col justify-center gap-3 px-4 pt-28 pb-12 sm:px-6 md:gap-0 lg:min-h-[100dvh] lg:gap-6 lg:px-8">
            <Reveal direction="left" className="flex flex-col items-start gap-6 md:max-w-[600px]">
              <h1 className="text-left font-display text-ps-h2 leading-[1.25] font-extrabold sm:text-ps-display">
                <AccentedTitle
                  text={props.data.heading.title}
                  emClass="bg-gradient-to-r from-ps-red-500 to-yellow-500 bg-clip-text font-extrabold text-transparent"
                  strongClass="text-ps-red-500"
                />
              </h1>
            </Reveal>
            <Reveal direction="right" className="flex max-w-[300px] flex-col items-start gap-6 md:max-w-[500px]">
              <p className="font-body text-ps-body font-semibold">{props.data.heading.description}</p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ResponsiveHeroBackground } from '@/components/ui/ResponsiveHeroBackground';
import { Reveal } from '@/components/ui/Reveal';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';

export function DiptyHero(props: { data: ResolvedSection }) {
  const resolved = resolveSectionStyle(props.data.style);
  const hasCustomBg = Boolean(
    props.data.heading.backgroundImage
    || props.data.heading.backgroundImageTablet
    || props.data.heading.backgroundImageLaptop
    || props.data.heading.backgroundImageDesktop,
  );
  const mobileBg = props.data.heading.backgroundImage || (hasCustomBg ? undefined : '/dipty/bg.png');

  return (
    <section className={`${resolved.wrapperClass} relative min-h-[40svh] overflow-hidden lg:min-h-[100dvh]`}>
      <ResponsiveHeroBackground
        mobile={mobileBg}
        tablet={props.data.heading.backgroundImageTablet}
        laptop={props.data.heading.backgroundImageLaptop}
        desktop={props.data.heading.backgroundImageDesktop}
      />
      <div className="min-h-[40svh] bg-gradient-to-r from-white via-white to-transparent lg:min-h-[100dvh]">
        <div
          className={`container flex min-h-[40svh] flex-col justify-center px-4 pt-28 pb-12 sm:px-6 lg:min-h-[100dvh] lg:px-8 `}
        >
          <div className="max-w-[400px] lg:max-w-[700px]">
            <Reveal direction="right" delay={0}>
              <h1
                className={`max-w-[300px] font-display text-balance font-extrabold leading-[1.2] lg:max-w-full ${resolved.titleSizeClass || 'text-ps-h3 sm:text-ps-h2 lg:text-ps-h1 xl:text-ps-display'
                  } ${resolved.titleColorClass}`}
              >
                <AccentedTitle
                  text={props.data.heading.title}
                  emClass="via-ps-green bg-linear-to-l from-ps-green to-ps-green bg-clip-text text-transparent"
                />
              </h1>
            </Reveal>

            <Reveal direction="left" delay={0}>
              <p className="mt-4 max-w-[340px] font-body text-ps-sm font-semibold sm:mt-5 sm:text-ps-body lg:max-w-[500px]">
                {props.data.heading.description}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

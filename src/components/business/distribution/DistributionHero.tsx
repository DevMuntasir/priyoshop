import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { MetricStat } from '@/components/ui/MetricStat';
import { ResponsiveHeroBackground } from '@/components/ui/ResponsiveHeroBackground';
import { RollingNumber } from '@/components/ui/RollingNumber';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';

/* Rolls whole numbers, falls back to plain text for values like "200K+". */
function statValue(item: SectionItem): React.ReactNode {
  const numeric = Number(item.value);
  return Number.isInteger(numeric) && item.value !== ''
    ? <RollingNumber value={numeric} height={52} />
    : (item.value ?? '');
}

export function DistributionHero(props: { data: ResolvedSection }) {
  const hasCustomBg = Boolean(
    props.data.heading.backgroundImage
    || props.data.heading.backgroundImageTablet
    || props.data.heading.backgroundImageLaptop
    || props.data.heading.backgroundImageDesktop,
  );
  const mobileBg = props.data.heading.backgroundImage || (hasCustomBg ? undefined : '/distribution/bg.png');

  return (
    <section className="relative flex min-h-[40svh] flex-col justify-center  lg:min-h-[100dvh]">
      <ResponsiveHeroBackground
        mobile={mobileBg}
        tablet={props.data.heading.backgroundImageTablet}
        laptop={props.data.heading.backgroundImageLaptop}
        desktop={props.data.heading.backgroundImageDesktop}
      />
      <div className="relative z-10 min-h-[40svh]  bg-gradient-to-r lg:bg-transparent from-white lg:via-white/0 to-transparent pt-28 lg:min-h-[100dvh] lg:pt-32 lg:pb-12">
        <div className="container flex min-h-[40svh] flex-col justify-center px-4 sm:px-6 lg:min-h-[60svh] lg:px-8">
          <div className="w-full max-w-2xl lg:max-w-1/2">
            <h1 className="font-display text-ps-h1 font-extrabold leading-[1.2]">
              <AccentedTitle text={props.data.heading.title} emClass="text-ps-gold-500" strongClass="text-ps-red-600" />
            </h1>

            <p className="mt-5 max-w-4xl font-body text-ps-body font-semibold">
              {props.data.heading.description}
            </p>
          </div>
        </div>

        <div className="container z-10 mx-auto mt-10 grid w-full grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:absolute lg:-bottom-16 lg:left-1/2 lg:grid-cols-4 lg:-translate-x-1/2 lg:gap-5 lg:px-8">
          {props.data.items.map((item) => (
            <MetricStat
              key={item.name}
              className="rounded-ps-md bg-white px-4 py-5 text-center text-ps-red-500 shadow-ps-soft sm:px-6 lg:px-10"
              value={statValue(item)}
              label={item.name ?? ''}
              size="lg"
              align="center"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

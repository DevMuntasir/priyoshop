import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { MetricStat } from '@/components/ui/MetricStat';
import { ResponsiveHeroBackground } from '@/components/ui/ResponsiveHeroBackground';
import { RollingNumber } from '@/components/ui/RollingNumber';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';

/* Rolls whole numbers, falls back to plain text for values like "15+ Cr". */
function statValue(item: SectionItem): React.ReactNode {
  const numeric = Number(item.value);
  return Number.isInteger(numeric) && item.value !== ''
    ? <RollingNumber value={numeric} height={52} />
    : (item.value ?? '');
}

export function CommerceHero(props: { data: ResolvedSection }) {
  const hasCustomBg = Boolean(
    props.data.heading.backgroundImage
    || props.data.heading.backgroundImageTablet
    || props.data.heading.backgroundImageLaptop
    || props.data.heading.backgroundImageDesktop,
  );
  const mobileBg = props.data.heading.backgroundImage || (hasCustomBg ? undefined : '/commerce/bg.jpg');

  return (
    <section className="relative flex min-h-[30svh] flex-col justify-center  bg-ps-cream pt-28 pb-12 lg:min-h-[90svh] lg:pt-0">
      <ResponsiveHeroBackground
        mobile={mobileBg}
        tablet={props.data.heading.backgroundImageTablet}
        laptop={props.data.heading.backgroundImageLaptop}
        desktop={props.data.heading.backgroundImageDesktop}
      />
      <div className="container mx-auto flex min-h-[30svh] flex-col justify-center px-5 lg:min-h-[90svh]">
        <div className="max-w-[500px]">
          <h1
            className="font-display text-balance text-ps-h2 font-extrabold leading-[1.3] lg:text-ps-h1 xl:text-ps-display"
          >
            <AccentedTitle
              text={props.data.heading.title}
              emClass="gradient-text"
            />
          </h1>

          <p className="mt-5 text-left font-body text-ps-body font-semibold">
            {props.data.heading.description}
          </p>
        </div>
      </div>

      <div className="container absolute -bottom-14 left-1/2 z-50 flex w-full -translate-x-1/2 sm:bottom-[-4rem] sm:flex-row sm:gap-5 sm:px-6 md:-bottom-10 md:gap-3 md:px-4 lg:px-8">
        {props.data.items.map((item, i) => (
          <MetricStat
            key={i}
            className="flex-1 bg-white px-4 py-2 text-center text-ps-red-500"
            value={statValue(item)}
            label={item.name ?? ''}
            size="sm"
            align="center"
          />
        ))}
      </div>
    </section>
  );
}

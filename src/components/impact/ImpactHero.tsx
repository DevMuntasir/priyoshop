import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { ResponsiveHeroBackground } from '@/components/ui/ResponsiveHeroBackground';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { MetricStat } from '../ui/MetricStat';
import { RollingNumber } from '../ui/RollingNumber';
import { SectionHeading } from '../ui/SectionHeading';

export function ImpactHero(props: { data: ResolvedSection }) {
  const hasCustomBg = Boolean(
    props.data.heading.backgroundImage
    || props.data.heading.backgroundImageTablet
    || props.data.heading.backgroundImageLaptop
    || props.data.heading.backgroundImageDesktop,
  );
  const mobileBg = props.data.heading.backgroundImage || (hasCustomBg ? undefined : '/impact/bg.png');

  function statValue(item: SectionItem): React.ReactNode {
    const numeric = Number(item.value);
    return Number.isInteger(numeric) && item.value !== ''
      ? <RollingNumber value={numeric} height={52} />
      : (item.value ?? '');
  }

  return (
    <section className="relative flex min-h-[40svh] flex-col justify-center  pt-28 pb-12 lg:min-h-[100dvh]">
      <ResponsiveHeroBackground
        mobile={mobileBg}
        tablet={props.data.heading.backgroundImageTablet}
        laptop={props.data.heading.backgroundImageLaptop}
        desktop={props.data.heading.backgroundImageDesktop}
      />
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[600px]">
          <SectionHeading
            className="!font-extrabold"
            titleSize="display"
            titleColor="font-extrabold inline-block"
            descriptionFontClass="leading-[1.3]"
            title={(
              <AccentedTitle
                text={props.data.heading.title}
                emClass="text-ps-green"
              />
            )}
            description={props.data.heading.description}
            align="left"
          />
        </div>
      </div>

      <div className="container z-10 mx-auto mt-10 grid w-full grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:absolute lg:-bottom-16 lg:left-1/2 lg:grid-cols-4 lg:-translate-x-1/2 lg:gap-5 lg:px-8">
        {props.data.items.map((item) => (
          <MetricStat
            key={item.name}
            className="rounded-ps-md bg-white px-3 py-2 text-ps-green shadow-ps-soft lg:py-5"
            color="!text-ps-green"
            value={statValue(item)}
            label={item.name ?? ''}
            size="md"
            align="center"
          />
        ))}
      </div>
    </section>
  );
}

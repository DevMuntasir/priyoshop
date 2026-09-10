import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { MetricStat } from '@/components/ui/MetricStat';
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
  const { heading, items } = props.data;

  return (
    <section className="flex relative  min-h-[40svh] lg:min-h-[100svh] flex-col justify-center bg-[url(/distribution/bg.png)] bg-cover bg-center bg-no-repeat  lg:min-h-[100dvh] ">
      <div className="min-h-[40svh] lg:min-h-[60svh] bg-gradient-to-r pt-28 lg:pb-12 lg:pt-32 from-white via-white/85 to-transparent lg:min-h-[100dvh]">
        <div className="container flex min-h-[40svh] lg:min-h-[60svh] flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-2xl lg:max-w-1/2">
            <h1 className="font-display leading-[1.2] font-extrabold text-ps-h1 lg:text-ps-h1">
              <AccentedTitle text={heading.title} emClass="text-ps-gold-500" strongClass="text-ps-red-600" />
            </h1>

            <p className="text-ps-body  mt-5 max-w-4xl font-body font-semibold ">
              {heading.description}
            </p>

            {/* {heading.ctaLabel && (
            <Button href={heading.ctaHref} className="mt-12 ">
              {heading.ctaLabel}
            </Button>
          )} */}
          </div>
        </div>

        <div className=" lg:absolute lg:left-1/2 lg:-translate-[50%] lg:-bottom-32 container mt-10 z-10 mx-auto grid w-full grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-5 lg:px-8">
          {items.map(item => (
            <MetricStat
              key={item.name}
              className="rounded-ps-md text-ps-red-500 bg-white px-4 py-5 text-center shadow-ps-soft sm:px-6 lg:px-10"
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

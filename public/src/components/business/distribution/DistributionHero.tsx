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
    <section className="flex min-h-[100svh] flex-col justify-center bg-[url(/distribution/bg.png)] bg-cover bg-center bg-no-repeat pt-28 pb-12 lg:min-h-[100dvh] lg:pt-32">
      <div className="container flex min-h-[60svh] flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl lg:max-w-1/2">
          <h1 className="font-display text-ps-h2 leading-[1.2] font-extrabold sm:text-ps-h1 lg:text-ps-display">
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

      <div className="container z-10 mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-5 lg:px-8">
        {items.map(item => (
          <MetricStat
            key={item.name}
            className="rounded-ps-md bg-white px-4 py-5 text-center shadow-ps-soft sm:px-6 lg:px-10"
            value={statValue(item)}
            label={item.name ?? ''}
            size="lg"
            align="center"
          />
        ))}
      </div>
    </section>
  );
}

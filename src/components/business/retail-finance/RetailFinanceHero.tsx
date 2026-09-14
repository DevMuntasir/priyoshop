import { AccentedTitle } from '@/components/ui/AccentedTitle';
import { MetricStat } from '@/components/ui/MetricStat';
import { RollingNumber } from '@/components/ui/RollingNumber';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';

/* Rolls whole numbers, falls back to plain text for values like "15+ Cr". */
function statValue(item: SectionItem): React.ReactNode {
  const numeric = Number(item.value);
  return Number.isInteger(numeric) && item.value !== ''
    ? <RollingNumber value={numeric} height={52} />
    : (item.value ?? '');
}

export function RetailFinanceHero(props: { data: ResolvedSection }) {
  const bgImage = props.data.heading.backgroundImage || '/retail/bg.jpg';

  return (
    <section
      className="relative flex min-h-[40svh] flex-col justify-center bg-cover bg-center bg-no-repeat pt-28 pb-12 lg:min-h-[100dvh] lg:pt-32"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto flex min-h-[30svh] flex-col justify-center px-4 sm:px-6 lg:min-h-[60svh] lg:px-8">
        <div className="max-w-[700px]">
          <h1
            className="accented-text font-display text-balance text-ps-h4 font-extrabold leading-[1.3] sm:text-ps-h2 lg:text-ps-h1 xl:text-ps-display"
          >
            <AccentedTitle
              text={props.data.heading.title}
              emClass="gradient-text inline-block"
            />
          </h1>

          <p className="mt-5 max-w-[600px] text-left font-body text-ps-xs font-semibold lg:text-ps-body">
            {props.data.heading.description}
          </p>
        </div>
      </div>

      <div className="container z-10 mx-auto mt-10 grid w-full grid-cols-2 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:absolute lg:-bottom-16 lg:left-1/2 lg:grid-cols-3 lg:-translate-x-1/2 lg:gap-5 lg:px-8">
        {props.data.items.map((item, i) => (
          <MetricStat
            key={i}
            className="rounded-ps-md bg-white px-4 py-5 text-center text-ps-red-500 shadow-ps-soft sm:px-6 lg:px-10"
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


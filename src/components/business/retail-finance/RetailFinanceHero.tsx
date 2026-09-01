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
  const { heading, items } = props.data;

  return (

    <section className="flex min-h-[100svh] flex-col justify-center bg-[url(/retail/bg.png)] bg-cover bg-center bg-no-repeat pt-28 pb-12 lg:min-h-[100dvh] lg:pt-32">
      <div className="container mx-auto flex min-h-[60svh] flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-[600px]">




          <h1
            className='accented-text font-display font-extrabold leading-[1.3] text-balance text-ps-h4 sm:text-ps-h2 lg:text-ps-h1 xl:text-ps-display'
          >

            <AccentedTitle
              text={heading.title}
              emClass="gradient-text inline-block"

            />
          </h1>


          <p className="text-ps-body mt-5  text-left font-body font-semibold ">
            {heading.description}
          </p>

          {/* {heading.ctaLabel && (
            <Button href={heading.ctaHref} className="mt-12">
              {heading?.ctaLabel}
            </Button>
          )} */}
        </div>
      </div>


      <div className="container z-10 mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-5 lg:px-8">
        {items.map((item, i) => (
          <MetricStat
            key={i}
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


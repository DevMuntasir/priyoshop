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

export function CommerceHero(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;

  return (
    <section className="flex  relative min-h-[30svh] lg:min-h-[90svh] flex-col justify-center bg-ps-cream pt-28 pb-12  lg:pt-0">
      <div className="container px-5 mx-auto flex min-h-[30svh] lg:min-h-[90svh]  flex-col justify-center">
        <div className="max-w-[500px]">
          <h1
            className={`font-display font-extrabold leading-[1.3] text-balance text-ps-h2 lg:text-ps-h1 xl:text-ps-display`}
          >

            <AccentedTitle
              text={heading.title}
              emClass="gradient-text"
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


      <div className="absolute -bottom-14 md:-bottom-10 left-1/2 z-50 flex w-full container -translate-x-1/2  md:gap-3 md:px-4 sm:bottom-[-4rem] sm:flex-row sm:gap-5 sm:px-6 lg:px-8">
        {items.map((item, i) => (
          <MetricStat
            key={i}
            className=" bg-white px-4 py-2 flex-1 text-center text-ps-red-500 "
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

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

    <section className="bg-[url(/retail/bg.png)] bg-cover bg-no-repeat bg-center h-screen py-20 mb-25">
      <div className="container mx-auto flex flex-col justify-center h-full">
        <div className='max-w-[600px]'>




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


      <div className="z-10 container mx-auto flex gap-5 justify-center h-37.5">
        {items.map((item, i) => (
          <MetricStat
            key={i}
            className="text-center bg-white py-4 px-10  rounded-ps-md"
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


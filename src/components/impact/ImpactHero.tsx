import { AccentedTitle } from '@/components/ui/AccentedTitle';
import type { ResolvedSection, SectionItem } from '@/libs/cms/Sections';
import { SectionHeading } from '../ui/SectionHeading';
import { MetricStat } from '../ui/MetricStat';
import { RollingNumber } from '../ui/RollingNumber';

export function ImpactHero(props: { data: ResolvedSection }) {
  const { heading, items } = props.data;
  function statValue(item: SectionItem): React.ReactNode {
    const numeric = Number(item.value);
    return Number.isInteger(numeric) && item.value !== ''
      ? <RollingNumber value={numeric} height={52} />
      : (item.value ?? '');
  }
  return (
    <>
      <section className="flex min-h-[78svh] items-center bg-[url(/impact/bg.png)] bg-cover bg-center bg-no-repeat pt-28 pb-12 lg:min-h-[85dvh]">
        <div
          className="container px-4 sm:px-6 lg:px-8"
        >

          <div className=' max-w-[600px]'>
            <SectionHeading
              className='!font-extrabold'
              titleSize='display'
              titleColor='font-extrabold inline-block '
              descriptionFontClass=' leading-[1.3]'
              title={<AccentedTitle
                text={heading.title}
                emClass='text-ps-green  '
              />}
              description={heading.description}
              align='left'
            />
          </div>
        </div>

      </section>
      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="z-10 mx-auto grid w-full grid-cols-1 justify-center gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {items.map(item => (
              <MetricStat
                key={item.name}
                className="rounded-ps-md bg-white px-3 py-5 !text-ps-green shadow-ps-soft"
                color='!text-ps-green'
                value={statValue(item)}
                label={item.name ?? ''}
                size="lg"
                align="center"
              />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}

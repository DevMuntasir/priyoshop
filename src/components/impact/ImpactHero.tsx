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
      <section className={`  bg-[url(/impact/bg.png)] bg-cover bg-no-repeat bg-center min-h-screen content-center`}>
        <div
          className={` container`}
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
      <section>
        <div className="container relative">
          <div className="z-10 absolute -bottom-16 left-[50%]  -translate-x-[50%] mx-auto grid grid-cols-4 w-full gap-5 justify-center h-37.5">
            {items.map(item => (
              <MetricStat
                key={item.name}
                className=" !text-ps-green "
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

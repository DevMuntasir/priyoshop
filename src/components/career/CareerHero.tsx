import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

/* Cream hero: "Careers" title + supporting copy + CTA scrolling to Open Positions. */
export async function CareerHero(props: { locale: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'Career' });

  return (
    <div className="container mx-auto flex flex-col items-center px-4 pt-32 content-center text-center lg:pt-40 pb-14 lg:pb-20">

      <div className=' max-w-[800px]'>
        <SectionHeading
          title={t('hero_title')}
          titleColor=' font-extrabold'
          titleSize='display'
          description={t('hero_description')}
        />
        <Button variant="filled" tone="dark" size="md" href="#open-positions" className="mt-7">
          {t('explore_positions')}
        </Button>
      </div>
    </div>
  );
}

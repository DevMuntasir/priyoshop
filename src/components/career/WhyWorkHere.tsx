import { getTranslations } from 'next-intl/server';
import { SectionHeading } from '../ui/SectionHeading';

/* Left-aligned "Why you might love to work here?" heading + supporting paragraph. */
export async function WhyWorkHere(props: { locale: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'Career' });

  return (
    <div className="container mx-auto mt-10 px-4 pb-16 lg:pb-20">
      {/* <h2 className="m-0 font-display text-ps-h5 font-bold tracking-tight text-ps-black sm:text-ps-h4">
        {t('why_work_title')}
      </h2>
      <p className="mt-4 max-w-4xl font-body text-ps-sm leading-relaxed  text-ps-black-400 sm:text-ps-body">
        {t('why_work_description')}
      </p> */}
      <SectionHeading
        title={t('why_work_title')}
        description={t('why_work_description')}
      />
    </div>
  );
}

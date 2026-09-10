import { getTranslations } from 'next-intl/server';
import { formatJobDate } from './formatJobDate';

/* Yellow banner stating the application deadline for a job posting. */
export async function DeadlineBanner(props: { locale: string; deadline: string }) {
  const t = await getTranslations({ locale: props.locale, namespace: 'CareerSlug' });

  return (
    <div className="bg-ps-cream-yellow py-4 text-center">
      <p className="m-0 font-body text-ps-sm font-semibold text-ps-black">
        {t('application_deadline_label', { date: formatJobDate(props.deadline, props.locale) })}
      </p>
    </div>
  );
}

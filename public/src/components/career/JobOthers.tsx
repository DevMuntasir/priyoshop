import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/ui/Badge';

function Fact(props: { label: string; value: string }) {
  if (!props.value) {
    return null;
  }
  return (
    <div>
      <span className="mb-2 block font-body text-ps-body font-bold text-ps-black">{props.label}</span>
      <Badge>{props.value}</Badge>
    </div>
  );
}

/* "Others" section: experience/employment-type/salary pills plus the benefits list. */
export async function JobOthers(props: {
  locale: string;
  experienceRequirement: string;
  jobType: string;
  salary: string;
  benefits: string[];
}) {
  const t = await getTranslations({ locale: props.locale, namespace: 'CareerSlug' });

  return (
    <div className="space-y-6">
      <h2 className="m-0 font-display text-ps-h6 font-bold text-ps-black">{t('others_heading')}</h2>

      <Fact label={t('experience_label')} value={props.experienceRequirement} />
      <Fact label={t('employment_type_label')} value={props.jobType} />
      <Fact label={t('salary_label')} value={props.salary} />

      {props.benefits.length > 0 && (
        <div>
          <span className="mb-2 block font-body text-ps-body font-bold text-ps-black">
            {t('benefits_heading')}
          </span>
          <ol className="m-0 list-decimal space-y-1 pl-5 font-body text-ps-sm font-semibold text-ps-black-400">
            {props.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

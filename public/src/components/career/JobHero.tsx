import { getTranslations } from 'next-intl/server';

function Pill(props: { label: string; value: string }) {
  if (!props.value) {
    return null;
  }
  return (
    <div>
      <span className="block font-body text-ps-xs font-semibold text-white/60">{props.label}</span>
      <span className="mt-2 inline-flex items-center rounded-full px-4 py-1.5 font-body text-ps-sm font-semibold text-white ring-[1.5px] ring-inset ring-white/70">
        {props.value}
      </span>
    </div>
  );
}

/* Black hero: breadcrumb, job title and the four key-fact pills (location/type/level/pay). */
export async function JobHero(props: {
  locale: string;
  category: string;
  title: string;
  location: string;
  jobType: string;
  level: string;
  compensation: string;
}) {
  const t = await getTranslations({ locale: props.locale, namespace: 'Career' });

  return (
    <div className="bg-black pt-32 pb-16 lg:pt-40 lg:pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="font-body text-ps-xs font-semibold text-white/60">
          {t('title')}
          {props.category && <> &gt; {props.category}</>}
        </nav>

        <h1 className="m-0 mt-4 max-w-3xl font-display text-ps-h5 leading-[1.3] font-bold text-balance text-white sm:text-ps-h4 lg:text-ps-h3">
          {props.title}
        </h1>

        <div className="mt-8 flex flex-wrap gap-6 sm:gap-10">
          <Pill label={t('location_label')} value={props.location} />
          <Pill label={t('job_type_label')} value={props.jobType} />
          <Pill label={t('level_label')} value={props.level} />
          <Pill label={t('compensation_label')} value={props.compensation} />
        </div>
      </div>
    </div>
  );
}

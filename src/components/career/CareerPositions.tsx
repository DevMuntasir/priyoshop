'use client';

import { useLocale, useTranslations } from 'next-intl';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { resolveSectionStyle } from '@/libs/cms/StyleTokens';
import { useCareerJobs } from './CareerJobsContext';
import { OpenPositions } from './OpenPositions';

/**
 * Dynamic Open Positions section wrapping the interactive job board with CMS content.
 */
export function CareerPositions(props: { data: ResolvedSection }) {
  const locale = useLocale();
  const t = useTranslations('Career');
  const jobs = useCareerJobs(locale);
  const resolved = resolveSectionStyle(props.data.style);

  const title = props.data.heading.title || t('open_positions_title');

  return (
    <div className={resolved.wrapperClass}>
      <OpenPositions
        jobs={jobs}
        locale={locale}
        title={title}
        allLabel={t('category_all_label')}
        vacancyLabel={t('vacancy_label')}
        deadlineLabel={t('deadline_label')}
        applyLabel={t('apply_label')}
        loadMoreLabel={t('load_more')}
      />
    </div>
  );
}

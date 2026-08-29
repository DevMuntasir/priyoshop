import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { JobPostingCard } from '@/libs/career/Types';
import { formatJobDate } from './formatJobDate';

/* One open-position row: title + vacancy/deadline line, status tags, Apply Now. */
export function JobRow(props: {
  job: JobPostingCard;
  locale: string;
  vacancyLabel: string;
  deadlineLabel: string;
  applyLabel: string;
}) {
  const { job } = props;

  return (
    <div className="flex flex-col gap-4 bg-white px-8 rounded-ps-md border-b border-ps-grey-150 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className=' flex gap-7 items-center'>
        <div>
          <h3 className="m-0 font-body text-ps-body lg:text-ps-h6 font-bold text-ps-black">{job.title}</h3>
          <p className="m-0 mt-1 font-body text-ps-xs font-semibold text-ps-ink-300">
            {props.vacancyLabel} {job.vacancy} · {props.deadlineLabel}: {formatJobDate(job.deadline, props.locale)}
          </p>
        </div>
        <div className=' flex gap-2 h-fit'>
          {job.workMode && <Badge size="sm">{job.workMode}</Badge>}
          {job.jobType && <Badge size="sm">{job.jobType}</Badge>}
          {job.level && <Badge size="sm">{job.level}</Badge>}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">

        <Button href={`/career/${job.slug}`} variant="filled" tone="dark" size="sm">
          {props.applyLabel}
        </Button>
      </div>
    </div>
  );
}

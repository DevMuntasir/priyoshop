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
    <div className="w-full rounded-ps-md border-b border-ps-grey-150 bg-white px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
            <div className="min-w-0 flex-1">
              <h3 className="m-0 break-words font-body text-ps-body font-bold text-ps-black lg:text-ps-h6">
                {job.title}
              </h3>
              <p className="m-0 mt-1 break-words font-body text-ps-xs font-semibold text-ps-ink-300">
                {props.vacancyLabel} {job.vacancy} · {props.deadlineLabel}:{' '}
                {formatJobDate(job.deadline, props.locale)}
              </p>
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {job.workMode && <Badge size="sm">{job.workMode}</Badge>}
              {job.jobType && <Badge size="sm">{job.jobType}</Badge>}
              {job.level && <Badge size="sm">{job.level}</Badge>}
            </div>
          </div>
        </div>

        <div className="flex w-full justify-stretch sm:w-auto sm:justify-end">
          <Button
            href={`/career/${job.slug}`}
            variant="filled"
            tone="dark"
            size="sm"
            className="w-full sm:w-auto py-2"
          >
            {props.applyLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

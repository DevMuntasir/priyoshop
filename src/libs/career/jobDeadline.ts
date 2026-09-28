/**
 * Deadline and auto-cleanup utilities for job postings.
 */

/** 1 week in milliseconds (7 days). */
export const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Returns the effective deadline Date.
 * If the deadline date is at midnight UTC (00:00:00.000Z) — typical of HTML date pickers —
 * it extends the validity through the end of that UTC day (23:59:59.999Z).
 *
 * @param deadline ISO string or Date object.
 * @returns The effective Date representing the exact cutoff.
 */
export function getEffectiveDeadline(deadline: string | Date): Date {
  const date = new Date(deadline);
  if (
    date.getUTCHours() === 0 &&
    date.getUTCMinutes() === 0 &&
    date.getUTCSeconds() === 0 &&
    date.getUTCMilliseconds() === 0
  ) {
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
    return endOfDay;
  }
  return date;
}

/**
 * Checks whether a job's application deadline has passed.
 *
 * @param deadline The job's deadline (ISO string or Date).
 * @param now Current timestamp (defaults to current system time).
 * @returns True when the deadline cutoff is in the past.
 */
export function isJobDeadlinePassed(deadline: string | Date, now: Date = new Date()): boolean {
  const effective = getEffectiveDeadline(deadline);
  return now.getTime() > effective.getTime();
}

/**
 * Checks whether a job has passed its deadline and is within the 1-week grace period.
 * During this period, the job row displays "Expired" / "Closed" and the Apply button is disabled.
 *
 * @param deadline The job's deadline (ISO string or Date).
 * @param now Current timestamp (defaults to current system time).
 * @returns True when expired and within 7 days past deadline.
 */
export function isJobExpiredWithinGracePeriod(
  deadline: string | Date,
  now: Date = new Date(),
): boolean {
  const effective = getEffectiveDeadline(deadline);
  const diff = now.getTime() - effective.getTime();
  return diff > 0 && diff <= ONE_WEEK_MS;
}

/**
 * Checks whether a job's deadline passed more than 1 week ago.
 * Such jobs must be auto-deleted from the database and omitted from all listings.
 *
 * @param deadline The job's deadline (ISO string or Date).
 * @param now Current timestamp (defaults to current system time).
 * @returns True when the deadline is older than 7 days.
 */
export function isJobPastAutoDeleteThreshold(
  deadline: string | Date,
  now: Date = new Date(),
): boolean {
  const effective = getEffectiveDeadline(deadline);
  const diff = now.getTime() - effective.getTime();
  return diff > ONE_WEEK_MS;
}

/**
 * Calculates how many days remain before auto-deletion for an expired job.
 *
 * @param deadline The job's deadline (ISO string or Date).
 * @param now Current timestamp (defaults to current system time).
 * @returns Number of days remaining (rounded up), or 0 if threshold passed.
 */
export function getDaysUntilAutoDelete(deadline: string | Date, now: Date = new Date()): number {
  const effective = getEffectiveDeadline(deadline);
  const remainingMs = effective.getTime() + ONE_WEEK_MS - now.getTime();
  if (remainingMs <= 0) {
    return 0;
  }
  return Math.ceil(remainingMs / (24 * 60 * 60 * 1000));
}

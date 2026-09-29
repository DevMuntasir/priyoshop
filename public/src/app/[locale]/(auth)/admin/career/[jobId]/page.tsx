import { setRequestLocale } from 'next-intl/server';
import { JobPostingEditor } from '@/components/admin/career/JobPostingEditor';

export default async function AdminJobPostingEditPage(props: {
  params: Promise<{ locale: string; jobId: string }>;
}) {
  const { locale, jobId } = await props.params;
  setRequestLocale(locale);

  return <JobPostingEditor jobId={jobId} />;
}

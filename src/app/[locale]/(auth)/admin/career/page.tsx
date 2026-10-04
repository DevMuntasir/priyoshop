import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ContentList } from '@/components/admin/content/ContentList';
import { Button } from '@/components/ui/Button';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listJobPostings } from '@/libs/career/CareerRepository';
import { getDaysUntilAutoDelete, isJobDeadlinePassed } from '@/libs/career/jobDeadline';

export const metadata = { title: 'Careers' };

export default async function AdminCareerPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.careerRead);
  if (guard.error) {
    redirect('/');
  }

  const entries = await listJobPostings();

  return (
    <main>
      <AdminPageHeader
        title="Careers"
        description="Manage opportunities, review drafts and keep your careers page up to date."
        action={
          <div className="flex flex-wrap gap-3">
            <Button href="/admin/career/new" tone="brand">
              New job posting
            </Button>
          </div>
        }
      />
      <ContentList
        title="Job postings"
        description="Manage your latest 200 job postings and keep application deadlines in view."
        dateHeading="Deadline"
        createHref="/admin/career/new"
        createLabel="New job posting"
        items={entries.map((entry) => ({
          id: entry.jobId,
          title: entry.content.en?.title?.trim() ? entry.content.en.title : entry.slug,
          subtitle: `/career/${entry.slug}`,
          href: `/admin/career/${entry.jobId}`,
          categories: entry.category ? [entry.category] : [],
          status: entry.status,
          date: entry.deadline.toISOString(),
          dateLabel: entry.deadline.toLocaleDateString('en-GB', {
            timeZone: 'UTC',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          warning: isJobDeadlinePassed(entry.deadline)
            ? `Expired · Auto-deletes in ${getDaysUntilAutoDelete(entry.deadline)} days`
            : undefined,
        }))}
      />
    </main>
  );
}

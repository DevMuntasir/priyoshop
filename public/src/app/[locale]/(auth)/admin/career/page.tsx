import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Stack } from '@/components/ui/Grid';
import { Text } from '@/components/ui/Text';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listJobPostings } from '@/libs/career/CareerRepository';

export const metadata = {
  title: 'Careers',
};

export default async function AdminCareerPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.careerRead);
  if (guard.error) {
    redirect('/');
  }

  const jobs = await listJobPostings();

  return (
    <main className="space-y-6 ">
      <AdminPageHeader
        title="Careers"
        description="Write, publish and manage the job postings shown on the public Careers page."
      />

      <div className="px-8  space-y-4">
        <div>
          <Link href="/admin/career/new">
            <Button>New job posting</Button>
          </Link>
        </div>

        {jobs.length === 0 ? (
          <Card padding="lg">
            <Text size="body" className="text-ps-ink-600">
              No job postings yet. Create one to get started.
            </Text>
          </Card>
        ) : (
          <div className="grid gap-4">
            {jobs.map((job) => (
              <Link key={job.jobId} href={`/admin/career/${job.jobId}`}>
                <Card padding="md" border className="cursor-pointer transition-shadow hover:shadow-md">
                  <Stack gap="sm">
                    <Stack direction="row" align="center" gap="md" className="flex w-full justify-between">
                      <div className="flex-1">
                        <Text size="body" weight="semibold">
                          {job.content.en?.title || job.slug}
                        </Text>
                        <Text size="sm" className="text-ps-ink-600">
                          /career/{job.slug}
                        </Text>
                      </div>
                      <span
                        className={`inline-block rounded-ps-sm px-3 py-1 text-ps-xs font-semibold ${job.status === 'published'
                          ? 'bg-ps-green-tint text-ps-black'
                          : 'bg-ps-grey-100 text-ps-ink-600'
                        }`}
                      >
                        {job.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </Stack>
                    <Text size="xs" className="text-ps-ink-600">
                      {job.category || 'No category'} ·{' '}
                      {new Date(job.deadline).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </Text>
                  </Stack>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

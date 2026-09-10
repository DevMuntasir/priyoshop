import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Card } from '@/components/ui/Card';
import { Stack } from '@/components/ui/Grid';
import { Text } from '@/components/ui/Text';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listContactSubmissions } from '@/libs/contact/ContactRepository';

export const metadata = {
  title: 'Contact Messages',
};

export default async function AdminContactPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.contactRead);
  if (guard.error) {
    redirect('/');
  }

  const submissions = await listContactSubmissions();

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title="Contact Messages"
        description="Messages visitors sent through the public Contact us page."
      />

      <div className="space-y-4 px-8">
        {submissions.length === 0 ? (
          <Card padding="lg">
            <Text size="body" className="text-ps-ink-600">
              No contact messages yet.
            </Text>
          </Card>
        ) : (
          <div className="grid gap-4">
            {submissions.map((submission) => (
              <Card key={submission.submissionId} padding="md" border>
                <Stack gap="sm">
                  <Stack direction="row" align="center" gap="md" className="flex w-full justify-between">
                    <div className="flex-1">
                      <Text size="body" weight="semibold">
                        {submission.name}
                      </Text>
                      <a
                        href={`mailto:${submission.email}`}
                        className="font-body text-ps-sm text-ps-ink-600 underline"
                      >
                        {submission.email}
                      </a>
                    </div>
                    <Text size="xs" className="shrink-0 text-ps-ink-600">
                      {submission.createdAt.toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </Stack>
                  <Text size="sm" className="whitespace-pre-wrap text-ps-ink-700">
                    {submission.message}
                  </Text>
                </Stack>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

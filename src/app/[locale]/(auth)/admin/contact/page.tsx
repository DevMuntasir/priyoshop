import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ContactInbox } from '@/components/admin/contact/ContactInbox';
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
    <main>
      <AdminPageHeader
        title="Contact messages"
      />

      <ContactInbox
        submissions={submissions.map((submission) => ({
          submissionId: submission.submissionId,
          name: submission.name,
          email: submission.email,
          message: submission.message,
          createdAt: submission.createdAt.toISOString(),
          receivedAt: submission.createdAt.toLocaleString('en-GB', {
            timeZone: 'Asia/Dhaka',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }))}
      />
    </main>
  );
}

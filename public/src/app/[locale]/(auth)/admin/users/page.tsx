import { setRequestLocale } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { UsersManager } from '@/components/admin/rbac/UsersManager';

export default async function AdminUsersPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div>
      <AdminPageHeader
        title="Users"
        description="Create staff accounts and assign each a role that grants their permissions."
      />
      <UsersManager />
    </div>
  );
}

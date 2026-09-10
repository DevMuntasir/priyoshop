import { setRequestLocale } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { RolesManager } from '@/components/admin/rbac/RolesManager';

export default async function AdminRolesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div>
      <AdminPageHeader
        title="Roles"
        description="Create roles and assign permissions. The system admin role always has full access."
      />
      <RolesManager />
    </div>
  );
}

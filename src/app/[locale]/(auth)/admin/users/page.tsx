import { setRequestLocale } from 'next-intl/server';
import { UsersManager } from '@/components/admin/rbac/UsersManager';

export default async function AdminUsersPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <UsersManager />;
}

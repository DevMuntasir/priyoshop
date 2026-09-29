import { setRequestLocale } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default async function AdminSettingsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div>
      <AdminPageHeader
        title="Settings"
        description="Manage brand details, locales and global configuration."
      />
      <AdminPlaceholder message="Settings are not available yet. This is where global site configuration will live." />
    </div>
  );
}

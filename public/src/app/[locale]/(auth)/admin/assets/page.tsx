import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AssetLibrary } from '@/components/admin/assets/AssetLibrary';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';

export const metadata = {
  title: 'Asset Library',
};

export default async function AdminAssetsPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.assetsRead);
  if (guard.error) {
    redirect('/admin');
  }

  return (
    <main className="space-y-6 pb-12">
      <AdminPageHeader
        title="Asset Library"
        description="Centralized cloud media library. Upload, preview, resize, and organize images and assets."
      />
      <div className="px-8">
        <AssetLibrary />
      </div>
    </main>
  );
}

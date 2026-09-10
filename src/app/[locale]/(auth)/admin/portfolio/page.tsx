import { setRequestLocale } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

export default async function AdminPortfolioPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div>
      <AdminPageHeader title="Portfolio" description="Add, reorder and update portfolio entries." />
      <AdminPlaceholder message="Portfolio management is not available yet. This is where you will manage portfolio entries." />
    </div>
  );
}

import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { NewsPostEditor } from '@/components/admin/news/NewsPostEditor';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listCategories } from '@/libs/categories/CategoryRepository';

export default async function AdminNewsPostEditPage(props: {
  params: Promise<{ locale: string; postId: string }>;
}) {
  const { locale, postId } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.newsRead);
  if (guard.error) {
    redirect('/');
  }
  const categories = await listCategories('news');
  return <NewsPostEditor postId={postId} categories={categories} />;
}

import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { BlogPostEditor } from '@/components/admin/media/BlogPostEditor';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listCategories } from '@/libs/categories/CategoryRepository';

export default async function AdminBlogPostEditPage(props: {
  params: Promise<{ locale: string; postId: string }>;
}) {
  const { locale, postId } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.blogRead);
  if (guard.error) {
    redirect('/');
  }
  const categories = await listCategories('blog');
  return <BlogPostEditor postId={postId} categories={categories} />;
}

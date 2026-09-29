import { setRequestLocale } from 'next-intl/server';
import { BlogPostEditor } from '@/components/admin/media/BlogPostEditor';

export default async function AdminBlogPostEditPage(props: {
  params: Promise<{ locale: string; postId: string }>;
}) {
  const { locale, postId } = await props.params;
  setRequestLocale(locale);

  return <BlogPostEditor postId={postId} />;
}

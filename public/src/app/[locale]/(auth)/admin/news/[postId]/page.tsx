import { setRequestLocale } from 'next-intl/server';
import { NewsPostEditor } from '@/components/admin/news/NewsPostEditor';

export default async function AdminNewsPostEditPage(props: {
  params: Promise<{ locale: string; postId: string }>;
}) {
  const { locale, postId } = await props.params;
  setRequestLocale(locale);

  return <NewsPostEditor postId={postId} />;
}

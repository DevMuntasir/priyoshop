import { setRequestLocale } from 'next-intl/server';
import { NewsPublicationEditor } from '@/components/admin/news/NewsPublicationEditor';

export default async function AdminNewsPublicationEditPage(props: {
  params: Promise<{ locale: string; publicationId: string }>;
}) {
  const { locale, publicationId } = await props.params;
  setRequestLocale(locale);

  return <NewsPublicationEditor publicationId={publicationId} />;
}

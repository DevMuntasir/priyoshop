import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { NewNewsPostEditor } from '@/components/admin/news/NewNewsPostEditor';
import { PERMISSIONS } from '@/libs/auth/Permissions';
import { requirePermission } from '@/libs/auth/Rbac';
import { listCategories } from '@/libs/categories/CategoryRepository';
import { listNewsPublications } from '@/libs/news/NewsPublicationRepository';

export default async function NewNewsPostPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const guard = await requirePermission(PERMISSIONS.newsUpdate);
  if (guard.error) {
    redirect('/');
  }

  const [categories, publications] = await Promise.all([
    listCategories('news'),
    listNewsPublications(),
  ]);

  return (
    <NewNewsPostEditor
      categories={categories}
      publications={publications.map((publication) => ({
        publicationId: publication.publicationId,
        name: publication.name,
      }))}
    />
  );
}

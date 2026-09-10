import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SectionsManager } from '@/components/admin/cms/SectionsManager';
import { getPageDef, isPageKey } from '@/libs/cms/Pages';
import { Link } from '@/libs/I18nNavigation';

export default async function AdminPageSectionsPage(props: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale, page } = await props.params;
  setRequestLocale(locale);

  if (!isPageKey(page)) {
    notFound();
  }

  const def = getPageDef(page);

  return (
    <div>
      <AdminPageHeader
        title={`${def.label} page`}
        description="Edit the content and styling of each section on this page. Changes go live on save."
        action={(
          <Link
            href={`/admin/seo/${page}`}
            className="inline-flex bg-ps-red-500 text-white rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-900"
          >
            Edit SEO for this page →
          </Link>
        )}
      />
      <SectionsManager page={page} />
    </div>
  );
}

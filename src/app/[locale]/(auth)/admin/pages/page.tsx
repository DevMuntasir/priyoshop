import { setRequestLocale } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { listPageDefs } from '@/libs/cms/Pages';
import { Link } from '@/libs/I18nNavigation';

export default async function AdminPagesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const pages = listPageDefs();

  return (
    <div>
      <AdminPageHeader
        title="Pages"
        description="Select a marketing page to edit the sections that render on it."
      />
      <div className="mt-6 space-y-3 px-8 max-w-4xl">
        {pages.map((page) => (
          <Link
            key={page.key}
            href={`/admin/pages/${page.key}`}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4 transition-colors hover:border-gray-900"
          >
            <div className="font-medium text-gray-900">{page.label}</div>
            <div className="text-xs text-gray-400">{page.path}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

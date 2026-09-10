import { setRequestLocale } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { listPageDefs } from '@/libs/cms/Pages';
import { Link } from '@/libs/I18nNavigation';

export default async function AdminSeoPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const pages = listPageDefs();

  return (
    <div>
      <AdminPageHeader
        title="SEO"
        description="Select a page to override its metadata — title, description and social tags — per locale."
      />
      <div className="mt-6 space-y-3">
        {pages.map((page) => (
          <Link
            key={page.key}
            href={`/admin/seo/${page.key}`}
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

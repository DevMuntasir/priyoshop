import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SeoEditor } from '@/components/admin/seo/SeoEditor';
import { getPageDef, isPageKey } from '@/libs/cms/Pages';

export default async function AdminSeoEditPage(props: {
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
        title={`${def.label} — SEO`}
        description="Override the metadata for this page per language. Blank fields fall back to the page's default copy."
      />
      <SeoEditor pageKey={page} />
    </div>
  );
}

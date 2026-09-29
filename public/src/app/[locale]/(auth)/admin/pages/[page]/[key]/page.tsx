import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SectionEditor } from '@/components/admin/cms/SectionEditor';
import { isPageKey } from '@/libs/cms/Pages';
import { isSectionKey, listSectionKeysByPage } from '@/libs/cms/Sections';

export default async function AdminSectionEditPage(props: {
  params: Promise<{ locale: string; page: string; key: string }>;
}) {
  const { locale, page, key } = await props.params;
  setRequestLocale(locale);

  // The section must exist and belong to this page.
  if (!isPageKey(page) || !isSectionKey(key) || !listSectionKeysByPage(page).includes(key)) {
    notFound();
  }

  // Full-bleed: cancel the admin `main` padding so the editor split fills the viewport.
  return (
    <div >
      <SectionEditor page={page} sectionKey={key} />
    </div>
  );
}

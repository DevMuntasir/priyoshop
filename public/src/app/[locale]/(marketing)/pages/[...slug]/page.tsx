import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getBuilderPageBySlug } from '@/libs/builder/BuilderPageRepository';
import { BuilderRenderer } from '@/libs/builder/BuilderRenderer';
import { buildPageMetadata } from '@/utils/Seo';

type PageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export const revalidate = 3600;

export async function generateMetadata(props: PageProps) {
  const { locale, slug } = await props.params;
  const slugStr = slug.join('/');

  const page = await getBuilderPageBySlug(slugStr);

  if (!page || page.status !== 'published') {
    return { title: 'Not found' };
  }

  return buildPageMetadata({
    path: `/pages/${slugStr}`,
    locale,
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription ?? '',
    robots: { index: true, follow: true },
  });
}

export default async function PageBuilderPage(props: PageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const slugStr = slug.join('/');
  const page = await getBuilderPageBySlug(slugStr);

  if (!page || page.status !== 'published') {
    notFound();
  }

  return (
    <main className="pt-20 sm:pt-24">
      {page.blocks.map((block) => (
        <div key={block.id}>
          <BuilderRenderer block={block} />
        </div>
      ))}
    </main>
  );
}

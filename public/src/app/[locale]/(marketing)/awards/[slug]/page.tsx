import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AwardDetailBody } from '@/components/awards/AwardDetailBody';
import { AwardDetailHero } from '@/components/awards/AwardDetailHero';
import { OtherAwards } from '@/components/awards/OtherAwards';
import { JsonLd } from '@/components/seo/JsonLd';
import { decodeAwardSlug, getAwardBySlug, listAwards, listAwardSlugs } from '@/libs/awards/AwardService';
import { routing } from '@/libs/I18nRouting';
import { buildBreadcrumbJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

export const revalidate = 3600;
export const dynamicParams = true;

type AwardDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await listAwardSlugs().catch(() => []);
  return routing.locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata(props: AwardDetailPageProps): Promise<Metadata> {
  const { locale, slug: rawSlug } = await props.params;
  const slug = decodeAwardSlug(rawSlug);
  const award = await getAwardBySlug(slug, locale);

  if (!award) {
    const t = await getTranslations({ locale, namespace: 'AwardDetailPage' });
    return { title: t('not_found_title'), robots: { index: false, follow: false } };
  }

  return await buildPageMetadata({
    path: `/awards/${slug}`,
    locale,
    title: `${award.name} — PriyoShop Awards`,
    description: award.caption ? award.caption : (award.description ? award.description : award.name),
    ogImage: award.coverImage ? award.coverImage : (award.logo ? award.logo : undefined),
  });
}

export default async function AwardDetailPage(props: AwardDetailPageProps) {
  const { locale, slug: rawSlug } = await props.params;
  const slug = decodeAwardSlug(rawSlug);
  setRequestLocale(locale);

  const award = await getAwardBySlug(slug, locale);
  if (!award) {
    notFound();
  }

  const allAwards = await listAwards(locale);
  const otherAwards = allAwards.filter((item) => item.slug !== award.slug);

  const t = await getTranslations({ locale, namespace: 'AwardDetailPage' });
  const tAwards = await getTranslations({ locale, namespace: 'AwardsPage' });

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: tAwards('breadcrumb_home'), path: '' },
      { name: tAwards('breadcrumb_title'), path: '/awards' },
      { name: award.name, path: `/awards/${slug}` },
    ],
    locale,
  );

  return (
    <>
      <div className="bg-section-gradient">
        <JsonLd data={breadcrumb} />
        <AwardDetailHero
          name={award.name}
          caption={award.caption}
          organization={award.organization}
          year={award.year}
          category={award.category}
          backLabel={t('back_to_awards')}
        />
      </div>

      <AwardDetailBody
        coverImage={award.coverImage}
        coverImageAlt={award.coverImageAlt}
        description={award.description}
        organization={award.organization}
        year={award.year}
        category={award.category}
        externalUrl={award.externalUrl}
        detailsTitle={t('details_title')}
        storyTitle={t('story_title')}
        organizationLabel={t('organization_label')}
        yearLabel={t('year_label')}
        categoryLabel={t('category_label')}
        viewOfficialLabel={t('view_official_button')}
      />

      <OtherAwards
        awards={otherAwards}
        title={t('more_awards_title')}
        viewAllLabel={t('view_all_button')}
      />
    </>
  );
}

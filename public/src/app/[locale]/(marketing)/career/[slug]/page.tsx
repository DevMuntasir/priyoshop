import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ApplyCallout } from '@/components/career/ApplyCallout';
import { DeadlineBanner } from '@/components/career/DeadlineBanner';
import { JobBody } from '@/components/career/JobBody';
import { JobHero } from '@/components/career/JobHero';
import { JobOthers } from '@/components/career/JobOthers';
import { JsonLd } from '@/components/seo/JsonLd';
import { getPublishedJobBySlug, listPublishedJobSlugs } from '@/libs/career/CareerRepository';
import { decodeSlugParam } from '@/libs/career/careerSlug';
import { routing } from '@/libs/I18nRouting';
import { buildBreadcrumbJsonLd, buildJobPostingJsonLd } from '@/libs/seo/StructuredData';
import { buildPageMetadata } from '@/utils/Seo';

export const revalidate = 3600;
export const dynamicParams = true;

type JobPostingPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  // Prebuild published postings; new postings render on demand via dynamicParams.
  const slugs = await listPublishedJobSlugs().catch(() => []);
  return routing.locales.flatMap((locale) => slugs.map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata(props: JobPostingPageProps): Promise<Metadata> {
  const { locale, slug: rawSlug } = await props.params;
  const slug = decodeSlugParam(rawSlug);
  const job = await getPublishedJobBySlug(slug, locale);

  if (!job) {
    const t = await getTranslations({ locale, namespace: 'CareerSlug' });
    return { title: t('not_found_title'), robots: { index: false, follow: false } };
  }

  return await buildPageMetadata({
    path: `/career/${slug}`,
    locale,
    title: job.metaTitle ?? job.title,
    description: job.metaDescription ?? job.experienceRequirement,
    ogType: 'article',
  });
}

export default async function JobPostingPage(props: JobPostingPageProps) {
  const { locale, slug: rawSlug } = await props.params;
  const slug = decodeSlugParam(rawSlug);
  setRequestLocale(locale);

  const job = await getPublishedJobBySlug(slug, locale);
  if (!job) {
    notFound();
  }

  const tCareer = await getTranslations({ locale, namespace: 'Career' });

  const jobPosting = buildJobPostingJsonLd({
    title: job.title,
    description: job.experienceRequirement,
    path: `/career/${slug}`,
    locale,
    datePosted: job.publishedAt,
    validThrough: job.deadline,
    employmentType: job.jobType,
    jobLocation: job.location,
  });

  const breadcrumb = buildBreadcrumbJsonLd(
    [
      { name: tCareer('breadcrumb_home'), path: '' },
      { name: tCareer('title'), path: '/career' },
      { name: job.title, path: `/career/${slug}` },
    ],
    locale,
  );

  return (
    <>
      <JsonLd data={[jobPosting, breadcrumb]} />

      <JobHero
        locale={locale}
        category={job.category}
        title={job.title}
        location={job.location}
        jobType={job.jobType}
        level={job.level}
        compensation={job.compensation}
      />

      <div className="!-mt-[20px] rounded-t-4xl bg-white pt-10 pb-16 lg:pb-24">
        <div className="container mx-auto max-w-3xl space-y-10 px-4">
          <JobBody html={job.descriptionHtml} />

          <JobOthers
            locale={locale}
            experienceRequirement={job.experienceRequirement}
            jobType={job.jobType}
            salary={job.salary}
            benefits={job.benefits}
          />

          {job.applyEmail && (
            <ApplyCallout locale={locale} email={job.applyEmail} title={job.title} />
          )}
        </div>
      </div>

      <DeadlineBanner locale={locale} deadline={job.deadline} />
    </>
  );
}

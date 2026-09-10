import { AppConfig, OrgConfig } from '@/utils/AppConfig';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

/**
 * Builds Organization JSON-LD describing the brand.
 * Sourced from {@link OrgConfig} so an admin portal can later own these fields.
 * @returns An Organization schema.org object.
 */
export const buildOrganizationJsonLd = () => {
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: AppConfig.name,
    legalName: OrgConfig.legalName,
    url: baseUrl,
    logo: `${baseUrl}${OrgConfig.logoPath}`,
    sameAs: OrgConfig.sameAs,
  };
};

/**
 * Builds WebSite JSON-LD for the given locale.
 * @param locale The active locale identifier.
 * @returns A WebSite schema.org object.
 */
export const buildWebSiteJsonLd = (locale: string) => {
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: AppConfig.name,
    url: `${baseUrl}${getI18nPath('', locale)}`,
    inLanguage: locale,
  };
};

/** Inputs for {@link buildArticleJsonLd}. */
export type ArticleJsonLdArgs = {
  title: string;
  description: string;
  /** Application-relative path without locale prefix, e.g. `/media/my-post`. */
  path: string;
  locale: string;
  /** Absolute or relative cover image URL. */
  image?: string;
  /** ISO date strings. */
  datePublished: string;
  dateModified: string;
};

/**
 * Builds Article JSON-LD for a blog post.
 * @param args The article's resolved metadata.
 * @returns An Article schema.org object.
 */
export const buildArticleJsonLd = (args: ArticleJsonLdArgs) => {
  const baseUrl = getBaseUrl();
  let image: string | undefined;
  if (args.image) {
    image = args.image.startsWith('http') ? args.image : `${baseUrl}${args.image}`;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': args.title,
    'description': args.description,
    'mainEntityOfPage': `${baseUrl}${getI18nPath(args.path, args.locale)}`,
    ...(image ? { image: [image] } : {}),
    'datePublished': args.datePublished,
    'dateModified': args.dateModified,
    'inLanguage': args.locale,
    'author': { '@type': 'Organization', 'name': AppConfig.name },
    'publisher': {
      '@type': 'Organization',
      'name': AppConfig.name,
      'logo': { '@type': 'ImageObject', 'url': `${baseUrl}${OrgConfig.logoPath}` },
    },
  };
};

/** Inputs for {@link buildJobPostingJsonLd}. */
export type JobPostingJsonLdArgs = {
  title: string;
  description: string;
  /** Application-relative path without locale prefix, e.g. `/career/my-job`. */
  path: string;
  locale: string;
  /** ISO date strings. */
  datePosted: string;
  validThrough: string;
  employmentType: string;
  jobLocation: string;
};

/**
 * Builds JobPosting JSON-LD for a career detail page.
 * @param args The job posting's resolved metadata.
 * @returns A JobPosting schema.org object.
 */
export const buildJobPostingJsonLd = (args: JobPostingJsonLdArgs) => {
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': args.title,
    'description': args.description,
    'url': `${baseUrl}${getI18nPath(args.path, args.locale)}`,
    'datePosted': args.datePosted,
    'validThrough': args.validThrough,
    'employmentType': args.employmentType,
    'hiringOrganization': {
      '@type': 'Organization',
      'name': AppConfig.name,
      'logo': `${baseUrl}${OrgConfig.logoPath}`,
    },
    'jobLocation': {
      '@type': 'Place',
      'address': { '@type': 'PostalAddress', 'addressLocality': args.jobLocation },
    },
    'inLanguage': args.locale,
  };
};

/** A single breadcrumb item: a label and its application-relative path. */
export type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Builds BreadcrumbList JSON-LD for a locale-aware trail.
 * @param items Ordered breadcrumb entries from root to current page.
 * @param locale The active locale identifier.
 * @returns A BreadcrumbList schema.org object.
 */
export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[], locale: string) => {
  const baseUrl = getBaseUrl();

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${getI18nPath(item.path, locale)}`,
    })),
  };
};

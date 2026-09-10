import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import type { JobLocaleContent, JobPostingCard, JobPostingDoc, ResolvedJobPosting } from './Types';

const collection = () => getDb().collection<JobPostingDoc>(COLLECTIONS.jobPosting);

const EMPTY_CONTENT: JobLocaleContent = { title: '', descriptionHtml: '', experienceRequirement: '' };

/**
 * Field-level locale resolution: locale values win, empty fields fall back to English.
 * @param doc The stored job posting document.
 * @param locale The requested locale.
 * @returns The resolved per-locale content.
 */
function resolveLocaleContent(doc: JobPostingDoc, locale: string): JobLocaleContent {
  const en = doc.content.en ?? EMPTY_CONTENT;
  const localized = doc.content[locale];
  if (!localized || locale === 'en') {
    return en;
  }
  return {
    title: localized.title || en.title,
    descriptionHtml: localized.descriptionHtml || en.descriptionHtml,
    experienceRequirement: localized.experienceRequirement || en.experienceRequirement,
    metaTitle: localized.metaTitle || en.metaTitle,
    metaDescription: localized.metaDescription || en.metaDescription,
  };
}

function toCard(doc: JobPostingDoc, locale: string): JobPostingCard {
  const content = resolveLocaleContent(doc, locale);
  return {
    jobId: doc.jobId,
    slug: doc.slug,
    category: doc.category,
    title: content.title,
    location: doc.location,
    jobType: doc.jobType,
    level: doc.level,
    workMode: doc.workMode,
    vacancy: doc.vacancy,
    deadline: doc.deadline.toISOString(),
    publishedAt: doc.publishedAt.toISOString(),
  };
}

/**
 * Fetches all job postings for the admin listing, newest first.
 * @returns Every job posting document regardless of status.
 */
export async function listJobPostings(): Promise<JobPostingDoc[]> {
  return await collection().find({}).sort({ publishedAt: -1 }).limit(200).toArray();
}

/**
 * Fetches a single job posting by id (any status) for the admin editor.
 * @param jobId The job posting's id.
 * @returns The job posting document, or null when unknown.
 */
export async function getJobPosting(jobId: string): Promise<JobPostingDoc | null> {
  return await collection().findOne({ jobId }, { projection: { _id: 0 } });
}

/**
 * Published job postings resolved for the public listing, newest first.
 * @param locale The requested locale.
 * @returns Locale-resolved cards without job descriptions.
 */
export async function listPublishedJobPostings(locale: string): Promise<JobPostingCard[]> {
  const docs = await collection()
    .find({ status: 'published' })
    .sort({ publishedAt: -1 })
    .limit(200)
    .toArray();
  return docs.map((doc) => toCard(doc, locale));
}

/**
 * A published job posting resolved for the detail page.
 * @param slug The job posting's slug.
 * @param locale The requested locale.
 * @returns The resolved job posting, or null for drafts/unknown slugs.
 */
export async function getPublishedJobBySlug(
  slug: string,
  locale: string,
): Promise<ResolvedJobPosting | null> {
  const doc = await collection().findOne({ slug, status: 'published' });
  if (!doc) {
    return null;
  }
  const content = resolveLocaleContent(doc, locale);
  return {
    ...toCard(doc, locale),
    descriptionHtml: content.descriptionHtml,
    experienceRequirement: content.experienceRequirement,
    compensation: doc.compensation,
    salary: doc.salary,
    benefits: doc.benefits,
    applyEmail: doc.applyEmail,
    metaTitle: content.metaTitle,
    metaDescription: content.metaDescription,
    updatedAt: doc.updatedAt.toISOString(),
  };
}

/**
 * Published slugs with their last update, for the sitemap.
 * @returns The slug and updatedAt of every published job posting, newest first.
 */
export async function listPublishedJobSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  const docs = await collection()
    .find({ status: 'published' }, { projection: { _id: 0, slug: 1, updatedAt: 1 } })
    .sort({ publishedAt: -1 })
    .toArray();
  return docs.map((doc) => ({ slug: doc.slug, updatedAt: doc.updatedAt }));
}

/**
 * Creates a draft job posting skeleton from a title and slug.
 * @param input The English title and the job posting's slug.
 * @param userId The creating admin's user id.
 * @returns The created job posting document.
 * @throws Error when the insert is not acknowledged.
 */
export async function createJobPosting(
  input: { title: string; slug: string },
  userId: string,
): Promise<JobPostingDoc> {
  const now = new Date();
  const doc: JobPostingDoc = {
    jobId: new ObjectId().toHexString(),
    slug: input.slug,
    category: '',
    location: '',
    jobType: '',
    level: '',
    workMode: '',
    compensation: '',
    salary: '',
    benefits: [],
    vacancy: 1,
    applyEmail: '',
    content: { en: { title: input.title, descriptionHtml: '', experienceRequirement: '' } },
    status: 'draft',
    deadline: now,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    updatedBy: userId,
  };

  const result = await collection().insertOne(doc);
  if (!result.insertedId) {
    throw new Error('Failed to create job posting');
  }

  revalidatePath('/', 'layout');
  return doc;
}

/**
 * Updates a job posting's fields.
 * @param jobId The job posting's id.
 * @param updates The fields to set.
 * @param userId The editing admin's user id.
 * @returns The updated job posting document, or null when unknown.
 */
export async function updateJobPosting(
  jobId: string,
  updates: Partial<
    Pick<
      JobPostingDoc,
      | 'slug'
      | 'category'
      | 'location'
      | 'jobType'
      | 'level'
      | 'workMode'
      | 'compensation'
      | 'salary'
      | 'benefits'
      | 'vacancy'
      | 'applyEmail'
      | 'content'
      | 'status'
      | 'deadline'
    >
  >,
  userId: string,
): Promise<JobPostingDoc | null> {
  const result = await collection().findOneAndUpdate(
    { jobId },
    { $set: { ...updates, updatedAt: new Date(), updatedBy: userId } },
    { returnDocument: 'after' },
  );

  revalidatePath('/', 'layout');
  return result ?? null;
}

/**
 * Deletes a job posting by id.
 * @param jobId The job posting's id.
 * @returns True when a job posting was deleted.
 */
export async function deleteJobPosting(jobId: string): Promise<boolean> {
  const result = await collection().deleteOne({ jobId });
  revalidatePath('/', 'layout');
  return result.deletedCount > 0;
}

/**
 * Checks whether a slug is already used by another job posting.
 * @param slug The slug to check.
 * @param excludeJobId A job posting id to ignore (the posting being edited).
 * @returns True when another job posting already uses the slug.
 */
export async function isJobSlugTaken(slug: string, excludeJobId?: string): Promise<boolean> {
  const query: Record<string, unknown> = { slug };
  if (excludeJobId) {
    query.jobId = { $ne: excludeJobId };
  }
  const count = await collection().countDocuments(query);
  return count > 0;
}

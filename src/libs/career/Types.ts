/** Per-locale editable fields of a job posting. English is mandatory; other locales fall back to it. */
export type JobLocaleContent = {
  title: string;
  /** Sanitized Tiptap HTML — cleaned on write, trusted on render. Covers job summary, key responsibilities, requirements. */
  descriptionHtml: string;
  experienceRequirement: string;
  /** SEO overrides; fall back to title/experienceRequirement when empty. */
  metaTitle?: string;
  metaDescription?: string;
};

/** Job posting document stored in the `job_posting` collection. */
export type JobPostingDoc = {
  jobId: string;
  slug: string;
  category: string;
  location: string;
  jobType: string;
  level: string;
  workMode: string;
  compensation: string;
  salary: string;
  benefits: string[];
  vacancy: number;
  applyEmail: string;
  content: Record<string, JobLocaleContent>;
  status: 'draft' | 'published';
  deadline: Date;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: string;
};

/** Locale-resolved card shape for public listings (no full description). */
export type JobPostingCard = {
  jobId: string;
  slug: string;
  category: string;
  title: string;
  location: string;
  jobType: string;
  level: string;
  workMode: string;
  vacancy: number;
  /** ISO strings so they can cross the server → client boundary. */
  deadline: string;
  publishedAt: string;
};

/** Locale-resolved full job posting for the detail page. */
export type ResolvedJobPosting = JobPostingCard & {
  descriptionHtml: string;
  experienceRequirement: string;
  compensation: string;
  salary: string;
  benefits: string[];
  applyEmail: string;
  metaTitle?: string;
  metaDescription?: string;
  updatedAt: string;
};

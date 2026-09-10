'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { RichTextEditor } from '@/components/admin/media/RichTextEditor';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { CAREER_CATEGORIES } from '@/libs/career/Categories';
import type { JobLocaleContent, JobPostingDoc } from '@/libs/career/Types';

const EMPTY_CONTENT: JobLocaleContent = { title: '', descriptionHtml: '', experienceRequirement: '' };

const LOCALES = ['en', 'bn'] as const;
type EditorLocale = (typeof LOCALES)[number];

function Field(props: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mb-2 block text-ps-sm font-semibold">{props.label}</span>
      {props.children}
      {props.hint && (
        <Text size="xs" className="mt-1 text-ps-ink-600">
          {props.hint}
        </Text>
      )}
    </div>
  );
}

/* Full job posting editor: settings (slug, category, location/type/level, deadline, benefits),
   per-locale content with a rich text description, save/publish/delete actions. */
export function JobPostingEditor(props: { jobId: string }) {
  const router = useRouter();
  const [job, setJob] = useState<JobPostingDoc | null>(null);
  const [locale, setLocale] = useState<EditorLocale>('en');
  const [benefitsText, setBenefitsText] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      const response = await adminFetch(`/api/admin/job-postings/${props.jobId}`);
      if (response.ok) {
        const data = (await response.json()) as { job: JobPostingDoc };
        setJob(data.job);
        setBenefitsText(data.job.benefits.join('\n'));
      } else {
        setStatus('Could not load job posting');
      }
    };
    void load();
  }, [props.jobId]);

  if (!job) {
    return (
      <main className="space-y-6">
        <Text size="body" className="text-ps-ink-600">
          {status || 'Loading…'}
        </Text>
      </main>
    );
  }

  const content = job.content[locale] ?? EMPTY_CONTENT;

  const setContentField = (field: keyof JobLocaleContent, value: string) => {
    setJob({
      ...job,
      content: { ...job.content, [locale]: { ...EMPTY_CONTENT, ...job.content[locale], [field]: value } },
    });
  };

  const save = async () => {
    setStatus('Saving…');
    const en = job.content.en ?? EMPTY_CONTENT;
    if (!en.title) {
      setStatus('English title is required');
      return;
    }
    const benefits = benefitsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    const response = await adminFetch(`/api/admin/job-postings/${job.jobId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: job.slug,
        category: job.category,
        location: job.location,
        jobType: job.jobType,
        level: job.level,
        workMode: job.workMode,
        compensation: job.compensation,
        salary: job.salary,
        benefits,
        vacancy: job.vacancy,
        applyEmail: job.applyEmail,
        content: { en, bn: job.content.bn },
        deadline: new Date(job.deadline).toISOString(),
      }),
    });
    if (response.ok) {
      const data = (await response.json()) as { job: JobPostingDoc };
      setJob(data.job);
      setBenefitsText(data.job.benefits.join('\n'));
      setStatus('Saved');
    } else {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus(data?.error ?? 'Could not save');
    }
  };

  const setPublished = async (publish: boolean) => {
    setStatus(publish ? 'Publishing…' : 'Unpublishing…');
    const response = await adminFetch(`/api/admin/job-postings/${job.jobId}/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publish }),
    });
    if (response.ok) {
      const data = (await response.json()) as { job: JobPostingDoc };
      setJob(data.job);
      setStatus(publish ? 'Published' : 'Unpublished');
    } else {
      setStatus('Could not update status');
    }
  };

  const remove = async () => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Delete this job posting permanently?')) {
      return;
    }
    const response = await adminFetch(`/api/admin/job-postings/${job.jobId}`, { method: 'DELETE' });
    if (response.ok) {
      router.push('/admin/career');
    } else {
      setStatus('Could not delete');
    }
  };

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title={job.content.en?.title || 'Edit job posting'}
        description={`/career/${job.slug} — ${job.status === 'published' ? 'Published' : 'Draft'}`}
      />

      <div className="px-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button tone="brand" onClick={() => void save()}>
            Save
          </Button>
          {job.status === 'published' ? (
            <Button variant="outlined" tone="dark" onClick={() => void setPublished(false)}>
              Unpublish
            </Button>
          ) : (
            <Button variant="outlined" tone="dark" onClick={() => void setPublished(true)}>
              Publish
            </Button>
          )}
          <Button variant="ghost" tone="dark" onClick={() => void remove()}>
            Delete
          </Button>
          {status && (
            <Text size="sm" className="text-ps-ink-600">
              {status}
            </Text>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card padding="lg" className="space-y-5">
            <div className="flex gap-2">
              {LOCALES.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setLocale(entry)}
                  className={`cursor-pointer rounded-ps-pill border-none px-4 py-1.5 font-body text-ps-xs font-semibold ${locale === entry ? 'bg-ps-black text-white' : 'bg-ps-grey-100 text-ps-ink-600'
                  }`}
                >
                  {entry === 'en' ? 'English' : 'Bangla'}
                </button>
              ))}
            </div>

            <Field label="Title">
              <Input
                type="text"
                value={content.title}
                onChange={(e) => setContentField('title', e.target.value)}
                placeholder="Job title"
              />
            </Field>

            <Field
              label="Experience requirements"
              hint="Shown as a pill on the job page, e.g. '1-2 years of experience in HR & Admin.'"
            >
              <Input
                type="text"
                value={content.experienceRequirement}
                onChange={(e) => setContentField('experienceRequirement', e.target.value)}
              />
            </Field>

            <Field label="Description" hint="Job summary, key responsibilities, educational requirements, etc.">
              <RichTextEditor
                key={locale}
                value={content.descriptionHtml}
                onChange={(html) => setContentField('descriptionHtml', html)}
              />
            </Field>

            <Field label="Meta title (SEO)" hint={`${(content.metaTitle ?? '').length}/70 — falls back to the title.`}>
              <Input
                type="text"
                value={content.metaTitle ?? ''}
                onChange={(e) => setContentField('metaTitle', e.target.value)}
              />
            </Field>

            <Field
              label="Meta description (SEO)"
              hint={`${(content.metaDescription ?? '').length}/160 — falls back to the experience requirements.`}
            >
              <textarea
                aria-label="Meta description"
                value={content.metaDescription ?? ''}
                onChange={(e) => setContentField('metaDescription', e.target.value)}
                rows={2}
                className="w-full rounded-ps-sm border border-ps-grey-200 px-3 py-2 font-body text-ps-sm outline-none focus:border-ps-black"
              />
            </Field>
          </Card>

          <Card padding="lg" className="space-y-5 self-start">
            <Field label="Slug" hint="URL: /career/<slug>">
              <Input
                type="text"
                value={job.slug}
                onChange={(e) => setJob({ ...job, slug: e.target.value.toLowerCase().replaceAll(/\s+/gu, '-') })}
              />
            </Field>

            <Field label="Category">
              <div className="flex flex-wrap gap-2">
                {CAREER_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setJob({ ...job, category })}
                    className={`cursor-pointer rounded-ps-pill px-3 py-1.5 font-body text-ps-xs font-semibold ring-1 ring-inset transition-colors ${job.category === category
                      ? 'border-none bg-ps-black text-white ring-ps-black'
                      : 'border-none bg-transparent text-ps-ink-600 ring-ps-grey-300 hover:ring-ps-black'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Location">
              <Input
                type="text"
                value={job.location}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
                placeholder="e.g., Dhaka, Bangladesh"
              />
            </Field>

            <Field label="Job type" hint="e.g., Full Time / Part Time">
              <Input
                type="text"
                value={job.jobType}
                onChange={(e) => setJob({ ...job, jobType: e.target.value })}
              />
            </Field>

            <Field label="Level" hint="e.g., Entry Level / Mid Level / Senior Level">
              <Input type="text" value={job.level} onChange={(e) => setJob({ ...job, level: e.target.value })} />
            </Field>

            <Field label="Work mode" hint="e.g., Onsite / Remote / Hybrid">
              <Input
                type="text"
                value={job.workMode}
                onChange={(e) => setJob({ ...job, workMode: e.target.value })}
              />
            </Field>

            <Field label="Compensation" hint="e.g., 20,000-30,000 BDT/Month">
              <Input
                type="text"
                value={job.compensation}
                onChange={(e) => setJob({ ...job, compensation: e.target.value })}
              />
            </Field>

            <Field label="Salary" hint="e.g., Negotiable">
              <Input type="text" value={job.salary} onChange={(e) => setJob({ ...job, salary: e.target.value })} />
            </Field>

            <Field label="Compensation & other benefits" hint="One benefit per line.">
              <textarea
                aria-label="Benefits"
                value={benefitsText}
                onChange={(e) => setBenefitsText(e.target.value)}
                rows={4}
                className="w-full rounded-ps-sm border border-ps-grey-200 px-3 py-2 font-body text-ps-sm outline-none focus:border-ps-black"
              />
            </Field>

            <Field label="Vacancy">
              <Input
                type="number"
                min={0}
                value={job.vacancy}
                onChange={(e) => setJob({ ...job, vacancy: Number(e.target.value) })}
              />
            </Field>

            <Field label="Apply email">
              <Input
                type="email"
                value={job.applyEmail}
                onChange={(e) => setJob({ ...job, applyEmail: e.target.value })}
                placeholder="career@priyoshop.com"
              />
            </Field>

            <Field label="Application deadline">
              <Input
                type="date"
                value={new Date(job.deadline).toISOString().slice(0, 10)}
                onChange={(e) => setJob({ ...job, deadline: new Date(`${e.target.value}T00:00:00.000Z`) })}
              />
            </Field>
          </Card>
        </div>
      </div>
    </main>
  );
}

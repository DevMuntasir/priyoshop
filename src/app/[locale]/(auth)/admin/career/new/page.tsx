'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Stack } from '@/components/ui/Grid';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { slugifyTitle, validateCareerSlug } from '@/libs/career/careerSlug';

export default function NewJobPostingPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    const slugError = validateCareerSlug(slug);
    if (slugError) {
      setError(slugError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await adminFetch('/api/admin/job-postings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), slug: slug.trim() }),
      });

      const data = (await response.json()) as { job?: { jobId: string }; error?: string };
      if (!response.ok || !data.job) {
        throw new Error(data.error || 'Failed to create job posting');
      }

      router.push(`/admin/career/${data.job.jobId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create job posting');
      setIsLoading(false);
    }
  };

  return (
    <main className="space-y-6">
      <AdminPageHeader title="New job posting" description="Start a new job posting as a draft" />

      <Card padding="lg" className="max-w-2xl">
        <Stack gap="md">
          <div>
            <span className="mb-2 block text-ps-sm font-semibold">Title</span>
            <Input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) {
                  setSlug(slugifyTitle(e.target.value));
                }
              }}
              placeholder="e.g., Executive – People & Culture"
              disabled={isLoading}
            />
          </div>

          <div>
            <span className="mb-2 block text-ps-sm font-semibold">Slug</span>
            <Input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlugTouched(true);
                setSlug(e.target.value.toLowerCase().replaceAll(/\s+/gu, '-'));
              }}
              placeholder="e.g., executive-people-and-culture"
              disabled={isLoading}
            />
            <Text size="xs" className="mt-1 text-ps-ink-600">
              Used in the URL: /career/&lt;slug&gt;
            </Text>
          </div>

          {error && (
            <div className="rounded-ps-sm border border-ps-red-200 bg-ps-red-50 p-3">
              <Text size="sm" className="text-ps-red-500">
                {error}
              </Text>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={() => void handleCreate()} disabled={isLoading} tone="brand">
              {isLoading ? 'Creating…' : 'Create job posting'}
            </Button>
            <Button variant="outlined" tone="dark" onClick={() => router.back()} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </Stack>
      </Card>
    </main>
  );
}

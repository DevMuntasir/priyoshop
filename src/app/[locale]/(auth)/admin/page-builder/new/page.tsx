'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { validateSlug } from '@/libs/builder/slugValidation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Grid';

export default function NewPagePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    setError('');

    // Validate
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!slug.trim()) {
      setError('Slug is required');
      return;
    }

    const slugError = validateSlug(slug);
    if (slugError) {
      setError(slugError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await adminFetch('/api/admin/builder-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim(), slug: slug.trim() }),
      });

      if (!response.ok) {
        const data = await response.json() as any;
        throw new Error(data.error || 'Failed to create page');
      }

      const data = await response.json() as any;
      router.push(`/admin/page-builder/${data.page.pageId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create page');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title="Create New Page"
        description="Start building a new custom page"
      />

      <Card padding="lg" className="max-w-2xl">
        <Stack gap="md">
          <div>
            <label className="block text-ps-sm font-semibold mb-2">
              Page Title
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Features"
              disabled={isLoading}
            />
            <Text size="xs" className="text-ps-ink-600 mt-1">
              This title will be displayed in the page list
            </Text>
          </div>

          <div>
            <label className="block text-ps-sm font-semibold mb-2">
              Slug
            </label>
            <Input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              placeholder="e.g., features"
              disabled={isLoading}
            />
            <Text size="xs" className="text-ps-ink-600 mt-1">
              Used in the URL: /pages/&lt;slug&gt;
            </Text>
          </div>

          {error && (
            <div className="p-3 bg-ps-red-50 border border-ps-red-200 rounded-ps-sm">
              <Text size="sm" className="text-ps-red-500">
                {error}
              </Text>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => {
                void handleCreate();
              }}
              disabled={isLoading}
              tone="brand"
            >
              {isLoading ? 'Creating...' : 'Create Page'}
            </Button>

            <Button
              variant="outlined"
              tone="dark"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </Stack>
      </Card>
    </main>
  );
}

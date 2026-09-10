'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { slugifyTitle, validateNewsSlug } from '@/libs/news/newsSlug';

export default function NewNewsPublicationPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [logo, setLogo] = useState('');
  const [logoAlt, setLogoAlt] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    setError('');

    if (!name.trim()) {
      setError('Publication name is required');
      return;
    }

    if (!logo.trim()) {
      setError('Logo image is required');
      return;
    }

    const slugError = validateNewsSlug(slug);
    if (slugError) {
      setError(slugError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await adminFetch('/api/admin/news-publications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim(),
          logo: logo.trim(),
          logoAlt: logoAlt.trim() || undefined,
          websiteUrl: websiteUrl.trim() || undefined,
        }),
      });

      const data = (await response.json()) as { publication?: { publicationId: string }; error?: string };
      if (!response.ok || !data.publication) {
        throw new Error(data.error || 'Failed to create publication');
      }

      router.push(`/admin/news/publications/${data.publication.publicationId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create publication');
      setIsLoading(false);
    }
  };

  return (
    <main className="space-y-6">
      <AdminPageHeader title="New news publication" description="Create a publication for featured news cards and publication pages" />

      <Card padding="lg" className="max-w-2xl space-y-5">
        <div>
          <span className="mb-2 block text-ps-sm font-semibold">Publication name</span>
          <Input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (!slugTouched) {
                setSlug(slugifyTitle(event.target.value));
              }
            }}
            placeholder="e.g., E27"
            disabled={isLoading}
          />
        </div>

        <div>
          <span className="mb-2 block text-ps-sm font-semibold">Slug</span>
          <Input
            type="text"
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value.toLowerCase().replaceAll(/\s+/gu, '-'));
            }}
            placeholder="e.g., e27"
            disabled={isLoading}
          />
          <Text size="xs" className="mt-1 text-ps-ink-600">
            Used in the URL: /news/publications/&lt;slug&gt;
          </Text>
        </div>

        <div>
          <span className="mb-2 block text-ps-sm font-semibold">Logo image</span>
          <Input
            type="text"
            value={logo}
            onChange={(event) => setLogo(event.target.value)}
            placeholder="e.g., /news/publications/e27.svg or https://example.com/e27.png"
            disabled={isLoading}
          />
          <Text size="xs" className="mt-1 text-ps-ink-600">
            Path or URL. The preview below updates as you type.
          </Text>
          {logo && (
            <div className="mt-3 rounded-ps-lg bg-white p-4 ring-1 ring-ps-grey-200 ring-inset">
              {/* oxlint-disable-next-line next/no-img-element -- admin-provided arbitrary URL; next/image needs remotePatterns */}
              <img
                src={logo}
                alt={logoAlt || name || 'Publication logo preview'}
                className="h-12 w-auto object-contain"
              />
            </div>
          )}
        </div>

        <div>
          <span className="mb-2 block text-ps-sm font-semibold">Logo alt text</span>
          <Input
            type="text"
            value={logoAlt}
            onChange={(event) => setLogoAlt(event.target.value)}
            placeholder="Optional"
            disabled={isLoading}
          />
        </div>

        <div>
          <span className="mb-2 block text-ps-sm font-semibold">Website URL</span>
          <Input
            type="text"
            value={websiteUrl}
            onChange={(event) => setWebsiteUrl(event.target.value)}
            placeholder="Optional, e.g. abc.com or https://abc.com"
            disabled={isLoading}
          />
          <Text size="xs" className="mt-1 text-ps-ink-600">
            Bare domains are accepted and saved as `https://...`.
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
            {isLoading ? 'Creating…' : 'Create publication'}
          </Button>
          <Button variant="outlined" tone="dark" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </Card>
    </main>
  );
}

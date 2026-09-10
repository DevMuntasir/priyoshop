'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { MediaInput } from '@/components/admin/assets/MediaInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { slugifyTitle } from '@/libs/news/newsSlug';
import type { NewsPublicationDoc } from '@/libs/news/Types';

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

export function NewsPublicationEditor(props: { publicationId: string }) {
  const router = useRouter();
  const [publication, setPublication] = useState<NewsPublicationDoc | null>(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      const response = await adminFetch(`/api/admin/news-publications/${props.publicationId}`);
      if (response.ok) {
        const data = (await response.json()) as { publication: NewsPublicationDoc };
        setPublication(data.publication);
      } else {
        setStatus('Could not load publication');
      }
    };

    void load();
  }, [props.publicationId]);

  if (!publication) {
    return (
      <main className="space-y-6">
        <Text size="body" className="text-ps-ink-600">
          {status || 'Loading…'}
        </Text>
      </main>
    );
  }

  const save = async () => {
    setStatus('Saving…');
    const response = await adminFetch(`/api/admin/news-publications/${publication.publicationId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: publication.name,
        slug: publication.slug,
        logo: publication.logo,
        logoAlt: publication.logoAlt,
        websiteUrl: publication.websiteUrl,
      }),
    });

    if (response.ok) {
      const data = (await response.json()) as { publication: NewsPublicationDoc };
      setPublication(data.publication);
      setStatus('Saved');
    } else {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus(data?.error ?? 'Could not save');
    }
  };

  const remove = async () => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Delete this publication? Linked news posts will keep working without a publication logo.')) {
      return;
    }

    const response = await adminFetch(`/api/admin/news-publications/${publication.publicationId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      router.push('/admin/news/publications');
    } else {
      setStatus('Could not delete');
    }
  };

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title={publication.name || 'Edit publication'}
        description={`/news/publications/${publication.slug}`}
      />

      <div className="px-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button tone="brand" onClick={() => void save()}>
            Save
          </Button>
          <Button variant="ghost" tone="dark" onClick={() => void remove()}>
            Delete
          </Button>
          {status && (
            <Text size="sm" className="text-ps-ink-600">
              {status}
            </Text>
          )}
        </div>

        <Card padding="lg" className="max-w-3xl space-y-5">
          <Field label="Publication name">
            <Input
              type="text"
              value={publication.name}
              onChange={(event) => {
                const name = event.target.value;
                setPublication((current) => current
                  ? {
                      ...current,
                      name,
                      slug: current.slug === slugifyTitle(current.name) ? slugifyTitle(name) : current.slug,
                    }
                  : current);
              }}
            />
          </Field>

          <Field label="Slug" hint="Used in the URL: /news/publications/<slug>">
            <Input
              type="text"
              value={publication.slug}
              onChange={(event) =>
                setPublication({ ...publication, slug: event.target.value.toLowerCase().replaceAll(/\s+/gu, '-') })}
            />
          </Field>

          <Field
            label="Logo image"
            hint="Select from Asset Library or enter URL"
          >
            <MediaInput
              value={publication.logo}
              onChange={(logo) => setPublication({ ...publication, logo })}
              onSelectMedia={(media) => {
                setPublication((current) =>
                  current
                    ? {
                        ...current,
                        logo: media.url,
                        logoAlt: media.alt || current.logoAlt || '',
                      }
                    : current,
                );
              }}
              defaultFolder="News"
            />
          </Field>

          <Field label="Logo alt text">
            <Input
              type="text"
              value={publication.logoAlt ?? ''}
              onChange={(event) => setPublication({ ...publication, logoAlt: event.target.value })}
            />
          </Field>

          <Field label="Website URL" hint="Optional external publication URL. Bare domains are saved as https://...">
            <Input
              type="text"
              value={publication.websiteUrl ?? ''}
              onChange={(event) => setPublication({ ...publication, websiteUrl: event.target.value })}
              placeholder="e.g. abc.com or https://abc.com"
            />
          </Field>
        </Card>
      </div>
    </main>
  );
}

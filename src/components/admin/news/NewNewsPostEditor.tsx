'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSpinner } from '@/components/admin/AdminSpinner';
import { MediaInput } from '@/components/admin/assets/MediaInput';
import { CategoryPicker } from '@/components/admin/categories/CategoryPicker';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { slugifyTitle, validateNewsSlug } from '@/libs/news/newsSlug';

const getToday = () => {
  const now = new Date();
  const localTime = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return localTime.toISOString().slice(0, 10);
};

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

export function NewNewsPostEditor(props: {
  categories: string[];
  publications: { publicationId: string; name: string }[];
}) {
  const router = useRouter();
  const [availableCategories, setAvailableCategories] = useState(props.categories);
  const [title, setTitle] = useState('');
  const [banglaTitle, setBanglaTitle] = useState('');
  const [newsLink, setNewsLink] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [publicationId, setPublicationId] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState('');
  const [coverImageAlt, setCoverImageAlt] = useState('');
  const [publishedAt, setPublishedAt] = useState(getToday);
  const [featured, setFeatured] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categoryCreated = (category: string) => {
    setAvailableCategories((current) => [...new Set([...current, category])]);
    setCategories((current) =>
      current.length < 10 ? [...new Set([...current, category])] : current,
    );
  };

  const save = async () => {
    setError('');

    if (!title.trim()) {
      setError('English title is required');
      return;
    }

    const slugError = validateNewsSlug(slug);
    if (slugError) {
      setError(slugError);
      return;
    }

    if (!publishedAt) {
      setError('Published date is required');
      return;
    }

    setIsLoading(true);
    try {
      const response = await adminFetch('/api/admin/news-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          banglaTitle: banglaTitle.trim(),
          slug: slug.trim(),
          newsLink: newsLink.trim(),
          publicationId: publicationId || null,
          categories,
          coverImage,
          coverImageAlt,
          featured,
          publishedAt: new Date(`${publishedAt}T00:00:00.000Z`).toISOString(),
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { post?: { postId: string }; error?: string }
        | null;
      if (!response.ok || !data?.post) {
        throw new Error(data?.error || 'Failed to create post');
      }

      router.push('/admin/news');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Failed to create post');
      setIsLoading(false);
    }
  };

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title="New news post"
        description="Add all post details and save it as a draft"
        backHref="/admin/news"
      />

      <div className="space-y-4 px-8">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => void save()} disabled={isLoading} tone="brand">
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <AdminSpinner size="sm" tone="white" />
                Saving…
              </span>
            ) : (
              'Save post'
            )}
          </Button>
          <Button
            variant="outlined"
            tone="dark"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          {error && (
            <Text size="sm" className="text-ps-red-500">
              {error}
            </Text>
          )}
        </div>

        <fieldset
          aria-label="News post details"
          disabled={isLoading}
          className="grid gap-6 lg:grid-cols-[1.5fr_1fr]"
        >
          <Card padding="lg" className="space-y-5">
            <Field label="English title">
              <Input
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  if (!slugTouched) {
                    setSlug(slugifyTitle(event.target.value));
                  }
                }}
                placeholder="News headline / title"
              />
            </Field>

            <Field label="Bangla title" hint="Optional. English title is used when this is empty.">
              <Input
                type="text"
                value={banglaTitle}
                onChange={(event) => setBanglaTitle(event.target.value)}
                placeholder="সংবাদের শিরোনাম"
              />
            </Field>

            <Field
              label="News link"
              hint="External URL of the original article. Visitors clicking the card navigate directly here."
            >
              <Input
                type="text"
                value={newsLink}
                onChange={(event) => setNewsLink(event.target.value)}
                placeholder="https://www.thedailystar.net/news/article"
              />
            </Field>

            <Field label="Slug" hint="URL identifier: /news/<slug>">
              <Input
                type="text"
                value={slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setSlug(slugifyTitle(event.target.value));
                }}
                placeholder="priyoshop-secures-seed-funding"
              />
            </Field>
          </Card>

          <Card padding="lg" className="space-y-5 self-start">
            <Field label="Publication" hint="Select the publication or press source.">
              <select
                value={publicationId}
                onChange={(event) => setPublicationId(event.target.value)}
                className="w-full rounded-ps-sm border border-ps-grey-200 bg-white px-3 py-2 font-body text-ps-sm outline-none focus:border-ps-black"
              >
                <option value="">No publication</option>
                {props.publications.map((publication) => (
                  <option key={publication.publicationId} value={publication.publicationId}>
                    {publication.name}
                  </option>
                ))}
              </select>
            </Field>

            <CategoryPicker
              scope="news"
              categories={availableCategories}
              selected={categories}
              onChange={setCategories}
              onCreated={categoryCreated}
            />

            <Field label="Cover image" hint="Select from Asset Library or enter URL">
              <MediaInput
                value={coverImage}
                onChange={setCoverImage}
                onSelectMedia={(media) => {
                  setCoverImage(media.url);
                  setCoverImageAlt(media.alt || coverImageAlt);
                }}
                defaultFolder="News"
              />
            </Field>

            <Field label="Cover image alt text">
              <Input
                type="text"
                value={coverImageAlt}
                onChange={(event) => setCoverImageAlt(event.target.value)}
              />
            </Field>

            <Field label="Published date">
              <Input
                type="date"
                value={publishedAt}
                onChange={(event) => setPublishedAt(event.target.value)}
              />
            </Field>

            <label className="flex cursor-pointer items-center gap-2 text-ps-sm font-semibold">
              <input
                type="checkbox"
                aria-label="Featured post"
                checked={featured}
                onChange={(event) => setFeatured(event.target.checked)}
                className="size-4 accent-ps-red-500"
              />
              Featured (shown in the /news spotlight)
            </label>
          </Card>
        </fieldset>
      </div>
    </main>
  );
}

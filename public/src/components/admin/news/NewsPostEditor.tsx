'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSpinner } from '@/components/admin/AdminSpinner';
import { MediaInput } from '@/components/admin/assets/MediaInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { NEWS_CATEGORIES } from '@/libs/news/Categories';
import type { NewsPostDoc, NewsPostLocaleContent, NewsPublicationDoc } from '@/libs/news/Types';

const EMPTY_CONTENT: NewsPostLocaleContent = { title: '', excerpt: '', contentHtml: '' };

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

/* News post editor: title, news external link, category, cover image, publication, published date, featured. */
export function NewsPostEditor(props: { postId: string }) {
  const router = useRouter();
  const [post, setPost] = useState<NewsPostDoc | null>(null);
  const [publications, setPublications] = useState<NewsPublicationDoc[]>([]);
  const [locale, setLocale] = useState<EditorLocale>('en');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      const [postResponse, publicationResponse] = await Promise.all([
        adminFetch(`/api/admin/news-posts/${props.postId}`),
        adminFetch('/api/admin/news-publications'),
      ]);

      if (postResponse.ok) {
        const data = (await postResponse.json()) as { post: NewsPostDoc };
        setPost(data.post);
      } else {
        setStatus('Could not load post');
      }

      if (publicationResponse.ok) {
        const data = (await publicationResponse.json()) as { publications: NewsPublicationDoc[] };
        setPublications(data.publications);
      }
    };
    void load();
  }, [props.postId]);

  if (!post) {
    return (
      <main className="space-y-6">
        <AdminSpinner fullHeight label={status || 'Loading post…'} />
      </main>
    );
  }

  const content = post.content[locale] ?? EMPTY_CONTENT;

  const setContentField = (field: keyof NewsPostLocaleContent, value: string) => {
    setPost({
      ...post,
      content: { ...post.content, [locale]: { ...EMPTY_CONTENT, ...post.content[locale], [field]: value } },
    });
  };

  const toggleCategory = (category: string) => {
    const categories = post.categories.includes(category)
      ? post.categories.filter((entry) => entry !== category)
      : [...post.categories, category];
    setPost({ ...post, categories });
  };

  const save = async () => {
    setStatus('Saving…');
    const en = post.content.en ?? EMPTY_CONTENT;
    if (!en.title) {
      setStatus('English title is required');
      return;
    }
    const response = await adminFetch(`/api/admin/news-posts/${post.postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: post.slug,
        categories: post.categories,
        content: {
          en: { ...en, excerpt: '', contentHtml: '' },
          bn: post.content.bn ? { ...post.content.bn, excerpt: '', contentHtml: '' } : undefined,
        },
        newsLink: post.newsLink ?? '',
        coverImage: post.coverImage,
        coverImageAlt: post.coverImageAlt,
        publicationId: post.publicationId ?? null,
        featured: post.featured,
        publishedAt: new Date(post.publishedAt).toISOString(),
      }),
    });
    if (response.ok) {
      const data = (await response.json()) as { post: NewsPostDoc };
      setPost(data.post);
      setStatus('Saved');
    } else {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus(data?.error ?? 'Could not save');
    }
  };

  const setPublished = async (publish: boolean) => {
    setStatus(publish ? 'Publishing…' : 'Unpublishing…');
    const response = await adminFetch(`/api/admin/news-posts/${post.postId}/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publish }),
    });
    if (response.ok) {
      const data = (await response.json()) as { post: NewsPostDoc };
      setPost(data.post);
      setStatus(publish ? 'Published' : 'Unpublished');
    } else {
      setStatus('Could not update status');
    }
  };

  const remove = async () => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Delete this post permanently?')) {
      return;
    }
    const response = await adminFetch(`/api/admin/news-posts/${post.postId}`, { method: 'DELETE' });
    if (response.ok) {
      router.push('/admin/news');
    } else {
      setStatus('Could not delete');
    }
  };

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title={post.content.en?.title || 'Edit post'}
        description={post.newsLink || `/news/${post.slug}`}
        backHref="/admin/news"
      />

      <div className="space-y-4 px-8">
        <div className="flex flex-wrap items-center gap-2">
          <Button tone="brand" onClick={() => void save()}>
            Save
          </Button>
          {post.status === 'published' ? (
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

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Card padding="lg" className="space-y-5">
            <div className="flex gap-2">
              {LOCALES.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => setLocale(entry)}
                  className={`cursor-pointer rounded-ps-pill border-none px-4 py-1.5 font-body text-ps-xs font-semibold ${
                    locale === entry ? 'bg-ps-black text-white' : 'bg-ps-grey-100 text-ps-ink-600'
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
                placeholder="News headline / title"
              />
            </Field>

            <Field
              label="News link"
              hint="External URL of the original article. Visitors clicking the card navigate directly here."
            >
              <Input
                type="text"
                value={post.newsLink ?? ''}
                onChange={(e) => setPost({ ...post, newsLink: e.target.value })}
                placeholder="https://www.thedailystar.net/news/article"
              />
            </Field>

            <Field label="Slug" hint="URL identifier: /news/<slug>">
              <Input
                type="text"
                value={post.slug}
                onChange={(e) =>
                  setPost({ ...post, slug: e.target.value.toLowerCase().replaceAll(/\s+/gu, '-') })}
              />
            </Field>
          </Card>

          <Card padding="lg" className="space-y-5 self-start">
            <Field label="Publication" hint="Select the publication or press source.">
              <select
                value={post.publicationId ?? ''}
                onChange={(event) =>
                  setPost({
                    ...post,
                    publicationId: event.target.value || undefined,
                  })}
                className="w-full rounded-ps-sm border border-ps-grey-200 bg-white px-3 py-2 font-body text-ps-sm outline-none focus:border-ps-black"
              >
                <option value="">No publication</option>
                {publications.map((publication) => (
                  <option key={publication.publicationId} value={publication.publicationId}>
                    {publication.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Category">
              <div className="flex flex-wrap gap-2">
                {NEWS_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`cursor-pointer rounded-ps-pill px-3 py-1.5 font-body text-ps-xs font-semibold ring-1 ring-inset transition-colors ${
                      post.categories.includes(category)
                        ? 'border-none bg-ps-black text-white ring-ps-black'
                        : 'border-none bg-transparent text-ps-ink-600 ring-ps-grey-300 hover:ring-ps-black'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Cover image" hint="Select from Asset Library or enter URL">
              <MediaInput
                value={post.coverImage}
                onChange={(coverImage) => setPost({ ...post, coverImage })}
                onSelectMedia={(media) => {
                  setPost((prev) =>
                    prev
                      ? {
                          ...prev,
                          coverImage: media.url,
                          coverImageAlt: media.alt || prev.coverImageAlt || '',
                        }
                      : prev,
                  );
                }}
                defaultFolder="News"
              />
            </Field>

            <Field label="Cover image alt text">
              <Input
                type="text"
                value={post.coverImageAlt ?? ''}
                onChange={(e) => setPost({ ...post, coverImageAlt: e.target.value })}
              />
            </Field>

            <Field label="Published date">
              <Input
                type="date"
                value={new Date(post.publishedAt).toISOString().slice(0, 10)}
                onChange={(e) =>
                  setPost({ ...post, publishedAt: new Date(`${e.target.value}T00:00:00.000Z`) })}
              />
            </Field>

            <label className="flex cursor-pointer items-center gap-2 text-ps-sm font-semibold">
              <input
                type="checkbox"
                aria-label="Featured post"
                checked={post.featured}
                onChange={(e) => setPost({ ...post, featured: e.target.checked })}
                className="size-4 accent-ps-red-500"
              />
              Featured (shown in the /news spotlight)
            </label>
          </Card>
        </div>
      </div>
    </main>
  );
}

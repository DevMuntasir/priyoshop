'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { MediaInput } from '@/components/admin/assets/MediaInput';
import { RichTextEditor } from '@/components/admin/media/RichTextEditor';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { BLOG_CATEGORIES } from '@/libs/media/Categories';
import type { BlogPostDoc, BlogPostLocaleContent } from '@/libs/media/Types';

const EMPTY_CONTENT: BlogPostLocaleContent = { title: '', excerpt: '', contentHtml: '' };

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

/* Full blog post editor: settings (slug, categories, cover, date, featured),
   per-locale content with a rich text body, save/publish/delete actions. */
export function BlogPostEditor(props: { postId: string }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPostDoc | null>(null);
  const [locale, setLocale] = useState<EditorLocale>('en');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      const response = await adminFetch(`/api/admin/blog-posts/${props.postId}`);
      if (response.ok) {
        const data = (await response.json()) as { post: BlogPostDoc };
        setPost(data.post);
      } else {
        setStatus('Could not load post');
      }
    };
    void load();
  }, [props.postId]);

  if (!post) {
    return (
      <main className="space-y-6">
        <Text size="body" className="text-ps-ink-600">
          {status || 'Loading…'}
        </Text>
      </main>
    );
  }

  const content = post.content[locale] ?? EMPTY_CONTENT;

  const setContentField = (field: keyof BlogPostLocaleContent, value: string) => {
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
    const response = await adminFetch(`/api/admin/blog-posts/${post.postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: post.slug,
        categories: post.categories,
        content: { en, bn: post.content.bn },
        coverImage: post.coverImage,
        coverImageAlt: post.coverImageAlt,
        featured: post.featured,
        publishedAt: new Date(post.publishedAt).toISOString(),
      }),
    });
    if (response.ok) {
      const data = (await response.json()) as { post: BlogPostDoc };
      setPost(data.post);
      setStatus('Saved');
    } else {
      const data = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus(data?.error ?? 'Could not save');
    }
  };

  const setPublished = async (publish: boolean) => {
    setStatus(publish ? 'Publishing…' : 'Unpublishing…');
    const response = await adminFetch(`/api/admin/blog-posts/${post.postId}/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publish }),
    });
    if (response.ok) {
      const data = (await response.json()) as { post: BlogPostDoc };
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
    const response = await adminFetch(`/api/admin/blog-posts/${post.postId}`, { method: 'DELETE' });
    if (response.ok) {
      router.push('/admin/media');
    } else {
      setStatus('Could not delete');
    }
  };

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title={post.content.en?.title || 'Edit post'}
        description={`/media/${post.slug} — ${post.status === 'published' ? 'Published' : 'Draft'}`}
      />

      <div className='px-8 space-y-4'>
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
                placeholder="Post title"
              />
            </Field>

            <Field label="Excerpt" hint="Short lead paragraph, also the default meta description.">
              <textarea
                aria-label="Excerpt"
                value={content.excerpt}
                onChange={(e) => setContentField('excerpt', e.target.value)}
                rows={3}
                className="w-full rounded-ps-sm border border-ps-grey-200 px-3 py-2 font-body text-ps-sm outline-none focus:border-ps-black"
              />
            </Field>

            <Field label="Body">
              <RichTextEditor
                key={locale}
                value={content.contentHtml}
                onChange={(html) => setContentField('contentHtml', html)}
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
              hint={`${(content.metaDescription ?? '').length}/160 — falls back to the excerpt.`}
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
            <Field label="Slug" hint="URL: /media/<slug>">
              <Input
                type="text"
                value={post.slug}
                onChange={(e) =>
                  setPost({ ...post, slug: e.target.value.toLowerCase().replaceAll(/\s+/gu, '-') })}
              />
            </Field>

            <Field label="Categories">
              <div className="flex flex-wrap gap-2">
                {BLOG_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`cursor-pointer rounded-ps-pill px-3 py-1.5 font-body text-ps-xs font-semibold ring-1 ring-inset transition-colors ${post.categories.includes(category)
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
                defaultFolder="Blogs"
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
              Featured (shown in the /media hero carousel)
            </label>
          </Card>
        </div>
      </div>
    </main>
  );
}

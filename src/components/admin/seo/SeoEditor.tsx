'use client';

import { useEffect, useState } from 'react';
import { MediaInput } from '@/components/admin/assets/MediaInput';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { PageKey } from '@/libs/cms/Pages';
import { routing } from '@/libs/I18nRouting';

type StoredOverride = {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  ogImage?: string;
  robots?: { index: boolean; follow: boolean };
};

// Editable form shape for one locale (keywords flattened to a text field).
type FormOverride = {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  ogImage: string;
  noindex: boolean;
};

const inputClass = 'w-full rounded-md border border-gray-300 px-3 py-2 text-sm';
const labelClass = 'block text-xs font-medium text-gray-500';

const toForm = (override: StoredOverride): FormOverride => ({
  title: override.title ?? '',
  description: override.description ?? '',
  keywords: (override.keywords ?? []).join(', '),
  canonicalPath: override.canonicalPath ?? '',
  ogImage: override.ogImage ?? '',
  noindex: override.robots?.index === false,
});

const emptyForm = (): FormOverride => toForm({});

export const SeoEditor = (props: { pageKey: PageKey }) => {
  const [byLocale, setByLocale] = useState<Record<string, FormOverride>>({});
  const [locale, setLocale] = useState(routing.defaultLocale);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await adminFetch(`/api/admin/seo/${props.pageKey}`);
      if (res.ok) {
        const data: { seo: { byLocale: Record<string, StoredOverride> } } = await res.json();
        const forms = Object.fromEntries(
          routing.locales.map((code) => [code, toForm(data.seo.byLocale[code] ?? {})]),
        );
        setByLocale(forms);
      }
      setLoaded(true);
    };
    void load();
  }, [props.pageKey]);

  if (!loaded) {
    return <p className="mt-6 text-sm text-gray-500">Loading…</p>;
  }

  const form = byLocale[locale] ?? emptyForm();

  const patch = (field: keyof FormOverride, value: string | boolean) => {
    setByLocale({ ...byLocale, [locale]: { ...form, [field]: value } });
  };

  const save = async () => {
    setStatus('Saving…');
    const keywords = form.keywords
      .split(',')
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    const res = await adminFetch(`/api/admin/seo/${props.pageKey}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locale,
        title: form.title,
        description: form.description,
        keywords,
        canonicalPath: form.canonicalPath,
        ogImage: form.ogImage,
        robots: form.noindex ? { index: false, follow: false } : undefined,
      }),
    });
    setStatus(res.ok ? 'Saved' : 'Could not save');
  };

  return (
    <div className="mt-6 max-w-3xl space-y-6">
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">
          Editing language. Each language is saved separately.
        </p>
        <label className="block">
          <span className={labelClass}>Language</span>
          <select
            aria-label="Language"
            className={inputClass}
            value={locale}
            onChange={(event) => {
              setLocale(event.target.value);
            }}
          >
            {routing.locales.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
        <legend className="px-1 text-sm font-medium text-gray-700">Metadata ({locale})</legend>
        <label className="block">
          <span className={labelClass}>Meta title</span>
          <input
            aria-label="Meta title"
            className={inputClass}
            value={form.title}
            onChange={(event) => {
              patch('title', event.target.value);
            }}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Meta description</span>
          <textarea
            aria-label="Meta description"
            className={inputClass}
            rows={3}
            value={form.description}
            onChange={(event) => {
              patch('description', event.target.value);
            }}
          />
        </label>
        <label className="block">
          <span className={labelClass}>Keywords (comma separated)</span>
          <input
            aria-label="Keywords"
            className={inputClass}
            value={form.keywords}
            onChange={(event) => {
              patch('keywords', event.target.value);
            }}
          />
        </label>
      </fieldset>

      <fieldset className="space-y-3 rounded-lg border border-gray-200 bg-white p-4">
        <legend className="px-1 text-sm font-medium text-gray-700">Advanced</legend>
        <label className="block">
          <span className={labelClass}>Canonical path (optional)</span>
          <input
            aria-label="Canonical path"
            className={inputClass}
            placeholder="/about"
            value={form.canonicalPath}
            onChange={(event) => {
              patch('canonicalPath', event.target.value);
            }}
          />
        </label>
        <MediaInput
          label="Social share image URL (optional)"
          placeholder="https://…/og.png"
          value={form.ogImage}
          onChange={(value) => {
            patch('ogImage', value);
          }}
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            aria-label="Hide this page from search engines"
            checked={form.noindex}
            onChange={(event) => {
              patch('noindex', event.target.checked);
            }}
          />
          Hide this page from search engines (noindex)
        </label>
      </fieldset>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
          onClick={save}
        >
          Save changes
        </button>
        {status ? <span className="text-sm text-gray-500">{status}</span> : null}
      </div>
    </div>
  );
};

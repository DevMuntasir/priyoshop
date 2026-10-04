'use client';

import { useId, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { CategoryScope } from '@/libs/categories/CategoryValidation';

export function CreateCategoryButton(props: {
  scope: CategoryScope;
  compact?: boolean;
  onCreated?: (category: string) => void;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState('');

  const create = async () => {
    if (saving || !name.trim()) {
      return;
    }
    setSaving(true);
    setError('');
    try {
      const response = await adminFetch(`/api/admin/categories/${props.scope}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      const data: unknown = await response.json();
      if (!response.ok || !data || typeof data !== 'object' || !('category' in data) || typeof data.category !== 'string') {
        setError(response.status === 403 ? 'You do not have permission to create categories.' : 'Could not create category.');
        return;
      }
      props.onCreated?.(data.category);
      setCreated(data.category);
      setOpen(false);
    } catch {
      setError('Could not connect to the server.');
    } finally {
      setSaving(false);
    }
  };

  const show = () => {
    setName('');
    setError('');
    setCreated('');
    setOpen(true);
  };

  return (
    <div>
      {props.compact ? (
        <button type="button" aria-label="Create category" title="Create category" onClick={show} className="flex size-9 items-center justify-center rounded-lg border border-gray-200 text-xl text-gray-600 hover:bg-gray-50">
          <span aria-hidden="true">+</span>
        </button>
      ) : (
        <Button variant="outlined" onClick={show}>Create category</Button>
      )}
      <span role="status" className={props.onCreated ? 'sr-only' : 'mt-1 block text-xs text-gray-500'}>
        {created ? `Category “${created}” is available.` : ''}
      </span>
      {open && (
        <dialog
          ref={(dialog) => { if (dialog && !dialog.open) { dialog.showModal(); } }}
          aria-labelledby={`${id}-title`}
          className="fixed inset-0 m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl backdrop:bg-black/60"
          onCancel={(event) => { event.preventDefault(); if (!saving) { setOpen(false); } }}
        >
          <h2 id={`${id}-title`} className="text-xl font-semibold text-gray-900">Create {props.scope === 'blog' ? 'blog' : 'news'} category</h2>
          <p className="mt-2 text-sm text-gray-500">{props.onCreated ? 'Create a category and select it for this post. Save the post to apply your selection.' : 'Create a category to use in your posts.'}</p>
          <form onSubmit={(event) => { event.preventDefault(); void create(); }}>
            <fieldset disabled={saving} className="mt-5 space-y-4">
              <label htmlFor={`${id}-name`} className="block text-sm font-medium text-gray-700">Category name</label>
              <input id={`${id}-name`} required maxLength={40} value={name} onChange={(event) => { setName(event.target.value); }} className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100" />
              {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outlined" disabled={saving} onClick={() => { setOpen(false); }}>Cancel</Button>
                <Button type="submit" tone="brand" disabled={saving || !name.trim()}>{saving ? 'Creating…' : 'Create category'}</Button>
              </div>
            </fieldset>
          </form>
        </dialog>
      )}
    </div>
  );
}

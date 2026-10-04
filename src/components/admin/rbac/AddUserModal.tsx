'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { adminFetch } from '@/libs/auth/AdminFetch';

const fieldClass =
  'w-full rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100';

function PasswordField(props: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-1.5">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {props.label}
      </label>
      <div className="relative">
        <input
          id={props.id}
          aria-label={props.label}
          name={props.id}
          className={`${fieldClass} pr-11`}
          type={visible ? 'text' : 'password'}
          autoComplete="new-password"
          minLength={8}
          required
          value={props.value}
          onChange={(event) => {
            props.onChange(event.target.value);
          }}
        />
        <button
          type="button"
          aria-label={`${visible ? 'Hide' : 'Show'} ${props.label.toLowerCase()}`}
          aria-controls={props.id}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="size-5"
          >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
            {visible && <path d="m3 3 18 18" />}
          </svg>
        </button>
      </div>
    </div>
  );
}

export function AddUserModal(props: {
  roles: { id: string; name: string }[];
  onClose: () => void;
  onCreated: () => Promise<void>;
}) {
  const [form, setForm] = useState({ name: '', email: '', password: '', roleId: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const passwordsMatch = form.password === confirmPassword;

  const createUser = async () => {
    if (saving || !passwordsMatch) {
      return;
    }
    setError('');
    setSaving(true);
    try {
      const res = await adminFetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        setError('Could not create user. Check the email and password.');
        return;
      }
    } catch {
      setError('Could not connect to the server.');
      return;
    } finally {
      setSaving(false);
    }
    props.onClose();
    await props.onCreated();
  };

  return (
    <dialog
      ref={(dialog) => {
        if (dialog && !dialog.open) {
          dialog.showModal();
        }
      }}
      aria-labelledby="add-user-title"
      aria-describedby="add-user-description"
      className="fixed inset-0 m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl bg-white p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-xs"
      onCancel={(event) => {
        event.preventDefault();
        if (!saving) {
          props.onClose();
        }
      }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-6 sm:px-8">
        <div>
          <h2 id="add-user-title" className="text-xl font-semibold tracking-tight text-gray-900">
            Add user
          </h2>
          <p id="add-user-description" className="mt-1.5 text-sm text-gray-500">
            Create an account and give your team member the right access.
          </p>
        </div>
        <button
          type="button"
          aria-label="Close add user"
          disabled={saving}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-700 disabled:opacity-50"
          onClick={props.onClose}
        >
          ✕
        </button>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void createUser();
        }}
      >
        <fieldset disabled={saving} className="space-y-5 p-6 sm:p-8">
          <div className="space-y-1.5">
            <label htmlFor="new-user-name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="new-user-name"
              aria-label="Name"
              name="name"
              placeholder="Enter full name"
              autoComplete="name"
              className={fieldClass}
              required
              value={form.name}
              onChange={(event) => {
                setForm({ ...form, name: event.target.value });
              }}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="new-user-email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="new-user-email"
              aria-label="Email"
              name="email"
              placeholder="name@company.com"
              autoComplete="email"
              className={fieldClass}
              type="email"
              required
              value={form.email}
              onChange={(event) => {
                setForm({ ...form, email: event.target.value });
              }}
            />
          </div>
          <PasswordField
            id="new-user-password"
            label="Password"
            value={form.password}
            onChange={(password) => {
              setForm({ ...form, password });
            }}
          />
          <p className="text-xs text-gray-500">Use at least 8 characters.</p>
          <PasswordField
            id="new-user-confirm-password"
            label="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />
          {confirmPassword && !passwordsMatch && (
            <p role="alert" className="text-sm text-red-600">
              Passwords do not match.
            </p>
          )}
          <div className="space-y-1.5">
            <label htmlFor="new-user-role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="new-user-role"
              name="roleId"
              className={fieldClass}
              required
              value={form.roleId}
              onChange={(event) => {
                setForm({ ...form, roleId: event.target.value });
              }}
            >
              <option value="">Choose an access role</option>
              {props.roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
            <Button variant="outlined" disabled={saving} onClick={props.onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              tone="brand"
              disabled={
                saving ||
                !(
                  form.name.trim() &&
                  form.email &&
                  form.password.length >= 8 &&
                  form.roleId &&
                  passwordsMatch
                )
              }
            >
              {saving ? 'Adding user…' : 'Add user'}
            </Button>
          </div>
        </fieldset>
      </form>
    </dialog>
  );
}

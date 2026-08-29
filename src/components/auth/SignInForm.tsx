'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { signIn } from '@/libs/auth/AuthClient';
import { Link } from '@/libs/I18nNavigation';

const fieldClass =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900';

export const SignInForm = () => {
  const t = useTranslations('AuthForm');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  return (
    <form
      className="w-full max-w-sm space-y-4 rounded-lg border border-gray-200 bg-white p-6"
      onSubmit={async (event) => {
        event.preventDefault();
        setPending(true);
        setError('');
        const result = await signIn.email({ email, password });
        setPending(false);
        if (result.error) {
          setError(t('error_invalid'));
          return;
        }
        router.push(searchParams.get('redirect_url') ?? '/dashboard');
        router.refresh();
      }}
    >
      <h1 className="text-xl font-semibold text-gray-900">{t('sign_in_title')}</h1>

      <label className="block text-sm">
        <span className="mb-1 block text-gray-600">{t('email_label')}</span>
        <input
          type="email"
          required
          aria-label={t('email_label')}
          autoComplete="email"
          className={fieldClass}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </label>

      <label className="block text-sm">
        <span className="mb-1 block text-gray-600">{t('password_label')}</span>
        <input
          type="password"
          required
          aria-label={t('password_label')}
          autoComplete="current-password"
          className={fieldClass}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? t('pending') : t('sign_in_button')}
      </button>

      <Link href="/sign-up" className="block text-center text-sm text-gray-600 hover:text-gray-900">
        {t('to_sign_up')}
      </Link>
    </form>
  );
};

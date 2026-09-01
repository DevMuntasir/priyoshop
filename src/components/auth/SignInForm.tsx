'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { signIn } from '@/libs/auth/AuthClient';
import { Link } from '@/libs/I18nNavigation';

const fieldClass =
  'min-h-12 w-full rounded-ps-md border border-ps-grey-300 bg-white px-4 py-3 text-base text-ps-ink-900 outline-none transition-shadow focus:border-ps-red-500 focus:ring-2 focus:ring-ps-red-500/20';

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
      className="w-full max-w-sm space-y-5 rounded-ps-xl border border-ps-grey-200 bg-white p-5 shadow-ps-soft sm:p-7"
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
      <h1 className="font-display text-ps-h5 font-bold text-ps-ink-900">{t('sign_in_title')}</h1>

      <label className="block font-body text-ps-sm">
        <span className="mb-2 block font-semibold text-ps-ink-600">{t('email_label')}</span>
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

      <label className="block font-body text-ps-sm">
        <span className="mb-2 block font-semibold text-ps-ink-600">{t('password_label')}</span>
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
        className="min-h-12 w-full rounded-full bg-ps-ink-900 px-4 py-3 font-body text-base font-semibold text-white transition-colors hover:bg-ps-ink-700 disabled:opacity-60"
      >
        {pending ? t('pending') : t('sign_in_button')}
      </button>

      <Link href="/sign-up" className="flex min-h-11 items-center justify-center text-center font-body text-ps-sm font-semibold text-ps-ink-600 hover:text-ps-black">
        {t('to_sign_up')}
      </Link>
    </form>
  );
};

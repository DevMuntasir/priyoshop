'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { SectionHeading } from '@/components/ui/SectionHeading';

function CheckCircleIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden>
      <circle cx="32" cy="32" r="32" fill="#22A055" />
      <path
        d="M21 32.5l7.5 7.5L43 25.5"
        stroke="white"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* "Support" section: name/email/message form posting to /api/contact,
   replaced by a green confirmation panel after a successful submit. */
export function ContactForm() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('submitting');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: data.get('name'),
        email: data.get('email'),
        message: data.get('message'),
      }),
    }).catch(() => null);

    if (response?.ok) {
      setStatus('submitted');
    } else {
      setStatus('error');
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('form_eyebrow')}
          title={t('form_title')}
          titleSize="h3"
          description={t('form_description')}
        />

        {status === 'submitted' ? (
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 rounded-ps-xl border border-[#9edcb4] bg-ps-green-tint/60 px-8 py-14 text-center">
            <CheckCircleIcon />
            <p className="m-0 font-display text-ps-h6 font-bold text-ps-black">
              {t('success_title')}
            </p>
            <p className="m-0 max-w-md font-body text-ps-sm font-normal text-ps-ink-600">
              {t('success_description')}
            </p>
          </div>
        ) : (
          <form className="mx-auto mt-12 max-w-3xl" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label={t('name_label')}
                name="name"
                placeholder={t('name_placeholder')}
                required
                maxLength={120}
              />
              <Input
                label={t('email_label')}
                name="email"
                type="email"
                placeholder={t('email_placeholder')}
                required
                maxLength={200}
              />
            </div>

            <label className="mt-6 flex w-full flex-col gap-2">
              <span className="font-body text-ps-sm font-semibold text-ps-ink-600">
                {t('message_label')}
              </span>
              <textarea
                name="message"
                rows={6}
                required
                maxLength={5000}
                placeholder={t('message_placeholder')}
                className="w-full resize-y rounded-ps-md bg-white px-4.5 py-3.5 font-body text-base font-normal text-ps-ink-700 ring-1 ring-ps-grey-300 outline-none transition-shadow duration-150 ease-in-out ring-inset focus:ring-[1.5px] focus:ring-ps-red-500 sm:text-ps-body"
              />
            </label>

            {status === 'error' && (
              <p className="m-0 mt-4 text-center font-body text-ps-sm font-semibold text-ps-red-600">
                {t('error_message')}
              </p>
            )}

            <div className="mt-8 flex justify-center">
              <Button type="submit" variant="filled" tone="dark" disabled={status === 'submitting'}>
                {t('submit_label')}
              </Button>
            </div>

            <p className="m-0 mt-4 text-center font-body text-ps-xs font-normal text-ps-ink-500">
              {t('terms_prefix')}
              {' '}
              <a href="/terms" className="text-ps-ink-700 underline">{t('terms_link')}</a>
              <br />
              <a href="/privacy" className="text-ps-ink-700 underline">{t('privacy_link')}</a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

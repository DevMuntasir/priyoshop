'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

type ContactMessage = {
  submissionId: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  receivedAt: string;
};

const fieldClass =
  'rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100';

export function ContactInbox(props: { submissions: ContactMessage[] }) {
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const search = query.trim().toLowerCase();
  const messages = props.submissions
    .filter((submission) =>
      `${submission.name} ${submission.email} ${submission.message}`.toLowerCase().includes(search),
    )
    .toSorted((first, second) =>
      sortOrder === 'newest'
        ? second.createdAt.localeCompare(first.createdAt)
        : first.createdAt.localeCompare(second.createdAt),
    );

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight text-gray-900">
            {props.submissions.length}
          </span>
          <span className="text-sm text-gray-500">Recent messages</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight text-gray-900">
            {new Set(props.submissions.map((submission) => submission.email.toLowerCase())).size}
          </span>
          <span className="text-sm text-gray-500">Unique senders</span>
        </div>
      </div>

      <section
        aria-labelledby="contact-inbox-title"
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        <div className="space-y-5 border-b border-gray-100 p-5 sm:p-6">
          <div>
            <h2 id="contact-inbox-title" className="text-base font-semibold text-gray-900">
              Inbox
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Your latest 500 contact form submissions. Times are shown in Bangladesh time.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1 sm:max-w-md">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="pointer-events-none absolute top-3 left-3.5 size-5 text-gray-400"
              >
                <circle cx="10.5" cy="10.5" r="6.5" />
                <path d="m16 16 4.5 4.5" />
              </svg>
              <input
                type="search"
                aria-label="Search messages by name, email or message"
                placeholder="Search by name, email or message…"
                className={`${fieldClass} w-full pl-11`}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
              />
            </div>
            <select
              aria-label="Sort messages by date"
              className={`${fieldClass} sm:ml-auto sm:min-w-44`}
              value={sortOrder}
              onChange={(event) => {
                setSortOrder(event.target.value);
              }}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-gray-900">
              {search ? 'No matching messages' : 'No contact messages yet'}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {search
                ? 'Search with a different name, email or keyword.'
                : 'Messages will appear here when someone submits your contact form.'}
            </p>
            {query && (
              <button
                type="button"
                className="mt-4 text-sm font-medium text-ps-red-600 hover:underline"
                onClick={() => {
                  setQuery('');
                }}
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {messages.map((submission) => (
              <li key={submission.submissionId} className="p-5 sm:p-6">
                <article className="space-y-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ps-red-50 text-sm font-semibold text-ps-red-600"
                      >
                        {submission.name
                          .trim()
                          .split(/\s+/u)
                          .slice(0, 2)
                          .map((part) => part.charAt(0))
                          .join('')
                          .toUpperCase()}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold break-words text-gray-900">
                          {submission.name}
                        </h3>
                        <a
                          href={`mailto:${submission.email}`}
                          className="mt-0.5 block text-sm break-all text-gray-500 hover:text-ps-red-600 hover:underline"
                        >
                          {submission.email}
                        </a>
                      </div>
                    </div>
                    <time
                      dateTime={submission.createdAt}
                      className="shrink-0 text-xs text-gray-500 sm:pt-1"
                    >
                      {submission.receivedAt}
                    </time>
                  </div>
                  <p className="rounded-xl bg-gray-50 p-4 text-sm leading-relaxed wrap-anywhere whitespace-pre-wrap text-gray-700">
                    {submission.message}
                  </p>
                  <Button href={`mailto:${submission.email}`} variant="outlined" size="sm">
                    Reply by email
                  </Button>
                </article>
              </li>
            ))}
          </ul>
        )}
        <output className="block border-t border-gray-100 px-5 py-4 text-xs text-gray-500 sm:px-6">
          {`Showing ${messages.length} of ${props.submissions.length} messages`}
        </output>
      </section>
    </div>
  );
}

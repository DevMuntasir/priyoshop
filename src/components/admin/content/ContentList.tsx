'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export type ContentListItem = {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  categories: string[];
  status: 'draft' | 'published';
  date: string;
  dateLabel: string;
  featured?: boolean;
  warning?: string;
};

const pageSize = 12;
const fieldClass =
  'rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100';

function ContentRow(props: { item: ContentListItem; dateHeading: string }) {
  return (
    <li>
      <Link
        href={props.item.href}
        prefetch={false}
        className="group flex flex-col gap-4 p-5 transition-colors hover:bg-gray-50/70 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ps-red-500 sm:p-6 lg:flex-row lg:items-center"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold wrap-anywhere text-gray-900 group-hover:text-ps-red-600">
              {props.item.title}
            </h3>
            {props.item.featured && (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                Featured
              </span>
            )}
          </div>
          <p className="mt-1 truncate text-xs text-gray-500" title={props.item.subtitle}>
            {props.item.subtitle}
          </p>
          <p className="mt-2 text-xs wrap-anywhere text-gray-600">
            {props.item.categories.join(' · ') || 'Uncategorized'}
          </p>
          {props.item.warning && (
            <p className="mt-2 text-xs font-medium text-amber-800">{props.item.warning}</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${props.item.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}
          >
            {props.item.status === 'published' ? 'Published' : 'Draft'}
          </span>
          <div className="lg:w-28">
            <p className="text-xs text-gray-400">{props.dateHeading}</p>
            <time dateTime={props.item.date} className="mt-1 block text-xs text-gray-600">
              {props.item.dateLabel}
            </time>
          </div>
          <span className="ml-auto text-sm font-medium text-ps-red-600">
            Edit <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </li>
  );
}

export function ContentList(props: {
  items: ContentListItem[];
  title: string;
  description: string;
  dateHeading: string;
  createHref: string;
  createLabel: string;
}) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const search = query.trim().toLowerCase();
  const categories = [...new Set(props.items.flatMap((item) => item.categories))].toSorted();
  const filtered = props.items
    .filter(
      (item) =>
        (!status || item.status === status) &&
        (!category || item.categories.includes(category)) &&
        (!search ||
          `${item.title} ${item.subtitle} ${item.categories.join(' ')}`
            .toLowerCase()
            .includes(search)),
    )
    .toSorted((first, second) => {
      if (sort === 'title') {
        return first.title.localeCompare(second.title);
      }
      return sort === 'newest'
        ? second.date.localeCompare(first.date)
        : first.date.localeCompare(second.date);
    });
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const publishedCount = props.items.filter((item) => item.status === 'published').length;

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {[
          { label: 'Recent entries', count: props.items.length },
          { label: 'Published', count: publishedCount },
          { label: 'Drafts', count: props.items.length - publishedCount },
        ].map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-gray-900">
              {stat.count}
            </span>
            <span className="text-sm text-gray-500">{stat.label}</span>
          </div>
        ))}
      </div>
      <section
        aria-labelledby="content-list-title"
        className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
      >
        <div className="space-y-5 border-b border-gray-100 p-5 sm:p-6">
          <div>
            <h2 id="content-list-title" className="text-base font-semibold text-gray-900">
              {props.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">{props.description}</p>
          </div>
          <div className="flex flex-col gap-3 xl:flex-row">
            <div className="relative min-w-0 flex-1">
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
                aria-label="Search by title, path or category"
                placeholder="Search by title, path or category…"
                className={`${fieldClass} w-full pl-11`}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <select
                aria-label="Filter by status"
                className={fieldClass}
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">All statuses</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <select
                aria-label="Filter by category"
                className={`${fieldClass} min-w-0`}
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
              >
                <option value="">All categories</option>
                {categories.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <select
                aria-label={`Sort by ${props.dateHeading.toLowerCase()} or title`}
                className={fieldClass}
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  setPage(1);
                }}
              >
                <option value="newest">Latest date first</option>
                <option value="oldest">Earliest date first</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
          </div>
          {(query || status || category) && (
            <button
              type="button"
              className="text-sm font-medium text-ps-red-600 hover:underline"
              onClick={() => {
                setQuery('');
                setStatus('');
                setCategory('');
                setPage(1);
              }}
            >
              Clear filters
            </button>
          )}
        </div>
        {filtered.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-gray-900">
              {props.items.length === 0 ? 'Your content starts here' : 'No matching entries'}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {props.items.length === 0
                ? 'Create your first entry to get started.'
                : 'Adjust your search or filters to find an entry.'}
            </p>
            {props.items.length === 0 && (
              <Button href={props.createHref} tone="brand" className="mt-5">
                {props.createLabel}
              </Button>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filtered.slice(start, start + pageSize).map((item) => (
              <ContentRow key={item.id} item={item} dateHeading={props.dateHeading} />
            ))}
          </ul>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 sm:px-6">
          <output className="text-xs text-gray-500">{`Showing ${filtered.length ? start + 1 : 0}–${Math.min(start + pageSize, filtered.length)} of ${filtered.length} entries`}</output>
          {pageCount > 1 && (
            <nav aria-label="Content pagination" className="flex items-center gap-3">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => {
                  setPage(currentPage - 1);
                }}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-xs text-gray-500">
                {currentPage} / {pageCount}
              </span>
              <button
                type="button"
                disabled={currentPage === pageCount}
                onClick={() => {
                  setPage(currentPage + 1);
                }}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}

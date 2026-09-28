'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/libs/I18nNavigation';
import { PAGE_REGISTRY, isPageKey } from '@/libs/cms/Pages';
import { adminNavItems } from './Navigation';

/** Maps `/admin/…` path prefixes to human-readable labels. */
const NAV_LABEL_MAP: Record<string, string> = Object.fromEntries(
  adminNavItems.map((item) => [item.href, item.label]),
);

/** Segments that look like IDs — shown as "Edit" in the breadcrumb. */
const ID_SEGMENT_PATTERN = /^[a-f0-9-]{8,}$|^\d+$/;

/**
 * Converts a raw URL segment into a readable breadcrumb label.
 * Uses the nav map for known top-level paths, then falls back to
 * title-casing the segment (or "New" / "Edit" for action segments).
 */
function segmentLabel(segment: string, fullPath: string): string {
  // Check the nav map for the full path up to this segment
  if (NAV_LABEL_MAP[fullPath]) {
    return NAV_LABEL_MAP[fullPath]!;
  }
  if (segment === 'admin') return 'Admin';
  if (segment === 'new') return 'New';
  if (ID_SEGMENT_PATTERN.test(segment)) return 'Edit';
  if (isPageKey(segment)) {
    return PAGE_REGISTRY[segment]?.label ?? segment;
  }
  // Title-case camelCase or hyphenated slugs (e.g. "page-builder" → "Page Builder", "retailFinance" → "Retail Finance")
  const unCamel = segment.replace(/([a-z])([A-Z])/g, '$1 $2');
  return unCamel
    .split(/[-_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

type Crumb = { label: string; href: string };

/**
 * Derives a breadcrumb trail from the current admin pathname.
 * Renders "Admin" as the root, then each meaningful path segment.
 */
export const AdminBreadcrumb = () => {
  const rawPathname = usePathname();

  // Strip locale prefix: pathname is like /en/admin/news/123
  const adminIndex = rawPathname.indexOf('/admin');
  const pathname = adminIndex !== -1 ? rawPathname.slice(adminIndex) : rawPathname;

  const parts = pathname.split('/').filter(Boolean); // ["admin", "news", "123"]

  const crumbs: Crumb[] = [];
  let accumulated = '';

  for (const part of parts) {
    accumulated += `/${part}`;
    crumbs.push({ label: segmentLabel(part, accumulated), href: accumulated });
  }

  if (crumbs.length <= 1) return null; // On /admin root, no breadcrumb needed

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-gray-400">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && (
              <svg
                className="size-3 shrink-0 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
            {isLast ? (
              <span className="font-medium text-gray-600">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="border-none text-gray-400 transition-colors hover:text-gray-700"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

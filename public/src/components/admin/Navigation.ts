/**
 * A single entry in the admin sidebar navigation.
 *
 * The admin portal is an internal, auth-only tool: labels are hardcoded English
 * (no i18n) and pages carry no SEO metadata. See AGENTS.md → Admin portal.
 */
export type AdminNavItem = {
  /** Application-relative path (without locale prefix). */
  href: string;
  /** Hardcoded English label for the link. */
  label: string;
  /** Match the path exactly instead of by prefix (used for the overview root). */
  exact?: boolean;
};

/**
 * Sidebar sections of the admin/CMS portal. Each entry maps to a route under
 * `/admin`. Adding a section here surfaces it in the sidebar; create the
 * matching `page.tsx` under `(auth)/admin`.
 */
export const adminNavItems: AdminNavItem[] = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/pages', label: 'Pages' },
  { href: '/admin/page-builder', label: 'Page Builder' },
  { href: '/admin/menu', label: 'Menu' },
  { href: '/admin/seo', label: 'SEO' },
  { href: '/admin/assets', label: 'Asset Library' },
  { href: '/admin/portfolio', label: 'Portfolio' },
  { href: '/admin/media', label: 'Blog Posts' },
  { href: '/admin/news/publications', label: 'News Publications' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/career', label: 'Careers' },
  { href: '/admin/contact', label: 'Contact Messages' },
  { href: '/admin/users', label: 'Users' },
  { href: '/admin/roles', label: 'Roles' },
  { href: '/admin/settings', label: 'Settings' },
];

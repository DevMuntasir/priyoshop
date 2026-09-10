import { setRequestLocale } from 'next-intl/server';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { listPageDefs } from '@/libs/cms/Pages';
import { Link } from '@/libs/I18nNavigation';
import { routing } from '@/libs/I18nRouting';
import { PORTFOLIO_COUNT } from '@/libs/seo/SeoRepository';

const stats = [
  { label: 'Pages', value: listPageDefs().length },
  { label: 'Portfolio items', value: PORTFOLIO_COUNT },
  { label: 'Locales', value: routing.locales.length },
  { label: 'SEO overrides', value: 0 },
];

const sections = [
  {
    href: '/admin/pages',
    title: 'Pages',
    description: 'Edit the copy and sections of each marketing page.',
  },
  {
    href: '/admin/seo',
    title: 'SEO',
    description:
      'Override marketing page metadata — title, description and social tags — per locale.',
  },
  {
    href: '/admin/portfolio',
    title: 'Portfolio',
    description: 'Add, reorder and update portfolio entries.',
  },
  {
    href: '/admin/media',
    title: 'Media',
    description: 'Upload and organise images used across the site.',
  },
  {
    href: '/admin/settings',
    title: 'Settings',
    description: 'Manage brand details, locales and global configuration.',
  },
];

export default async function AdminOverviewPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className=' h-full'>
      <AdminPageHeader
        title="Overview"
        description="Manage the content, SEO and configuration of the whole site from one place."
      />

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4  ">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-gray-200 bg-white px-5 py-4">
            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
            <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-semibold tracking-wide text-gray-400 uppercase">Manage</h2>
      <div className="mt-4 font-display grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block rounded-lg border border-gray-200 bg-white px-5 py-4 transition-colors hover:border-gray-900"
          >
            <div className="font-medium text-gray-900">{section.title}</div>
            <p className="mt-1 text-sm text-gray-500">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

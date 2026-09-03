import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SignOutButton } from '@/components/auth/SignOutButton';
import { Link } from '@/libs/I18nNavigation';
import Image from 'next/image';

// Admin is an internal, auth-only tool: no SEO metadata and no i18n.
// See AGENTS.md → Admin portal.
export const metadata: Metadata = {
  title: 'Admin console',
};

export default async function AdminLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
      <div className="mx-auto flex  flex-col md:flex-row h-full relative">
        <aside className="flex shrink-0 flex-col gap-6 h-full border-b sticky top-0 border-gray-200 px-4 py-6 md:min-h-screen md:w-64 md:border-r md:border-b-0">
          <div>
            <Link href="/admin" className="border-none text-lg font-bold text-gray-900">
              <Image src={'/icons/logo.svg'} width={200} height={80} alt='logo' />

              {/* {AppConfig.name} */}
            </Link>
            <p className="text-xs tracking-wide text-gray-400 uppercase">Admin</p>
          </div>
          <AdminSidebar />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex z-[9999] sticky top-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4">
            <span className="text-sm font-medium text-gray-500">Priyo CMS</span>
            <div className="flex items-center gap-4">
              <Link href="/" className="border-none text-sm text-gray-600 hover:text-gray-900">
                View site
              </Link>
              <SignOutButton className="border-none text-sm text-gray-600 hover:text-gray-900">
                Sign out
              </SignOutButton>
            </div>
          </header>

          <main>{props.children}</main>
        </div>
      </div>
    </div>
  );
}

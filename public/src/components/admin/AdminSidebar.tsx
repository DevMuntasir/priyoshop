'use client';

import { Link, usePathname } from '@/libs/I18nNavigation';
import { adminNavItems } from './Navigation';

export const AdminSidebar = () => {
  const pathname = usePathname();
  const activeHref = adminNavItems
    .filter((item) => (item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`)))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <nav aria-label="Admin navigation">
      <ul className="flex flex-col gap-1">
        {adminNavItems.map((item) => {
          const isActive = activeHref === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`block font-display rounded-md border-none px-3 py-2 text-sm font-medium transition-colors ${isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

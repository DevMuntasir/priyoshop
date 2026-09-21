'use client';

import { useRouter } from 'next/navigation';
import { Link } from '@/libs/I18nNavigation';

/**
 * Back button for admin navigation supporting explicit href or history back with fallback.
 */
export const AdminBackButton = (props: {
  href?: string;
  fallbackHref?: string;
  label?: string;
  className?: string;
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(props.fallbackHref || '/admin');
    }
  };

  const label = props.label ?? 'Back';
  const baseClasses =
    'inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-xs transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300';
  const combinedClasses = props.className ? `${baseClasses} ${props.className}` : baseClasses;

  if (props.href) {
    return (
      <Link href={props.href} className={combinedClasses} aria-label={label}>
        <svg
          className="size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={handleBack} className={combinedClasses} aria-label={label}>
      <svg
        className="size-4 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
};

import type * as React from 'react';

/* App Store / Google Play download badge, rebuilt from the Figma component.
   theme: "dark" (black) or "light" (white). */
function AppleGlyph({ className }: { className: string }) {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className={`block ${className}`}>
      <path
        d="M16.705 12.763C16.717 11.843 16.967 10.941 17.432 10.141C17.897 9.341 18.562 8.669 19.365 8.187C18.855 7.476 18.182 6.891 17.4 6.478C16.618 6.065 15.748 5.836 14.859 5.809C12.964 5.614 11.126 6.916 10.16 6.916C9.175 6.916 7.688 5.828 6.086 5.86C5.05 5.893 4.041 6.187 3.156 6.714C2.271 7.241 1.541 7.982 1.037 8.867C-1.146 12.557 0.482 17.981 2.573 20.964C3.62 22.425 4.843 24.056 6.443 23.998C8.009 23.935 8.593 23.023 10.484 23.023C12.356 23.023 12.905 23.998 14.537 23.962C16.218 23.935 17.276 22.494 18.286 21.02C19.038 19.979 19.616 18.829 20 17.611C19.024 17.208 18.191 16.534 17.605 15.671C17.019 14.809 16.706 13.798 16.705 12.763Z"
        fill="currentColor"
      />
      <path
        d="M13.621 3.636C14.537 2.562 14.988 1.182 14.879 -0.211C13.48 -0.067 12.187 0.586 11.258 1.618C10.804 2.123 10.457 2.709 10.235 3.345C10.013 3.981 9.922 4.653 9.967 5.323C10.667 5.33 11.36 5.182 11.993 4.89C12.626 4.597 13.182 4.169 13.621 3.636Z"
        fill="currentColor"
      />
    </svg>
  );
}
function GoogleGlyph() {
  return (
    <svg width="21" height="24" viewBox="0 0 21 24" fill="none" className="block">
      <path
        d="M0.18 0.21C0.06 0.46 0 0.79 0 1.2v21.6c0 .41.06.74.18.99L11.66 12 .18.21z"
        fill="#4285F4"
      />
      <path
        d="M15.51 15.85l-3.85-3.85L.18 23.79c.42.45 1.11.51 1.89.06l13.44-7.64v-.36z"
        fill="#34A853"
      />
      <path d="M15.51 8.15v-.36L2.07.15C1.29-.3.6-.24.18.21L11.66 12l3.85-3.85z" fill="#EA4335" />
      <path
        d="M15.51 8.15L11.66 12l3.85 3.85 4.55-2.59c.87-.49.87-1.83 0-2.32l-4.55-2.79z"
        fill="#FBBC04"
      />
    </svg>
  );
}

export type StoreButtonProps = {
  store?: 'apple' | 'google';
  theme?: 'dark' | 'light';
  href?: string;
} & React.HTMLAttributes<HTMLElement>;

export function StoreButton({
  store = 'apple',
  theme = 'dark',
  href,
  className = '',
  ...rest
}: StoreButtonProps) {
  const dark = theme === 'dark';

  const top = store === 'apple' ? 'Download on the' : 'GET IT ON';
  const bottom = store === 'apple' ? 'App Store' : 'Google Play';

  const containerClasses =
    `inline-flex h-13 items-center gap-2.5 rounded-[8px] px-4.5 no-underline ${href ? 'cursor-pointer' : 'cursor-default'} ${dark ? 'bg-black text-white ring-1 ring-inset ring-[#A6A6A6]/60' : 'bg-white text-black ring-1 ring-inset ring-black'} ${className}`.trim();

  const content = (
    <>
      <span className="inline-flex shrink-0 items-center">
        {store === 'apple' ? (
          <AppleGlyph className={dark ? 'text-white' : 'text-black'} />
        ) : (
          <GoogleGlyph />
        )}
      </span>
      <span className="flex flex-col leading-[1.1]">
        <span className="font-body text-[11px] font-medium opacity-92">{top}</span>
        <span className="font-body text-[19px] font-bold tracking-tight">{bottom}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={containerClasses} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <div className={containerClasses} {...rest}>
      {content}
    </div>
  );
}

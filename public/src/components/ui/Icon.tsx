import type * as React from 'react';

/* PriyoShop iconography = thin, single-weight line glyphs that paint with
   currentColor. The arrows + play are lifted from the Figma source; the rest
   share the same 24px box / ~1.5px optical weight. For a broader UI set,
   pair with Lucide (https://unpkg.com/lucide-static) — same line style. */

type IconName =
  | 'arrow-right'
  | 'arrow-left'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-down'
  | 'plus'
  | 'close'
  | 'menu'
  | 'search'
  | 'phone'
  | 'mail'
  | 'location'
  | 'arrow-up-right';

const PATHS: Record<IconName, { vb: string; d: string; fill?: boolean }> = {
  'arrow-right': {
    vb: '0 0 19.743 14.154',
    d: 'M 11.59 14.154 L 10.646 13.195 L 16.097 7.744 L 0 7.744 L 0 6.41 L 16.097 6.41 L 10.646 0.959 L 11.59 0 L 18.667 7.077 L 11.59 14.154 Z',
    fill: true,
  },
  'arrow-left': {
    vb: '0 0 19.743 14.154',
    d: 'M 7.077 14.154 L 0 7.077 L 7.077 0 L 8.02 0.959 L 2.569 6.41 L 19.743 6.41 L 19.743 7.744 L 2.569 7.744 L 8.02 13.195 L 7.077 14.154 Z',
    fill: true,
  },
  'chevron-right': { vb: '0 0 24 24', d: 'M9 6l6 6-6 6' },
  'chevron-left': { vb: '0 0 24 24', d: 'M15 6l-6 6 6 6' },
  'chevron-down': { vb: '0 0 24 24', d: 'M6 9l6 6 6-6' },
  plus: { vb: '0 0 24 24', d: 'M12 5v14M5 12h14' },
  close: { vb: '0 0 24 24', d: 'M6 6l12 12M18 6L6 18' },
  menu: { vb: '0 0 24 24', d: 'M4 7h16M4 12h16M4 17h16' },
  search: { vb: '0 0 24 24', d: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35' },
  phone: {
    vb: '0 0 24 24',
    d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z',
  },
  mail: {
    vb: '0 0 24 24',
    d: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3.5 6.5l8.5 6 8.5-6',
  },
  location: {
    vb: '0 0 24 24',
    d: 'M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  },
  'arrow-up-right': { vb: '0 0 24 24', d: 'M7 17L17 7M8 7h9v9' },
};

export type IconProps = {
  name?: IconName;
  size?: number;
  strokeWidth?: number;
} & React.SVGAttributes<SVGSVGElement>;

export function Icon({
  name = 'arrow-right',
  size = 24,
  strokeWidth = 1.75,
  className = '',
  ...rest
}: IconProps) {
  const def = PATHS[name];
  const common = {
    width: size,
    height: size,
    viewBox: def.vb,
    role: 'img' as const,
    'aria-hidden': true,
    className: `block shrink-0 ${className}`.trim(),
    ...rest,
  };
  if (def.fill) {
    return (
      <svg {...common} fill="none">
        <path d={def.d} fill="currentColor" fillRule="nonzero" />
      </svg>
    );
  }
  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={def.d} />
    </svg>
  );
}

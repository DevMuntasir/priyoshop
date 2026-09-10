'use client';

import type * as React from 'react';

export type HeadingProps = {
  children?: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
  color?: string;
} & React.HTMLAttributes<HTMLHeadingElement>;

const HEADING_CLASSES: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'text-ps-h1 font-display font-extrabold',
  2: 'text-ps-h2 font-display font-extrabold',
  3: 'text-ps-h3 font-display font-bold',
  4: 'text-ps-h4 font-display font-bold',
  5: 'text-ps-h5 font-body font-semibold',
  6: 'text-ps-h6 font-body font-semibold',
};

const ALIGN_CLASSES: Record<'left' | 'center' | 'right', string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const TEXT_COLOR_CLASSES: Record<string, string> = {
  'ps-black': 'text-ps-black',
  'ps-ink-900': 'text-ps-ink-900',
  'ps-white': 'text-ps-white',
  'ps-red-500': 'text-ps-red-500',
};

export function Heading({
  children,
  level = 1,
  align = 'left',
  color = 'ps-black',
  className = '',
  ...rest
}: HeadingProps) {
  const headingClass = HEADING_CLASSES[level];
  const alignClass = ALIGN_CLASSES[align];
  const colorClass = TEXT_COLOR_CLASSES[color] ?? `text-${color}`;

  const classes = `${headingClass} ${alignClass} ${colorClass} ${className}`.trim();

  if (level === 1) {
    return <h1 className={classes} {...rest}>{children}</h1>;
  }
  if (level === 2) {
    return <h2 className={classes} {...rest}>{children}</h2>;
  }
  if (level === 3) {
    return <h3 className={classes} {...rest}>{children}</h3>;
  }
  if (level === 4) {
    return <h4 className={classes} {...rest}>{children}</h4>;
  }
  if (level === 5) {
    return <h5 className={classes} {...rest}>{children}</h5>;
  }
  return <h6 className={classes} {...rest}>{children}</h6>;
}

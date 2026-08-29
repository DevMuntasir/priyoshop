'use client';

import type * as React from 'react';

export type ContainerProps = {
  children?: React.ReactNode;
  bg?: string;
  paddingY?: 'sm' | 'md' | 'lg' | 'xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
} & React.HTMLAttributes<HTMLDivElement>;

const BG_CLASSES: Record<string, string> = {
  'ps-white': 'bg-ps-white',
  'ps-grey-100': 'bg-ps-grey-100',
  'ps-black': 'bg-ps-black',
  'ps-cream': 'bg-ps-cream',
  'ps-warm-white': 'bg-ps-warm-white',
};

const PADDING_Y_CLASSES: Record<'sm' | 'md' | 'lg' | 'xl', string> = {
  sm: 'py-6',
  md: 'py-12',
  lg: 'py-20',
  xl: 'py-32',
};

const MAX_WIDTH_CLASSES: Record<'sm' | 'md' | 'lg' | 'xl' | 'full', string> = {
  sm: 'max-w-sm',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  full: 'max-w-full',
};

export function Container({
  children,
  bg,
  paddingY,
  maxWidth = 'xl',
  className = '',
  ...rest
}: ContainerProps) {
  const bgClass = bg ? (BG_CLASSES[bg] ?? `bg-${bg}`) : '';
  const padyClass = paddingY ? PADDING_Y_CLASSES[paddingY] : '';
  const maxwClass = MAX_WIDTH_CLASSES[maxWidth];

  const classes = `w-full mx-auto ${maxwClass} ${padyClass} ${bgClass} ${className}`.trim();

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

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
  sm: 'py-5 sm:py-6',
  md: 'py-8 sm:py-10 lg:py-12',
  lg: 'py-12 sm:py-16 lg:py-20',
  xl: 'py-16 sm:py-24 lg:py-32',
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

  const gutterClass = maxWidth === 'full' ? '' : 'px-4 sm:px-6 lg:px-8';
  const classes = `mx-auto min-w-0 w-full ${maxwClass} ${gutterClass} ${padyClass} ${bgClass} ${className}`.trim();

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

'use client';

import type * as React from 'react';

export type CardProps = {
  children?: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  bg?: string;
  border?: boolean;
  shadow?: boolean;
  rounded?: 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLDivElement>;

const PADDING_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'p-4',
  md: 'p-4 sm:p-6',
  lg: 'p-5 sm:p-6 lg:p-8',
};

const ROUNDED_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'rounded-ps-sm',
  md: 'rounded-ps-md',
  lg: 'rounded-ps-lg',
};

const BG_CLASSES: Record<string, string> = {
  'ps-white': 'bg-ps-white',
  'ps-grey-100': 'bg-ps-grey-100',
  'ps-cream': 'bg-ps-cream',
  'ps-warm-white': 'bg-ps-warm-white',
};

export function Card({
  children,
  padding = 'md',
  bg = 'ps-white',
  border = false,
  shadow = true,
  rounded = 'md',
  className = '',
  ...rest
}: CardProps) {
  const padClass = PADDING_CLASSES[padding];
  const bgClass = BG_CLASSES[bg] ?? `bg-${bg}`;
  const roundClass = ROUNDED_CLASSES[rounded];
  const borderClass = border ? 'border border-ps-grey-300' : '';
  const shadowClass = shadow ? 'shadow-sm' : '';

  const classes = `min-w-0 max-w-full ${bgClass} ${padClass} ${roundClass} ${borderClass} ${shadowClass} ${className}`.trim();

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

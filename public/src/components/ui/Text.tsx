'use client';

import type * as React from 'react';

export type TextProps = {
  children?: React.ReactNode;
  size?: 'xs' | 'sm' | 'body' | 'lead';
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'semibold' | 'bold';
} & React.HTMLAttributes<HTMLParagraphElement>;

const TEXT_SIZE_CLASSES: Record<'xs' | 'sm' | 'body' | 'lead', string> = {
  xs: 'text-ps-xs',
  sm: 'text-ps-sm',
  body: 'text-ps-body',
  lead: 'text-ps-lead',
};

const TEXT_WEIGHT_CLASSES: Record<'normal' | 'semibold' | 'bold', string> = {
  normal: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const ALIGN_CLASSES: Record<'left' | 'center' | 'right', string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const TEXT_COLOR_CLASSES: Record<string, string> = {
  'ps-black': 'text-ps-black',
  'ps-ink-900': 'text-ps-ink-900',
  'ps-ink-600': 'text-ps-ink-600',
  'ps-white': 'text-ps-white',
  'ps-red-500': 'text-ps-red-500',
};

export function Text({
  children,
  size = 'body',
  color = 'ps-ink-600',
  align = 'left',
  weight = 'normal',
  className = '',
  ...rest
}: TextProps) {
  const sizeClass = TEXT_SIZE_CLASSES[size];
  const colorClass = TEXT_COLOR_CLASSES[color] ?? `text-${color}`;
  const alignClass = ALIGN_CLASSES[align];
  const weightClass = TEXT_WEIGHT_CLASSES[weight];

  const classes = `font-body ${sizeClass} ${colorClass} ${alignClass} ${weightClass} ${className}`.trim();

  return (
    <p className={classes} {...rest}>
      {children}
    </p>
  );
}

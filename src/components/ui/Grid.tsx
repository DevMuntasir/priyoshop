'use client';

import type * as React from 'react';

export type GridProps = {
  children?: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 6;
  gap?: 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLDivElement>;

export type StackProps = {
  children?: React.ReactNode;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  gap?: 'sm' | 'md' | 'lg';
  wrap?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const GRID_COLUMN_CLASSES: Record<1 | 2 | 3 | 4 | 6, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
};

const GAP_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

const ALIGN_CLASSES: Record<'start' | 'center' | 'end' | 'stretch', string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const DIRECTION_CLASSES: Record<'row' | 'column', string> = {
  row: 'flex-row',
  column: 'flex-col',
};

export function Grid({
  children,
  columns = 1,
  gap = 'md',
  className = '',
  ...rest
}: GridProps) {
  const colsClass = GRID_COLUMN_CLASSES[columns];
  const gapClass = GAP_CLASSES[gap];

  const classes = `grid min-w-0 max-w-full ${colsClass} ${gapClass} ${className}`.trim();

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

export function Stack({
  children,
  direction = 'column',
  align = 'start',
  gap = 'md',
  wrap = false,
  className = '',
  ...rest
}: StackProps) {
  const dirClass = DIRECTION_CLASSES[direction];
  const alignClass = ALIGN_CLASSES[align];
  const gapClass = GAP_CLASSES[gap];
  const wrapClass = wrap ? 'flex-wrap' : '';

  const classes = `flex min-w-0 max-w-full ${dirClass} ${alignClass} ${gapClass} ${wrapClass} ${className}`.trim();

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

'use client';

import type * as React from 'react';

export type ImageProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
} & React.ImgHTMLAttributes<HTMLImageElement>;

const ROUNDED_CLASSES: Record<'none' | 'sm' | 'md' | 'lg' | 'full', string> = {
  none: 'rounded-none',
  sm: 'rounded-ps-sm',
  md: 'rounded-ps-md',
  lg: 'rounded-ps-lg',
  full: 'rounded-full',
};

const OBJECT_FIT_CLASSES: Record<'cover' | 'contain' | 'fill' | 'scale-down', string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
  'scale-down': 'object-scale-down',
};

export function Image({
  src,
  alt = '',
  width,
  height,
  rounded = 'md',
  objectFit = 'cover',
  className = '',
  ...rest
}: ImageProps) {
  const roundedClass = ROUNDED_CLASSES[rounded];
  const fitClass = OBJECT_FIT_CLASSES[objectFit];

  const classes = `${roundedClass} ${fitClass} ${className}`.trim();

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={classes}
      {...rest}
    />
  );
}

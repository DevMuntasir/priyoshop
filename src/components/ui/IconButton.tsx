'use client';

import type * as React from 'react';

type Tone = 'dark' | 'light' | 'brand';

const DIM_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'size-9',
  md: 'size-11',
  lg: 'size-14',
};

const SKIN_CLASSES: Record<
  'outline' | 'filled' | 'ghost',
  Record<Tone, string>
> = {
  filled: {
    dark: 'bg-black text-white hover:bg-ps-ink-700',
    light: 'bg-white text-black hover:bg-ps-grey-100',
    brand: 'bg-ps-red-500 text-white hover:bg-ps-red-700',
  },

  ghost: {
    dark: 'bg-transparent text-black hover:bg-black/[0.06]',
    light: 'bg-transparent text-white hover:bg-white/[0.16]',
    brand:
      'bg-transparent text-ps-red-500 hover:bg-ps-red-500/[0.08]',
  },

  outline: {
    dark:
      'bg-transparent text-black ring-1 ring-inset ring-black hover:bg-black/[0.06]',
    light:
      'bg-transparent text-white ring-1 ring-inset ring-white/70 hover:bg-white/[0.16]',
    brand:
      'bg-transparent text-ps-red-500 ring-1 ring-inset ring-ps-red-500 hover:bg-ps-red-500/[0.08]',
  },
};

export type IconButtonProps = {
  children?: React.ReactNode;
  variant?: 'outline' | 'filled' | 'ghost';
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel: string;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'disabled' | 'onClick' | 'aria-label'
>;

export function IconButton({
  children,
  variant = 'outline',
  tone = 'dark',
  size = 'md',
  disabled = false,
  onClick,
  ariaLabel,
  className = '',
  ...rest
}: IconButtonProps) {
  const classes = `
    inline-flex
    shrink-0
    items-center
    justify-center
    rounded-full
    border-none
    p-0
    cursor-pointer

    transition-[background,transform,box-shadow,opacity]
    duration-150
    ease-in-out

    [&>svg]:block
    [&>svg]:shrink-0

    enabled:active:scale-[0.94]

    disabled:cursor-not-allowed
    disabled:opacity-40

    ${DIM_CLASSES[size]}
    ${SKIN_CLASSES[variant][tone]}
    ${className}
  `.trim();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}
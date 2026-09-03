'use client';

import type * as React from 'react';

const SIZE_CLASSES = {
  sm: 'min-h-11 gap-1.5 text-ps-sm',
  md: 'min-h-11 gap-2 text-ps-body',
  lg: 'h-14 gap-2.5 text-ps-body',
};

const ICON_SIZE_CLASSES = {
  sm: 'size-5',
  md: 'size-5.5',
  lg: 'size-6.5',
};

type Variant = 'filled' | 'outlined' | 'ghost';
type Tone = 'dark' | 'light' | 'brand';

const SKIN_CLASSES: Record<Variant, Record<Tone, string>> = {
  filled: {
    dark: 'bg-black text-white hover:text-white before:bg-ps-ink-700',
    light: 'bg-white text-black hover:text-black before:bg-ps-grey-100',
    brand: 'bg-ps-red-500 text-white hover:text-white before:bg-ps-red-700',
  },
  outlined: {
    dark: 'bg-transparent text-black ring-1 ring-inset ring-black hover:text-white before:bg-black',
    light:
      'bg-transparent text-white ring-1 ring-inset ring-white hover:text-black before:bg-white',
    brand:
      'bg-transparent text-ps-red-500 ring-1 ring-inset ring-ps-red-500 hover:text-white before:bg-ps-red-500',
  },
  ghost: {
    dark: 'bg-transparent text-black hover:text-white before:bg-black/[0.06]',
    light: 'bg-transparent text-white hover:text-black before:bg-white/[0.14]',
    brand: 'bg-transparent text-ps-red-500 hover:text-white before:bg-ps-red-500',
  },
};

const PADX_CLASSES: Record<'sm' | 'md' | 'lg', string> = { sm: 'px-4', md: 'px-5', lg: 'px-7' };
const GHOST_PADX_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-1',
  md: 'px-2',
  lg: 'px-4',
};

export type ButtonProps = {
  children?: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
} & React.HTMLAttributes<HTMLElement>;

export function Button({
  children,
  variant = 'filled',
  tone = 'dark',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  href,
  onClick,
  type = 'button',
  className = '',
  ...rest
}: ButtonProps) {
  const padX = variant === 'ghost' ? GHOST_PADX_CLASSES[size] : PADX_CLASSES[size];

  // এখানে অ্যানিমেশনের প্রয়োজনীয় সব core ক্লাস যুক্ত করা হয়েছে (relative, overflow-hidden, before: ইত্যাদি)
  const animationClasses = `
    relative z-10 overflow-hidden isolation-auto
    before:absolute before:w-full before:aspect-square before:rounded-full before:-left-full before:-z-10 before:content-['']
    before:transition-all before:duration-700 before:ease-in-out
    hover:before:left-0 hover:before:scale-150 hover:before:duration-700
  `
    .replaceAll(/\s+/gu, ' ')
    .trim();

  const classes =
    `inline-flex max-w-full flex-row items-center justify-center rounded-full border-none font-body font-semibold whitespace-nowrap leading-none no-underline cursor-pointer transition-colors duration-700 ease-in-out enabled:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40 ${fullWidth ? 'w-full' : 'w-fit'} ${SIZE_CLASSES[size]} ${padX} ${animationClasses} ${SKIN_CLASSES[variant][tone]} ${className}`.trim();

  const iconBox = (node: React.ReactNode) =>
    node ? (
      <span
        className={`inline-flex shrink-0 items-center justify-center ${ICON_SIZE_CLASSES[size]}`}
      >
        {node}
      </span>
    ) : null;

  const inner = (
    <>
      {iconBox(iconLeft)}
      {children !== null && <span>{children}</span>}
      {iconBox(iconRight)}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes} onClick={onClick} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={classes}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...rest}
    >
      {inner}
    </button>
  );
}

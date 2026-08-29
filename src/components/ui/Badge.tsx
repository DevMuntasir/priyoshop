import type * as React from 'react';

type Tone = 'ink' | 'brand' | 'gold';

const TONE_TEXT: Record<Tone, string> = {
  ink: 'text-ps-ink-700',
  brand: 'text-ps-red-600',
  gold: 'text-ps-gold-ink',
};

const TONE_RING: Record<Tone, string> = {
  ink: 'ring-black',
  brand: 'ring-ps-red-500',
  gold: 'ring-ps-gold-500',
};

const TONE_SOFT_BG: Record<Tone, string> = {
  ink: 'bg-ps-grey-150',
  brand: 'bg-ps-red-50',
  gold: 'bg-ps-cream-yellow',
};

const TONE_SOLID: Record<Tone, string> = {
  ink: 'bg-black text-white',
  brand: 'bg-ps-red-500 text-white',
  gold: 'bg-ps-gold-500 text-ps-ink-800',
};

export type BadgeProps = {
  children?: React.ReactNode;
  variant?: 'outline' | 'solid' | 'soft';
  tone?: Tone;
  size?: 'sm' | 'md';
  /* 'light' renders white text/border for badges placed on dark backgrounds. */
  mode?: 'dark' | 'light';
} & React.HTMLAttributes<HTMLSpanElement>;

/* Outline capsule label used as section eyebrows ("Ecosystem at a Glance",
   "The Impact") and small status tags. */
export function Badge({
  children,
  variant = 'outline',
  tone = 'ink',
  size = 'md',
  mode = 'dark',
  className = '',
  ...rest
}: BadgeProps) {
  const sizeClasses = size === 'sm' ? 'text-ps-xs py-0.5 px-3' : 'text-ps-sm py-1 px-4';

  let skinClasses: string;
  if (variant === 'solid') {
    skinClasses = TONE_SOLID[tone];
  } else if (variant === 'soft') {
    skinClasses = `${TONE_SOFT_BG[tone]} ${TONE_TEXT[tone]}`;
  } else if (mode === 'light') {
    skinClasses = 'bg-transparent ring-[1.5px] ring-inset ring-white text-white';
  } else {
    skinClasses = `bg-transparent ring-[1.5px] ring-inset ${TONE_RING[tone]} ${TONE_TEXT[tone]}`;
  }

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full font-body leading-snug font-semibold whitespace-nowrap ${sizeClasses} ${skinClasses} ${className}`.trim()}
      {...rest}
    >
      {children}
    </span>
  );
}

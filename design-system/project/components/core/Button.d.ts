import React from 'react';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children?: React.ReactNode;
  /** filled = solid fill · outlined = 1px ring · ghost = text-only. */
  variant?: 'filled' | 'outlined' | 'ghost';
  /** dark = black (default primary) · light = white (use on dark/photo) · brand = PriyoShop red. */
  tone?: 'dark' | 'light' | 'brand';
  /** sm 32px · md 40px · lg 56px. */
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Render as an <a> when set. */
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

/**
 * PriyoShop button — pill-shaped, Open Sans SemiBold. The black `filled/dark` is the
 * primary CTA ("Join Us"); `outlined/dark` is the secondary ("Watch Our Story").
 * @startingPoint section="Core" subtitle="Pill buttons — filled, outlined, ghost" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
export default Button;

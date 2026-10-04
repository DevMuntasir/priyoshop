import React from 'react';

export interface IconButtonProps {
  children?: React.ReactNode;
  variant?: 'filled' | 'outline' | 'ghost';
  tone?: 'dark' | 'light' | 'brand';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  style?: React.CSSProperties;
}

/**
 * Circular icon-only button — carousel arrows, play controls, compact actions.
 * Pair with `Icon` / `PlayIcon`.
 */
export function IconButton(props: IconButtonProps): JSX.Element;
export default IconButton;

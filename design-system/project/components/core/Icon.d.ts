import React from 'react';

export type IconName =
  | 'arrow-right' | 'arrow-left' | 'arrow-up-right'
  | 'chevron-right' | 'chevron-left' | 'chevron-down'
  | 'plus' | 'close' | 'menu' | 'search'
  | 'phone' | 'mail' | 'location';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name?: IconName;
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
}

export interface PlayIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  variant?: 'outline' | 'filled';
  style?: React.CSSProperties;
}

/**
 * Thin line icons that paint with `currentColor`. The arrows match the Figma
 * source exactly; the rest share the brand's single-weight line style.
 */
export function Icon(props: IconProps): JSX.Element;
/** Circular play glyph for "Watch Our Story" CTAs and video posters. */
export function PlayIcon(props: PlayIconProps): JSX.Element;
export default Icon;

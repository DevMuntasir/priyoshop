import React from 'react';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  /** Pixel width of the rendered logo. Height is derived from the aspect ratio. */
  width?: number;
  /** "default" = ink wordmark for light backgrounds; "light" = white wordmark for dark backgrounds. */
  tone?: 'default' | 'light';
  /** Render only the shopping-bag mark (no wordmark). */
  mark?: boolean;
  style?: React.CSSProperties;
}

/**
 * PriyoShop primary logo — the "PriyoShop" wordmark with the red shopping-bag + heart mark.
 * @startingPoint section="Brand" subtitle="PriyoShop logo, light & dark tones" viewport="700x200"
 */
export function Logo(props: LogoProps): JSX.Element;
export default Logo;

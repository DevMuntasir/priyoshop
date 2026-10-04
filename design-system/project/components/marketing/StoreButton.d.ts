import React from 'react';

export interface StoreButtonProps extends React.HTMLAttributes<HTMLElement> {
  store?: 'apple' | 'google';
  theme?: 'dark' | 'light';
  href?: string;
  style?: React.CSSProperties;
}

/**
 * App Store / Google Play download badge, rebuilt from the Figma "Store download
 * button" component. Used in the "One Mobile App" section.
 */
export function StoreButton(props: StoreButtonProps): JSX.Element;
export default StoreButton;

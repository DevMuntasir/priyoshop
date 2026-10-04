import React from 'react';

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  items?: string[];
  active?: string;
  onNavigate?: (label: string) => void;
  cta?: string;
  onCta?: () => void;
  secondary?: string;
  onSecondary?: () => void;
  /** Rounded floating pill (default) vs full-width bar. */
  floating?: boolean;
  style?: React.CSSProperties;
}

/**
 * Top navigation — floating white pill with logo, centered menu, a Contact
 * link and a Join Us button. The PriyoShop site header.
 * @startingPoint section="Navigation" subtitle="Site header / nav bar" viewport="1280x110"
 */
export function NavBar(props: NavBarProps): JSX.Element;
export default NavBar;

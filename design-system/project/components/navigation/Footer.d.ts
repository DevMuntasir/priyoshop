import React from 'react';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  style?: React.CSSProperties;
}

/**
 * Full black site footer — light logo + socials, link columns (About / Useful
 * Link / Contact Us), Bangladesh & Singapore office cards, and copyright.
 * @startingPoint section="Navigation" subtitle="Black site footer" viewport="1280x620"
 */
export function Footer(props: FooterProps): JSX.Element;
export default Footer;

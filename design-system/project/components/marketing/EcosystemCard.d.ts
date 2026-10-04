import React from 'react';

export interface EcosystemCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode;
  body: React.ReactNode;
  /** Image URL for the media pane. */
  image?: string;
  imageAlt?: string;
  /** Tint for the copy panel — use a pastel token (peach, mint, periwinkle…). */
  panelColor?: string;
  ctaLabel?: string;
  onCta?: () => void;
  href?: string;
  /** Put the image on the left instead of the right. */
  reverse?: boolean;
  height?: number;
  style?: React.CSSProperties;
}

/**
 * Two-pane feature card — a tinted copy panel beside a full-bleed image.
 * Rebuilt from the Figma "ecosystem/card" family (Retail Business, Smart
 * Distribution, etc.).
 * @startingPoint section="Marketing" subtitle="Two-pane ecosystem feature card" viewport="700x360"
 */
export function EcosystemCard(props: EcosystemCardProps): JSX.Element;
export default EcosystemCard;

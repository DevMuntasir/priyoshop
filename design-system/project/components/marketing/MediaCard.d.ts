import React from 'react';

export interface MediaCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  image?: string;
  imageAlt?: string;
  /** Publisher / category eyebrow (rendered red, uppercase). */
  source?: string;
  title: React.ReactNode;
  date?: string;
  href?: string;
  tone?: 'light' | 'dark';
  style?: React.CSSProperties;
}

/**
 * Image-led news / blog card with source eyebrow, clamped title and date.
 * Lifts on hover. Used in "Media & News" and "Read our Blogs".
 * @startingPoint section="Marketing" subtitle="News / blog card" viewport="700x420"
 */
export function MediaCard(props: MediaCardProps): JSX.Element;
export default MediaCard;

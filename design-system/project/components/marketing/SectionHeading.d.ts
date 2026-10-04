import React from 'react';

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Capsule eyebrow text above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Trailing element, e.g. a "View All" Button. */
  action?: React.ReactNode;
  align?: 'center' | 'left';
  titleSize?: 'display' | 'h1' | 'h2' | 'h3';
  /** Substring of a string title to tint brand red (e.g. "Distribution Partner"). */
  accentWords?: string;
  style?: React.CSSProperties;
}

/**
 * Section opener — capsule eyebrow + big Lato title (+ description / action).
 * The recurring rhythm across PriyoShop marketing pages.
 * @startingPoint section="Marketing" subtitle="Eyebrow + Lato section title" viewport="700x260"
 */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
export default SectionHeading;

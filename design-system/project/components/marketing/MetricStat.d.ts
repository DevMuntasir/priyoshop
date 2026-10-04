import React from 'react';

export interface MetricStatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: React.ReactNode;
  label: React.ReactNode;
  /** Optional leading icon / emoji glyph. */
  icon?: React.ReactNode;
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

/**
 * Headline metric — big Lato red value over an Open Sans label, optional icon.
 * The building block of the hero stats bar.
 * @startingPoint section="Marketing" subtitle="Headline metric (value + label)" viewport="700x150"
 */
export function MetricStat(props: MetricStatProps): JSX.Element;
export default MetricStat;

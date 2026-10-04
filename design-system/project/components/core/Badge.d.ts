import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** outline = capsule eyebrow (default) · soft = tinted fill · solid = filled. */
  variant?: 'outline' | 'soft' | 'solid';
  tone?: 'ink' | 'brand' | 'gold';
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

/**
 * Capsule label / eyebrow. The outline variant sits above section titles
 * ("Ecosystem at a Glance", "The Impact"); soft/solid are for status tags.
 * @startingPoint section="Core" subtitle="Capsule labels & eyebrows" viewport="700x120"
 */
export function Badge(props: BadgeProps): JSX.Element;
export default Badge;

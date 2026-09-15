import { clsx } from 'clsx';

export type ResponsiveHeroBackgroundProps = {
  mobile?: string;
  tablet?: string;
  laptop?: string;
  desktop?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

/**
 * Renders a device-specific responsive background image via HTML `<picture>` element.
 * Automatically chooses and fetches only the best image match for the viewport breakpoint:
 * - Mobile: base / default (< 768px)
 * - Tablet: (min-width: 768px)
 * - Laptop: (min-width: 1024px)
 * - Desktop: (min-width: 1140px)
 */
export function ResponsiveHeroBackground(props: ResponsiveHeroBackgroundProps) {
  const fallback = props.mobile || props.tablet || props.laptop || props.desktop;
  if (!fallback) {
    return null;
  }

  return (
    <picture
      aria-hidden="true"
      className={clsx(
        'pointer-events-none absolute inset-0 -z-10 block h-full w-full overflow-hidden',
        props.className,
      )}
    >
      {props.desktop ? <source media="(min-width: 1140px)" srcSet={props.desktop} /> : null}
      {props.laptop ? <source media="(min-width: 1024px)" srcSet={props.laptop} /> : null}
      {props.tablet ? <source media="(min-width: 768px)" srcSet={props.tablet} /> : null}
      <img
        src={fallback}
        alt={props.alt ?? ''}
        className={clsx('h-full w-full object-cover object-center', props.imgClassName)}
        loading={props.priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
}

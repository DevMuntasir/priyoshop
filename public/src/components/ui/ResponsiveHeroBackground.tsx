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

const TRANSPARENT_PIXEL
  = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

/**
 * Renders a device-specific responsive background image via HTML `<picture>` element.
 * Follows mobile-first responsive cascading:
 * - Desktop (>= 1140px): uses desktop ?? laptop ?? tablet ?? mobile
 * - Laptop (>= 1024px): uses laptop ?? tablet ?? mobile
 * - Tablet (>= 768px): uses tablet ?? mobile
 * - Mobile (< 768px): uses mobile (if empty, renders transparent fallback, avoiding showing desktop-only images)
 */
export function ResponsiveHeroBackground(props: ResponsiveHeroBackgroundProps) {
  const hasAny = Boolean(props.mobile || props.tablet || props.laptop || props.desktop);
  if (!hasAny) {
    return null;
  }

  const resolvedDesktop = props.desktop || props.laptop || props.tablet || props.mobile;
  const resolvedLaptop = props.laptop || props.tablet || props.mobile;
  const resolvedTablet = props.tablet || props.mobile;
  const resolvedMobile = props.mobile;

  return (
    <picture
      aria-hidden="true"
      className={clsx(
        'pointer-events-none absolute inset-0 z-0 block h-full w-full overflow-hidden',
        props.className,
      )}
    >
      {resolvedDesktop ? <source media="(min-width: 1140px)" srcSet={resolvedDesktop} /> : null}
      {resolvedLaptop ? <source media="(min-width: 1024px)" srcSet={resolvedLaptop} /> : null}
      {resolvedTablet ? <source media="(min-width: 768px)" srcSet={resolvedTablet} /> : null}
      <img
        src={resolvedMobile || TRANSPARENT_PIXEL}
        alt={props.alt ?? ''}
        className={clsx('h-full w-full object-cover object-center', props.imgClassName)}
        loading={props.priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  );
}


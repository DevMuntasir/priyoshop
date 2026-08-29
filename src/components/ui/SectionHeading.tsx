import type * as React from 'react';
import { FlipTitle } from '@/components/ui/FlipHeadline';
import type { FlipLine } from '@/components/ui/FlipHeadline';

export type SectionHeadingProps = {
  eyebrow?: React.ReactNode;

  /** Eyebrow capsule theme */
  eyebrowMode?: 'dark' | 'light';

  /**
   * Supports both string and custom JSX.
   *
   * Example:
   * title="Our Services"
   *
   * or
   *
   * title={
   *   <>
   *     Our <span className="text-red-500">Services</span>
   *   </>
   * }
   */
  title: React.ReactNode;

  /** When set, renders the title as an animated flip headline. */
  flip?: FlipLine[];

  description?: React.ReactNode;
  action?: React.ReactNode;

  align?: 'left' | 'center';

  titleSize?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

  /**
   * Only works when title is a string.
   */
  accentWords?: string;

  /**
   * Only works when title is a string.
   */
  gradientWords?: string;

  titleColor?: string;
  descriptionColor?: string;
  descriptionFontClass?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

const TITLE_TEXT_CLASSES: Record<
  'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
  string
> = {
  display: 'text-ps-h2 lg:text-ps-display',
  h1: 'text-ps-h1',
  h2: 'text-ps-h2',
  h3: 'text-ps-h3',
  h4: 'text-ps-h4',
  h5: 'text-ps-h5',
};

export function SectionHeading({
  eyebrow,
  eyebrowMode = 'dark',
  title,
  flip,
  description,
  action = null,
  align = 'center',
  titleSize = 'h1',
  accentWords,
  gradientWords,
  titleColor = 'text-ps-black',
  descriptionColor = 'text-ps-black-400',
  descriptionFontClass = 'font-semibold',
  className = '',
  ...rest
}: SectionHeadingProps) {
  const centered = align === 'center';

  let titleNode: React.ReactNode = title;

  // Flip title has highest priority
  if (flip) {
    titleNode = <FlipTitle lines={flip} />;
  }

  // Only apply string processing when title is actually a string
  else if (typeof title === 'string') {
    if (gradientWords) {
      const idx = title
        .toLowerCase()
        .lastIndexOf(gradientWords.toLowerCase());

      if (idx !== -1) {
        titleNode = (
          <>
            {title.slice(0, idx)}

            <span className="bg-linear-to-r from-ps-red-600 via-ps-red-400 to-ps-gold-500 bg-clip-text text-transparent">
              {title.slice(idx, idx + gradientWords.length)}
            </span>

            {title.slice(idx + gradientWords.length)}
          </>
        );
      }
    } else if (accentWords) {
      const idx = title
        .toLowerCase()
        .lastIndexOf(accentWords.toLowerCase());

      if (idx !== -1) {
        titleNode = (
          <>
            {title.slice(0, idx)}

            <span className="text-ps-red-600">
              {title.slice(idx, idx + accentWords.length)}
            </span>

            {title.slice(idx + accentWords.length)}
          </>
        );
      }
    }
  }

  return (
    <div
      className={`flex flex-col gap-4 sm:gap-5 ${centered
        ? 'items-center text-center'
        : 'items-start text-left'
        } ${className}`.trim()}
      {...rest}
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center rounded-full px-4 py-1 font-body text-ps-sm font-semibold ring-[1.5px] ring-inset ${eyebrowMode === 'light'
            ? 'text-ps-white ring-white'
            : 'text-ps-ink-700 ring-black'
            }`}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`m-0 font-display font-bold leading-[1.4] tracking-tight ${titleColor} ${TITLE_TEXT_CLASSES[titleSize]}`}
      >
        {titleNode}
      </h2>

      {description && (
        <p
          className={`m-0 mt-0! max-w-180 font-body leading-normal text-pretty ${descriptionFontClass} ${descriptionColor}`}
        >
          {description}
        </p>
      )}

      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
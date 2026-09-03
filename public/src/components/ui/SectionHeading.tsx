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

  titleSize?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'custom';

  /**
   * Only works when title is a string.
  */
  accentWords?: string;
  /** Appends accent words when they are not already present in the title. */
  appendAccentWords?: boolean;

  /**
   * Only works when title is a string.
   */
  gradientWords?: string;

  titleColor?: string;
  descriptionColor?: string;
  accentColor?: string;
  as?: 'h1' | 'h2';
  titleClassName?: string;
  descriptionClassName?: string;
  descriptionFontClass?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>;

const TITLE_TEXT_CLASSES: Record<
  'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'custom',
  string
> = {
  display: 'text-ps-h2 lg:text-ps-display',
  h1: 'text-ps-h1',
  h2: 'text-ps-h2',
  h3: 'text-ps-h3',
  h4: 'text-ps-h4',
  h5: 'text-ps-h5',
  custom: '',
};

const resolveColor = (value: string) => {
  const normalizedValue = value.trim();
  const isCssColor = /^(#|rgb\(|hsl\(|oklch\(|var\()/u.test(normalizedValue);
  return {
    className: isCssColor ? '' : normalizedValue,
    style: isCssColor ? { color: normalizedValue } : undefined,
  };
};

const resolveAccent = (value: string) => {
  const normalizedValue = value.trim();
  const isGradient = /^(linear|radial|conic)-gradient\(/iu.test(normalizedValue);
  if (isGradient) {
    return {
      className: 'bg-clip-text text-transparent',
      style: { backgroundImage: normalizedValue, color: 'transparent' },
    };
  }
  return resolveColor(normalizedValue);
};

const findLastTextMatch = (title: string, words: string) => {
  const parts = words.trim().split(/\s+/u).filter(Boolean);
  if (parts.length === 0) {
    return null;
  }
  const pattern = parts
    .map((part) => part.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&'))
    .join('\\s+');
  const matches = [...title.matchAll(new RegExp(pattern, 'giu'))];
  const match = matches.at(-1);
  return match?.index === undefined ? null : { index: match.index, length: match[0].length };
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
  appendAccentWords = false,
  gradientWords,
  titleColor = 'text-ps-black',
  descriptionColor = 'text-ps-black-400',
  accentColor = 'text-ps-red-600',
  as = 'h2',
  titleClassName = '',
  descriptionClassName = '',
  descriptionFontClass = 'font-semibold',
  className = '',
  ...rest
}: SectionHeadingProps) {
  const centered = align === 'center';
  const resolvedTitleColor = resolveColor(titleColor);
  const resolvedDescriptionColor = resolveColor(descriptionColor);
  const resolvedAccentColor = resolveAccent(accentColor);
  const TitleTag = as;

  let titleNode: React.ReactNode = title;

  // Flip title has highest priority
  if (flip) {
    titleNode = <FlipTitle lines={flip} />;
  }

  // Only apply string processing when title is actually a string
  else if (typeof title === 'string') {
    if (gradientWords) {
      const match = findLastTextMatch(title, gradientWords);

      if (match) {
        titleNode = (
          <>
            {title.slice(0, match.index)}

            <span className="bg-linear-to-r  from-ps-red-600 via-ps-red-400 to-ps-gold-500 bg-clip-text text-transparent">
              {title.slice(match.index, match.index + match.length)}
            </span>

            {title.slice(match.index + match.length)}
          </>
        );
      }
    } else if (accentWords) {
      const match = findLastTextMatch(title, accentWords);

      if (match) {
        titleNode = (
          <>
            {title.slice(0, match.index)}

            <span className={resolvedAccentColor.className} style={resolvedAccentColor.style}>
              {title.slice(match.index, match.index + match.length)}
            </span>

            {title.slice(match.index + match.length)}
          </>
        );
      } else if (appendAccentWords && accentWords.trim()) {
        titleNode = (
          <>
            {title}
            {title.length > 0 && !/\s$/u.test(title) ? ' ' : null}
            <span className={resolvedAccentColor.className} style={resolvedAccentColor.style}>
              {accentWords.trim()}
            </span>
          </>
        );
      }
    }
  }

  return (
    <div
      className={`flex min-w-0  flex-col gap-4 sm:gap-5 ${centered
        ? 'items-center text-center'
        : 'items-start text-left'
        } ${className}`.trim()}
      {...rest}
    >
      {eyebrow && (
        <span
          className={`inline-flex min-h-9 max-w-full items-center rounded-full px-4 py-1 font-body text-ps-sm font-semibold wrap-break-word ring-[1.5px] ring-inset ${eyebrowMode === 'light'
            ? 'text-ps-white ring-white'
            : 'text-ps-ink-700 ring-black'
            }`}
        >
          {eyebrow}
        </span>
      )}

      <TitleTag
        className={`m-0 max-w-full font-display font-bold leading-[1.25] tracking-tight  wrap-break-word sm:leading-[1.3] ${resolvedTitleColor.className} ${TITLE_TEXT_CLASSES[titleSize]} ${titleClassName}`}
        style={resolvedTitleColor.style}
      >
        {titleNode}
      </TitleTag>

      {description && (
        <p
          className={`m-0 mt-0! max-w-180 font-body leading-relaxed text-pretty wrap-break-word ${descriptionFontClass} ${resolvedDescriptionColor.className} ${descriptionClassName}`}
          style={resolvedDescriptionColor.style}
        >
          {description}
        </p>
      )}

      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}

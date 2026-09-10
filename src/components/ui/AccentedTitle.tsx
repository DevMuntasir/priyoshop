import { Fragment, JSX } from 'react';

export type AccentedTitleProps = {
  /**
   * Title text with inline accent markers:
   * - `**words**` -> strongClass (or default solid accent)
   * - `*words*`   -> emClass (or default second accent)
   * - `_words_`   -> markClass (or default third accent)
   * - `~words~`   -> gradientClass (gradient text support)
   * - `\n`        -> line break
   */
  text: string;
  /** Classes for `*single-star*` spans. */
  emClass?: string;
  /** Classes for `**double-star**` spans. */
  strongClass?: string;
  /** Classes for `_underscore_` spans. */
  markClass?: string;
  /** Classes for `~tilde~` gradient text spans. */
  gradientClass?: string;
};

// Regex pattern matching double-star, single-star, underscore, and tilde syntax
const TOKEN_PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_|~[^~]+~)/u;

// Helper to check and apply gradient styles seamlessly
const GRADIENT_BASE_STYLES = 'bg-clip-text text-transparent ';

function renderLine(line: string, props: AccentedTitleProps): JSX.Element[] {
  return line.split(TOKEN_PATTERN).map((part, index) => {
    const key = index;

    // 1. Double Star: **text**
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={key} className={props.strongClass ?? 'text-black font-bold'}>
          {part.slice(2, -2)}
        </span>
      );
    }

    // 2. Single Star: *text*
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <span key={key} className={props.emClass ?? 'text-amber-500'}>
          {part.slice(1, -1)}
        </span>
      );
    }

    // 3. Underscore: _text_
    if (part.startsWith('_') && part.endsWith('_')) {
      return (
        <span key={key} className={props.markClass ?? 'text-emerald-600'}>
          {part.slice(1, -1)}
        </span>
      );
    }

    // 4. Tilde (Gradient Text): ~text~
    if (part.startsWith('~') && part.endsWith('~')) {
      const gradientStyle =
        props.gradientClass ??
        'bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 ';

      return (
        <span key={key} className={`${GRADIENT_BASE_STYLES} ${gradientStyle}`}>
          {part.slice(1, -1)}
        </span>
      );
    }

    return <Fragment key={key}>{part}</Fragment>;
  });
}

/** Renders a headline with admin-editable accent markers, gradient effects, and line breaks. */
export function AccentedTitle(props: AccentedTitleProps) {
  const lines = props.text.split('\n');

  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {index > 0 && <br />}
          {renderLine(line, props)}
        </Fragment>
      ))}
    </>
  );
}
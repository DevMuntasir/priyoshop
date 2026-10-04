import React from 'react';

/* Section opener: capsule eyebrow + big Lato title + optional supporting copy
   and trailing action. Centered or left-aligned. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  action = null,
  align = 'center',
  titleSize = 'h1',
  accentWords = null,
  style = {},
  ...rest
}) {
  const sizes = { display: 68, h1: 56, h2: 44, h3: 36 };
  const fs = sizes[titleSize] || sizes.h1;
  const centered = align === 'center';

  // Optionally tint trailing words in brand red (e.g. "Distribution Partner").
  let titleNode = title;
  if (accentWords && typeof title === 'string') {
    const idx = title.toLowerCase().lastIndexOf(accentWords.toLowerCase());
    if (idx >= 0) {
      titleNode = (
        <>
          {title.slice(0, idx)}
          <span style={{ color: 'var(--ps-red-600,#D92B41)' }}>{title.slice(idx, idx + accentWords.length)}</span>
          {title.slice(idx + accentWords.length)}
        </>
      );
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: centered ? 'center' : 'flex-start',
        textAlign: centered ? 'center' : 'left',
        gap: 20,
        ...style,
      }}
      {...rest}
    >
      {eyebrow && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', borderRadius: 999,
          padding: '4px 16px', boxShadow: 'inset 0 0 0 1.5px #000',
          fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 600, fontSize: 16,
          color: 'var(--ps-ink-700,#292A2E)',
        }}>{eyebrow}</span>
      )}
      <h2 style={{
        margin: 0,
        fontFamily: "var(--font-display,'Lato',sans-serif)",
        fontWeight: 700,
        fontSize: fs,
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
        color: 'var(--ps-ink-700,#292A2E)',
        textWrap: 'balance',
      }}>{titleNode}</h2>
      {description && (
        <p style={{
          margin: 0, maxWidth: 720,
          fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 400, fontSize: 22,
          lineHeight: 1.5, color: 'var(--ps-ink-500,#545558)', textWrap: 'pretty',
        }}>{description}</p>
      )}
      {action && <div style={{ marginTop: 4 }}>{action}</div>}
    </div>
  );
}

export default SectionHeading;

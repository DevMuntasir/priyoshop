import React from 'react';

/* Outline capsule label used as section eyebrows ("Ecosystem at a Glance",
   "The Impact") and small status tags. */
export function Badge({
  children,
  variant = 'outline',
  tone = 'ink',
  size = 'md',
  style = {},
  ...rest
}) {
  const TONES = {
    ink:   { fg: 'var(--ps-ink-700,#292A2E)', line: '#000000',                       soft: 'var(--ps-grey-150,#F5F5F5)', solid: '#000000', onSolid: '#fff' },
    brand: { fg: 'var(--ps-red-600,#D92B41)', line: 'var(--ps-red-500,#EE2F47)',     soft: 'var(--ps-red-50,#FFF1F3)',   solid: 'var(--ps-red-500,#EE2F47)', onSolid: '#fff' },
    gold:  { fg: 'var(--ps-gold-ink,#AE7D16)', line: 'var(--ps-gold-500,#FFB700)',   soft: 'var(--ps-cream-yellow,#FFFDE2)', solid: 'var(--ps-gold-500,#FFB700)', onSolid: '#1A1A1A' },
  };
  const t = TONES[tone] || TONES.ink;
  const dims = size === 'sm'
    ? { font: 14, padY: 2, padX: 12 }
    : { font: 16, padY: 4, padX: 16 };

  let skin;
  if (variant === 'solid') skin = { background: t.solid, color: t.onSolid, boxShadow: 'none' };
  else if (variant === 'soft') skin = { background: t.soft, color: t.fg, boxShadow: 'none' };
  else skin = { background: 'transparent', color: t.fg, boxShadow: `inset 0 0 0 1.5px ${t.line}` };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        borderRadius: 999,
        padding: `${dims.padY}px ${dims.padX}px`,
        fontFamily: "var(--font-body, 'Open Sans', sans-serif)",
        fontWeight: 600,
        fontSize: dims.font,
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...skin,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Badge;

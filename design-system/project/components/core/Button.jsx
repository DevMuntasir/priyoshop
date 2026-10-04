import React from 'react';

const SIZES = {
  sm: { height: 32, padX: 16, font: 16, icon: 20, gap: 6 },
  md: { height: 40, padX: 20, font: 18, icon: 22, gap: 8 },
  lg: { height: 56, padX: 28, font: 18, icon: 26, gap: 10 },
};

/* Resolve background / text / ring per (variant, tone, state). */
function resolve(variant, tone, hover, active) {
  const RED = 'var(--ps-red-500, #EE2F47)';
  const RED_DK = 'var(--ps-red-700, #BE2639)';
  const palettes = {
    dark:  { solid: '#000000', solidHover: '#292A2E', line: '#000000', text: '#000000', onSolid: '#FFFFFF', tint: 'rgba(0,0,0,0.06)' },
    light: { solid: '#FFFFFF', solidHover: '#F1F1F1', line: '#FFFFFF', text: '#FFFFFF', onSolid: '#000000', tint: 'rgba(255,255,255,0.14)' },
    brand: { solid: RED,       solidHover: RED_DK,    line: RED,       text: RED,       onSolid: '#FFFFFF', tint: 'rgba(238,47,71,0.08)' },
  };
  const p = palettes[tone] || palettes.dark;

  if (variant === 'filled') {
    return { background: hover ? p.solidHover : p.solid, color: p.onSolid, boxShadow: 'none' };
  }
  if (variant === 'outlined') {
    return { background: hover ? p.tint : 'transparent', color: p.text, boxShadow: `inset 0 0 0 1px ${p.line}` };
  }
  // ghost
  return { background: hover ? p.tint : 'transparent', color: p.text, boxShadow: 'none' };
}

export function Button({
  children,
  variant = 'filled',
  tone = 'dark',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  href,
  onClick,
  type = 'button',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const skin = resolve(variant, tone, hover && !disabled, active);

  const base = {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: `0 ${variant === 'ghost' ? Math.max(4, s.padX - 12) : s.padX}px`,
    width: fullWidth ? '100%' : 'fit-content',
    borderRadius: 999,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: "var(--font-body, 'Open Sans', sans-serif)",
    fontWeight: 600,
    fontSize: s.font,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    boxSizing: 'border-box',
    opacity: disabled ? 0.4 : 1,
    transform: active && !disabled ? 'scale(0.97)' : 'scale(1)',
    transition: 'background var(--dur-fast,140ms) ease, transform var(--dur-fast,140ms) ease, box-shadow var(--dur-fast,140ms) ease',
    ...skin,
    ...style,
  };

  const iconBox = (node) =>
    node ? (
      <span style={{ display: 'inline-flex', width: s.icon, height: s.icon, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {node}
      </span>
    ) : null;

  const inner = (
    <>
      {iconBox(iconLeft)}
      {children != null && <span>{children}</span>}
      {iconBox(iconRight)}
    </>
  );

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setActive(false); },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
  };

  if (href && !disabled) {
    return (
      <a href={href} style={base} onClick={onClick} {...handlers} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} style={base} onClick={disabled ? undefined : onClick} disabled={disabled} {...handlers} {...rest}>
      {inner}
    </button>
  );
}

export default Button;

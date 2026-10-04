import React from 'react';

/* Circular icon button — carousel arrows, play controls, compact actions. */
export function IconButton({
  children,
  variant = 'outline',
  tone = 'dark',
  size = 'md',
  disabled = false,
  onClick,
  ariaLabel,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const dim = { sm: 36, md: 44, lg: 56 }[size] || 44;

  const RED = 'var(--ps-red-500,#EE2F47)';
  const palettes = {
    dark:  { solid: '#000', solidHover: '#292A2E', line: '#000', fg: '#000', onSolid: '#fff', tint: 'rgba(0,0,0,0.06)' },
    light: { solid: '#fff', solidHover: '#f1f1f1', line: 'rgba(255,255,255,0.7)', fg: '#fff', onSolid: '#000', tint: 'rgba(255,255,255,0.16)' },
    brand: { solid: RED,   solidHover: 'var(--ps-red-700,#BE2639)', line: RED, fg: RED, onSolid: '#fff', tint: 'rgba(238,47,71,0.08)' },
  };
  const p = palettes[tone] || palettes.dark;

  let skin;
  if (variant === 'filled') skin = { background: hover && !disabled ? p.solidHover : p.solid, color: p.onSolid, boxShadow: 'none' };
  else if (variant === 'ghost') skin = { background: hover && !disabled ? p.tint : 'transparent', color: p.fg, boxShadow: 'none' };
  else skin = { background: hover && !disabled ? p.tint : 'transparent', color: p.fg, boxShadow: `inset 0 0 0 1px ${p.line}` };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        borderRadius: 999,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transform: active && !disabled ? 'scale(0.94)' : 'scale(1)',
        transition: 'background 140ms ease, transform 140ms ease, box-shadow 140ms ease',
        boxSizing: 'border-box',
        ...skin,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export default IconButton;

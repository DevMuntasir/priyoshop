import React from 'react';

/* Text field with the brand's focus / disabled states (rounded, hairline
   border, red focus ring). Matches the Figma input component family. */
export function Input({
  label,
  hint,
  error,
  size = 'md',
  iconLeft = null,
  disabled = false,
  type = 'text',
  style = {},
  inputStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 44 : size === 'lg' ? 60 : 52;

  const ring = error
    ? 'inset 0 0 0 1.5px var(--ps-red-500,#EE2F47)'
    : focus
      ? 'inset 0 0 0 1.5px var(--ps-red-500,#EE2F47)'
      : 'inset 0 0 0 1px var(--ps-grey-300,#D2D2D2)';

  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }}>
      {label && (
        <span style={{
          fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 600,
          fontSize: 16, color: 'var(--ps-ink-600,#333)',
        }}>{label}</span>
      )}
      <span style={{
        display: 'flex', alignItems: 'center', gap: 10, height: h,
        padding: `0 18px`, borderRadius: 16,
        background: disabled ? 'var(--ps-grey-150,#F5F5F5)' : 'var(--ps-white,#fff)',
        boxShadow: ring, opacity: disabled ? 0.6 : 1,
        transition: 'box-shadow 140ms ease', boxSizing: 'border-box',
      }}>
        {iconLeft && <span style={{ display: 'inline-flex', color: 'var(--ps-ink-300,#8A8A8A)', flexShrink: 0 }}>{iconLeft}</span>}
        <input
          type={type}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 400, fontSize: 18,
            color: 'var(--ps-ink-700,#292A2E)',
            ...inputStyle,
          }}
          {...rest}
        />
      </span>
      {(hint || error) && (
        <span style={{
          fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 400, fontSize: 14,
          color: error ? 'var(--ps-red-600,#D92B41)' : 'var(--ps-ink-300,#8A8A8A)',
        }}>{error || hint}</span>
      )}
    </label>
  );
}

export default Input;

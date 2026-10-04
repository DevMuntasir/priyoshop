import React from 'react';
import { Logo } from '../brand/Logo.jsx';
import { Button } from '../core/Button.jsx';

/* Floating top navigation — rounded white bar, logo + centered menu +
   Contact link and a Join Us button. Matches the homepage header. */
export function NavBar({
  items = ['About', 'Business', 'Impact', 'Opportunity', 'Media', 'Careers'],
  active,
  onNavigate,
  cta = 'Join Us',
  onCta,
  secondary = 'Contact Us',
  onSecondary,
  floating = true,
  style = {},
  ...rest
}) {
  return (
    <nav
      style={{
        display: 'flex', alignItems: 'center', gap: 32,
        width: '100%', height: 76, padding: '0 32px',
        background: 'var(--ps-white,#fff)',
        borderRadius: floating ? 999 : 0,
        boxShadow: floating ? '0 12px 32px rgba(0,0,0,0.08)' : 'inset 0 -1px 0 var(--ps-grey-200,#E6E6E6)',
        boxSizing: 'border-box', ...style,
      }}
      {...rest}
    >
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}
        style={{ display: 'flex', flexShrink: 0, textDecoration: 'none' }}>
        <Logo width={150} />
      </a>

      <ul style={{
        display: 'flex', alignItems: 'center', gap: 28, listStyle: 'none', margin: 0, padding: 0,
        flex: 1, justifyContent: 'center',
      }}>
        {items.map((label) => {
          const isActive = active === label;
          return (
            <li key={label}>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(label); }}
                style={{
                  fontFamily: "var(--font-body,'Open Sans',sans-serif)",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 18, color: 'var(--ps-black,#000)', textDecoration: 'none',
                  whiteSpace: 'nowrap', cursor: 'pointer',
                }}
              >{label}</a>
            </li>
          );
        })}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexShrink: 0 }}>
        {secondary && (
          <a href="#" onClick={(e) => { e.preventDefault(); onSecondary && onSecondary(); }}
            style={{
              fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 600, fontSize: 18,
              color: 'var(--ps-black,#000)', textDecoration: 'none', whiteSpace: 'nowrap',
            }}>{secondary}</a>
        )}
        {cta && <Button size="md" onClick={onCta}>{cta}</Button>}
      </div>
    </nav>
  );
}

export default NavBar;

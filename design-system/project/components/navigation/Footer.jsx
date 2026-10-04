import React from 'react';
import { Logo } from '../brand/Logo.jsx';

const SOCIALS = {
  x: 'M17.326 3.5h2.46l-5.37 6.14L20.8 18.5h-4.95l-3.88-5.07-4.44 5.07H4.07l5.75-6.57L3.5 3.5h5.08l3.5 4.63L17.326 3.5z',
  instagram: 'M12 4.16c2.56 0 2.87.01 3.88.06 1.17.05 1.95.24 2.4.4.6.24 1.03.52 1.48.97.45.45.73.88.97 1.48.16.45.35 1.23.4 2.4.05 1.01.06 1.32.06 3.88s-.01 2.87-.06 3.88c-.05 1.17-.24 1.95-.4 2.4-.24.6-.52 1.03-.97 1.48-.45.45-.88.73-1.48.97-.45.16-1.23.35-2.4.4-1.01.05-1.32.06-3.88.06s-2.87-.01-3.88-.06c-1.17-.05-1.95-.24-2.4-.4a3.7 3.7 0 01-1.48-.97 3.7 3.7 0 01-.97-1.48c-.16-.45-.35-1.23-.4-2.4C4.17 14.87 4.16 14.56 4.16 12s.01-2.87.06-3.88c.05-1.17.24-1.95.4-2.4.24-.6.52-1.03.97-1.48.45-.45.88-.73 1.48-.97.45-.16 1.23-.35 2.4-.4C9.13 4.17 9.44 4.16 12 4.16zM12 2C9.4 2 9.07 2.01 8.05 2.06c-1.02.05-1.71.21-2.32.45-.63.24-1.16.57-1.7 1.1-.53.54-.86 1.07-1.1 1.7-.24.61-.4 1.3-.45 2.32C2.43 8.65 2.42 8.98 2.42 11.58s.01 2.93.06 3.95c.05 1.02.21 1.71.45 2.32.24.63.57 1.16 1.1 1.7.54.53 1.07.86 1.7 1.1.61.24 1.3.4 2.32.45 1.02.05 1.35.06 3.95.06s2.93-.01 3.95-.06c1.02-.05 1.71-.21 2.32-.45a4.6 4.6 0 001.7-1.1 4.6 4.6 0 001.1-1.7c.24-.61.4-1.3.45-2.32.05-1.02.06-1.35.06-3.95s-.01-2.93-.06-3.95c-.05-1.02-.21-1.71-.45-2.32a4.6 4.6 0 00-1.1-1.7 4.6 4.6 0 00-1.7-1.1c-.61-.24-1.3-.4-2.32-.45C14.93 2.01 14.6 2 12 2zm0 4.86A5.14 5.14 0 1017.14 12 5.14 5.14 0 0012 6.86zm0 8.47A3.33 3.33 0 1115.33 12 3.33 3.33 0 0112 15.33zM18.54 6.66a1.2 1.2 0 11-1.2-1.2 1.2 1.2 0 011.2 1.2z',
  linkedin: 'M6.94 7.5a1.94 1.94 0 11-.01-3.88A1.94 1.94 0 016.94 7.5zM5.2 20.5h3.48V9.06H5.2V20.5zm6.3 0h3.46v-5.65c0-1.5.29-2.95 2.15-2.95 1.83 0 1.86 1.71 1.86 3.05v5.55h3.47v-6.24c0-3.01-.65-5.32-4.17-5.32-1.69 0-2.82.93-3.29 1.81h-.05V9.06H11.5V20.5z',
  facebook: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54v-2.22c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34v7.03C18.34 21.24 22 17.08 22 12.06z',
};

function Social({ path, label }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href="#" aria-label={label}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-flex', color: hover ? 'var(--ps-red-500,#EE2F47)' : '#fff', transition: 'color 140ms ease' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg>
    </a>
  );
}

function Column({ heading, links }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <span style={{ fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 700, fontSize: 18, letterSpacing: '0.04em', color: '#fff' }}>{heading}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l) => (
          <a key={l} href="#" style={{
            fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 400, fontSize: 17,
            color: 'rgba(255,255,255,0.78)', textDecoration: 'none',
          }}>{l}</a>
        ))}
      </div>
    </div>
  );
}

function OfficeCard({ city, address }) {
  return (
    <div style={{
      flex: 1, display: 'flex', alignItems: 'center', gap: 24, padding: '28px 40px',
      borderRadius: 24, background: 'var(--ps-ink-900,#161616)',
      boxShadow: 'inset 0 0 0 1px var(--ps-line-dark,#545454)', boxSizing: 'border-box',
    }}>
      <span aria-hidden="true" style={{ fontSize: 40, lineHeight: 1, flexShrink: 0 }}>📍</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 700, fontSize: 22, color: 'var(--ps-grey-150,#F5F5F5)' }}>{city}</span>
        <span style={{ fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 400, fontSize: 17, color: 'rgba(255,255,255,0.78)' }}>{address}</span>
      </div>
    </div>
  );
}

export function Footer({ style = {}, ...rest }) {
  return (
    <footer style={{
      background: '#000', color: '#fff', padding: '80px 120px 40px', boxSizing: 'border-box', ...style,
    }} {...rest}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 64, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Logo width={184} tone="light" />
          <div style={{ display: 'flex', gap: 24 }}>
            <Social path={SOCIALS.x} label="X" />
            <Social path={SOCIALS.instagram} label="Instagram" />
            <Social path={SOCIALS.linkedin} label="LinkedIn" />
            <Social path={SOCIALS.facebook} label="Facebook" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 96, flexWrap: 'wrap' }}>
          <Column heading="ABOUT" links={['Investor Relations', 'Press Release', 'Career']} />
          <Column heading="USEFUL LINK" links={['Terms of Service', 'Privacy Policy', 'Return Policy', 'Join Us']} />
          <Column heading="CONTACT US" links={['Phone: 09610989922', 'Email: support@priyoshop.com']} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, margin: '56px 0 40px', flexWrap: 'wrap' }}>
        <OfficeCard city="BANGLADESH" address="31/A, Dhanmondi-8, Dhaka-1205" />
        <OfficeCard city="SINGAPORE" address="160, Robinson Road #24-09, Singapore 068914" />
      </div>

      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
        paddingTop: 24, borderTop: '1px solid var(--ps-line-dark,#545454)',
        fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontSize: 17, color: 'rgba(255,255,255,0.78)',
      }}>
        © 2026 PriyoShop. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

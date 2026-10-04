import React from 'react';
import { Button } from '../core/Button.jsx';

/* Two-pane feature card: a tinted copy panel beside a full-bleed image.
   Mirrors the Figma "ecosystem/card_01..04" family. */
export function EcosystemCard({
  title,
  body,
  image,
  imageAlt = '',
  panelColor = 'var(--ps-green-tint,#E2F5E8)',
  ctaLabel = 'Learn More',
  onCta,
  href,
  reverse = false,
  height = 348,
  style = {},
  ...rest
}) {
  const panel = (
    <div style={{
      flex: '0 0 48%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 24,
      padding: 48,
      background: panelColor,
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h3 style={{
          margin: 0, fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 700,
          fontSize: 32, lineHeight: 1.25, color: 'var(--ps-ink-700,#292A2E)',
        }}>{title}</h3>
        <p style={{
          margin: 0, fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 400,
          fontSize: 22, lineHeight: 1.5, color: 'var(--ps-ink-500,#545558)', textWrap: 'pretty',
        }}>{body}</p>
      </div>
      <Button variant="ghost" size="md" iconRight={null} onClick={onCta} href={href}
        style={{ paddingLeft: 0, alignSelf: 'flex-start' }}>
        {ctaLabel}
      </Button>
    </div>
  );

  const media = (
    <div style={{ flex: 1, alignSelf: 'stretch', minHeight: 0,
      background: image ? `url(${image}) center/cover no-repeat` : 'var(--ps-grey-150,#F5F5F5)' }}
      role="img" aria-label={imageAlt} />
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        height,
        width: '100%',
        overflow: 'hidden',
        borderRadius: 24,
        background: 'var(--ps-warm-white,#FFFCFA)',
        boxShadow: 'inset 0 0 0 1px var(--ps-grey-300,#D2D2D2)',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {panel}
      {media}
    </div>
  );
}

export default EcosystemCard;

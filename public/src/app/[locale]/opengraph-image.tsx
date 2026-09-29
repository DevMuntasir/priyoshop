import { ImageResponse } from 'next/og';
import { AppConfig } from '@/utils/AppConfig';

export const alt = AppConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Generates the branded Open Graph / Twitter share image (1200×630).
 * @returns An {@link ImageResponse} rendering the share card.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: 'linear-gradient(135deg, #EE2F47 0%, #F5A623 100%)',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: '-0.02em' }}>
        {AppConfig.name}
      </div>
      <div style={{ marginTop: 24, fontSize: 36, fontWeight: 500, maxWidth: 900, lineHeight: 1.3 }}>
        {AppConfig.description}
      </div>
    </div>,
    size,
  );
}

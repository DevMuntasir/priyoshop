import React from 'react';

/* Media / blog card: image with rounded top, then source + clamped title +
   optional date. Used in "Media & News" and "Read our Blogs". */
export function MediaCard({
  image,
  imageAlt = '',
  source,
  title,
  date,
  href,
  tone = 'light',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === 'dark';

  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', flexDirection: 'column', width: '100%',
        borderRadius: 24, overflow: 'hidden', textDecoration: 'none',
        background: dark ? 'var(--ps-ink-900,#161616)' : 'var(--ps-white,#fff)',
        boxShadow: dark ? 'inset 0 0 0 1px var(--ps-line-dark,#545454)' : 'inset 0 0 0 1px var(--ps-grey-200,#E6E6E6)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 220ms var(--ease-standard,cubic-bezier(.4,0,.2,1)), box-shadow 220ms ease',
        boxSizing: 'border-box', ...style,
      }}
      {...rest}
    >
      <div style={{
        aspectRatio: '16 / 10',
        background: image ? `url(${image}) center/cover no-repeat` : 'var(--ps-grey-150,#F5F5F5)',
      }} role="img" aria-label={imageAlt} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24 }}>
        {source && (
          <span style={{
            fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 700, fontSize: 14,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            color: 'var(--ps-red-600,#D92B41)',
          }}>{source}</span>
        )}
        <h3 style={{
          margin: 0, fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 700, fontSize: 20,
          lineHeight: 1.35, color: dark ? 'var(--ps-grey-150,#F5F5F5)' : 'var(--ps-ink-700,#292A2E)',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{title}</h3>
        {date && (
          <span style={{
            fontFamily: "var(--font-body,'Open Sans',sans-serif)", fontWeight: 400, fontSize: 16,
            color: dark ? 'var(--ps-ink-300,#8A8A8A)' : 'var(--ps-ink-400,#6B6B6B)',
          }}>{date}</span>
        )}
      </div>
    </a>
  );
}

export default MediaCard;

import React from 'react';

/* A single headline metric: optional icon, big red value, supporting label.
   Used in the hero stats bar ("296 Brands", "100K+ MSMEs", "1428 Route Coverage"). */
export function MetricStat({
  value,
  label,
  icon = null,
  align = 'left',
  size = 'md',
  style = {},
  ...rest
}) {
  const valueSize = size === 'lg' ? 64 : size === 'sm' ? 36 : 52;
  const labelSize = size === 'sm' ? 16 : 18;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        justifyContent: align === 'center' ? 'center' : 'flex-start',
        ...style,
      }}
      {...rest}
    >
      {icon && (
        <span style={{ display: 'inline-flex', flexShrink: 0, fontSize: valueSize * 0.9, lineHeight: 1 }}>
          {icon}
        </span>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{
          fontFamily: "var(--font-display,'Lato',sans-serif)",
          fontWeight: 800,
          fontSize: valueSize,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: 'var(--ps-red-600,#D92B41)',
        }}>{value}</span>
        <span style={{
          fontFamily: "var(--font-body,'Open Sans',sans-serif)",
          fontWeight: 600,
          fontSize: labelSize,
          lineHeight: 1.3,
          color: 'var(--ps-ink-700,#292A2E)',
        }}>{label}</span>
      </div>
    </div>
  );
}

export default MetricStat;

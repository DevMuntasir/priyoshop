import type * as React from 'react';

const VALUE_TEXT_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-[clamp(2rem,8vw,2.5rem)]',
  md: 'text-[clamp(2rem,8vw,2rem)]',
  lg: 'text-[clamp(2.25rem,8vw,3.625rem)]',
};

const ICON_TEXT_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-[clamp(2rem,8vw,2.5rem)]',
  md: 'text-[clamp(2rem,8vw,2.9375rem)]',
  lg: 'text-[clamp(2.25rem,8vw,3.625rem)]',
};

const LABEL_TEXT_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-ps-sm',
  md: 'text-ps-body',
  lg: 'text-ps-body',
};

export type MetricStatProps = {
  value: React.ReactNode;
  label: React.ReactNode;
  icon?: React.ReactNode;
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg';
} & React.HTMLAttributes<HTMLDivElement>;

/* A single headline metric: optional icon, big red value, supporting label.
   Used in the hero stats bar ("296 Brands", "100K+ MSMEs", "1428 Route Coverage"). */
export function MetricStat({
  value,
  label,
  icon = null,
  align = 'left',
  size = 'sm',
  className = 'text-ps-red-600',
  ...rest
}: MetricStatProps) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-2 overflow-hidden border bg-white px-3 py-4 text-center sm:gap-3 sm:px-4 lg:flex-row lg:gap-4 lg:px-10 ${align === 'center' ? 'justify-center' : 'justify-start'} ${className}`.trim()}
      {...rest}
    >
      {icon && (
        <span className={`inline-flex max-w-full shrink-0 leading-none ${ICON_TEXT_CLASSES[size]}`}>
          {icon}
        </span>
      )}
      <div className="flex min-w-0 max-w-full flex-col gap-0.5">
        <span
          className={`max-w-full break-words bg-transparent font-display font-bold leading-none tracking-tight text-balance  ${VALUE_TEXT_CLASSES[size]}`}
        >
          {value}
        </span>
        <span
          className={`max-w-full break-words font-body font-semibold leading-snug text-ps-ink-700 ${LABEL_TEXT_CLASSES[size]}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

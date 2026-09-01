import type * as React from 'react';

const VALUE_TEXT_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-[36px]',
  md: 'text-[52px]',
  lg: 'text-[64px]',
};

const ICON_TEXT_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-[32px]',
  md: 'text-[47px]',
  lg: 'text-[58px]',
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
  size = 'md',
  className = '',
  ...rest
}: MetricStatProps) {
  return (
    <div
      className={`flex flex-row border text-center bg-white py-4 px-10   rounded-ps-md  items-center gap-4 ${align === 'center' ? 'justify-center' : 'justify-start'} ${className}`.trim()}
      {...rest}
    >
      {icon && (
        <span className={`inline-flex shrink-0 leading-none ${ICON_TEXT_CLASSES[size]}`}>
          {icon}
        </span>
      )}
      <div className="flex w-fit flex-col gap-0.5">
        <span
          className={`font-display leading-none font-bold tracking-tight text-ps-red-600 ${VALUE_TEXT_CLASSES[size]} ${className} bg-transparent`}
        >
          {value}
        </span>
        <span
          className={`font-body leading-snug font-semibold text-ps-ink-700 ${LABEL_TEXT_CLASSES[size]}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

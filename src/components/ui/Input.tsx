import type * as React from 'react';

const HEIGHT_CLASSES: Record<'sm' | 'md' | 'lg', string> = { sm: 'h-11', md: 'h-13', lg: 'h-15' };

export type InputProps = {
  label?: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  wrapperClassName?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

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
  className = '',
  wrapperClassName = '',
  ...rest
}: InputProps) {
  const ring = error
    ? 'ring-[1.5px] ring-ps-red-500'
    : 'ring-1 ring-ps-grey-300 focus-within:ring-[1.5px] focus-within:ring-ps-red-500';

  return (
    <label className={`flex w-full flex-col gap-2 ${wrapperClassName}`.trim()}>
      {label && <span className="font-body text-ps-sm font-semibold text-ps-ink-600">{label}</span>}
      <span
        className={`flex items-center gap-2.5 rounded-ps-md px-4.5 transition-shadow duration-150 ease-in-out ring-inset ${HEIGHT_CLASSES[size]} ${disabled ? 'bg-ps-grey-150 opacity-60' : 'bg-white'} ${ring}`}
      >
        {iconLeft && <span className="inline-flex shrink-0 text-ps-ink-300">{iconLeft}</span>}
        <input
          type={type}
          disabled={disabled}
          className={`min-w-0 flex-1 border-none bg-transparent font-body text-base font-normal text-ps-ink-700 outline-none sm:text-ps-body ${className}`.trim()}
          {...rest}
        />
      </span>
      {(hint ?? error) && (
        <span
          className={`font-body text-ps-xs font-normal ${error ? 'text-ps-red-600' : 'text-ps-ink-300'}`}
        >
          {error ?? hint}
        </span>
      )}
    </label>
  );
}

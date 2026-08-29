'use client';

export type DashPaginationProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  /** Aria label for a dash, with the 1-based slide number appended. */
  labelPrefix: string;
  /** Dash theme for light or dark backgrounds. */
  tone?: 'dark' | 'light';
};

/* Dash-style carousel pagination: the active dash is longer and solid. */
export function DashPagination(props: DashPaginationProps) {
  const tone = props.tone ?? 'dark';
  const activeClass = tone === 'dark' ? 'bg-ps-black' : 'bg-ps-white';
  const idleClass
    = tone === 'dark' ? 'bg-ps-black/20 hover:bg-ps-black/40' : 'bg-ps-white/30 hover:bg-ps-white/50';

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: props.count }, (_, index) => (
        <button
          // biome-ignore lint/suspicious/noArrayIndexKey: dashes are positional
          key={index}
          type="button"
          aria-label={`${props.labelPrefix} ${index + 1}`}
          aria-current={props.activeIndex === index}
          onClick={() => props.onSelect(index)}
          className={`h-1 cursor-pointer rounded-full border-none transition-all duration-300 ${
            props.activeIndex === index ? `w-10 ${activeClass}` : `w-6 ${idleClass}`
          }`}
        />
      ))}
    </div>
  );
}

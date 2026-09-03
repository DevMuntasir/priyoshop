'use client';

export type CategoryChipsProps = {
  /** Chip labels in display order, excluding the "all" chip. */
  categories: string[];
  /** Currently active category; null means "all". */
  active: string | null;
  onSelect: (category: string | null) => void;
  allLabel: string;
};

const chipClass = (isActive: boolean) =>
  `min-h-11 shrink-0 cursor-pointer rounded-ps-pill border-none px-4 py-2 font-body text-ps-xs font-semibold whitespace-nowrap transition-colors ${
    isActive
      ? 'bg-ps-black text-white'
      : 'bg-transparent text-ps-ink-700 ring-1 ring-ps-grey-300 ring-inset hover:ring-ps-black'
  }`;

/* Horizontally scrollable filter pills; the active chip is filled dark. */
export function CategoryChips(props: CategoryChipsProps) {
  return (
    <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 overscroll-x-contain scroll-px-4 scrollbar-none sm:mx-0 sm:px-0">
      <button type="button" onClick={() => props.onSelect(null)} className={chipClass(props.active === null)}>
        {props.allLabel}
      </button>
      {props.categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => props.onSelect(category)}
          className={chipClass(props.active === category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

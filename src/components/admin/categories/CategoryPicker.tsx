'use client';

import type { CategoryScope } from '@/libs/categories/CategoryValidation';
import { CreateCategoryButton } from './CreateCategoryButton';

export function CategoryPicker(props: {
  scope: CategoryScope;
  categories: string[];
  selected: string[];
  onChange: (categories: string[]) => void;
  onCreated: (category: string) => void;
}) {
  const categories = [...new Set([...props.categories, ...props.selected])].toSorted();
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold">Categories</span>
        <CreateCategoryButton scope={props.scope} compact onCreated={props.onCreated} />
      </div>
      <div role="group" aria-label="Post categories" className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const selected = props.selected.includes(category);
          return (
            <button key={category} type="button" aria-pressed={selected} disabled={!selected && props.selected.length >= 10} onClick={() => { props.onChange(selected ? props.selected.filter((entry) => entry !== category) : [...props.selected, category]); }} className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${selected ? 'bg-gray-900 text-white ring-gray-900' : 'bg-white text-gray-600 ring-gray-200 hover:ring-gray-400'}`}>
              {category}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-500">{props.selected.length}/10 selected. Save the post to apply changes.</p>
    </div>
  );
}

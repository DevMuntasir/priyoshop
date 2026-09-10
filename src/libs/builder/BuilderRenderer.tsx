'use client';

import { COMPONENT_REGISTRY } from './ComponentRegistry';
import type { Block } from './Types';

export type BuilderRendererProps = {
  block: Block;
  isEditable?: boolean;
  onBlockSelect?: (blockId: string) => void;
  selectedBlockId?: string;
};

/**
 * Recursively renders a block and its children.
 * Used by both admin preview (with isEditable=true) and public routes (isEditable=false).
 */
export function BuilderRenderer({
  block,
  isEditable = false,
  onBlockSelect,
  selectedBlockId,
}: BuilderRendererProps) {
  const entry = COMPONENT_REGISTRY[block.type];

  if (!entry) {
    return (
      <div className="p-4 bg-ps-red-50 text-ps-red-500 rounded-ps-sm border border-ps-red-200">
        Unknown block type: {block.type}
      </div>
    );
  }

  const { component: Component, isContainer } = entry;

  const children = isContainer && block.children ? (
    <>
      {block.children.map((child) => (
        <div
          key={child.id}
          onClick={(e) => {
            if (isEditable) {
              e.stopPropagation();
              onBlockSelect?.(child.id);
            }
          }}
          className={isEditable ? 'cursor-pointer' : ''}
          style={
            isEditable && selectedBlockId === child.id
              ? { outline: '2px solid rgb(238, 47, 71)' }
              : undefined
          }
        >
          <BuilderRenderer
            block={child}
            isEditable={isEditable}
            onBlockSelect={onBlockSelect}
            selectedBlockId={selectedBlockId}
          />
        </div>
      ))}
    </>
  ) : null;

  const props = {
    ...block.props,
    ...(isContainer && { children }),
  };

  // Handle string/number coercion for numeric and boolean props
  const coercedProps: Record<string, any> = {};
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'string') {
      if (value === 'true') coercedProps[key] = true;
      else if (value === 'false') coercedProps[key] = false;
      else if (!isNaN(Number(value)) && value !== '') coercedProps[key] = Number(value);
      else coercedProps[key] = value;
    } else {
      coercedProps[key] = value;
    }
  }

  if (isEditable) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onBlockSelect?.(block.id);
        }}
        className="cursor-pointer"
        style={
          selectedBlockId === block.id
            ? { outline: '2px solid rgb(238, 47, 71)', outlineOffset: '1px' }
            : undefined
        }
      >
        <Component {...coercedProps} />
      </div>
    );
  }

  return <Component {...coercedProps} />;
}

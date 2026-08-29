'use client';

import { COMPONENT_REGISTRY } from '@/libs/builder/ComponentRegistry';
import { Card } from '@/components/ui/Card';
import { Stack } from '@/components/ui/Grid';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import type { Block } from '@/libs/builder/Types';

export type BlockTreeProps = {
  block: Block;
  level: number;
  selectedBlockId: string | null;
  onSelect: (blockId: string) => void;
  onDelete: (blockId: string) => void;
  onMove?: (blockId: string, direction: 'up' | 'down') => void;
  onDuplicate?: (blockId: string) => void;
};

export function BlockTreeNode({
  block,
  level,
  selectedBlockId,
  onSelect,
  onDelete,
  onMove,
  onDuplicate,
}: BlockTreeProps) {
  const entry = COMPONENT_REGISTRY[block.type];
  const isSelected = selectedBlockId === block.id;

  return (
    <div>
      <Card
        padding="sm"
        bg={isSelected ? 'ps-cream' : 'ps-white'}
        border={isSelected}
        shadow={false}
        className="cursor-pointer hover:border-ps-grey-300"
        onClick={() => onSelect(block.id)}
        style={{ marginLeft: `${level * 16}px` }}
      >
        <Stack direction="row" align="center" gap="sm">
          <div className="flex-1">
            <Text size="sm" weight="semibold">
              {block.type}
            </Text>
            {entry?.isContainer && (
              <Text size="xs" className="text-ps-ink-600">
                {block.children?.length ?? 0} children
              </Text>
            )}
          </div>

          <div className="flex gap-1">
            {onDuplicate && (
              <Button
                size="sm"
                variant="ghost"
                tone="dark"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(block.id);
                }}
                title="Duplicate"
              >
                Copy
              </Button>
            )}
            {onMove && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  tone="dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMove(block.id, 'up');
                  }}
                  title="Move up"
                >
                  ↑
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  tone="dark"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMove(block.id, 'down');
                  }}
                  title="Move down"
                >
                  ↓
                </Button>
              </>
            )}
          </div>

          <Button
            size="sm"
            variant="ghost"
            tone="dark"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(block.id);
            }}
          >
            Delete
          </Button>
        </Stack>
      </Card>

      {block.children && block.children.length > 0 && (
        <div className="mt-2 space-y-2">
          {block.children.map((child) => (
            <BlockTreeNode
              key={child.id}
              block={child}
              level={level + 1}
              selectedBlockId={selectedBlockId}
              onSelect={onSelect}
              onDelete={onDelete}
              onMove={onMove}
              onDuplicate={onDuplicate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export type BlocksTreeProps = {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelect: (blockId: string) => void;
  onDelete: (blockId: string) => void;
  onDuplicate?: (blockId: string) => void;
};

export function BlocksTree({
  blocks,
  selectedBlockId,
  onSelect,
  onDelete,
  onDuplicate,
}: BlocksTreeProps) {
  if (blocks.length === 0) {
    return (
      <div className="p-4 text-center">
        <Text size="sm" className="text-ps-ink-600">
          No blocks yet. Drag components from the palette.
        </Text>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      {blocks.map((block) => (
        <BlockTreeNode
          key={block.id}
          block={block}
          level={0}
          selectedBlockId={selectedBlockId}
          onSelect={onSelect}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      ))}
    </div>
  );
}

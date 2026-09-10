'use client';

import { useState } from 'react';
import { BuilderRenderer } from '@/libs/builder/BuilderRenderer';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { COMPONENT_REGISTRY } from '@/libs/builder/ComponentRegistry';
import type { Block } from '@/libs/builder/Types';

export type BuilderCanvasProps = {
  blocks: Block[];
  selectedBlockId: string | null;
  draggedComponentType: string | null;
  onBlockSelect: (blockId: string) => void;
  onDrop: (componentType: string, parentId?: string) => void;
};

export function BuilderCanvas({
  blocks,
  selectedBlockId,
  draggedComponentType,
  onBlockSelect,
  onDrop,
}: BuilderCanvasProps) {
  const [dragOverBlockId, setDragOverBlockId] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBlockDragOver = (blockId: string, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Only allow dropping on containers
    const block = findBlockById(blocks, blockId);
    if (block && COMPONENT_REGISTRY[block.type]?.isContainer) {
      setDragOverBlockId(blockId);
    }
  };

  const handleBlockDragLeave = () => {
    setDragOverBlockId(null);
  };

  const handleBlockDrop = (blockId: string, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverBlockId(null);

    const block = findBlockById(blocks, blockId);
    if (draggedComponentType && block && COMPONENT_REGISTRY[block.type]?.isContainer) {
      onDrop(draggedComponentType, blockId);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverBlockId(null);
    if (draggedComponentType) {
      onDrop(draggedComponentType);
    }
  };

  function findBlockById(blockList: Block[], id: string): Block | null {
    for (const block of blockList) {
      if (block.id === id) return block;
      if (block.children) {
        const found = findBlockById(block.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  const renderBlockWithDrop = (block: Block) => {
    const isContainer = COMPONENT_REGISTRY[block.type]?.isContainer;
    const isDragOverThis = dragOverBlockId === block.id;

    return (
      <div
        key={block.id}
        className="mb-4"
        onDragOver={(e) => isContainer && handleBlockDragOver(block.id, e)}
        onDragLeave={handleBlockDragLeave}
        onDrop={(e) => isContainer && handleBlockDrop(block.id, e)}
        style={
          isDragOverThis
            ? {
                outline: '2px dashed rgb(238, 47, 71)',
                outlineOffset: '4px',
              }
            : undefined
        }
      >
        <BuilderRenderer
          block={block}
          isEditable
          selectedBlockId={selectedBlockId ?? undefined}
          onBlockSelect={onBlockSelect}
        />
      </div>
    );
  };

  return (
    <div
      className="flex-1 bg-ps-white overflow-auto relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {blocks.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <Text size="body" className="text-ps-ink-600 mb-2">
              Drag components from the palette to get started
            </Text>
          </div>
        </div>
      ) : (
        <div className="p-8 space-y-4">
          {blocks.map((block) => renderBlockWithDrop(block))}
        </div>
      )}

      {draggedComponentType && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <Card padding="sm" className="bg-ps-black text-white">
            <Text size="sm">{draggedComponentType}</Text>
          </Card>
        </div>
      )}
    </div>
  );
}

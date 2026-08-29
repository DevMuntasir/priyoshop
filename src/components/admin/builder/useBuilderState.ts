import { useState, useCallback } from 'react';
import { COMPONENT_REGISTRY } from '@/libs/builder/ComponentRegistry';
import type { Block } from '@/libs/builder/Types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export type UseBuilderStateResult = {
  blocks: Block[];
  selectedBlockId: string | null;
  addBlock: (type: string, parentId?: string) => void;
  updateBlock: (blockId: string, updates: Partial<Block>) => void;
  deleteBlock: (blockId: string) => void;
  moveBlock: (blockId: string, parentId: string, index: number) => void;
  duplicateBlock: (blockId: string) => void;
  selectBlock: (blockId: string | null) => void;
  setBlocks: (blocks: Block[]) => void;
  getBlockById: (blockId: string) => Block | null;
  getParentBlock: (blockId: string) => Block | null;
};

function findBlockById(blocks: Block[], id: string): Block | null {
  for (const block of blocks) {
    if (block.id === id) return block;
    if (block.children) {
      const found = findBlockById(block.children, id);
      if (found) return found;
    }
  }
  return null;
}

function findParentBlock(blocks: Block[], id: string): Block | null {
  for (const block of blocks) {
    if (block.children) {
      if (block.children.find((child) => child.id === id)) return block;
      const found = findParentBlock(block.children, id);
      if (found) return found;
    }
  }
  return null;
}

function deleteBlockRecursive(blocks: Block[], id: string): Block[] {
  return blocks
    .filter((block) => block.id !== id)
    .map((block) =>
      block.children
        ? {
            ...block,
            children: deleteBlockRecursive(block.children, id),
          }
        : block
    );
}

function updateBlockRecursive(blocks: Block[], id: string, updates: Partial<Block>): Block[] {
  return blocks.map((block) => {
    if (block.id === id) {
      return { ...block, ...updates, id: block.id };
    }
    if (block.children) {
      return {
        ...block,
        children: updateBlockRecursive(block.children, id, updates),
      };
    }
    return block;
  });
}

function addBlockRecursive(
  blocks: Block[],
  newBlock: Block,
  parentId?: string
): Block[] {
  if (!parentId) {
    return [...blocks, newBlock];
  }

  return blocks.map((block) => {
    if (block.id === parentId && block.children) {
      return {
        ...block,
        children: [...block.children, newBlock],
      };
    }
    if (block.children) {
      return {
        ...block,
        children: addBlockRecursive(block.children, newBlock, parentId),
      };
    }
    return block;
  });
}

export function useBuilderState(initialBlocks: Block[] = []): UseBuilderStateResult {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const getBlockById = useCallback(
    (id: string) => findBlockById(blocks, id),
    [blocks]
  );

  const getParentBlock = useCallback(
    (id: string) => findParentBlock(blocks, id),
    [blocks]
  );

  const addBlock = useCallback(
    (type: string, parentId?: string) => {
      const entry = COMPONENT_REGISTRY[type];
      if (!entry) return;

      const newBlock: Block = {
        id: generateId(),
        type,
        props: { ...entry.defaultProps },
        ...(entry.isContainer && { children: [] }),
      };

      setBlocks((prev) => addBlockRecursive(prev, newBlock, parentId));
      setSelectedBlockId(newBlock.id);
    },
    []
  );

  const updateBlock = useCallback((blockId: string, updates: Partial<Block>) => {
    setBlocks((prev) => updateBlockRecursive(prev, blockId, updates));
  }, []);

  const deleteBlock = useCallback((blockId: string) => {
    setBlocks((prev) => deleteBlockRecursive(prev, blockId));
    setSelectedBlockId(null);
  }, []);

  const moveBlock = useCallback(
    (blockId: string, parentId: string) => {
      const block = getBlockById(blockId);
      if (!block) return;

      setBlocks((prev) => {
        let updated = deleteBlockRecursive(prev, blockId);
        updated = addBlockRecursive(updated, block, parentId);
        return updated;
      });
    },
    [getBlockById]
  );

  const selectBlock = useCallback((id: string | null) => {
    setSelectedBlockId(id);
  }, []);

  const setBlocksDirectly = useCallback((newBlocks: Block[]) => {
    setBlocks(newBlocks);
  }, []);

  function deepCloneBlock(block: Block): Block {
    return {
      ...block,
      id: generateId(),
      children: block.children ? block.children.map(deepCloneBlock) : undefined,
    };
  }

  const duplicateBlock = useCallback(
    (blockId: string) => {
      const block = getBlockById(blockId);
      if (!block) return;

      const parent = getParentBlock(blockId);
      const cloned = deepCloneBlock(block);

      if (parent) {
        setBlocks((prev) =>
          updateBlockRecursive(prev, parent.id, {
            children: [...(parent.children ?? []), cloned],
          })
        );
      } else {
        setBlocks((prev) => [...prev, cloned]);
      }

      setSelectedBlockId(cloned.id);
    },
    [getBlockById, getParentBlock]
  );

  return {
    blocks,
    selectedBlockId,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    duplicateBlock,
    selectBlock,
    setBlocks: setBlocksDirectly,
    getBlockById,
    getParentBlock,
  };
}

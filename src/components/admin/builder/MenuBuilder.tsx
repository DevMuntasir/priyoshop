'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Grid';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { MenuItem, BuilderPageDoc } from '@/libs/builder/Types';

export type MenuBuilderProps = {
  items: MenuItem[];
  onItemsChange: (items: MenuItem[]) => void;
};

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function MenuBuilder({ items, onItemsChange }: MenuBuilderProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pages, setPages] = useState<BuilderPageDoc[]>([]);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemLabel, setNewItemLabel] = useState('');
  const [newItemType, setNewItemType] = useState<'url' | 'page'>('url');
  const [newItemUrl, setNewItemUrl] = useState('');
  const [newItemPageId, setNewItemPageId] = useState('');
  const [addingSubMenuFor, setAddingSubMenuFor] = useState<string | null>(null);
  const [newSubItemLabel, setNewSubItemLabel] = useState('');
  const [newSubItemType, setNewSubItemType] = useState<'url' | 'page'>('url');
  const [newSubItemUrl, setNewSubItemUrl] = useState('');
  const [newSubItemPageId, setNewSubItemPageId] = useState('');
  const [newSubItemDescription, setNewSubItemDescription] = useState('');
  const [newSubItemImage, setNewSubItemImage] = useState('');
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [draggedParentId, setDraggedParentId] = useState<string | null>(null);

  // Load published pages
  useEffect(() => {
    const loadPages = async () => {
      try {
        const response = await adminFetch('/api/admin/builder-pages');
        const data = await response.json() as any;
        // Filter to only published pages
        const publishedPages = (data.pages as BuilderPageDoc[]).filter(
          (page) => page.status === 'published'
        );
        setPages(publishedPages);
      } catch (error) {
        console.error('Failed to load pages:', error);
      }
    };

    void loadPages();
  }, []);

  const handleAddItem = () => {
    if (!newItemLabel.trim()) {
      // eslint-disable-next-line no-alert
      alert('Label is required');
      return;
    }

    const newItem: MenuItem = {
      id: generateId(),
      label: newItemLabel,
    };

    if (newItemType === 'url') {
      newItem.href = newItemUrl || '#';
    } else if (newItemType === 'page' && newItemPageId) {
      newItem.pageId = newItemPageId;
      // Find the page to get its slug for the href
      const page = pages.find((p) => p.pageId === newItemPageId);
      if (page) {
        newItem.href = `/pages/${page.slug}`;
      }
    }

    onItemsChange([...items, newItem]);
    setIsAddingItem(false);
    setNewItemLabel('');
    setNewItemType('url');
    setNewItemUrl('');
    setNewItemPageId('');
  };

  const updateItem = (id: string, updates: Partial<MenuItem>, parentId: string | null = null) => {
    if (parentId === null) {
      // Update top-level item
      const updated = items.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      );
      onItemsChange(updated);
    } else {
      // Update sub-item
      const updated = items.map((item) => {
        if (item.id === parentId && item.children) {
          return {
            ...item,
            children: item.children.map((child) =>
              child.id === id ? { ...child, ...updates } : child
            ),
          };
        }
        return item;
      });
      onItemsChange(updated);
    }
  };

  const deleteItem = (id: string, parentId: string | null = null) => {
    if (parentId === null) {
      // Delete top-level item
      const updated = items.filter((item) => item.id !== id);
      onItemsChange(updated);
    } else {
      // Delete sub-item
      const updated = items.map((item) => {
        if (item.id === parentId && item.children) {
          return {
            ...item,
            children: item.children.filter((child) => child.id !== id),
          };
        }
        return item;
      });
      onItemsChange(updated);
    }
  };

  const addSubItem = (parentId: string) => {
    if (!newSubItemLabel.trim()) {
      // eslint-disable-next-line no-alert
      alert('Label is required');
      return;
    }

    const newSubItem: MenuItem = {
      id: generateId(),
      label: newSubItemLabel,
    };

    if (newSubItemType === 'url') {
      newSubItem.href = newSubItemUrl || '#';
    } else if (newSubItemType === 'page' && newSubItemPageId) {
      newSubItem.pageId = newSubItemPageId;
      const page = pages.find((p) => p.pageId === newSubItemPageId);
      if (page) {
        newSubItem.href = `/pages/${page.slug}`;
      }
    }

    if (newSubItemDescription) {
      newSubItem.description = newSubItemDescription;
    }

    if (newSubItemImage) {
      newSubItem.image = newSubItemImage;
    }

    const updated = items.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...(item.children || []), newSubItem],
        };
      }
      return item;
    });

    onItemsChange(updated);
    setAddingSubMenuFor(null);
    setNewSubItemLabel('');
    setNewSubItemType('url');
    setNewSubItemUrl('');
    setNewSubItemPageId('');
    setNewSubItemDescription('');
    setNewSubItemImage('');
  };

  const handleDragStart = (itemId: string, parentId: string | null) => {
    setDraggedId(itemId);
    setDraggedParentId(parentId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropItem = (targetId: string, targetParentId: string | null) => {
    if (draggedId === null || draggedId === targetId) {
      setDraggedId(null);
      setDraggedParentId(null);
      setDragOverId(null);
      return;
    }

    // If both are top-level items
    if (draggedParentId === null && targetParentId === null) {
      const draggedIndex = items.findIndex((item) => item.id === draggedId);
      const targetIndex = items.findIndex((item) => item.id === targetId);

      if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
        const newItems = [...items];
        const draggedItem = newItems[draggedIndex];
        if (draggedItem) {
          newItems.splice(draggedIndex, 1);
          const insertIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
          newItems.splice(insertIndex, 0, draggedItem);
          onItemsChange(newItems);
        }
      }
    }
    // If both are sub-items of the same parent
    else if (draggedParentId === targetParentId && draggedParentId !== null) {
      const parent = items.find((item) => item.id === draggedParentId);
      if (parent && parent.children) {
        const draggedIndex = parent.children.findIndex((child) => child.id === draggedId);
        const targetIndex = parent.children.findIndex((child) => child.id === targetId);

        if (draggedIndex !== -1 && targetIndex !== -1 && draggedIndex !== targetIndex) {
          const updated = items.map((item) => {
            if (item.id === draggedParentId && item.children) {
              const newChildren = [...item.children];
              const draggedChild = newChildren[draggedIndex];
              if (draggedChild) {
                newChildren.splice(draggedIndex, 1);
                const insertIndex = draggedIndex < targetIndex ? targetIndex - 1 : targetIndex;
                newChildren.splice(insertIndex, 0, draggedChild);
                return { ...item, children: newChildren };
              }
            }
            return item;
          });
          onItemsChange(updated);
        }
      }
    }

    setDraggedId(null);
    setDraggedParentId(null);
    setDragOverId(null);
  };

  const renderMenuItem = (item: MenuItem, level: number = 0, parentId: string | null = null) => {
    const isDragged = draggedId === item.id;
    const isDragOver = dragOverId === item.id;

    return (
      <div
        key={item.id}
        style={{ marginLeft: `${level * 24}px` }}
        className="mb-2"
        draggable
        onDragStart={(e) => {
          e.stopPropagation();
          handleDragStart(item.id, parentId);
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          handleDragOver(e);
        }}
        onDragEnter={(e) => {
          e.stopPropagation();
          setDragOverId(item.id);
        }}
        onDragLeave={(e) => {
          e.stopPropagation();
          setDragOverId(null);
        }}
        onDrop={(e) => {
          e.stopPropagation();
          handleDropItem(item.id, parentId);
        }}
      >
        <Card
          padding="sm"
          border={isDragOver}
          className={isDragged ? 'opacity-40' : ''}
          style={
            isDragOver
              ? {
                  outline: '2px dashed rgb(238, 47, 71)',
                  outlineOffset: '4px',
                  transition: 'all 0.2s ease',
                }
              : {
                  transition: 'all 0.2s ease',
                }
          }
        >
          <Stack direction="row" align="center" gap="sm">
            <div className="text-ps-ink-600 cursor-grab active:cursor-grabbing select-none">⋮⋮</div>
            <div className="flex-1">
              {editingId === item.id ? (
                <Stack gap="sm">
                  <Input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateItem(item.id, { label: e.target.value }, parentId)}
                    placeholder="Label"
                  />
                  <Input
                    type="text"
                    value={item.href ?? ''}
                    onChange={(e) => updateItem(item.id, { href: e.target.value }, parentId)}
                    placeholder="URL"
                  />
                  {level > 0 && (
                    <>
                      <Input
                        type="text"
                        value={item.description ?? ''}
                        onChange={(e) => updateItem(item.id, { description: e.target.value }, parentId)}
                        placeholder="Description (optional)"
                      />
                      <Input
                        type="text"
                        value={item.image ?? ''}
                        onChange={(e) => updateItem(item.id, { image: e.target.value }, parentId)}
                        placeholder="Image URL (optional)"
                      />
                    </>
                  )}
                </Stack>
              ) : (
                <div>
                  <Text size="sm" weight="semibold">
                    {item.label}
                  </Text>
                  {item.href && (
                    <Text size="xs" className="text-ps-ink-600">
                      {item.href}
                    </Text>
                  )}
                  {level > 0 && item.description && (
                    <Text size="xs" className="text-ps-ink-500 mt-1">
                      {item.description}
                    </Text>
                  )}
                  {level > 0 && item.image && (
                    <Text size="xs" className="text-ps-ink-500">
                      {item.image}
                    </Text>
                  )}
                </div>
              )}
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                setEditingId(editingId === item.id ? null : item.id)
              }
            >
              {editingId === item.id ? 'Done' : 'Edit'}
            </Button>

            {level === 0 && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setAddingSubMenuFor(addingSubMenuFor === item.id ? null : item.id)}
              >
                {addingSubMenuFor === item.id ? 'Close' : 'Add Sub'}
              </Button>
            )}

            <Button
              size="sm"
              variant="ghost"
              tone="dark"
              onClick={() => deleteItem(item.id, parentId)}
            >
              Delete
            </Button>
          </Stack>
        </Card>

      {addingSubMenuFor === item.id && level === 0 && (
        <Card padding="md" border className="mb-2" style={{ marginLeft: `${24}px` }}>
          <Stack gap="md">
            <Input
              type="text"
              value={newSubItemLabel}
              onChange={(e) => setNewSubItemLabel(e.target.value)}
              placeholder="Sub-menu item label"
            />

            <div>
              <label className="block text-ps-sm font-semibold mb-2">
                Link Type
              </label>
              <select
                className="w-full p-2 border border-ps-grey-300 rounded-ps-sm font-body text-ps-body"
                value={newSubItemType}
                onChange={(e) => {
                  setNewSubItemType(e.target.value as 'url' | 'page');
                  setNewSubItemUrl('');
                  setNewSubItemPageId('');
                }}
              >
                <option value="url">External URL</option>
                <option value="page">Builder Page</option>
              </select>
            </div>

            {newSubItemType === 'url' && (
              <Input
                type="text"
                value={newSubItemUrl}
                onChange={(e) => setNewSubItemUrl(e.target.value)}
                placeholder="https://example.com or /path"
              />
            )}

            {newSubItemType === 'page' && (
              <div>
                <label className="block text-ps-sm font-semibold mb-2">
                  Select Page
                </label>
                {pages.length === 0 ? (
                  <Text size="sm" className="text-ps-ink-600 p-2">
                    No published pages available
                  </Text>
                ) : (
                  <select
                    className="w-full p-2 border border-ps-grey-300 rounded-ps-sm font-body text-ps-body"
                    value={newSubItemPageId}
                    onChange={(e) => setNewSubItemPageId(e.target.value)}
                  >
                    <option value="">Select a page...</option>
                    {pages.map((page) => (
                      <option key={page.pageId} value={page.pageId}>
                        {page.title} (/{page.slug})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            <Input
              type="text"
              value={newSubItemDescription}
              onChange={(e) => setNewSubItemDescription(e.target.value)}
              placeholder="Description (optional)"
            />

            <Input
              type="text"
              value={newSubItemImage}
              onChange={(e) => setNewSubItemImage(e.target.value)}
              placeholder="Image URL (optional)"
            />

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => addSubItem(item.id)}
              >
                Add
              </Button>
              <Button
                size="sm"
                variant="outlined"
                tone="dark"
                onClick={() => {
                  setAddingSubMenuFor(null);
                  setNewSubItemLabel('');
                  setNewSubItemType('url');
                  setNewSubItemUrl('');
                  setNewSubItemPageId('');
                }}
              >
                Cancel
              </Button>
            </div>
          </Stack>
        </Card>
      )}

        {item.children && item.children.length > 0 && (
          <div>
            {item.children.map((child) =>
              renderMenuItem(child, level + 1, item.id)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {!isAddingItem ? (
        <Button
          onClick={() => {
            setIsAddingItem(true);
          }}
        >
          Add Menu Item
        </Button>
      ) : (
        <Card padding="md" border>
          <Stack gap="md">
            <Input
              type="text"
              value={newItemLabel}
              onChange={(e) => setNewItemLabel(e.target.value)}
              placeholder="Menu item label"
            />

            <div>
              <label className="block text-ps-sm font-semibold mb-2">
                Link Type
              </label>
              <select
                className="w-full p-2 border border-ps-grey-300 rounded-ps-sm font-body text-ps-body"
                value={newItemType}
                onChange={(e) => {
                  setNewItemType(e.target.value as 'url' | 'page');
                  setNewItemUrl('');
                  setNewItemPageId('');
                }}
              >
                <option value="url">External URL</option>
                <option value="page">Builder Page</option>
              </select>
            </div>

            {newItemType === 'url' && (
              <Input
                type="text"
                value={newItemUrl}
                onChange={(e) => setNewItemUrl(e.target.value)}
                placeholder="https://example.com or /path"
              />
            )}

            {newItemType === 'page' && (
              <div>
                <label className="block text-ps-sm font-semibold mb-2">
                  Select Page
                </label>
                {pages.length === 0 ? (
                  <Text size="sm" className="text-ps-ink-600 p-2">
                    No published pages available. Create and publish a page first.
                  </Text>
                ) : (
                  <select
                    className="w-full p-2 border border-ps-grey-300 rounded-ps-sm font-body text-ps-body"
                    value={newItemPageId}
                    onChange={(e) => setNewItemPageId(e.target.value)}
                  >
                    <option value="">Select a page...</option>
                    {pages.map((page) => (
                      <option key={page.pageId} value={page.pageId}>
                        {page.title} (/{page.slug})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  void handleAddItem();
                }}
              >
                Add
              </Button>
              <Button
                size="sm"
                variant="outlined"
                tone="dark"
                onClick={() => {
                  setIsAddingItem(false);
                  setNewItemLabel('');
                  setNewItemType('url');
                  setNewItemUrl('');
                  setNewItemPageId('');
                }}
              >
                Cancel
              </Button>
            </div>
          </Stack>
        </Card>
      )}

      {items.length === 0 ? (
        <Card padding="lg">
          <Text size="sm" className="text-ps-ink-600">
            No menu items. Create one to get started.
          </Text>
        </Card>
      ) : (
        <div className="space-y-2">{items.map((item) => renderMenuItem(item, 0, null))}</div>
      )}
    </div>
  );
}

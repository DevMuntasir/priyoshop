'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BuilderPageDoc, MenuItem } from '@/libs/builder/Types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

type ItemFormData = {
  label: string;
  linkType: 'page' | 'url' | 'none';
  pageId: string;
  href: string;
  description: string;
  image: string;
};

const initialFormData: ItemFormData = {
  label: '',
  linkType: 'url',
  pageId: '',
  href: '',
  description: '',
  image: '',
};

/**
 * Visual editor for the main header navigation menu.
 */
export function HeaderMenuManager(props: {
  items: MenuItem[];
  onChange: (items: MenuItem[]) => void;
  pages: BuilderPageDoc[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<ItemFormData>(initialFormData);
  const [addingSubForId, setAddingSubForId] = useState<string | null>(null);
  const [subFormData, setSubFormData] = useState<ItemFormData>(initialFormData);
  const [isAddingTopItem, setIsAddingTopItem] = useState(false);
  const [topFormData, setTopFormData] = useState<ItemFormData>(initialFormData);
  const [activePreviewDropdown, setActivePreviewDropdown] = useState<string | null>(null);

  // Drag and drop state
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [draggedParentId, setDraggedParentId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const startEditing = (item: MenuItem) => {
    let linkType: 'page' | 'url' | 'none' = 'url';
    if (item.pageId) {
      linkType = 'page';
    } else if (!item.href || item.href === '#') {
      linkType = (item.children && item.children.length > 0) ? 'none' : 'url';
    }

    setEditFormData({
      label: item.label,
      linkType,
      pageId: item.pageId ?? '',
      href: item.href ?? '',
      description: item.description ?? '',
      image: item.image ?? '',
    });
    setEditingId(item.id);
  };

  const handleSaveEdit = (id: string, parentId: string | null) => {
    if (!editFormData.label.trim()) {
      return;
    }

    let calculatedHref = editFormData.href.trim();
    if (editFormData.linkType === 'none') {
      calculatedHref = '#';
    } else if (editFormData.linkType === 'page' && editFormData.pageId) {
      const page = props.pages.find((p) => p.pageId === editFormData.pageId);
      calculatedHref = page ? `/pages/${page.slug}` : (calculatedHref || '#');
    }

    const updates: Partial<MenuItem> = {
      label: editFormData.label.trim(),
      href: calculatedHref,
      pageId: editFormData.linkType === 'page' ? editFormData.pageId : undefined,
      description: editFormData.description.trim() ? editFormData.description.trim() : undefined,
      image: editFormData.image.trim() ? editFormData.image.trim() : undefined,
    };

    if (parentId === null) {
      const updated = props.items.map((item) => (item.id === id ? { ...item, ...updates } : item));
      props.onChange(updated);
    } else {
      const updated = props.items.map((item) => {
        if (item.id === parentId && item.children) {
          return {
            ...item,
            children: item.children.map((child) => (child.id === id ? { ...child, ...updates } : child)),
          };
        }
        return item;
      });
      props.onChange(updated);
    }

    setEditingId(null);
  };

  const handleDeleteItem = (id: string, parentId: string | null) => {
    if (parentId === null) {
      props.onChange(props.items.filter((item) => item.id !== id));
    } else {
      const updated = props.items.map((item) => {
        if (item.id === parentId && item.children) {
          return {
            ...item,
            children: item.children.filter((child) => child.id !== id),
          };
        }
        return item;
      });
      props.onChange(updated);
    }
  };

  const handleMoveItem = (
    index: number,
    direction: 'up' | 'down',
    parentId: string | null
  ) => {
    if (parentId === null) {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= props.items.length) {
        return;
      }
      const updated = [...props.items];
      const [moved] = updated.splice(index, 1);
      if (moved) {
        updated.splice(targetIndex, 0, moved);
        props.onChange(updated);
      }
    } else {
      const parent = props.items.find((item) => item.id === parentId);
      if (!parent?.children) {
        return;
      }
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= parent.children.length) {
        return;
      }
      const updatedChildren = [...parent.children];
      const [moved] = updatedChildren.splice(index, 1);
      if (moved) {
        updatedChildren.splice(targetIndex, 0, moved);
        const updated = props.items.map((item) =>
          item.id === parentId ? { ...item, children: updatedChildren } : item
        );
        props.onChange(updated);
      }
    }
  };

  const handleAddTopItem = () => {
    if (!topFormData.label.trim()) {
      return;
    }

    let calculatedHref = topFormData.href.trim();
    if (topFormData.linkType === 'none') {
      calculatedHref = '#';
    } else if (topFormData.linkType === 'page' && topFormData.pageId) {
      const page = props.pages.find((p) => p.pageId === topFormData.pageId);
      calculatedHref = page ? `/pages/${page.slug}` : (calculatedHref || '#');
    }

    const newItem: MenuItem = {
      id: generateId(),
      label: topFormData.label.trim(),
      href: calculatedHref,
      pageId: topFormData.linkType === 'page' ? topFormData.pageId : undefined,
      children: [],
    };

    props.onChange([...props.items, newItem]);
    setIsAddingTopItem(false);
    setTopFormData(initialFormData);
  };

  const handleAddSubItem = (parentId: string) => {
    if (!subFormData.label.trim()) {
      return;
    }

    let calculatedHref = subFormData.href.trim();
    if (subFormData.linkType === 'none') {
      calculatedHref = '#';
    } else if (subFormData.linkType === 'page' && subFormData.pageId) {
      const page = props.pages.find((p) => p.pageId === subFormData.pageId);
      calculatedHref = page ? `/pages/${page.slug}` : (calculatedHref || '#');
    }

    const newSubItem: MenuItem = {
      id: generateId(),
      label: subFormData.label.trim(),
      href: calculatedHref,
      pageId: subFormData.linkType === 'page' ? subFormData.pageId : undefined,
      description: subFormData.description.trim() ? subFormData.description.trim() : undefined,
      image: subFormData.image.trim() ? subFormData.image.trim() : undefined,
    };

    const updated = props.items.map((item) => {
      if (item.id === parentId) {
        return {
          ...item,
          children: [...(item.children ?? []), newSubItem],
        };
      }
      return item;
    });

    props.onChange(updated);
    setAddingSubForId(null);
    setSubFormData(initialFormData);
  };

  // Drag handlers
  const handleDragStart = (id: string, parentId: string | null) => {
    setDraggedId(id);
    setDraggedParentId(parentId);
  };

  const handleDrop = (targetId: string, targetParentId: string | null) => {
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDraggedParentId(null);
      setDragOverId(null);
      return;
    }

    // Both are top-level
    if (draggedParentId === null && targetParentId === null) {
      const fromIndex = props.items.findIndex((item) => item.id === draggedId);
      const toIndex = props.items.findIndex((item) => item.id === targetId);

      if (fromIndex !== -1 && toIndex !== -1) {
        const next = [...props.items];
        const [moved] = next.splice(fromIndex, 1);
        if (moved) {
          next.splice(toIndex, 0, moved);
          props.onChange(next);
        }
      }
    }
    // Both are sub-items in the same parent
    else if (draggedParentId === targetParentId && draggedParentId !== null) {
      const parent = props.items.find((item) => item.id === draggedParentId);
      if (parent?.children) {
        const fromIndex = parent.children.findIndex((c) => c.id === draggedId);
        const toIndex = parent.children.findIndex((c) => c.id === targetId);
        if (fromIndex !== -1 && toIndex !== -1) {
          const nextChildren = [...parent.children];
          const [moved] = nextChildren.splice(fromIndex, 1);
          if (moved) {
            nextChildren.splice(toIndex, 0, moved);
            const next = props.items.map((item) =>
              item.id === draggedParentId ? { ...item, children: nextChildren } : item
            );
            props.onChange(next);
          }
        }
      }
    }

    setDraggedId(null);
    setDraggedParentId(null);
    setDragOverId(null);
  };

  const totalSubLinks = props.items.reduce(
    (acc, curr) => acc + (curr.children?.length ?? 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Overview Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="block font-display text-2xl font-bold text-gray-900">
              {props.items.length}
            </span>
            <span className="font-body text-xs font-medium text-gray-500">
              Main Nav Items
            </span>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div>
            <span className="block font-display text-2xl font-bold text-gray-900">
              {totalSubLinks}
            </span>
            <span className="font-body text-xs font-medium text-gray-500">
              Dropdown Sub-links
            </span>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div>
            <span className="block font-display text-2xl font-bold text-gray-900">
              {props.pages.length}
            </span>
            <span className="font-body text-xs font-medium text-gray-500">
              Available Pages
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsAddingTopItem(true);
            setTopFormData(initialFormData);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 font-display text-sm font-semibold text-white shadow-xs transition-colors hover:bg-gray-800"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Menu Item
        </button>
      </div>

      {/* Add Top Item Form Drawer/Card */}
      {isAddingTopItem && (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-display text-base font-bold text-gray-900">
              Add New Navigation Item
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsAddingTopItem(false);
              }}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Cancel"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-body text-xs font-semibold text-gray-700">
                Menu Label *
              </label>
              <input
                type="text"
                value={topFormData.label}
                onChange={(e) => {
                  setTopFormData({ ...topFormData, label: e.target.value });
                }}
                placeholder="e.g. Solutions, About Us"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 font-body text-sm text-gray-900 outline-none transition focus:border-ps-red-500 focus:ring-2 focus:ring-ps-red-100"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-semibold text-gray-700">
                Destination Type
              </label>
              <div className="mt-1.5 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTopFormData({ ...topFormData, linkType: 'url' });
                  }}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition ${
                    topFormData.linkType === 'url'
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Custom URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTopFormData({ ...topFormData, linkType: 'page' });
                  }}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition ${
                    topFormData.linkType === 'page'
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Builder Page
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTopFormData({ ...topFormData, linkType: 'none' });
                  }}
                  className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition ${
                    topFormData.linkType === 'none'
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Dropdown Only
                </button>
              </div>
            </div>

            {topFormData.linkType === 'url' && (
              <div className="sm:col-span-2">
                <label className="block font-body text-xs font-semibold text-gray-700">
                  Target URL
                </label>
                <input
                  type="text"
                  value={topFormData.href}
                  onChange={(e) => {
                    setTopFormData({ ...topFormData, href: e.target.value });
                  }}
                  placeholder="https://example.com or /about"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 font-body text-sm text-gray-900 outline-none transition focus:border-ps-red-500 focus:ring-2 focus:ring-ps-red-100"
                />
              </div>
            )}

            {topFormData.linkType === 'page' && (
              <div className="sm:col-span-2">
                <label className="block font-body text-xs font-semibold text-gray-700">
                  Select Builder Page
                </label>
                {props.pages.length === 0 ? (
                  <p className="mt-1.5 text-xs text-amber-600">
                    No published builder pages available.
                  </p>
                ) : (
                  <select
                    value={topFormData.pageId}
                    onChange={(e) => {
                      setTopFormData({ ...topFormData, pageId: e.target.value });
                    }}
                    className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 font-body text-sm text-gray-900 outline-none transition focus:border-ps-red-500 focus:ring-2 focus:ring-ps-red-100"
                  >
                    <option value="">Select a published page…</option>
                    {props.pages.map((p) => (
                      <option key={p.pageId} value={p.pageId}>
                        {p.title} (/pages/{p.slug})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAddingTopItem(false);
              }}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 font-display text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleAddTopItem();
              }}
              disabled={!topFormData.label.trim()}
              className="rounded-xl bg-ps-red-500 px-4 py-2 font-display text-xs font-semibold text-white transition hover:bg-ps-red-600 disabled:opacity-40"
            >
              Add Item
            </button>
          </div>
        </div>
      )}

      {/* Main Items Tree List */}
      {props.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
            <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <h3 className="mt-3 font-display text-base font-bold text-gray-900">
            No Navigation Items
          </h3>
          <p className="mt-1 max-w-sm font-body text-xs text-gray-500">
            Your header menu is currently empty. Add menu links or dropdown groups above to build your navbar.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsAddingTopItem(true);
            }}
            className="mt-4 rounded-xl bg-gray-900 px-4 py-2 font-display text-xs font-semibold text-white hover:bg-gray-800"
          >
            Create First Item
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {props.items.map((item, index) => {
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isEditing = editingId === item.id;
            const isAddingSub = addingSubForId === item.id;
            const isDragged = draggedId === item.id;
            const isDragOver = dragOverId === item.id;

            return (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => {
                  e.stopPropagation();
                  handleDragStart(item.id, null);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.dataTransfer.dropEffect = 'move';
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
                  handleDrop(item.id, null);
                }}
                className={`transition-all ${
                  isDragged ? 'opacity-40' : ''
                } ${isDragOver ? 'rounded-2xl ring-2 ring-ps-red-500 ring-offset-2' : ''}`}
              >
                {/* Top-Level Item Card */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs transition hover:border-gray-300 sm:p-5">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Drag Handle */}
                    <div
                      className="cursor-grab text-gray-400 hover:text-gray-700 active:cursor-grabbing"
                      title="Drag to reorder"
                    >
                      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h.01M8 15h.01M16 9h.01M16 15h.01M12 9h.01M12 15h.01" />
                      </svg>
                    </div>

                    <span className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-gray-100 font-mono text-xs font-bold text-gray-600">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-sm font-bold text-gray-900">
                          {item.label}
                        </span>

                        {hasChildren ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            Dropdown ({item.children?.length})
                          </span>
                        ) : item.pageId ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                            Page: {item.href}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                            {item.href ?? '#'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        handleMoveItem(index, 'up', null);
                      }}
                      disabled={index === 0}
                      className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                      title="Move Up"
                      aria-label="Move Up"
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleMoveItem(index, 'down', null);
                      }}
                      disabled={index === props.items.length - 1}
                      className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                      title="Move Down"
                      aria-label="Move Down"
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAddingSubForId(isAddingSub ? null : item.id);
                        setSubFormData(initialFormData);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 font-display text-xs font-semibold text-gray-700 shadow-2xs transition hover:bg-gray-50"
                    >
                      <svg className="size-3.5 text-ps-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Sub-link
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (isEditing) {
                          setEditingId(null);
                        } else {
                          startEditing(item);
                        }
                      }}
                      className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-600 shadow-2xs transition hover:bg-gray-50 hover:text-gray-900"
                      title="Edit Item"
                      aria-label="Edit Item"
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteItem(item.id, null);
                      }}
                      className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                      title="Delete Item"
                      aria-label="Delete Item"
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Inline Edit Form for Top Item */}
                {isEditing && (
                  <div className="mt-2 rounded-2xl border border-gray-300 bg-gray-50/70 p-5 shadow-inner">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-500">
                      Edit Navigation Item
                    </h4>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block font-body text-xs font-semibold text-gray-700">
                          Label *
                        </label>
                        <input
                          type="text"
                          value={editFormData.label}
                          onChange={(e) => {
                            setEditFormData({ ...editFormData, label: e.target.value });
                          }}
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-body text-sm text-gray-900 outline-none focus:border-ps-red-500"
                        />
                      </div>

                      <div>
                        <label className="block font-body text-xs font-semibold text-gray-700">
                          Link Type
                        </label>
                        <div className="mt-1 flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditFormData({ ...editFormData, linkType: 'url' });
                            }}
                            className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition ${
                              editFormData.linkType === 'url'
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 bg-white text-gray-700'
                            }`}
                          >
                            URL
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditFormData({ ...editFormData, linkType: 'page' });
                            }}
                            className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition ${
                              editFormData.linkType === 'page'
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 bg-white text-gray-700'
                            }`}
                          >
                            Page
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditFormData({ ...editFormData, linkType: 'none' });
                            }}
                            className={`flex-1 rounded-lg border py-1.5 text-xs font-semibold transition ${
                              editFormData.linkType === 'none'
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 bg-white text-gray-700'
                            }`}
                          >
                            Dropdown Only
                          </button>
                        </div>
                      </div>

                      {editFormData.linkType === 'url' && (
                        <div className="sm:col-span-2">
                          <label className="block font-body text-xs font-semibold text-gray-700">
                            URL
                          </label>
                          <input
                            type="text"
                            value={editFormData.href}
                            onChange={(e) => {
                              setEditFormData({ ...editFormData, href: e.target.value });
                            }}
                            className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-body text-sm text-gray-900 outline-none focus:border-ps-red-500"
                          />
                        </div>
                      )}

                      {editFormData.linkType === 'page' && (
                        <div className="sm:col-span-2">
                          <label className="block font-body text-xs font-semibold text-gray-700">
                            Builder Page
                          </label>
                          <select
                            value={editFormData.pageId}
                            onChange={(e) => {
                              setEditFormData({ ...editFormData, pageId: e.target.value });
                            }}
                            className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-body text-sm text-gray-900 outline-none focus:border-ps-red-500"
                          >
                            <option value="">Select a page…</option>
                            {props.pages.map((p) => (
                              <option key={p.pageId} value={p.pageId}>
                                {p.title} (/pages/{p.slug})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                        }}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleSaveEdit(item.id, null);
                        }}
                        className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-item Add Form */}
                {isAddingSub && (
                  <div className="my-2.5 ml-8 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-5 shadow-xs">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="font-display text-xs font-bold text-gray-900">
                        Add Sub-link under &quot;{item.label}&quot;
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setAddingSubForId(null);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Cancel"
                      >
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block font-body text-xs font-semibold text-gray-700">
                          Sub-link Label *
                        </label>
                        <input
                          type="text"
                          value={subFormData.label}
                          onChange={(e) => {
                            setSubFormData({ ...subFormData, label: e.target.value });
                          }}
                          placeholder="e.g. Retail Financing, Logistics"
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-body text-sm text-gray-900 outline-none focus:border-ps-red-500"
                        />
                      </div>

                      <div>
                        <label className="block font-body text-xs font-semibold text-gray-700">
                          Destination Type
                        </label>
                        <div className="mt-1 flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSubFormData({ ...subFormData, linkType: 'url' });
                            }}
                            className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition ${
                              subFormData.linkType === 'url'
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 bg-white text-gray-700'
                            }`}
                          >
                            Custom URL
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setSubFormData({ ...subFormData, linkType: 'page' });
                            }}
                            className={`flex-1 rounded-lg border py-2 text-xs font-semibold transition ${
                              subFormData.linkType === 'page'
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 bg-white text-gray-700'
                            }`}
                          >
                            Builder Page
                          </button>
                        </div>
                      </div>

                      {subFormData.linkType === 'url' && (
                        <div className="sm:col-span-2">
                          <label className="block font-body text-xs font-semibold text-gray-700">
                            URL
                          </label>
                          <input
                            type="text"
                            value={subFormData.href}
                            onChange={(e) => {
                              setSubFormData({ ...subFormData, href: e.target.value });
                            }}
                            placeholder="/solution/financing or https://..."
                            className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-body text-sm text-gray-900 outline-none focus:border-ps-red-500"
                          />
                        </div>
                      )}

                      {subFormData.linkType === 'page' && (
                        <div className="sm:col-span-2">
                          <label className="block font-body text-xs font-semibold text-gray-700">
                            Builder Page
                          </label>
                          <select
                            value={subFormData.pageId}
                            onChange={(e) => {
                              setSubFormData({ ...subFormData, pageId: e.target.value });
                            }}
                            className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-body text-sm text-gray-900 outline-none focus:border-ps-red-500"
                          >
                            <option value="">Select a page…</option>
                            {props.pages.map((p) => (
                              <option key={p.pageId} value={p.pageId}>
                                {p.title} (/pages/{p.slug})
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div className="sm:col-span-2">
                        <label className="block font-body text-xs font-semibold text-gray-700">
                          Description (Optional Megamenu subtitle)
                        </label>
                        <input
                          type="text"
                          value={subFormData.description}
                          onChange={(e) => {
                            setSubFormData({ ...subFormData, description: e.target.value });
                          }}
                          placeholder="Brief preview sentence shown when hovering navigation"
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-body text-sm text-gray-900 outline-none focus:border-ps-red-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-body text-xs font-semibold text-gray-700">
                          Thumbnail Image URL (Optional Megamenu preview)
                        </label>
                        <input
                          type="text"
                          value={subFormData.image}
                          onChange={(e) => {
                            setSubFormData({ ...subFormData, image: e.target.value });
                          }}
                          placeholder="/images/sample.jpg or https://..."
                          className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-body text-sm text-gray-900 outline-none focus:border-ps-red-500"
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAddingSubForId(null);
                        }}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleAddSubItem(item.id);
                        }}
                        disabled={!subFormData.label.trim()}
                        className="rounded-lg bg-ps-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-ps-red-600 disabled:opacity-40"
                      >
                        Add Sub-link
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-items List (Children) with Visual Tree Line */}
                {hasChildren && (
                  <div className="relative my-2.5 ml-6 space-y-2.5 border-l-2 border-gray-200 pl-4 sm:ml-8 sm:pl-5">
                    {item.children?.map((child, childIndex) => {
                      const isChildEditing = editingId === child.id;
                      const isChildDragged = draggedId === child.id;
                      const isChildDragOver = dragOverId === child.id;

                      return (
                        <div
                          key={child.id}
                          draggable
                          onDragStart={(e) => {
                            e.stopPropagation();
                            handleDragStart(child.id, item.id);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            e.dataTransfer.dropEffect = 'move';
                          }}
                          onDragEnter={(e) => {
                            e.stopPropagation();
                            setDragOverId(child.id);
                          }}
                          onDragLeave={(e) => {
                            e.stopPropagation();
                            setDragOverId(null);
                          }}
                          onDrop={(e) => {
                            e.stopPropagation();
                            handleDrop(child.id, item.id);
                          }}
                          className={`rounded-xl border border-gray-200 bg-white p-3 shadow-2xs transition hover:border-gray-300 ${
                            isChildDragged ? 'opacity-40' : ''
                          } ${isChildDragOver ? 'ring-2 ring-ps-red-500' : ''}`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2.5">
                              <div
                                className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
                                title="Drag to reorder"
                              >
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h.01M8 15h.01M16 9h.01M16 15h.01M12 9h.01M12 15h.01" />
                                </svg>
                              </div>

                              {child.image ? (
                                <div className="relative size-8 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                                  <Image
                                    src={child.image}
                                    alt={child.label}
                                    fill
                                    sizes="32px"
                                    unoptimized
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 font-mono text-[11px] font-bold text-gray-500">
                                  {childIndex + 1}
                                </span>
                              )}

                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="font-display text-xs font-bold text-gray-900">
                                    {child.label}
                                  </span>
                                  <span className="font-mono text-[11px] text-gray-500">
                                    {child.href ?? '#'}
                                  </span>
                                </div>
                                {child.description && (
                                  <p className="truncate font-body text-[11px] text-gray-500">
                                    {child.description}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  handleMoveItem(childIndex, 'up', item.id);
                                }}
                                disabled={childIndex === 0}
                                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                                title="Move Up"
                                aria-label="Move Up"
                              >
                                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  handleMoveItem(childIndex, 'down', item.id);
                                }}
                                disabled={childIndex === (item.children?.length ?? 1) - 1}
                                className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-30"
                                title="Move Down"
                                aria-label="Move Down"
                              >
                                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (isChildEditing) {
                                    setEditingId(null);
                                  } else {
                                    startEditing(child);
                                  }
                                }}
                                className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                title="Edit Sub-link"
                                aria-label="Edit Sub-link"
                              >
                                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                                </svg>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  handleDeleteItem(child.id, item.id);
                                }}
                                className="rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                                title="Delete Sub-link"
                                aria-label="Delete Sub-link"
                              >
                                <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Inline Edit Form for Sub-item */}
                          {isChildEditing && (
                            <div className="mt-3 border-t border-gray-100 pt-3">
                              <div className="grid gap-2.5 sm:grid-cols-2">
                                <div>
                                  <label className="block text-[11px] font-semibold text-gray-700">
                                    Label *
                                  </label>
                                  <input
                                    type="text"
                                    value={editFormData.label}
                                    onChange={(e) => {
                                      setEditFormData({ ...editFormData, label: e.target.value });
                                    }}
                                    className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-900 outline-none focus:border-ps-red-500"
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-semibold text-gray-700">
                                    URL / Route
                                  </label>
                                  <input
                                    type="text"
                                    value={editFormData.href}
                                    onChange={(e) => {
                                      setEditFormData({ ...editFormData, href: e.target.value });
                                    }}
                                    className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-900 outline-none focus:border-ps-red-500"
                                  />
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="block text-[11px] font-semibold text-gray-700">
                                    Description (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    value={editFormData.description}
                                    onChange={(e) => {
                                      setEditFormData({ ...editFormData, description: e.target.value });
                                    }}
                                    className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-900 outline-none focus:border-ps-red-500"
                                  />
                                </div>

                                <div className="sm:col-span-2">
                                  <label className="block text-[11px] font-semibold text-gray-700">
                                    Image URL (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    value={editFormData.image}
                                    onChange={(e) => {
                                      setEditFormData({ ...editFormData, image: e.target.value });
                                    }}
                                    className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-900 outline-none focus:border-ps-red-500"
                                  />
                                </div>
                              </div>

                              <div className="mt-3 flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingId(null);
                                  }}
                                  className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-gray-600"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleSaveEdit(child.id, item.id);
                                  }}
                                  className="rounded-lg bg-gray-900 px-3 py-1 text-xs font-semibold text-white"
                                >
                                  Done
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Live Interactive Navigation Preview */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-display text-sm font-bold text-gray-900">
              Live Navigation Preview
            </h3>
            <p className="font-body text-xs text-gray-500">
              Hover over or click dropdown items to preview how links appear on desktop.
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-medium text-emerald-700 border border-emerald-200">
            Interactive
          </span>
        </div>

        <div className="relative mt-5 rounded-2xl bg-gray-950 p-4 text-white shadow-inner sm:p-5">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Priyo<span className="text-ps-red-500">Shop</span>
            </span>

            {/* Simulated Desktop Nav Items */}
            <nav className="hidden items-center gap-1 md:flex">
              {props.items.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isOpen = activePreviewDropdown === item.id;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => {
                      if (hasChildren) {
                        setActivePreviewDropdown(item.id);
                      }
                    }}
                    onMouseLeave={() => {
                      setActivePreviewDropdown(null);
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (hasChildren) {
                          setActivePreviewDropdown(isOpen ? null : item.id);
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-body text-xs font-medium transition ${
                        isOpen
                          ? 'bg-white/15 text-white'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <svg
                          className={`size-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      )}
                    </button>

                    {/* Preview Dropdown Menu Card */}
                    {hasChildren && isOpen && (
                      <div className="absolute left-0 top-full z-30 mt-2 min-w-[240px] rounded-2xl border border-white/10 bg-gray-900/95 p-2 shadow-2xl backdrop-blur-md">
                        {item.children?.map((child) => (
                          <div
                            key={child.id}
                            className="flex items-start gap-2.5 rounded-xl p-2.5 transition hover:bg-white/10"
                          >
                            {child.image ? (
                              <div className="relative size-7 shrink-0 overflow-hidden rounded-md bg-gray-800">
                                <Image
                                  src={child.image}
                                  alt={child.label}
                                  fill
                                  sizes="28px"
                                  unoptimized
                                  className="object-cover"
                                />
                              </div>
                            ) : null}
                            <div className="min-w-0">
                              <span className="block font-body text-xs font-semibold text-white">
                                {child.label}
                              </span>
                              {child.description && (
                                <span className="block truncate font-body text-[10px] text-gray-400">
                                  {child.description}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <span className="rounded-full bg-ps-red-500 px-4 py-1.5 font-display text-xs font-semibold text-white">
              Join Us
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

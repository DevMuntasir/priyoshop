'use client';

import { useState } from 'react';
import type { BuilderPageDoc, MenuItem } from '@/libs/builder/Types';

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Visual column-based manager for public footer link groups.
 */
export function FooterColumnsManager(props: {
  columns: MenuItem[];
  onChange: (columns: MenuItem[]) => void;
  pages: BuilderPageDoc[];
}) {
  const [editingColumnHeadingId, setEditingColumnHeadingId] = useState<string | null>(null);
  const [columnHeadingText, setColumnHeadingText] = useState('');

  const [addingLinkForColumnId, setAddingLinkForColumnId] = useState<string | null>(null);
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkType, setNewLinkType] = useState<'url' | 'page'>('url');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkPageId, setNewLinkPageId] = useState('');

  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);
  const [editLinkLabel, setEditLinkLabel] = useState('');
  const [editLinkType, setEditLinkType] = useState<'url' | 'page'>('url');
  const [editLinkUrl, setEditLinkUrl] = useState('');
  const [editLinkPageId, setEditLinkPageId] = useState('');

  const [isAddingNewColumn, setIsAddingNewColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  // Column operations
  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) {
      return;
    }
    const newCol: MenuItem = {
      id: generateId(),
      label: newColumnTitle.trim().toUpperCase(),
      children: [],
    };
    props.onChange([...props.columns, newCol]);
    setNewColumnTitle('');
    setIsAddingNewColumn(false);
  };

  const handleDeleteColumn = (columnId: string) => {
    props.onChange(props.columns.filter((c) => c.id !== columnId));
  };

  const handleMoveColumn = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= props.columns.length) {
      return;
    }
    const updated = [...props.columns];
    const [moved] = updated.splice(index, 1);
    if (moved) {
      updated.splice(targetIndex, 0, moved);
      props.onChange(updated);
    }
  };

  const handleSaveColumnHeading = (columnId: string) => {
    if (!columnHeadingText.trim()) {
      return;
    }
    const updated = props.columns.map((c) =>
      c.id === columnId ? { ...c, label: columnHeadingText.trim().toUpperCase() } : c
    );
    props.onChange(updated);
    setEditingColumnHeadingId(null);
  };

  // Link operations inside column
  const handleAddLink = (columnId: string) => {
    if (!newLinkLabel.trim()) {
      return;
    }

    let calculatedHref = newLinkUrl.trim();
    if (newLinkType === 'page' && newLinkPageId) {
      const page = props.pages.find((p) => p.pageId === newLinkPageId);
      calculatedHref = page ? `/pages/${page.slug}` : (calculatedHref || '#');
    }

    const newLink: MenuItem = {
      id: generateId(),
      label: newLinkLabel.trim(),
      href: calculatedHref || '#',
      pageId: newLinkType === 'page' ? newLinkPageId : undefined,
    };

    const updated = props.columns.map((col) => {
      if (col.id === columnId) {
        return {
          ...col,
          children: [...(col.children ?? []), newLink],
        };
      }
      return col;
    });

    props.onChange(updated);
    setAddingLinkForColumnId(null);
    setNewLinkLabel('');
    setNewLinkType('url');
    setNewLinkUrl('');
    setNewLinkPageId('');
  };

  const handleDeleteLink = (columnId: string, linkId: string) => {
    const updated = props.columns.map((col) => {
      if (col.id === columnId && col.children) {
        return {
          ...col,
          children: col.children.filter((l) => l.id !== linkId),
        };
      }
      return col;
    });
    props.onChange(updated);
  };

  const handleMoveLink = (
    columnId: string,
    linkIndex: number,
    direction: 'up' | 'down'
  ) => {
    const column = props.columns.find((c) => c.id === columnId);
    if (!column?.children) {
      return;
    }
    const targetIndex = direction === 'up' ? linkIndex - 1 : linkIndex + 1;
    if (targetIndex < 0 || targetIndex >= column.children.length) {
      return;
    }

    const nextChildren = [...column.children];
    const [moved] = nextChildren.splice(linkIndex, 1);
    if (moved) {
      nextChildren.splice(targetIndex, 0, moved);
      const updated = props.columns.map((c) =>
        c.id === columnId ? { ...c, children: nextChildren } : c
      );
      props.onChange(updated);
    }
  };

  const startEditingLink = (link: MenuItem) => {
    setEditingLinkId(link.id);
    setEditLinkLabel(link.label);
    setEditLinkType(link.pageId ? 'page' : 'url');
    setEditLinkUrl(link.href ?? '');
    setEditLinkPageId(link.pageId ?? '');
  };

  const handleSaveEditLink = (columnId: string, linkId: string) => {
    if (!editLinkLabel.trim()) {
      return;
    }

    let calculatedHref = editLinkUrl.trim();
    if (editLinkType === 'page' && editLinkPageId) {
      const page = props.pages.find((p) => p.pageId === editLinkPageId);
      calculatedHref = page ? `/pages/${page.slug}` : (calculatedHref || '#');
    }

    const updated = props.columns.map((col) => {
      if (col.id === columnId && col.children) {
        return {
          ...col,
          children: col.children.map((l) =>
            l.id === linkId
              ? {
                  ...l,
                  label: editLinkLabel.trim(),
                  href: calculatedHref || '#',
                  pageId: editLinkType === 'page' ? editLinkPageId : undefined,
                }
              : l
          ),
        };
      }
      return col;
    });

    props.onChange(updated);
    setEditingLinkId(null);
  };

  const totalLinksCount = props.columns.reduce(
    (acc, col) => acc + (col.children?.length ?? 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Overview & Add Column Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
        <div className="flex items-center gap-6">
          <div>
            <span className="block font-display text-2xl font-bold text-gray-900">
              {props.columns.length}
            </span>
            <span className="font-body text-xs font-medium text-gray-500">
              Footer Columns
            </span>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div>
            <span className="block font-display text-2xl font-bold text-gray-900">
              {totalLinksCount}
            </span>
            <span className="font-body text-xs font-medium text-gray-500">
              Total Column Links
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsAddingNewColumn(true);
            setNewColumnTitle('');
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 font-display text-sm font-semibold text-white shadow-xs transition hover:bg-gray-800"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Footer Column
        </button>
      </div>

      {/* Add Column Modal / Form */}
      {isAddingNewColumn && (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-display text-base font-bold text-gray-900">
              Create New Footer Column
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsAddingNewColumn(false);
              }}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Cancel"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-4 max-w-md">
            <label className="block font-body text-xs font-semibold text-gray-700">
              Column Heading (e.g. ABOUT, USEFUL LINKS, LEGAL) *
            </label>
            <input
              type="text"
              value={newColumnTitle}
              onChange={(e) => {
                setNewColumnTitle(e.target.value);
              }}
              placeholder="e.g. COMPANY, SUPPORT"
              className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 font-body text-sm uppercase text-gray-900 outline-none transition focus:border-ps-red-500 focus:ring-2 focus:ring-ps-red-100"
            />
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setIsAddingNewColumn(false);
              }}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 font-display text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleAddColumn();
              }}
              disabled={!newColumnTitle.trim()}
              className="rounded-xl bg-ps-red-500 px-4 py-2 font-display text-xs font-semibold text-white transition hover:bg-ps-red-600 disabled:opacity-40"
            >
              Add Column
            </button>
          </div>
        </div>
      )}

      {/* Columns Grid */}
      {props.columns.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
            <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
          <h3 className="mt-3 font-display text-base font-bold text-gray-900">
            No Footer Columns
          </h3>
          <p className="mt-1 max-w-sm font-body text-xs text-gray-500">
            Add columns to organize the navigation links that appear beside the footer logo.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsAddingNewColumn(true);
            }}
            className="mt-4 rounded-xl bg-gray-900 px-4 py-2 font-display text-xs font-semibold text-white hover:bg-gray-800"
          >
            Create First Column
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {props.columns.map((column, colIndex) => {
            const isEditingHeading = editingColumnHeadingId === column.id;
            const isAddingLink = addingLinkForColumnId === column.id;
            const linkCount = column.children?.length ?? 0;

            return (
              <div
                key={column.id}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-xs transition hover:border-gray-300"
              >
                {/* Column Card Header */}
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 p-4 rounded-t-2xl">
                  {isEditingHeading ? (
                    <div className="flex flex-1 items-center gap-2">
                      <input
                        type="text"
                        value={columnHeadingText}
                        onChange={(e) => {
                          setColumnHeadingText(e.target.value);
                        }}
                        className="w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-xs font-bold uppercase text-gray-900 outline-none focus:border-ps-red-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          handleSaveColumnHeading(column.id);
                        }}
                        className="rounded-lg bg-gray-900 px-2 py-1 text-xs font-semibold text-white"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="flex size-5 items-center justify-center rounded-md bg-gray-200 font-mono text-[10px] font-bold text-gray-700">
                        {colIndex + 1}
                      </span>
                      <h4 className="font-display text-sm font-bold tracking-wide text-gray-900">
                        {column.label}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingColumnHeadingId(column.id);
                          setColumnHeadingText(column.label);
                        }}
                        className="text-gray-400 hover:text-gray-700"
                        title="Rename Column"
                        aria-label="Rename Column"
                      >
                        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Move Left / Right & Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        handleMoveColumn(colIndex, 'left');
                      }}
                      disabled={colIndex === 0}
                      className="rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 disabled:opacity-20"
                      title="Move Column Left"
                      aria-label="Move Column Left"
                    >
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleMoveColumn(colIndex, 'right');
                      }}
                      disabled={colIndex === props.columns.length - 1}
                      className="rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-700 disabled:opacity-20"
                      title="Move Column Right"
                      aria-label="Move Column Right"
                    >
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteColumn(column.id);
                      }}
                      className="rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      title="Delete Column"
                      aria-label="Delete Column"
                    >
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Column Body / Links List */}
                <div className="flex-1 space-y-2 p-4">
                  {linkCount === 0 ? (
                    <p className="py-4 text-center font-body text-xs text-gray-400">
                      No links in this column yet.
                    </p>
                  ) : (
                    column.children?.map((link, linkIndex) => {
                      const isEditingThisLink = editingLinkId === link.id;

                      return (
                        <div
                          key={link.id}
                          className="rounded-xl border border-gray-100 bg-white p-2.5 shadow-2xs transition hover:border-gray-200"
                        >
                          {isEditingThisLink ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={editLinkLabel}
                                onChange={(e) => {
                                  setEditLinkLabel(e.target.value);
                                }}
                                className="w-full rounded-lg border border-gray-300 p-1.5 text-xs text-gray-900 outline-none focus:border-ps-red-500"
                              />

                              <div className="flex gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditLinkType('url');
                                  }}
                                  className={`flex-1 rounded-md border py-1 text-[11px] font-semibold ${
                                    editLinkType === 'url' ? 'bg-gray-900 text-white' : 'bg-gray-50'
                                  }`}
                                >
                                  URL
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditLinkType('page');
                                  }}
                                  className={`flex-1 rounded-md border py-1 text-[11px] font-semibold ${
                                    editLinkType === 'page' ? 'bg-gray-900 text-white' : 'bg-gray-50'
                                  }`}
                                >
                                  Page
                                </button>
                              </div>

                              {editLinkType === 'url' ? (
                                <input
                                  type="text"
                                  value={editLinkUrl}
                                  onChange={(e) => {
                                    setEditLinkUrl(e.target.value);
                                  }}
                                  className="w-full rounded-lg border border-gray-300 p-1.5 text-xs text-gray-900 outline-none focus:border-ps-red-500"
                                />
                              ) : (
                                <select
                                  value={editLinkPageId}
                                  onChange={(e) => {
                                    setEditLinkPageId(e.target.value);
                                  }}
                                  className="w-full rounded-lg border border-gray-300 p-1.5 text-xs text-gray-900 outline-none focus:border-ps-red-500"
                                >
                                  <option value="">Select a page…</option>
                                  {props.pages.map((p) => (
                                    <option key={p.pageId} value={p.pageId}>
                                      {p.title} (/pages/{p.slug})
                                    </option>
                                  ))}
                                </select>
                              )}

                              <div className="flex justify-end gap-1.5 pt-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingLinkId(null);
                                  }}
                                  className="rounded-md border border-gray-200 px-2 py-1 text-[11px]"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleSaveEditLink(column.id, link.id);
                                  }}
                                  className="rounded-md bg-gray-900 px-2.5 py-1 text-[11px] font-semibold text-white"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <span className="block truncate font-display text-xs font-semibold text-gray-900">
                                  {link.label}
                                </span>
                                <span className="block truncate font-mono text-[11px] text-gray-400">
                                  {link.href ?? '#'}
                                </span>
                              </div>

                              <div className="flex items-center gap-0.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleMoveLink(column.id, linkIndex, 'up');
                                  }}
                                  disabled={linkIndex === 0}
                                  className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-20"
                                  title="Move Up"
                                  aria-label="Move Up"
                                >
                                  <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                  </svg>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    handleMoveLink(column.id, linkIndex, 'down');
                                  }}
                                  disabled={linkIndex === linkCount - 1}
                                  className="rounded p-1 text-gray-400 hover:text-gray-700 disabled:opacity-20"
                                  title="Move Down"
                                  aria-label="Move Down"
                                >
                                  <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                  </svg>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    startEditingLink(link);
                                  }}
                                  className="rounded p-1 text-gray-400 hover:text-gray-700"
                                  title="Edit Link"
                                  aria-label="Edit Link"
                                >
                                  <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                                  </svg>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    handleDeleteLink(column.id, link.id);
                                  }}
                                  className="rounded p-1 text-gray-400 hover:text-red-600"
                                  title="Delete Link"
                                  aria-label="Delete Link"
                                >
                                  <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}

                  {/* Add Link to Column Form / Trigger */}
                  {isAddingLink ? (
                    <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-3 shadow-inner">
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={newLinkLabel}
                          onChange={(e) => {
                            setNewLinkLabel(e.target.value);
                          }}
                          placeholder="Link text (e.g. Terms of Service)"
                          className="w-full rounded-lg border border-gray-300 bg-white p-2 text-xs text-gray-900 outline-none focus:border-ps-red-500"
                        />

                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setNewLinkType('url');
                            }}
                            className={`flex-1 rounded-md border py-1 text-[11px] font-semibold ${
                              newLinkType === 'url' ? 'bg-gray-900 text-white' : 'bg-white'
                            }`}
                          >
                            Custom URL
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setNewLinkType('page');
                            }}
                            className={`flex-1 rounded-md border py-1 text-[11px] font-semibold ${
                              newLinkType === 'page' ? 'bg-gray-900 text-white' : 'bg-white'
                            }`}
                          >
                            Builder Page
                          </button>
                        </div>

                        {newLinkType === 'url' ? (
                          <input
                            type="text"
                            value={newLinkUrl}
                            onChange={(e) => {
                              setNewLinkUrl(e.target.value);
                            }}
                            placeholder="/privacy or https://..."
                            className="w-full rounded-lg border border-gray-300 bg-white p-2 text-xs text-gray-900 outline-none focus:border-ps-red-500"
                          />
                        ) : (
                          <select
                            value={newLinkPageId}
                            onChange={(e) => {
                              setNewLinkPageId(e.target.value);
                            }}
                            className="w-full rounded-lg border border-gray-300 bg-white p-2 text-xs text-gray-900 outline-none focus:border-ps-red-500"
                          >
                            <option value="">Select a page…</option>
                            {props.pages.map((p) => (
                              <option key={p.pageId} value={p.pageId}>
                                {p.title} (/pages/{p.slug})
                              </option>
                            ))}
                          </select>
                        )}

                        <div className="flex justify-end gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setAddingLinkForColumnId(null);
                            }}
                            className="rounded-md border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleAddLink(column.id);
                            }}
                            disabled={!newLinkLabel.trim()}
                            className="rounded-md bg-ps-red-500 px-3 py-1 text-xs font-semibold text-white disabled:opacity-40"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setAddingLinkForColumnId(column.id);
                        setNewLinkLabel('');
                        setNewLinkType('url');
                        setNewLinkUrl('');
                        setNewLinkPageId('');
                      }}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 py-2 font-display text-xs font-semibold text-gray-600 transition hover:border-gray-400 hover:text-gray-900"
                    >
                      <svg className="size-3.5 text-ps-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Link
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Live Dark Footer Columns Mock Preview */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-display text-sm font-bold text-gray-900">
              Live Footer Columns Preview
            </h3>
            <p className="font-body text-xs text-gray-500">
              Real-time rendering of columns as they will look on the live website footer.
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 font-mono text-[11px] font-medium text-gray-700">
            Preview Mode
          </span>
        </div>

        <div className="mt-5 rounded-2xl bg-[#0f1115] p-8 text-white shadow-inner">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
            {props.columns.map((column) => (
              <div key={column.id} className="flex min-w-0 flex-col gap-3">
                <span className="font-body text-sm font-bold tracking-wider text-white">
                  {column.label}
                </span>
                <div className="flex flex-col gap-2">
                  {(column.children ?? []).map((link) => (
                    <span
                      key={link.id}
                      className="font-body text-xs text-white/70 transition hover:text-white"
                    >
                      {link.label}
                    </span>
                  ))}
                  {(column.children ?? []).length === 0 && (
                    <span className="font-body text-xs italic text-white/30">
                      Empty column
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

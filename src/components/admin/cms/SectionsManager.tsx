'use client';

import { Reorder, useDragControls } from 'motion/react';
import { useEffect, useState } from 'react';
import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { PageKey } from '@/libs/cms/Pages';
import { Link } from '@/libs/I18nNavigation';

type AdminSectionSummary = {
  key: string;
  label: string;
  enabled: boolean;
  order: number;
  contentEditable: boolean;
};

// Mirrors ORDER_STEP in ContentService so the displayed order matches what gets saved.
const ORDER_STEP = 10;

const GripIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <circle cx="5" cy="3" r="1.4" />
    <circle cx="11" cy="3" r="1.4" />
    <circle cx="5" cy="8" r="1.4" />
    <circle cx="11" cy="8" r="1.4" />
    <circle cx="5" cy="13" r="1.4" />
    <circle cx="11" cy="13" r="1.4" />
  </svg>
);

const SectionRowBody = (props: { section: AdminSectionSummary }) => (
  <>
    <div>
      <div className="font-medium text-gray-900">{props.section.label}</div>
      <div className="text-xs text-gray-400">
        order {props.section.order} · {props.section.contentEditable ? 'editable' : 'layout only'}
      </div>
    </div>
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-medium ${props.section.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
        }`}
    >
      {props.section.enabled ? 'On' : 'Off'}
    </span>
  </>
);

const SectionRow = (props: {
  section: AdminSectionSummary;
  page: PageKey;
  onCommit: () => void;
}) => {
  const controls = useDragControls();
  const { section } = props;

  return (
    <Reorder.Item
      value={section}
      dragListener={false}
      dragControls={controls}
      onDragEnd={props.onCommit}
      className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-5 py-4"
    >
      <button
        type="button"
        aria-label="Drag to reorder"
        onPointerDown={(event) => {
          controls.start(event);
        }}
        className="-ml-1 cursor-grab touch-none rounded p-1 text-gray-400 hover:text-gray-900 active:cursor-grabbing"
      >
        <GripIcon />
      </button>
      {section.contentEditable ? (
        <Link
          href={`/admin/pages/${props.page}/${section.key}`}
          className="flex flex-1 items-center justify-between transition-colors hover:text-gray-900"
        >
          <SectionRowBody section={section} />
        </Link>
      ) : (
        <div className="flex flex-1 items-center justify-between">
          <SectionRowBody section={section} />
        </div>
      )}
    </Reorder.Item>
  );
};

export const SectionsManager = (props: { page: PageKey }) => {
  const [sections, setSections] = useState<AdminSectionSummary[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await adminFetch(`/api/admin/sections?page=${props.page}`);
      if (res.ok) {
        const data: { sections: AdminSectionSummary[] } = await res.json();
        setSections(data.sections);
      }
      setLoaded(true);
    };
    void load();
  }, [props.page]);

  // Optimistically renumber so the visible order tracks the saved order.
  const handleReorder = (next: AdminSectionSummary[]) => {
    setSections(next.map((section, index) => ({ ...section, order: (index + 1) * ORDER_STEP })));
  };

  const persistOrder = async (ordered: AdminSectionSummary[]) => {
    setSaving(true);
    await adminFetch('/api/admin/sections', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: props.page, keys: ordered.map((section) => section.key) }),
    });
    setSaving(false);
  };

  if (loaded && sections.length === 0) {
    return (
      <AdminPlaceholder message="This page has no editable sections yet. Sections are added to the registry as they migrate to the CMS." />
    );
  }

  return (
    <div className=" p-8 max-w-4xl">
      <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
        {saving && <span className="text-gray-500">Saving…</span>}
      </div>
      <Reorder.Group axis="y" values={sections} onReorder={handleReorder} className="space-y-3">
        {sections.map((section) => (
          <SectionRow
            key={section.key}
            section={section}
            page={props.page}
            onCommit={() => {
              void persistOrder(sections);
            }}
          />
        ))}
      </Reorder.Group>
    </div>
  );
};

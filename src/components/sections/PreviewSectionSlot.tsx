'use client';

import { renderEditableSection } from '@/components/sections/EditableSectionRegistry';
import { previewSectionId, usePreviewDraft } from '@/components/sections/PreviewBridge';
import type { ResolvedSection, SectionKey } from '@/libs/cms/Sections';

// Renders one editable section on the preview surface. Shows the saved `initial`
// data until the editor pushes a live draft for this section, then re-renders
// with the draft. A disabled draft hides the section while keeping the scroll
// anchor so the editor can still focus it.
export function PreviewSectionSlot(props: { sectionKey: SectionKey; initial: ResolvedSection }) {
  const draft = usePreviewDraft(props.sectionKey);
  const data = draft ?? props.initial;

  return (
    <div id={previewSectionId(props.sectionKey)}>
      {data.enabled ? renderEditableSection(props.sectionKey, data) : null}
    </div>
  );
}

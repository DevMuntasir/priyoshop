'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ResolvedSection, SectionKey } from '@/libs/cms/Sections';

// Live drafts pushed from the editor, keyed by section. Empty until a message arrives.
type DraftMap = Partial<Record<SectionKey, ResolvedSection>>;

const PreviewDraftContext = createContext<DraftMap>({});

// Reads the live draft for a section, or undefined when none has been pushed.
export const usePreviewDraft = (key: SectionKey): ResolvedSection | undefined =>
  useContext(PreviewDraftContext)[key];

// DOM id of a section's preview wrapper, used to scroll the edited one into view.
export const previewSectionId = (key: SectionKey): string => `preview-section-${key}`;

type UpdateMessage = { type: 'cms-preview-update'; sectionKey: SectionKey; section: ResolvedSection };
type ScrollMessage = { type: 'cms-preview-scroll'; sectionKey: SectionKey };
type IncomingMessage = UpdateMessage | ScrollMessage;

const isIncoming = (data: unknown): data is IncomingMessage =>
  typeof data === 'object' &&
  data !== null &&
  'type' in data &&
  (data.type === 'cms-preview-update' || data.type === 'cms-preview-scroll');

const scrollToSection = (key: SectionKey) => {
  document
    .querySelector(`#${previewSectionId(key)}`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Mounted only on the authed preview surface. Listens for same-origin postMessage
// from the editor iframe and distributes live section drafts to the matching
// `PreviewSectionSlot`, plus scrolls the edited section into view.
export function PreviewBridge(props: { children: React.ReactNode }) {
  const [drafts, setDrafts] = useState<DraftMap>({});

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || !isIncoming(event.data)) {
        return;
      }
      if (event.data.type === 'cms-preview-update') {
        const { sectionKey, section } = event.data;
        setDrafts((prev) => ({ ...prev, [sectionKey]: section }));
      } else {
        scrollToSection(event.data.sectionKey);
      }
    };

    window.addEventListener('message', onMessage);
    // Tell the editor the surface is ready so it can push the initial draft.
    window.parent?.postMessage({ type: 'cms-preview-ready' }, window.location.origin);

    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  return <PreviewDraftContext value={drafts}>{props.children}</PreviewDraftContext>;
}

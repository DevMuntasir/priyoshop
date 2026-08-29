import { Fragment } from 'react';
import { EditableSection } from '@/components/sections/EditableSectionRegistry';
import { getSection, listPageLayout } from '@/libs/cms/ContentRepository';
import type { PageKey } from '@/libs/cms/Pages';
import type { ResolvedSection, SectionKey } from '@/libs/cms/Sections';

// Wraps an editable section node; defaults to rendering it directly.
export type WrapEditable = (key: SectionKey, data: ResolvedSection) => React.ReactNode;

export type BuildPageSectionsOptions = {
  page: PageKey;
  // Section keys registered to this page, in any order (layout order wins).
  keys: SectionKey[];
  locale: string;
  // Customises how editable sections render (e.g. the live-preview slot).
  wrapEditable?: WrapEditable;
  // Render this section even when disabled, so the preview can focus it.
  forceIncludeKey?: SectionKey;
  // Non-editable nodes rendered alongside the page's sections (e.g. decorative chrome).
  extra?: Record<string, React.ReactNode>;
};

// Composes a marketing page from its CMS layout and section content. Single
// source of truth shared by the public page and the authed live-preview
// surface, so a section renders identically in both. Editable sections can be
// wrapped (for the preview slot) without duplicating the layout or fetching logic.
export async function buildPageSections(options: BuildPageSectionsOptions): Promise<React.ReactNode> {
  // Default: render through the client-component wrapper; a client module's
  // functions cannot be invoked from this server context, only used as JSX.
  const wrapEditable: WrapEditable =
    options.wrapEditable ?? ((key, data) => <EditableSection sectionKey={key} data={data} />);

  const [layout, ...sectionData] = await Promise.all([
    listPageLayout(options.page),
    ...options.keys.map((key) => getSection(key, options.locale)),
  ]);

  const sections: Record<string, React.ReactNode> = { ...options.extra };
  for (const [index, key] of options.keys.entries()) {
    sections[key] = wrapEditable(key, sectionData[index] as ResolvedSection);
  }

  return layout
    .filter((entry) => entry.enabled || entry.key === options.forceIncludeKey)
    .map((entry) => <Fragment key={entry.key}>{sections[entry.key]}</Fragment>);
}

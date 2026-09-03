import type { Collection } from 'mongodb';
import { COLLECTIONS, getDb } from '@/libs/db/Mongodb';
import { routing } from '@/libs/I18nRouting';
import type { LayoutEntry } from './Layout';
import { listLayout } from './Layout';
import type { PageKey } from './Pages';
import type {
  ItemKind,
  ResolvedSection,
  SectionContent,
  SectionEditorHints,
  SectionKey,
} from './Sections';
import { getSectionDef, normalizeSectionContent, SECTION_KEYS } from './Sections';
import type { ResponsiveSectionStyle, SectionStyle } from './StyleTokens';
import { normalizeStyle } from './StyleTokens';


export type SectionDoc = {
  sectionKey: string;
  enabled: boolean;
  order: number;
  style: ResponsiveSectionStyle | SectionStyle;
  content: Record<string, SectionContent>;
  updatedAt: Date;
  updatedBy?: string;
};

const collection = (): Collection<SectionDoc> =>
  getDb().collection<SectionDoc>(COLLECTIONS.sectionContent);

const projection = { _id: 0, sectionKey: 1, enabled: 1, order: 1, style: 1, content: 1 } as const;

const fetchDoc = async (key: SectionKey): Promise<SectionDoc | null> =>
  await collection().findOne({ sectionKey: key }, { projection });

const resolveContent = (
  key: SectionKey,
  locale: string,
  doc: SectionDoc | null,
): SectionContent => {
  const def = getSectionDef(key);
  const content = doc?.content?.[locale] ?? doc?.content?.en ?? def.defaultContent;
  return normalizeSectionContent(key, content);
};

const resolveSection = (
  key: SectionKey,
  locale: string,
  doc: SectionDoc | null,
): ResolvedSection => {
  const def = getSectionDef(key);
  const content = resolveContent(key, locale, doc);
  return {
    key,
    enabled: doc?.enabled ?? true,
    order: doc?.order ?? def.defaultOrder,
    style: normalizeStyle(doc?.style ?? def.defaultStyle),
    heading: content.heading,
    items: content.items,
  };
};

export const getSection = async (key: SectionKey, locale: string): Promise<ResolvedSection> =>
  resolveSection(key, locale, await fetchDoc(key));

export type ResolvedLayoutEntry = LayoutEntry & { enabled: boolean; order: number };

export const listPageLayout = async (page: PageKey): Promise<ResolvedLayoutEntry[]> => {
  const entries = listLayout(page);
  const docs = await collection()
    .find({ sectionKey: { $in: entries.map((entry) => entry.key) } })
    .project<Pick<SectionDoc, 'sectionKey' | 'enabled' | 'order'>>({
      _id: 0,
      sectionKey: 1,
      enabled: 1,
      order: 1,
    })
    .toArray();
  const byKey = new Map(docs.map((doc) => [doc.sectionKey, doc]));
  return entries
    .map((entry) => {
      const doc = byKey.get(entry.key);
      return { ...entry, enabled: doc?.enabled ?? true, order: doc?.order ?? entry.defaultOrder };
    })
    .toSorted((a, b) => a.order - b.order);
};

export type AdminSection = {
  key: SectionKey;
  label: string;
  itemKind: ItemKind;
  enabled: boolean;
  order: number;
  style: ResponsiveSectionStyle;
  contentByLocale: Record<string, SectionContent>;
  editor?: SectionEditorHints;
};

const buildAdminSection = (key: SectionKey, doc: SectionDoc | null): AdminSection => {
  const def = getSectionDef(key);
  const contentByLocale = Object.fromEntries(
    routing.locales.map((locale) => [locale, resolveContent(key, locale, doc)]),
  );
  return {
    key,
    label: def.label,
    itemKind: def.itemKind,
    enabled: doc?.enabled ?? true,
    order: doc?.order ?? def.defaultOrder,
    style: normalizeStyle(doc?.style ?? def.defaultStyle),
    contentByLocale,
    editor: def.editor,
  };
};

export const getAdminSection = async (key: SectionKey): Promise<AdminSection> =>
  buildAdminSection(key, await fetchDoc(key));

const listAdminSectionsForKeys = async (keys: SectionKey[]): Promise<AdminSection[]> => {
  const sections = await Promise.all(keys.map(getAdminSection));
  return sections.toSorted((a, b) => a.order - b.order);
};

export const listAdminSections = async (): Promise<AdminSection[]> =>
  await listAdminSectionsForKeys([...SECTION_KEYS]);

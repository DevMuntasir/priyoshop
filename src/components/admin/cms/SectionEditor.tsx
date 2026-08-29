'use client';

import { useEffect, useState } from 'react';
import { SectionEditorPreview } from '@/components/admin/cms/SectionEditorPreview';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { PageKey } from '@/libs/cms/Pages';
import type {
  ItemKind,
  ResolvedSection,
  SectionContent,
  SectionEditorHints,
  SectionHeadingContent,
  SectionItem,
  SectionKey,
} from '@/libs/cms/Sections';
import type { Device, ResponsiveSectionStyle, SectionStyleTokens } from '@/libs/cms/StyleTokens';
import {
  ALIGN_OPTIONS,
  BG_COLOR_OPTIONS,
  COLUMNS_OPTIONS,
  FONT_FAMILY_OPTIONS,
  FONT_WEIGHT_OPTIONS,
  GAP_OPTIONS,
  MARGIN_Y_OPTIONS,
  PADDING_X_OPTIONS,
  PADDING_Y_OPTIONS,
  RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  TEXT_COLOR_OPTIONS,
  TITLE_SIZE_OPTIONS,
  VISIBILITY_OPTIONS,
} from '@/libs/cms/StyleTokens';
import { routing } from '@/libs/I18nRouting';

type Content = SectionContent;

type AdminSection = {
  key: SectionKey;
  label: string;
  itemKind: ItemKind;
  enabled: boolean;
  order: number;
  style: ResponsiveSectionStyle;
  contentByLocale: Record<string, Content>;
  editor?: SectionEditorHints;
};

type TokenField = keyof SectionStyleTokens;

const inputClass = 'w-full rounded-md border border-gray-300 px-3 py-2 text-sm';
const labelClass = 'block text-xs font-medium text-gray-500';

const DEVICE_LABELS: Record<Device, string> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  laptop: 'Laptop',
  desktop: 'Desktop',
};

// `(inherit)` sentinel for per-device selects: the value falls back to Mobile.
const INHERIT = '__inherit__';

// Declarative item fields per kind: the editor renders one row from this config,
// so a new section is a config entry rather than bespoke JSX.
type ItemFieldType = 'text' | 'bool' | 'select';
type ItemFieldDef = {
  field: keyof SectionItem;
  label: string;
  type?: ItemFieldType;
  options?: readonly string[];
  full?: boolean;
};

const ITEM_FIELDS: Record<ItemKind, ItemFieldDef[]> = {
  logo: [
    { field: 'name', label: 'Name' },
    { field: 'logo', label: 'Image path' },
  ],
  award: [
    { field: 'name', label: 'Name' },
    { field: 'logo', label: 'Image path' },
    { field: 'caption', label: 'Caption' },
  ],
  ecosystem: [
    { field: 'title', label: 'Title' },
    { field: 'body', label: 'Body', full: true },
    { field: 'image', label: 'Image path' },
    { field: 'imageAlt', label: 'Image alt' },
    { field: 'ctaLabel', label: 'CTA label' },
    { field: 'href', label: 'CTA link' },
    { field: 'reverse', label: 'Reverse', type: 'bool' },
  ],
  card: [
    { field: 'title', label: 'Title' },
    { field: 'body', label: 'Caption', full: true },
    { field: 'image', label: 'Image path' },
    { field: 'imageAlt', label: 'Image alt' },
  ],
  post: [
    { field: 'title', label: 'Headline' },
    { field: 'date', label: 'Date' },
    { field: 'image', label: 'Image path' },
    { field: 'href', label: 'Link' },
  ],
  news: [
    { field: 'name', label: 'Source' },
    { field: 'logo', label: 'Source logo path' },
    { field: 'title', label: 'Headline' },
    { field: 'date', label: 'Date' },
    { field: 'image', label: 'Image path' },
    { field: 'href', label: 'Link' },
  ],
  metric: [
    { field: 'value', label: 'Value' },
    { field: 'name', label: 'Label' },
  ],
  goal: [
    { field: 'value', label: 'Number' },
    { field: 'title', label: 'Title' },
    { field: 'image', label: 'Image path' },
    { field: 'imageAlt', label: 'Image alt' },
  ],
  timeline: [
    { field: 'year', label: 'Year' },
    { field: 'title', label: 'Milestone' },
    { field: 'logo', label: 'Icon path' },
  ],
  gallery: [
    { field: 'image', label: 'Image path' },
    { field: 'imageAlt', label: 'Image alt' },
    { field: 'size', label: 'Size', type: 'select', options: ['short', 'tall'] },
    { field: 'column', label: 'Column', type: 'select', options: ['a', 'b'] },
  ],
  stat: [
    { field: 'value', label: 'Value' },
    { field: 'name', label: 'Label' },
    { field: 'logo', label: 'Icon path' },
  ],
  slide: [
    { field: 'title', label: 'Headline' },
    { field: 'description', label: 'Description', full: true },
    { field: 'slideBackgroundImage', label: 'Background image path' },
    { field: 'textColor', label: 'Text color (hex/class)' },
    { field: 'textSize', label: 'Text size class' },
    { field: 'slideAlign', label: 'Alignment', type: 'select', options: ['left', 'center'] },
  ],
  faq: [
    { field: 'title', label: 'Question', full: true },
    { field: 'body', label: 'Answer', full: true },
  ],
  video: [
    { field: 'title', label: 'Title' },
    { field: 'videoPath', label: 'Video path' },
    { field: 'image', label: 'Poster path' },
  ],
  product: [
    { field: 'title', label: 'Name' },
    { field: 'value', label: 'Size' },
    { field: 'tag', label: 'Category' },
    { field: 'caption', label: 'Code' },
    { field: 'name', label: 'Manufacturer' },
    { field: 'image', label: 'Image path' },
  ],
  feature: [
    { field: 'title', label: 'Title' },
    { field: 'description', label: 'Detail headline', full: true },
    { field: 'body', label: 'Detail body', full: true },
  ],
};

// Item add/remove helpers, kept above the component so they read clearly inline.
function contentFor(section: AdminSection, locale: string): Content {
  return section.contentByLocale[locale] ?? { heading: { title: '' }, items: [] };
}

function addItemTo(
  setSection: (section: AdminSection) => void,
  section: AdminSection,
  locale: string,
) {
  const content = contentFor(section, locale);
  const next = { ...content, items: [...content.items, {}] };
  setSection({ ...section, contentByLocale: { ...section.contentByLocale, [locale]: next } });
}

function removeItemAt(
  setSection: (section: AdminSection) => void,
  section: AdminSection,
  locale: string,
  index: number,
) {
  const content = contentFor(section, locale);
  const next = { ...content, items: content.items.filter((_, i) => i !== index) };
  setSection({ ...section, contentByLocale: { ...section.contentByLocale, [locale]: next } });
}

function StyleSelect<T extends string>(props: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{props.label}</span>
      <select
        aria-label={props.label}
        className={inputClass}
        value={props.value}
        onChange={(event) => {
          const next = props.options.find((option) => option === event.target.value);
          if (next) {
            props.onChange(next);
          }
        }}
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function DeviceStyleSelect<T extends string>(props: {
  label: string;
  value: T | undefined;
  options: readonly T[];
  onChange: (value?: T) => void;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{props.label}</span>
      <select
        aria-label={props.label}
        className={inputClass}
        value={props.value ?? INHERIT}
        onChange={(event) => {
          if (event.target.value === INHERIT) {
            props.onChange();
            return;
          }
          const next = props.options.find((option) => option === event.target.value);
          if (next) {
            props.onChange(next);
          }
        }}
      >
        <option value={INHERIT}>(inherit)</option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

// One text/heading input bound to a heading field. Set `multiline` for a
// textarea so editors can add line breaks (e.g. after any word in a title).
function HeadingInput(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{props.label}</span>
      {props.multiline ? (
        <textarea
          aria-label={props.label}
          className={`${inputClass} resize-y`}
          rows={2}
          value={props.value}
          onChange={(event) => {
            props.onChange(event.target.value);
          }}
        />
      ) : (
        <input
          aria-label={props.label}
          className={inputClass}
          value={props.value}
          onChange={(event) => {
            props.onChange(event.target.value);
          }}
        />
      )}
    </label>
  );
}

// One generic item field rendered from `ITEM_FIELDS`.
function ItemField(props: {
  def: ItemFieldDef;
  item: SectionItem;
  onChange: (value: string | boolean) => void;
}) {
  const raw = props.item[props.def.field];
  if (props.def.type === 'bool') {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input
          aria-label={props.def.label}
          type="checkbox"
          checked={raw === true}
          onChange={(event) => {
            props.onChange(event.target.checked);
          }}
        />
        {props.def.label}
      </label>
    );
  }
  if (props.def.type === 'select') {
    return (
      <label className="block flex-1">
        <span className={labelClass}>{props.def.label}</span>
        <select
          aria-label={props.def.label}
          className={inputClass}
          value={typeof raw === 'string' ? raw : ''}
          onChange={(event) => {
            props.onChange(event.target.value);
          }}
        >
          {(props.def.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }
  return (
    <label className={props.def.full ? 'block w-full' : 'block flex-1'}>
      <span className={labelClass}>{props.def.label}</span>
      <input
        aria-label={props.def.label}
        className={inputClass}
        value={typeof raw === 'string' ? raw : ''}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
      />
    </label>
  );
}

// Reads a heading field as a string ('' for unset / non-string like rotatingWords).
const str = (value: unknown): string => (typeof value === 'string' ? value : '');

// Content panel body: heading fields, section-level extras (gated by editor
// hints), and the generic items editor. Extracted so the main component stays
// simple as more sections add heading-level extras.
function ContentPanelBody(props: {
  hints: SectionEditorHints;
  heading: SectionHeadingContent;
  items: SectionItem[];
  itemFields: ItemFieldDef[];
  onHeading: (field: keyof SectionHeadingContent, value: string) => void;
  onRotatingWords: (value: string) => void;
  onItemField: (index: number, field: keyof SectionItem, value: string | boolean) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
}) {
  const { hints, heading } = props;
  const cta = (
    label: string,
    labelField: keyof SectionHeadingContent,
    hrefField: keyof SectionHeadingContent,
  ) => (
    <div className="grid grid-cols-2 gap-3">
      <HeadingInput
        label={`${label} label`}
        value={str(heading[labelField])}
        onChange={(value) => {
          props.onHeading(labelField, value);
        }}
      />
      <HeadingInput
        label={`${label} link`}
        value={str(heading[hrefField])}
        onChange={(value) => {
          props.onHeading(hrefField, value);
        }}
      />
    </div>
  );

  return (
    <>
      <HeadingInput
        label="Eyebrow"
        value={heading.eyebrow ?? ''}
        onChange={(value) => {
          props.onHeading('eyebrow', value);
        }}
      />
      <HeadingInput
        label="Title (press Enter for a line break)"
        multiline
        value={heading.title}
        onChange={(value) => {
          props.onHeading('title', value);
        }}
      />
      {hints.titleTrail ? (
        <HeadingInput
          label="Title trail (un-gradiented)"
          value={heading.titleTrail ?? ''}
          onChange={(value) => {
            props.onHeading('titleTrail', value);
          }}
        />
      ) : null}
      <HeadingInput
        label="Description"
        value={heading.description ?? ''}
        onChange={(value) => {
          props.onHeading('description', value);
        }}
      />
      {hints.rotatingWords ? (
        <HeadingInput
          label="Rotating words (comma-separated)"
          value={(heading.rotatingWords ?? []).join(', ')}
          onChange={props.onRotatingWords}
        />
      ) : null}
      {hints.textStyle ? (
        <>
          <HeadingInput
            label="Text color (hex e.g. #ffffff or a class)"
            value={heading.textColor ?? ''}
            onChange={(value) => {
              props.onHeading('textColor', value);
            }}
          />
          <HeadingInput
            label="Text size class (e.g. text-ps-h3)"
            value={heading.textSize ?? ''}
            onChange={(value) => {
              props.onHeading('textSize', value);
            }}
          />
          <label className="block">
            <span className={labelClass}>Alignment</span>
            <select
              aria-label="Alignment"
              className={inputClass}
              value={heading.slideAlign ?? 'left'}
              onChange={(event) => {
                props.onHeading('slideAlign', event.target.value);
              }}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
            </select>
          </label>
        </>
      ) : null}
      {hints.sectionCta ? cta('CTA', 'ctaLabel', 'ctaHref') : null}
      {hints.secondaryCta ? cta('Secondary CTA', 'ctaSecondaryLabel', 'ctaSecondaryHref') : null}
      {hints.backgroundImage ? (
        <HeadingInput
          label="Background image path"
          value={heading.backgroundImage ?? ''}
          onChange={(value) => {
            props.onHeading('backgroundImage', value);
          }}
        />
      ) : null}
      {hints.video ? (
        <>
          <HeadingInput
            label="YouTube video id"
            value={heading.videoId ?? ''}
            onChange={(value) => {
              props.onHeading('videoId', value);
            }}
          />
          <HeadingInput
            label="Local video path"
            value={heading.videoPath ?? ''}
            onChange={(value) => {
              props.onHeading('videoPath', value);
            }}
          />
        </>
      ) : null}

      {hints.headingOnly ? null : (
        <>
          <p className="pt-2 text-xs font-medium tracking-wide text-gray-400 uppercase">Items</p>
          {props.items.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: rows are positional and reorderable
            <div
              key={index}
              className="flex flex-wrap items-end gap-2 border-b border-gray-100 pb-3"
            >
              {props.itemFields.map((def) => (
                <ItemField
                  key={def.field}
                  def={def}
                  item={item}
                  onChange={(value) => {
                    props.onItemField(index, def.field, value);
                  }}
                />
              ))}
              <button
                type="button"
                className="px-2 py-2 text-sm text-red-600 hover:text-red-700"
                onClick={() => {
                  props.onRemoveItem(index);
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
            onClick={props.onAddItem}
          >
            + Add item
          </button>
        </>
      )}
    </>
  );
}

// WordPress-style collapsible inspector panel (Content / Design / Settings).
function Panel(props: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  return (
    <details open={props.defaultOpen} className="group border-b border-gray-200">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50">
        {props.title}
        <span className="text-gray-400 transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <div className="space-y-3 px-4 pt-1 pb-4">{props.children}</div>
    </details>
  );
}

export const SectionEditor = (props: { page: PageKey; sectionKey: SectionKey }) => {
  const [section, setSection] = useState<AdminSection | null>(null);
  const [locale, setLocale] = useState(routing.defaultLocale);
  const [device, setDevice] = useState<Device>('mobile');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await adminFetch(`/api/admin/sections/${props.sectionKey}`);
      if (res.ok) {
        const data: { section: AdminSection } = await res.json();
        setSection(data.section);
      }
    };
    void load();
  }, [props.sectionKey]);

  if (!section) {
    return <p className="mt-6 text-sm text-gray-500">Loading…</p>;
  }

  const current = section;
  const hints = current.editor ?? {};
  const content = current.contentByLocale[locale] ?? { heading: { title: '' }, items: [] };

  const patchContent = (next: Content) => {
    setSection({ ...current, contentByLocale: { ...current.contentByLocale, [locale]: next } });
  };

  const patchHeading = (field: keyof SectionHeadingContent, value: string) => {
    patchContent({ ...content, heading: { ...content.heading, [field]: value } });
  };

  const patchRotatingWords = (value: string) => {
    const rotatingWords = value
      .split(',')
      .map((word) => word.trim())
      .filter((word) => word.length > 0);
    patchContent({ ...content, heading: { ...content.heading, rotatingWords } });
  };

  const patchItemField = (index: number, field: keyof SectionItem, value: string | boolean) => {
    const items = content.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    patchContent({ ...content, items });
  };

  // Edits the base layer (Mobile) or the active device's partial override.
  const updateToken = <K extends TokenField>(
    field: K,
    value: SectionStyleTokens[K] | undefined,
  ) => {
    if (device === 'mobile') {
      if (value === undefined) {
        return; // the mobile-first base always keeps a complete token bag
      }
      const base = { ...current.style.base, [field]: value };
      setSection({ ...current, style: { ...current.style, base } });
      return;
    }
    // Omit `field` from the override layer, then re-add it only when a value is set.
    const { [field]: _removed, ...rest } = current.style[device] ?? {};
    const layer: Partial<SectionStyleTokens> =
      value === undefined ? rest : { ...rest, [field]: value };
    const hasOverrides = Object.keys(layer).length > 0;
    setSection({
      ...current,
      style: { ...current.style, [device]: hasOverrides ? layer : undefined },
    });
  };

  const resetDevice = () => {
    if (device === 'mobile') {
      return;
    }
    setSection({ ...current, style: { ...current.style, [device]: undefined } });
  };

  const renderToken = <K extends TokenField>(
    label: string,
    field: K,
    options: readonly SectionStyleTokens[K][],
  ) => {
    if (device === 'mobile') {
      return (
        <StyleSelect
          label={label}
          value={current.style.base[field]}
          options={options}
          onChange={(value: SectionStyleTokens[K]) => {
            updateToken(field, value);
          }}
        />
      );
    }
    return (
      <DeviceStyleSelect
        label={label}
        value={current.style[device]?.[field]}
        options={options}
        onChange={(value?: SectionStyleTokens[K]) => {
          updateToken(field, value);
        }}
      />
    );
  };

  const save = async () => {
    setStatus('Saving…');
    const res = await adminFetch(`/api/admin/sections/${current.key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enabled: current.enabled,
        order: current.order,
        style: current.style,
        locale,
        content,
      }),
    });
    setStatus(res.ok ? 'Saved' : 'Could not save');
  };

  const draft: ResolvedSection = {
    key: props.sectionKey,
    enabled: current.enabled,
    order: current.order,
    style: current.style,
    heading: content.heading,
    items: content.items,
  };

  const itemFields = ITEM_FIELDS[current.itemKind];

  return (
    <div className="flex h-[calc(100dvh-3.25rem)]">
      {/* Inspector rail */}
      <aside className="flex w-100 shrink-0 flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3">
          <div>
            <h1 className="text-sm font-semibold text-gray-900">{current.label}</h1>
            <p className="text-xs text-gray-400">Editing {locale}</p>
          </div>
          <div className="flex items-center gap-3">
            {status ? <span className="text-xs text-gray-500">{status}</span> : null}
            <button
              type="button"
              className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white"
              onClick={() => {
                void save();
              }}
            >
              Save
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto" data-lenis-prevent>
          {/* Content */}
          <Panel title="Content" defaultOpen>
            <ContentPanelBody
              hints={hints}
              heading={content.heading}
              items={content.items}
              itemFields={itemFields}
              onHeading={patchHeading}
              onRotatingWords={patchRotatingWords}
              onItemField={patchItemField}
              onAddItem={() => {
                addItemTo(setSection, current, locale);
              }}
              onRemoveItem={(index) => {
                removeItemAt(setSection, current, locale, index);
              }}
            />
          </Panel>

          {/* Design */}
          <Panel title="Design">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Editing <span className="font-medium text-gray-700">{DEVICE_LABELS[device]}</span>
                {device === 'mobile' ? ' (base)' : ''}
              </span>
              {device === 'mobile' ? null : (
                <button
                  type="button"
                  className="text-xs font-medium text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    resetDevice();
                  }}
                >
                  Reset to inherit
                </button>
              )}
            </div>
            {device === 'mobile' ? null : (
              <p className="text-xs text-gray-400">
                Unset controls inherit from Mobile. Set only what changes at this breakpoint.
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              {renderToken('Alignment', 'align', ALIGN_OPTIONS)}
              {renderToken('Background', 'bgColor', BG_COLOR_OPTIONS)}
              {renderToken('Text colour', 'textColor', TEXT_COLOR_OPTIONS)}
              {renderToken('Title size', 'titleSize', TITLE_SIZE_OPTIONS)}
              {renderToken('Font family', 'fontFamily', FONT_FAMILY_OPTIONS)}
              {renderToken('Font weight', 'fontWeight', FONT_WEIGHT_OPTIONS)}
              {renderToken('Padding Y', 'paddingY', PADDING_Y_OPTIONS)}
              {renderToken('Padding X', 'paddingX', PADDING_X_OPTIONS)}
              {renderToken('Margin Y', 'marginY', MARGIN_Y_OPTIONS)}
              {renderToken('Corner radius', 'radius', RADIUS_OPTIONS)}
              {renderToken('Shadow', 'shadow', SHADOW_OPTIONS)}
              {renderToken('Columns', 'columns', COLUMNS_OPTIONS)}
              {renderToken('Gap', 'gap', GAP_OPTIONS)}
              {renderToken('Visibility', 'visibility', VISIBILITY_OPTIONS)}
            </div>
          </Panel>

          {/* Settings */}
          <Panel title="Settings">
            <label className="flex items-center gap-2 text-sm">
              <input
                aria-label="Visible"
                type="checkbox"
                checked={current.enabled}
                onChange={(event) => {
                  setSection({ ...current, enabled: event.target.checked });
                }}
              />
              Visible
            </label>
            <label className="block">
              <span className={labelClass}>Order</span>
              <input
                aria-label="Order"
                type="number"
                className="w-24 rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={current.order}
                onChange={(event) => {
                  setSection({ ...current, order: Number(event.target.value) });
                }}
              />
            </label>
            <label className="block">
              <span className={labelClass}>Language</span>
              <select
                aria-label="Language"
                className={inputClass}
                value={locale}
                onChange={(event) => {
                  setLocale(event.target.value);
                }}
              >
                {routing.locales.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </label>
            <p className="text-xs text-gray-400">
              Order and visibility apply to the live page after you save.
            </p>
          </Panel>
        </div>
      </aside>

      {/* Live preview */}
      <div className="min-w-0 flex-1">
        <SectionEditorPreview
          locale={locale}
          page={props.page}
          sectionKey={draft.key}
          device={device}
          draft={draft}
          onDeviceChange={setDevice}
        />
      </div>
    </div>
  );
};

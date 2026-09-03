import { describe, expect, it } from 'vitest';
import { normalizeSectionContent, SECTION_REGISTRY } from '@/libs/cms/Sections';
import type { CardStyleTokens } from '@/libs/cms/StyleTokens';
import { DEFAULT_RESPONSIVE_CARD_STYLE, normalizeCardStyle } from '@/libs/cms/StyleTokens';
import { sectionUpdateSchema } from './Section';

describe('sectionUpdateSchema', () => {
  it('accepts ecosystem card design settings', () => {
    const section = SECTION_REGISTRY.ecosystems;
    const result = sectionUpdateSchema.safeParse({
      enabled: true,
      order: section.defaultOrder,
      style: section.defaultStyle,
      locale: 'en',
      content: {
        ...section.defaultContent,
        items: section.defaultContent.items.map((item) => ({
          ...item,
          style: DEFAULT_RESPONSIVE_CARD_STYLE,
        })),
      },
    });

    expect(result.error?.issues).toBeUndefined();
  });

  it('accepts normalized legacy ecosystem card styles', () => {
    const section = SECTION_REGISTRY.ecosystems;
    const legacyBase: Partial<CardStyleTokens> = { ...DEFAULT_RESPONSIVE_CARD_STYLE.base };
    delete legacyBase.bodySize;
    delete legacyBase.bodyWeight;
    const style = normalizeCardStyle({
      base: legacyBase,
      tablet: { titleSize: 'h3' },
      laptop: { titleSize: 'h2' },
    });
    const content = normalizeSectionContent('ecosystems', {
      ...section.defaultContent,
      items: section.defaultContent.items.map((item) => ({
        ...item,
        style,
      })),
    });
    const result = sectionUpdateSchema.safeParse({
      enabled: true,
      order: section.defaultOrder,
      style: section.defaultStyle,
      locale: 'en',
      content,
    });

    expect(result.error?.issues).toBeUndefined();
    expect(content.items[0]?.style?.base.bodySize).toBe('xs');
    expect(content.items[0]?.style?.base.bodyWeight).toBe('normal');
    expect(content.items[0]?.style?.tablet?.bodySize).toBe('body');
    expect(content.items[0]?.style?.laptop?.titleSize).toBe('h2');
  });

  it('preserves reset card style overrides', () => {
    const style = normalizeCardStyle({ base: DEFAULT_RESPONSIVE_CARD_STYLE.base });

    expect(style.tablet).toBeUndefined();
  });
});

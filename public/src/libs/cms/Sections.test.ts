import { describe, expect, it } from 'vitest';
import { normalizeSectionContent } from './Sections';

describe(normalizeSectionContent, () => {
  it('converts legacy hero heading into editable slides', () => {
    const content = normalizeSectionContent('hero', {
      heading: {
        title: 'Bangladesh leading',
        description: 'Connected commerce',
        rotatingWords: ['Distribution partner', 'Credit partner'],
        ctaLabel: 'Join us',
        ctaHref: '/join',
      },
      items: [{ title: 'Existing slide' }],
    });

    expect(content.format).toBe('hero-slides-v2');
    expect(content.heading.title).toBe('Hero slides');
    expect(content.items).toHaveLength(3);
    expect(content.items[0]).toMatchObject({
      title: 'Bangladesh leading Distribution partner',
      accentWords: 'Distribution partner',
      accentGradientFrom: '#dc2626',
      accentGradientTo: '#f59e0b',
      ctaLabel: 'Join us',
      href: '/join',
    });
    expect(content.items[2]).toMatchObject({
      title: 'Existing slide',
      ctaLabel: 'Join us',
      href: '/join',
    });
  });

  it('preserves current hero slides', () => {
    const current = {
      heading: { title: 'Hero slides' },
      items: [{ title: 'Editable slide' }],
      format: 'hero-slides-v2' as const,
    };

    expect(normalizeSectionContent('hero', current)).toBe(current);
  });
});

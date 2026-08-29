import { describe, expect, it } from 'vitest';
import {
  DEFAULT_RESPONSIVE_SECTION_STYLE,
  makeDefaultStyle,
  resolveSectionStyle,
} from './StyleTokens';

describe(resolveSectionStyle, () => {
  it('returns no wrapper classes for default tokens', () => {
    const resolved = resolveSectionStyle(DEFAULT_RESPONSIVE_SECTION_STYLE);

    expect(resolved.wrapperClass).toBe('');
    expect(resolved.align).toBe('left');
    expect(resolved.titleColorClass).toBe('text-ps-black');
  });

  it('maps base tokens to brand Tailwind classes', () => {
    const resolved = resolveSectionStyle(
      makeDefaultStyle({ align: 'center', bgColor: 'black', textColor: 'white', paddingY: 'lg' }),
    );

    expect(resolved.wrapperClass).toContain('bg-ps-black');
    expect(resolved.wrapperClass).toContain('text-ps-white');
    expect(resolved.wrapperClass).toContain('py-14');
    expect(resolved.align).toBe('center');
    expect(resolved.titleColorClass).toBe('text-ps-white');
  });

  it('normalizes a legacy flat style as the base layer', () => {
    const resolved = resolveSectionStyle({
      align: 'center',
      bgColor: 'mint',
      textColor: 'black',
      paddingY: 'md',
    });

    expect(resolved.wrapperClass).toContain('bg-ps-mint');
    expect(resolved.align).toBe('center');
  });

  it('maps title size and margin tokens per device', () => {
    const resolved = resolveSectionStyle({
      base: { ...makeDefaultStyle().base, titleSize: 'md', marginY: 'sm' },
      laptop: { titleSize: 'xl', marginY: 'lg' },
    });

    expect(resolved.titleSizeClass).toContain('text-ps-h4');
    expect(resolved.titleSizeClass).toContain('lg:text-ps-h1');
    expect(resolved.wrapperClass).toContain('my-6');
    expect(resolved.wrapperClass).toContain('lg:my-20');
  });

  it('returns an empty title size class for default tokens', () => {
    const resolved = resolveSectionStyle(DEFAULT_RESPONSIVE_SECTION_STYLE);

    expect(resolved.titleSizeClass).toBe('');
  });

  it('maps theme-token colors and exact title sizes', () => {
    const resolved = resolveSectionStyle(
      makeDefaultStyle({ bgColor: 'peach', textColor: 'ink-700', titleSize: 'display' }),
    );

    expect(resolved.wrapperClass).toContain('bg-ps-peach');
    expect(resolved.wrapperClass).toContain('text-ps-ink-700');
    expect(resolved.titleSizeClass).toBe('text-ps-display');
    expect(resolved.titleColorClass).toBe('text-ps-ink-700');
  });

  it('maps font and horizontal padding tokens', () => {
    const resolved = resolveSectionStyle(
      makeDefaultStyle({ fontFamily: 'accent', fontWeight: 'bold', paddingX: 'md' }),
    );

    expect(resolved.wrapperClass).toContain('font-accent');
    expect(resolved.wrapperClass).toContain('font-bold');
    expect(resolved.wrapperClass).toContain('px-6');
  });

  it('maps radius and shadow tokens with per-device resets', () => {
    const resolved = resolveSectionStyle({
      base: { ...makeDefaultStyle().base, radius: 'lg', shadow: 'card' },
      laptop: { radius: 'none', shadow: 'none' },
    });

    expect(resolved.wrapperClass).toContain('rounded-ps-lg');
    expect(resolved.wrapperClass).toContain('shadow-ps-card');
    expect(resolved.wrapperClass).toContain('lg:rounded-none');
    expect(resolved.wrapperClass).toContain('lg:shadow-none');
  });

  it('emits prefixed classes for per-device overrides', () => {
    const resolved = resolveSectionStyle({
      base: { ...makeDefaultStyle().base, columns: '1' },
      desktop: { columns: '2', bgColor: 'cream', visibility: 'hide' },
    });

    expect(resolved.gridClass).toContain('grid-cols-1');
    expect(resolved.gridClass).toContain('xl:grid-cols-2');
    expect(resolved.wrapperClass).toContain('xl:bg-ps-cream');
    expect(resolved.wrapperClass).toContain('xl:hidden');
  });

  it('keeps per-device alignment overrides in the resolved classes', () => {
    const resolved = resolveSectionStyle({
      base: { ...makeDefaultStyle().base, align: 'left' },
      tablet: { align: 'center' },
      desktop: { align: 'left' },
    });

    expect(resolved.align).toBe('left');
    expect(resolved.alignClass).toContain('text-left');
    expect(resolved.alignClass).toContain('md:text-center');
    expect(resolved.alignClass).toContain('xl:text-left');
  });
});

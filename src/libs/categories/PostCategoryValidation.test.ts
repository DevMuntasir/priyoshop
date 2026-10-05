import { describe, expect, it } from 'vitest';
import { updateBlogPostSchema } from '@/libs/media/blogValidation';
import { updateNewsPostSchema } from '@/libs/news/newsValidation';

describe.each([
  { name: 'Blog category updates', schema: updateBlogPostSchema },
  { name: 'News category updates', schema: updateNewsPostSchema },
])('$name', ({ schema }) => {
  it('Accepts custom category names without a catalog restriction', () => {
    expect(schema.safeParse({ categories: ['New category', 'ব্যবসা'] }).success).toBeTruthy();
  });

  it('Accepts category updates with an empty optional translation', () => {
    const result = schema.safeParse({
      categories: ['New category'],
      content: {
        en: { title: 'Example post', excerpt: '', contentHtml: '' },
        bn: { title: '', excerpt: '', contentHtml: '', metaTitle: '', metaDescription: '' },
      },
    });
    expect(result.success).toBeTruthy();
  });

  it('Rejects an empty English title', () => {
    expect(
      schema.safeParse({ content: { en: { title: '', excerpt: '', contentHtml: '' } } }).success,
    ).toBeFalsy();
  });

  it('Normalizes null SEO fields while saving categories in both locales', () => {
    const content = {
      title: 'Example post',
      excerpt: '',
      contentHtml: '',
      metaTitle: null,
      metaDescription: null,
    };
    const result = schema.parse({
      categories: ['New category'],
      content: { en: content, bn: { ...content, title: '' } },
    });
    expect(result.categories).toStrictEqual(['New category']);
    expect(result.content?.en.metaTitle).toBe('');
    expect(result.content?.en.metaDescription).toBe('');
    expect(result.content?.bn?.metaTitle).toBe('');
    expect(result.content?.bn?.metaDescription).toBe('');
  });

  it('Preserves SEO text and rejects invalid values', () => {
    const content = { title: 'Example post', excerpt: '', contentHtml: '' };
    const result = schema.parse({
      content: { en: { ...content, metaTitle: 'SEO title', metaDescription: 'SEO description' } },
    });
    expect(result.content?.en.metaTitle).toBe('SEO title');
    expect(result.content?.en.metaDescription).toBe('SEO description');
    for (const seo of [
      { metaTitle: 123 },
      { metaDescription: false },
      { metaTitle: 'x'.repeat(71) },
      { metaDescription: 'x'.repeat(161) },
    ]) {
      expect(schema.safeParse({ content: { en: { ...content, ...seo } } }).success).toBeFalsy();
    }
  });

  it('Rejects oversized category arrays and names', () => {
    expect(
      schema.safeParse({
        categories: Array.from({ length: 11 }, (_, index) => `Category ${index}`),
      }).success,
    ).toBeFalsy();
    expect(schema.safeParse({ categories: ['x'.repeat(41)] }).success).toBeFalsy();
  });
});

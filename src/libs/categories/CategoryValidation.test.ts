import { describe, expect, it } from 'vitest';
import { categoryScopeSchema, createCategorySchema } from './CategoryValidation';

describe('Category validation', () => {
  it('Normalizes surrounding and repeated whitespace', () => {
    expect(createCategorySchema.parse({ name: '  Supply   chain  ' })).toStrictEqual({
      name: 'Supply chain',
    });
  });

  it('Preserves Unicode category names', () => {
    expect(createCategorySchema.parse({ name: 'ব্যবসা' }).name).toBe('ব্যবসা');
  });

  it('Rejects empty and oversized category names', () => {
    for (const name of ['', '   ', 'a'.repeat(41)]) {
      expect(createCategorySchema.safeParse({ name }).success).toBeFalsy();
    }
  });

  it('Restricts categories to blog and news scopes', () => {
    expect(categoryScopeSchema.safeParse('blog').success).toBeTruthy();
    expect(categoryScopeSchema.safeParse('news').success).toBeTruthy();
    expect(categoryScopeSchema.safeParse('career').success).toBeFalsy();
  });
});

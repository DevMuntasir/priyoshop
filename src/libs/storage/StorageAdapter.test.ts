import { describe, expect, it } from 'vitest';
import { LocalStorageAdapter } from './LocalStorageAdapter';
import { getStorageAdapter } from './StorageFactory';

describe('StorageAdapter', () => {
  describe('LocalStorageAdapter', () => {
    it('generates consistent URL paths', () => {
      const adapter = new LocalStorageAdapter();
      expect(adapter.provider).toBe('local');
      expect(adapter.getUrl('general/sample-123.webp')).toBe('/uploads/general/sample-123.webp');
    });

    it('preserves existing absolute URLs', () => {
      const adapter = new LocalStorageAdapter();
      expect(adapter.getUrl('https://example.com/image.png')).toBe('https://example.com/image.png');
      expect(adapter.getUrl('/custom/path.png')).toBe('/custom/path.png');
    });
  });

  describe('StorageFactory', () => {
    it('resolves active adapter instance', () => {
      const adapter = getStorageAdapter();
      expect(adapter).toBeDefined();
      expect(['cloudinary', 's3', 'local']).toContain(adapter.provider);
    });
  });
});

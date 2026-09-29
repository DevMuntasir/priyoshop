import fs from 'node:fs/promises';
import path from 'node:path';
import type { StorageAdapter, StorageProvider, StoredAsset, TransformOptions, UploadOptions } from './StorageAdapter';

/**
 * Local filesystem storage adapter.
 * Saves assets to public/uploads directory for local development and offline environments.
 */
export class LocalStorageAdapter implements StorageAdapter {
  readonly provider: StorageProvider = 'local';
  private readonly uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'public', 'uploads');
  }

  async upload(buffer: Buffer, options: UploadOptions): Promise<StoredAsset> {
    const folder = options.folder ? options.folder.toLowerCase().replace(/[^a-z0-9_-]/gu, '-') : 'general';
    const ext = path.extname(options.filename).replace(/^\./u, '') || 'bin';
    const base = path.basename(options.filename, path.extname(options.filename)).replace(/[^a-z0-9_-]/giu, '-').toLowerCase();
    const timestamp = Date.now();
    const safeFilename = `${base}-${timestamp}.${ext}`;
    const targetDir = path.join(this.uploadDir, folder);

    await fs.mkdir(targetDir, { recursive: true });
    const targetPath = path.join(targetDir, safeFilename);
    await fs.writeFile(targetPath, buffer);

    const relativeUrl = `/uploads/${folder}/${safeFilename}`;
    const providerKey = `${folder}/${safeFilename}`;

    return {
      url: relativeUrl,
      secureUrl: relativeUrl,
      provider: 'local',
      providerKey,
      format: ext,
      sizeBytes: buffer.length,
    };
  }

  async delete(providerKey: string): Promise<boolean> {
    try {
      const filePath = path.join(this.uploadDir, providerKey);
      await fs.unlink(filePath);
      return true;
    } catch {
      return false;
    }
  }

  getUrl(providerKey: string, options?: TransformOptions): string {
    if (providerKey.startsWith('/') || providerKey.startsWith('http')) {
      return providerKey;
    }
    const base = `/uploads/${providerKey}`;
    if (!options) {
      return base;
    }
    return base;
  }
}

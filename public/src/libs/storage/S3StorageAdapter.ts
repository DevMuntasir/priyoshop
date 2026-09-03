import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Env } from '@/libs/Env';
import type { StorageAdapter, StorageProvider, StoredAsset, TransformOptions, UploadOptions } from './StorageAdapter';

/**
 * Generic S3-compatible storage adapter.
 * Compatible with AWS S3, Cloudflare R2, MinIO, DigitalOcean Spaces, and custom self-hosted cloud storage.
 */
export class S3StorageAdapter implements StorageAdapter {
  readonly provider: StorageProvider = 's3';
  private readonly client: S3Client | null = null;
  private readonly bucket: string;
  private readonly publicDomain: string;

  constructor() {
    this.bucket = Env.S3_BUCKET || '';
    this.publicDomain = Env.S3_PUBLIC_DOMAIN || '';

    if (Env.S3_ACCESS_KEY_ID && Env.S3_SECRET_ACCESS_KEY) {
      this.client = new S3Client({
        region: Env.S3_REGION || 'auto',
        endpoint: Env.S3_ENDPOINT || undefined,
        credentials: {
          accessKeyId: Env.S3_ACCESS_KEY_ID,
          secretAccessKey: Env.S3_SECRET_ACCESS_KEY,
        },
      });
    }
  }

  async upload(buffer: Buffer, options: UploadOptions): Promise<StoredAsset> {
    if (!this.client || !this.bucket) {
      throw new Error('S3 client is not configured. Required: S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY.');
    }

    const folder = options.folder ? options.folder.toLowerCase().replace(/[^a-z0-9_-]/gu, '-') : 'general';
    const ext = options.filename.split('.').pop()?.toLowerCase() || 'bin';
    const baseName = options.filename.replace(/\.[^/.]+$/u, '').replace(/[^a-z0-9_-]/giu, '-').toLowerCase();
    const key = `${folder}/${baseName}-${Date.now()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: options.mimeType || 'application/octet-stream',
    });

    await this.client.send(command);

    const publicUrl = this.publicDomain
      ? `${this.publicDomain.replace(/\/$/u, '')}/${key}`
      : `https://${this.bucket}.s3.amazonaws.com/${key}`;

    return {
      url: publicUrl,
      secureUrl: publicUrl,
      provider: 's3',
      providerKey: key,
      format: ext,
      sizeBytes: buffer.length,
    };
  }

  async delete(providerKey: string): Promise<boolean> {
    if (!this.client || !this.bucket) {
      return false;
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: providerKey,
      });
      await this.client.send(command);
      return true;
    } catch {
      return false;
    }
  }

  getUrl(providerKey: string, options?: TransformOptions): string {
    if (!providerKey) {
      return '';
    }

    if (providerKey.startsWith('http')) {
      return providerKey;
    }

    const url = this.publicDomain
      ? `${this.publicDomain.replace(/\/$/u, '')}/${providerKey}`
      : `https://${this.bucket}.s3.amazonaws.com/${providerKey}`;

    if (!options) {
      return url;
    }

    return url;
  }
}

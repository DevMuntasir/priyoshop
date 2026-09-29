/**
 * Storage adapter interface and domain types.
 *
 * Implements the Adapter / Strategy Pattern to enable hot-swapping between
 * Cloudinary, AWS S3 / MinIO / R2, and local disk storage without affecting CMS
 * services or frontend consumers.
 */

export type StorageProvider = 'cloudinary' | 's3' | 'local';

export type UploadOptions = {
  filename: string;
  folder?: string;
  mimeType?: string;
  tags?: string[];
  alt?: string;
};

export type StoredAsset = {
  url: string;
  secureUrl: string;
  provider: StorageProvider;
  providerKey: string;
  format: string;
  sizeBytes: number;
  width?: number;
  height?: number;
};

export type TransformOptions = {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'scale' | 'thumb' | 'crop';
  gravity?: 'auto' | 'face' | 'center';
  format?: 'auto' | 'webp' | 'avif' | 'png' | 'jpg';
  quality?: 'auto' | 'best' | 'good' | 'eco' | 'low' | number;
};

export interface StorageAdapter {
  readonly provider: StorageProvider;

  /**
   * Uploads a file buffer to the underlying storage provider.
   * @param buffer Raw file buffer.
   * @param options Upload configuration and metadata.
   * @returns Stored asset details including public URL and dimensions.
   */
  upload(buffer: Buffer, options: UploadOptions): Promise<StoredAsset>;

  /**
   * Deletes a file from the underlying storage provider.
   * @param providerKey Provider-specific identifier (e.g. Cloudinary public_id or S3 key).
   * @returns True when successfully deleted or not found.
   */
  delete(providerKey: string): Promise<boolean>;

  /**
   * Generates a CDN delivery URL with optional on-the-fly transformations.
   * @param providerKey Provider-specific identifier or existing URL.
   * @param options Optional resizing, crop, and quality adjustments.
   * @returns Resolved delivery URL.
   */
  getUrl(providerKey: string, options?: TransformOptions): string;
}

import type { UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { Env } from '@/libs/Env';
import type { StorageAdapter, StorageProvider, StoredAsset, TransformOptions, UploadOptions } from './StorageAdapter';

/**
 * Cloudinary storage adapter.
 * Handles optimized image and video uploads, URL generation with automatic WebP/AVIF format
 * conversion (f_auto, q_auto), and resource deletion.
 */
export class CloudinaryAdapter implements StorageAdapter {
  readonly provider: StorageProvider = 'cloudinary';
  private readonly rootFolder: string;

  constructor() {
    this.rootFolder = Env.CLOUDINARY_FOLDER || 'priyoshop';

    if (Env.CLOUDINARY_CLOUD_NAME && Env.CLOUDINARY_API_KEY && Env.CLOUDINARY_API_SECRET) {
      cloudinary.config({
        cloud_name: Env.CLOUDINARY_CLOUD_NAME,
        api_key: Env.CLOUDINARY_API_KEY,
        api_secret: Env.CLOUDINARY_API_SECRET,
        secure: true,
      });
    }
  }

  async upload(buffer: Buffer, options: UploadOptions): Promise<StoredAsset> {
    if (!Env.CLOUDINARY_CLOUD_NAME || !Env.CLOUDINARY_API_KEY || !Env.CLOUDINARY_API_SECRET) {
      throw new Error('Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing.');
    }

    const folderName = options.folder ? options.folder.toLowerCase().replace(/[^a-z0-9_-]/gu, '-') : 'general';
    const targetFolder = `${this.rootFolder}/${folderName}`;
    const filenameNoExt = options.filename.replace(/\.[^/.]+$/u, '').replace(/[^a-z0-9_-]/giu, '-').toLowerCase();
    const publicId = `${filenameNoExt}-${Date.now()}`;
    const fileExt = options.filename.split('.').pop()?.toLowerCase() || '';
    const isSvg = fileExt === 'svg' || options.mimeType === 'image/svg+xml';
    const isVideo = options.mimeType?.startsWith('video/') || fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'mov';
    const resourceType: 'image' | 'video' = isVideo ? 'video' : 'image';

    const uploadOptions: Record<string, unknown> = {
      folder: targetFolder,
      public_id: publicId,
      resource_type: resourceType,
      tags: options.tags,
      overwrite: false,
    };

    if (isSvg) {
      uploadOptions.format = 'svg';
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            return reject(error ?? new Error('Upload to Cloudinary failed with empty result.'));
          }

          const format = isSvg ? 'svg' : (result.format || fileExt || 'webp');

          resolve({
            url: result.secure_url,
            secureUrl: result.secure_url,
            provider: 'cloudinary',
            providerKey: result.public_id,
            format,
            sizeBytes: result.bytes,
            width: result.width,
            height: result.height,
          });
        },
      );

      uploadStream.end(buffer);
    });
  }

  async delete(providerKey: string): Promise<boolean> {
    if (!Env.CLOUDINARY_CLOUD_NAME || !Env.CLOUDINARY_API_KEY || !Env.CLOUDINARY_API_SECRET) {
      return false;
    }

    try {
      const imgResult = (await cloudinary.uploader.destroy(providerKey, {
        resource_type: 'image',
        invalidate: true,
      })) as { result?: string };

      if (imgResult.result === 'ok') return true;

      const rawResult = (await cloudinary.uploader.destroy(providerKey, {
        resource_type: 'raw',
        invalidate: true,
      })) as { result?: string };

      if (rawResult.result === 'ok') return true;

      const videoResult = (await cloudinary.uploader.destroy(providerKey, {
        resource_type: 'video',
        invalidate: true,
      })) as { result?: string };

      return videoResult.result === 'ok' || videoResult.result === 'not found';
    } catch {
      return false;
    }
  }

  getUrl(providerKey: string, options?: TransformOptions): string {
    if (!providerKey) {
      return '';
    }

    // If it's already a full URL and no transform needed
    if (providerKey.startsWith('http') && !options) {
      return providerKey;
    }

    const transformation: Record<string, unknown> = {
      fetch_format: options?.format ?? 'auto',
      quality: options?.quality ?? 'auto',
    };

    if (options?.width) {
      transformation.width = options.width;
    }
    if (options?.height) {
      transformation.height = options.height;
    }
    if (options?.crop) {
      transformation.crop = options.crop;
    }
    if (options?.gravity) {
      transformation.gravity = options.gravity;
    }

    return cloudinary.url(providerKey, {
      secure: true,
      transformation: [transformation],
    });
  }
}

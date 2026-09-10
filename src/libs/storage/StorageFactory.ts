import { Env } from '@/libs/Env';
import { CloudinaryAdapter } from './CloudinaryAdapter';
import { LocalStorageAdapter } from './LocalStorageAdapter';
import { S3StorageAdapter } from './S3StorageAdapter';
import type { StorageAdapter } from './StorageAdapter';

let cachedAdapter: StorageAdapter | null = null;

/**
 * Returns the configured storage adapter according to STORAGE_PROVIDER environment setting.
 * @returns The active StorageAdapter instance.
 */
export const getStorageAdapter = (): StorageAdapter => {
  if (cachedAdapter) {
    return cachedAdapter;
  }

  const provider = Env.STORAGE_PROVIDER;

  switch (provider) {
    case 'cloudinary':
      cachedAdapter = new CloudinaryAdapter();
      break;
    case 's3':
      cachedAdapter = new S3StorageAdapter();
      break;
    case 'local':
    default:
      cachedAdapter = new LocalStorageAdapter();
      break;
  }

  return cachedAdapter;
};

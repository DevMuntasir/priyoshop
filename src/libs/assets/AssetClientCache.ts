'use client';

import { adminFetch } from '@/libs/auth/AdminFetch';
import type { AssetListResult } from '@/libs/assets/Types';

const CACHE_TTL_MS = 5 * 60 * 1000;

type CacheEntry = {
  data: AssetListResult;
  expiresAt: number;
};

type PendingEntry = {
  promise: Promise<AssetListResult>;
  version: number;
};

const cache = new Map<string, CacheEntry>();
const pendingRequests = new Map<string, PendingEntry>();
let cacheVersion = 0;

/** Fetches an asset list while reusing fresh results and matching in-flight requests. */
export function getAssetList(url: string, options?: { force?: boolean }) {
  const cached = cache.get(url);
  if (!options?.force && cached && cached.expiresAt > Date.now()) {
    return Promise.resolve(cached.data);
  }

  const pending = pendingRequests.get(url);
  if (pending?.version === cacheVersion) {
    return pending.promise;
  }

  const requestVersion = cacheVersion;
  const promise = adminFetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error('Failed to load assets.');
      }

      const data = (await response.json()) as AssetListResult;
      if (requestVersion === cacheVersion) {
        cache.set(url, {
          data,
          expiresAt: Date.now() + CACHE_TTL_MS,
        });
      }
      return data;
    })
    .finally(() => {
      if (pendingRequests.get(url)?.version === requestVersion) {
        pendingRequests.delete(url);
      }
    });

  pendingRequests.set(url, { promise, version: requestVersion });
  return promise;
}

/** Invalidates cached asset queries after the library changes. */
export function invalidateAssetListCache() {
  cacheVersion += 1;
  cache.clear();
  pendingRequests.clear();
}

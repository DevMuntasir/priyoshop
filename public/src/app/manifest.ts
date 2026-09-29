import type { MetadataRoute } from 'next';
import { AppConfig } from '@/utils/AppConfig';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: AppConfig.name,
    short_name: AppConfig.name,
    description: AppConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#EE2F47',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

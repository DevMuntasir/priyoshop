import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';
import { routing } from '@/libs/I18nRouting';
import { AppConfig } from '@/utils/AppConfig';
import { getBaseUrl } from '@/utils/Helpers';
import '@/styles/global.css';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    metadataBase: new URL(getBaseUrl()),
    applicationName: AppConfig.name,
    title: {
      default: AppConfig.title,
      template: `%s | ${AppConfig.name}`,
    },
    description: AppConfig.description,
    openGraph: {
      type: 'website',
      siteName: AppConfig.name,
      title: AppConfig.title,
      description: AppConfig.description,
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      ...(AppConfig.twitterHandle ? { site: `@${AppConfig.twitterHandle}` } : {}),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    manifest: '/manifest.webmanifest',
    icons: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <NextIntlClientProvider>{props.children}</NextIntlClientProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

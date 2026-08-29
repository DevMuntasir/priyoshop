'use client';

import { useEffect, useRef, useState } from 'react';
import { routing } from '@/libs/I18nRouting';
import type { PageKey } from '@/libs/cms/Pages';
import type { ResolvedSection, SectionKey } from '@/libs/cms/Sections';
import { DEVICES } from '@/libs/cms/StyleTokens';
import type { Device } from '@/libs/cms/StyleTokens';

// Representative viewport widths; the iframe's own viewport drives Tailwind
// breakpoints, so the preview reflects each device accurately.
const DEVICE_WIDTH: Record<Device, string> = {
  mobile: '390px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '100%',
};

const DEVICE_LABELS: Record<Device, string> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  laptop: 'Laptop',
  desktop: 'Desktop',
};

const previewPath = (locale: string, page: PageKey, key: SectionKey): string => {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${prefix}/preview/${page}?focus=${key}`;
};

// WordPress Customizer-style live preview: an iframe of the real page with the
// edited section in context, plus a device-width switcher. Pushes the in-progress
// draft to the preview over same-origin postMessage on every change.
export function SectionEditorPreview(props: {
  locale: string;
  page: PageKey;
  sectionKey: SectionKey;
  device: Device;
  draft: ResolvedSection;
  onDeviceChange: (device: Device) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  // The preview signals readiness so we only post once it can receive.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const { data }: { data: unknown } = event;
      if (
        event.origin === window.location.origin &&
        typeof data === 'object' &&
        data !== null &&
        'type' in data &&
        data.type === 'cms-preview-ready'
      ) {
        setReady(true);
      }
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  // A fresh navigation (locale/section change) resets the ready handshake.
  useEffect(() => {
    setReady(false);
  }, [props.locale, props.page, props.sectionKey]);

  // Push the latest draft whenever it changes and the preview is listening.
  useEffect(() => {
    if (!ready) {
      return;
    }
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'cms-preview-update', sectionKey: props.sectionKey, section: props.draft },
      window.location.origin,
    );
  }, [ready, props.draft, props.sectionKey]);

  // Scroll the edited section into view once the preview is ready.
  useEffect(() => {
    if (!ready) {
      return;
    }
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'cms-preview-scroll', sectionKey: props.sectionKey },
      window.location.origin,
    );
  }, [ready, props.sectionKey]);

  return (
    <div className="flex h-full flex-col bg-gray-100">
      <div className="flex items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-2">
        <span className="text-xs font-medium text-gray-500">Live preview</span>
        <div className="flex gap-1">
          {DEVICES.map((option) => (
            <button
              key={option}
              type="button"
              className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                props.device === option
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => {
                props.onDeviceChange(option);
              }}
            >
              {DEVICE_LABELS[option]}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-1 justify-center overflow-auto p-4">
        <div
          className="h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-[width] duration-200"
          style={{ width: DEVICE_WIDTH[props.device] }}
        >
          <iframe
            ref={iframeRef}
            src={previewPath(props.locale, props.page, props.sectionKey)}
            title="Section preview"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

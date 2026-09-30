'use client';

import { useEffect, useRef, useState } from 'react';
import { routing } from '@/libs/I18nRouting';
import type { PageKey } from '@/libs/cms/Pages';
import type { ResolvedSection, SectionKey } from '@/libs/cms/Sections';
import { DEVICES } from '@/libs/cms/StyleTokens';
import type { Device } from '@/libs/cms/StyleTokens';

type DevicePreviewConfig = {
  label: string;
  viewportLabel: string;
  viewportWidth: number;
  viewportHeight: number;
  frameWidth: number;
  frameHeight: number;
  screenLeft: number;
  screenTop: number;
  screenBorderRadius: number;
};

// These are CSS viewport pixels, which determine responsive breakpoints. The
// surrounding hardware scales to fit without changing the iframe viewport.
const DEVICE_CONFIG: Record<Device, DevicePreviewConfig> = {
  mobile: {
    label: 'Mobile',
    viewportLabel: '390 x 844 CSS px',
    viewportWidth: 390,
    viewportHeight: 844,
    frameWidth: 418,
    frameHeight: 872,
    screenLeft: 14,
    screenTop: 14,
    screenBorderRadius: 39;
  },
  tablet: {
    label: 'Tablet',
    viewportLabel: '768 x 1024 CSS px',
    viewportWidth: 768,
    viewportHeight: 1024,
    frameWidth: 800,
    frameHeight: 1056,
    screenLeft: 16,
    screenTop: 16,
    screenBorderRadius: 22;
  },
  laptop: {
    label: 'Laptop',
    viewportLabel: '14-inch, 1024 x 640 CSS px',
    viewportWidth: 1024,
    viewportHeight: 640,
    frameWidth: 1112,
    frameHeight: 706,
    screenLeft: 44,
    screenTop: 18,
    screenBorderRadius: 2;
  },
  desktop: {
    label: 'Desktop',
    viewportLabel: '24-inch, 1440 x 900 CSS px',
    viewportWidth: 1440,
    viewportHeight: 900,
    frameWidth: 1484,
    frameHeight: 1080,
    screenLeft: 22,
    screenTop: 22,
    screenBorderRadius: 2;
  },
};

const previewPath = (locale: string, page: PageKey, key: SectionKey): string => {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  return `${prefix}/preview/${page}?focus=${key}`;
};

function DeviceChassis(props: { device: Device }) {
  if (props.device === 'mobile') {
    return (
      <>
        <div className="absolute inset-0 rounded-[52px] bg-gray-950 shadow-[0_24px_55px_rgba(15,23,42,0.25)] ring-1 ring-black/30" />
        <div className="absolute top-[14px] left-1/2 z-20 h-[27px] w-[116px] -translate-x-1/2 rounded-b-[18px] bg-gray-950" />
        <div className="absolute top-[22px] left-1/2 z-30 h-[5px] w-[38px] -translate-x-1/2 rounded-full bg-gray-700" />
        <div className="absolute bottom-[20px] left-1/2 z-30 h-[5px] w-[124px] -translate-x-1/2 rounded-full bg-black/65" />
      </>
    );
  }

  if (props.device === 'tablet') {
    return (
      <>
        <div className="absolute inset-0 rounded-[36px] bg-gray-900 shadow-[0_24px_55px_rgba(15,23,42,0.22)] ring-1 ring-black/25" />
        <div className="absolute top-[5px] left-1/2 z-30 size-[6px] -translate-x-1/2 rounded-full bg-gray-600 ring-1 ring-black/40" />
      </>
    );
  }

  if (props.device === 'laptop') {
    return (
      <>
        <div className="absolute top-0 left-[24px] h-[680px] w-[1064px] rounded-t-[18px] bg-gray-900 shadow-[0_24px_55px_rgba(15,23,42,0.2)] ring-1 ring-black/25" />
        <div className="absolute top-[7px] left-1/2 z-30 size-[6px] -translate-x-1/2 rounded-full bg-gray-600 ring-1 ring-black/40" />
        <div className="absolute top-[676px] left-0 h-[24px] w-full rounded-b-[14px] bg-linear-to-b from-gray-300 to-gray-400 shadow-[0_16px_24px_rgba(15,23,42,0.18)]" />
        <div className="absolute top-[676px] left-1/2 z-20 h-[8px] w-[150px] -translate-x-1/2 rounded-b-lg bg-gray-500/70" />
      </>
    );
  }

  return (
    <>
      <div className="absolute top-0 left-0 h-[944px] w-full rounded-[20px] bg-gray-900 shadow-[0_24px_55px_rgba(15,23,42,0.22)] ring-1 ring-black/25" />
      <div className="absolute top-[925px] left-1/2 z-30 size-[7px] -translate-x-1/2 rounded-full bg-gray-500" />
      <div className="absolute top-[944px] left-1/2 h-[96px] w-[116px] -translate-x-1/2 bg-linear-to-r from-gray-300 via-gray-100 to-gray-300" />
      <div className="absolute top-[1028px] left-1/2 h-[28px] w-[390px] -translate-x-1/2 rounded-[50%] bg-linear-to-b from-gray-200 to-gray-400 shadow-[0_14px_22px_rgba(15,23,42,0.2)]" />
    </>
  );
}

// WordPress Customizer-style live preview of the real page. Draft changes are
// sent to the iframe over same-origin postMessage without saving first.
export function SectionEditorPreview(props: {
  locale: string;
  page: PageKey;
  sectionKey: SectionKey;
  device: Device;
  draft: ResolvedSection;
  onDeviceChange: (device: Device) => void;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const previewAreaRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [scale, setScale] = useState(1);
  const config = DEVICE_CONFIG[props.device];

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

  useEffect(() => {
    const previewArea = previewAreaRef.current;
    if (!previewArea) {
      return undefined;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }
      const widthScale = entry.contentRect.width / config.frameWidth;
      const heightScale = entry.contentRect.height / config.frameHeight;
      setScale(Math.max(0.1, Math.min(widthScale, heightScale, 1)));
    });
    observer.observe(previewArea);
    return () => {
      observer.disconnect();
    };
  }, [config.frameHeight, config.frameWidth]);

  // A fresh navigation resets the ready handshake.
  useEffect(() => {
    setReady(false);
  }, [props.locale, props.page, props.sectionKey]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'cms-preview-update', sectionKey: props.sectionKey, section: props.draft },
      window.location.origin,
    );
  }, [ready, props.draft, props.sectionKey]);

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
    <div className="flex h-full min-h-0 flex-col bg-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-2">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-700">Live preview</p>
          <p className="truncate text-[11px] text-gray-400" aria-live="polite">
            {config.viewportLabel}
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Preview device"
          className="flex max-w-full gap-1 overflow-x-auto rounded-lg bg-gray-100 p-1"
        >
          {DEVICES.map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={props.device === option}
              className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                props.device === option
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              }`}
              onClick={() => {
                props.onDeviceChange(option);
              }}
            >
              {DEVICE_CONFIG[option].label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={previewAreaRef}
        className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-4 sm:p-6"
      >
        <div
          className="relative shrink-0 transition-[width,height] duration-200"
          style={{
            width: config.frameWidth * scale,
            height: config.frameHeight * scale,
          }}
        >
          <div
            className="absolute top-0 left-0 origin-top-left transition-transform duration-200"
            style={{
              width: config.frameWidth,
              height: config.frameHeight,
              transform: `scale(${scale})`,
            }}
          >
            <DeviceChassis device={props.device} />
            <div
              className="absolute z-10 overflow-hidden bg-white ring-1 ring-black/20"
              style={{
                left: config.screenLeft,
                top: config.screenTop,
                width: config.viewportWidth,
                height: config.viewportHeight,
                borderRadius: config.screenBorderRadius,
              }}
            >
              <iframe
                ref={iframeRef}
                src={previewPath(props.locale, props.page, props.sectionKey)}
                title={`${config.label} section preview at ${config.viewportLabel}`}
                className="block border-0 bg-white"
                style={{ width: config.viewportWidth, height: config.viewportHeight }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

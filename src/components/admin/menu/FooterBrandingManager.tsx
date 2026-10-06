'use client';

import Image from 'next/image';
import { MediaInput } from '@/components/admin/assets/MediaInput';
import type { FooterSettings, FooterSocialLink } from '@/libs/builder/Types';

const SOCIAL_PLATFORMS: {
  label: string;
  value: FooterSocialLink['platform'];
  path: string;
}[] = [
  {
    label: 'X (Twitter)',
    value: 'x',
    path: 'M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z',
  },
  {
    label: 'Instagram',
    value: 'instagram',
    path: 'M12 0C8.741 0 8.332.014 7.052.072 5.775.131 4.903.333 4.14.63a5.8 5.8 0 0 0-2.096 1.365A5.8 5.8 0 0 0 .68 4.09C.382 4.854.18 5.726.121 7.003.063 8.284.049 8.693.049 11.952c0 3.259.014 3.668.072 4.948.059 1.277.261 2.149.558 2.913a5.8 5.8 0 0 0 1.365 2.096 5.8 5.8 0 0 0 2.096 1.365c.764.297 1.636.499 2.913.558 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c1.277-.059 2.149-.261 2.913-.558a5.8 5.8 0 0 0 2.096-1.365 5.8 5.8 0 0 0 1.365-2.096c.297-.764.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.949c-.059-1.277-.261-2.149-.558-2.913a5.8 5.8 0 0 0-1.365-2.096A5.8 5.8 0 0 0 19.86.63c-.764-.297-1.636-.499-2.913-.558C15.668.014 15.259 0 12 0Zm0 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.413.56.218.96.478 1.38.898.42.42.68.82.898 1.38.164.422.36 1.057.413 2.227.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.413 2.227-.218.56-.478.96-.898 1.38-.42.42-.82.68-1.38.898-.422.164-1.057.36-2.227.413-1.265.058-1.645.07-4.85.07s-3.585-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.413a3.7 3.7 0 0 1-1.38-.898 3.7 3.7 0 0 1-.898-1.38c-.164-.422-.36-1.057-.413-2.227-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.054-1.17.249-1.805.413-2.227.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.422-.164 1.057-.36 2.227-.413 1.265-.058 1.645-.07 4.85-.07Zm0 3.678a6.159 6.159 0 1 0 0 12.318 6.159 6.159 0 0 0 0-12.318ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin',
    path: 'M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z',
  },
  {
    label: 'Facebook',
    value: 'facebook',
    path: 'M12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12C24 5.37264 18.6274 0 12 0Z',
  },
];

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

function getPlatformIconPath(platform: FooterSocialLink['platform']): string {
  return SOCIAL_PLATFORMS.find((p) => p.value === platform)?.path ?? '';
}

/**
 * Visual editor for footer brand logo and social media profiles.
 */
export function FooterBrandingManager(props: {
  settings: FooterSettings;
  onChange: (settings: FooterSettings) => void;
}) {
  const updateSocialLink = (id: string, updates: Partial<FooterSocialLink>) => {
    props.onChange({
      ...props.settings,
      socialLinks: props.settings.socialLinks.map((link) =>
        link.id === id ? { ...link, ...updates } : link
      ),
    });
  };

  const addSocialLink = () => {
    props.onChange({
      ...props.settings,
      socialLinks: [
        ...props.settings.socialLinks,
        {
          id: generateId(),
          platform: 'x',
          label: 'X',
          href: 'https://x.com',
        },
      ],
    });
  };

  const removeSocialLink = (id: string) => {
    props.onChange({
      ...props.settings,
      socialLinks: props.settings.socialLinks.filter((link) => link.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* Brand Logo Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-display text-base font-bold text-gray-900">
              Footer Brand Logo
            </h3>
            <p className="font-body text-xs text-gray-500">
              Upload a custom white/light logo or leave empty to use the built-in PriyoShop logo.
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 font-mono text-[11px] font-medium text-gray-700">
            Brand Asset
          </span>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <MediaInput
              label="Logo Image URL / Media Asset"
              value={props.settings.logoUrl}
              onChange={(logoUrl) => {
                props.onChange({ ...props.settings, logoUrl });
              }}
              defaultFolder="footer"
            />

            <div>
              <label className="block font-body text-xs font-semibold text-gray-700">
                Logo Alternative Text (for SEO & Accessibility)
              </label>
              <input
                type="text"
                value={props.settings.logoAlt}
                onChange={(e) => {
                  props.onChange({ ...props.settings, logoAlt: e.target.value });
                }}
                placeholder="PriyoShop"
                className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 font-body text-sm text-gray-900 outline-none transition focus:border-ps-red-500 focus:ring-2 focus:ring-ps-red-100"
              />
            </div>
          </div>

          {/* Live Logo Dark Preview Box */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#0f1115] p-6 text-white shadow-inner">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-gray-400">Footer Preview</span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300">
                Dark Canvas
              </span>
            </div>

            <div className="my-8 flex items-center justify-center">
              {props.settings.logoUrl ? (
                <div className="relative h-12 w-48">
                  <Image
                    src={props.settings.logoUrl}
                    alt={props.settings.logoAlt || 'Footer Logo'}
                    fill
                    sizes="192px"
                    unoptimized
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-bold tracking-tight text-white">
                    Priyo<span className="text-ps-red-500">Shop</span>
                  </span>
                  <span className="rounded-md border border-white/20 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/50">
                    Default Built-in
                  </span>
                </div>
              )}
            </div>

            <p className="text-center font-body text-xs text-white/50">
              Alternative text: &quot;{props.settings.logoAlt || 'PriyoShop'}&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Links Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="font-display text-base font-bold text-gray-900">
              Social Media Profiles
            </h3>
            <p className="font-body text-xs text-gray-500">
              Manage the circular profile buttons rendered next to the footer logo.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              addSocialLink();
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-3.5 py-2 font-display text-xs font-semibold text-white shadow-xs transition hover:bg-gray-800"
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Profile
          </button>
        </div>

        {props.settings.socialLinks.length === 0 ? (
          <div className="py-8 text-center">
            <p className="font-body text-xs text-gray-400">
              No social profiles added yet. Click above to add X, Instagram, LinkedIn, or Facebook.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {props.settings.socialLinks.map((link) => {
              const iconPath = getPlatformIconPath(link.platform);

              return (
                <div
                  key={link.id}
                  className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3.5 shadow-2xs transition hover:border-gray-300 sm:p-4"
                >
                  {/* Platform Icon Badge */}
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white shadow-xs">
                    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d={iconPath} />
                    </svg>
                  </div>

                  {/* Platform Select */}
                  <div className="w-36 shrink-0">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Platform
                    </label>
                    <select
                      value={link.platform}
                      onChange={(e) => {
                        const platform = e.target.value as FooterSocialLink['platform'];
                        const defaultLabel =
                          SOCIAL_PLATFORMS.find((p) => p.value === platform)?.label ?? platform;
                        updateSocialLink(link.id, {
                          platform,
                          label: defaultLabel,
                        });
                      }}
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-2.5 py-1.5 font-body text-xs font-semibold text-gray-900 outline-none focus:border-ps-red-500"
                    >
                      {SOCIAL_PLATFORMS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Accessible Label */}
                  <div className="min-w-[140px] flex-1">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Accessible Label
                    </label>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        updateSocialLink(link.id, { label: e.target.value });
                      }}
                      placeholder="e.g. Follow on LinkedIn"
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-1.5 font-body text-xs text-gray-900 outline-none focus:border-ps-red-500"
                    />
                  </div>

                  {/* Profile URL */}
                  <div className="min-w-[200px] flex-2">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                      Profile URL
                    </label>
                    <input
                      type="url"
                      value={link.href}
                      onChange={(e) => {
                        updateSocialLink(link.id, { href: e.target.value });
                      }}
                      placeholder="https://..."
                      className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-1.5 font-body text-xs text-gray-900 outline-none focus:border-ps-red-500"
                    />
                  </div>

                  {/* Remove Button */}
                  <div className="self-end pb-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        removeSocialLink(link.id);
                      }}
                      className="rounded-xl border border-gray-200 p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                      title="Remove profile"
                      aria-label="Remove profile"
                    >
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Live Social Button Icons Preview */}
        {props.settings.socialLinks.length > 0 && (
          <div className="mt-6 rounded-2xl bg-[#0f1115] p-5 text-white">
            <span className="block font-mono text-[11px] text-gray-400">
              Live Footer Icon Buttons Preview
            </span>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {props.settings.socialLinks.map((link) => {
                const iconPath = getPlatformIconPath(link.platform);
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 hover:text-ps-red-500"
                  >
                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d={iconPath} />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

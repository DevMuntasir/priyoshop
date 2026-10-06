'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSpinner } from '@/components/admin/AdminSpinner';
import { HeaderMenuManager } from '@/components/admin/menu/HeaderMenuManager';
import { FooterColumnsManager } from '@/components/admin/menu/FooterColumnsManager';
import { FooterBrandingManager } from '@/components/admin/menu/FooterBrandingManager';
import { MenuToast } from '@/components/admin/menu/MenuToast';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { defaultFooterSettings } from '@/libs/builder/FooterMenuDefaults';
import type { BuilderPageDoc, FooterSettings, MenuItem } from '@/libs/builder/Types';

type MenuTab = 'header' | 'footer-columns' | 'footer-branding';

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<MenuTab>('header');
  const [headerItems, setHeaderItems] = useState<MenuItem[]>([]);
  const [footerItems, setFooterItems] = useState<MenuItem[]>([]);
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(defaultFooterSettings);
  const [pages, setPages] = useState<BuilderPageDoc[]>([]);

  // Snapshot JSON strings for dirty checking
  const [savedHeaderJson, setSavedHeaderJson] = useState('');
  const [savedFooterJson, setSavedFooterJson] = useState('');
  const [savedSettingsJson, setSavedSettingsJson] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load menu data and published builder pages
  useEffect(() => {
    const loadAll = async () => {
      try {
        const [headerRes, footerRes, pagesRes] = await Promise.all([
          adminFetch('/api/admin/menu'),
          adminFetch('/api/admin/footer-menu'),
          adminFetch('/api/admin/builder-pages'),
        ]);

        const headerData = (await headerRes.json()) as { menu: { items: MenuItem[] } };
        const footerData = (await footerRes.json()) as {
          menu: { items: MenuItem[]; settings?: FooterSettings };
        };
        const pagesData = (await pagesRes.json()) as { pages: BuilderPageDoc[] };

        const loadedHeader = headerData.menu?.items ?? [];
        const loadedFooter = footerData.menu?.items ?? [];
        const loadedSettings = footerData.menu?.settings ?? defaultFooterSettings;

        setHeaderItems(loadedHeader);
        setFooterItems(loadedFooter);
        setFooterSettings(loadedSettings);

        setSavedHeaderJson(JSON.stringify(loadedHeader));
        setSavedFooterJson(JSON.stringify(loadedFooter));
        setSavedSettingsJson(JSON.stringify(loadedSettings));

        // Published pages only
        const publishedPages = (pagesData.pages ?? []).filter((p) => p.status === 'published');
        setPages(publishedPages);
      } catch (error) {
        console.error('Failed to load menu data:', error);
        setToast({ message: 'Failed to load navigation data.', type: 'error' });
      } finally {
        setIsLoading(false);
      }
    };

    void loadAll();
  }, []);

  // Dirty states
  const isHeaderDirty = JSON.stringify(headerItems) !== savedHeaderJson;
  const isFooterColumnsDirty = JSON.stringify(footerItems) !== savedFooterJson;
  const isFooterSettingsDirty = JSON.stringify(footerSettings) !== savedSettingsJson;
  const isFooterDirty = isFooterColumnsDirty || isFooterSettingsDirty;
  const hasAnyChanges = isHeaderDirty || isFooterDirty;

  const currentTabDirty =
    activeTab === 'header'
      ? isHeaderDirty
      : activeTab === 'footer-columns'
        ? isFooterColumnsDirty
        : isFooterSettingsDirty;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (activeTab === 'header' || isHeaderDirty) {
        const response = await adminFetch('/api/admin/menu', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: headerItems }),
        });

        if (!response.ok) {
          throw new Error('Failed to save header menu');
        }

        setSavedHeaderJson(JSON.stringify(headerItems));
      }

      if (activeTab !== 'header' || isFooterDirty) {
        const response = await adminFetch('/api/admin/footer-menu', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: footerItems,
            settings: footerSettings,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save footer menu');
        }

        setSavedFooterJson(JSON.stringify(footerItems));
        setSavedSettingsJson(JSON.stringify(footerSettings));
      }

      setToast({
        message:
          activeTab === 'header'
            ? 'Header navigation saved successfully!'
            : 'Footer navigation and settings saved successfully!',
        type: 'success',
      });
    } catch (error) {
      console.error('Save failed:', error);
      setToast({ message: 'Failed to save changes. Please try again.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (hasAnyChanges && !isSaving) {
          void handleSave();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasAnyChanges, isSaving, headerItems, footerItems, footerSettings, activeTab]);

  if (isLoading) {
    return <AdminSpinner fullHeight label="Loading navigation data…" />;
  }

  return (
    <main className="space-y-6 pb-16">
      {/* Sticky Admin Page Header */}
      <AdminPageHeader
        title="Navigation & Menus"
        description="Configure header navbar, dropdown mega-menus, footer link columns, and social media profiles."
        backHref="/admin"
        action={
          <div className="flex flex-wrap items-center gap-3">
            {/* Dirty Status Badge */}
            {hasAnyChanges ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-body text-xs font-semibold text-amber-700">
                <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                Unsaved changes
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-body text-xs font-semibold text-emerald-700">
                <svg className="size-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                All saved
              </span>
            )}

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 font-display text-xs font-semibold text-gray-700 shadow-2xs transition hover:bg-gray-50 hover:text-gray-900"
            >
              <span>Live Site</span>
              <svg className="size-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </Link>

            {/* Save Button */}
            <button
              type="button"
              onClick={() => {
                void handleSave();
              }}
              disabled={isSaving || !hasAnyChanges}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 font-display text-xs font-semibold shadow-xs transition ${
                hasAnyChanges
                  ? 'bg-ps-red-500 text-white hover:bg-ps-red-600 active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSaving ? (
                <>
                  <AdminSpinner size="sm" tone="white" />
                  <span>Saving…</span>
                </>
              ) : (
                <>
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <span>
                    {currentTabDirty
                      ? activeTab === 'header'
                        ? 'Save Header'
                        : 'Save Footer'
                      : hasAnyChanges
                        ? 'Save All Changes'
                        : 'Saved'}
                  </span>
                </>
              )}
            </button>
          </div>
        }
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Modern Segmented Navigation Tabs */}
        <div
          className="flex flex-wrap items-center gap-2 rounded-2xl border border-gray-200 bg-gray-100/80 p-1.5"
          role="tablist"
          aria-label="Navigation configuration sections"
        >
          {/* Header Tab */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'header'}
            onClick={() => {
              setActiveTab('header');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-display text-xs font-bold transition ${
              activeTab === 'header'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="size-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <span>Header Navigation</span>
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                activeTab === 'header' ? 'bg-gray-100 text-gray-800' : 'bg-gray-200/80 text-gray-600'
              }`}
            >
              {headerItems.length}
            </span>
            {isHeaderDirty && (
              <span className="size-2 rounded-full bg-amber-500" title="Unsaved changes in header" />
            )}
          </button>

          {/* Footer Columns Tab */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'footer-columns'}
            onClick={() => {
              setActiveTab('footer-columns');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-display text-xs font-bold transition ${
              activeTab === 'footer-columns'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="size-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <span>Footer Columns</span>
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                activeTab === 'footer-columns'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-gray-200/80 text-gray-600'
              }`}
            >
              {footerItems.length}
            </span>
            {isFooterColumnsDirty && (
              <span className="size-2 rounded-full bg-amber-500" title="Unsaved changes in footer columns" />
            )}
          </button>

          {/* Footer Branding & Socials Tab */}
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'footer-branding'}
            onClick={() => {
              setActiveTab('footer-branding');
            }}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-display text-xs font-bold transition ${
              activeTab === 'footer-branding'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="size-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
            </svg>
            <span>Footer Branding & Socials</span>
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                activeTab === 'footer-branding'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-gray-200/80 text-gray-600'
              }`}
            >
              {footerSettings.socialLinks.length}
            </span>
            {isFooterSettingsDirty && (
              <span className="size-2 rounded-full bg-amber-500" title="Unsaved changes in branding settings" />
            )}
          </button>
        </div>

        {/* Tab 1: Header Navigation */}
        {activeTab === 'header' && (
          <HeaderMenuManager
            items={headerItems}
            onChange={setHeaderItems}
            pages={pages}
          />
        )}

        {/* Tab 2: Footer Columns */}
        {activeTab === 'footer-columns' && (
          <FooterColumnsManager
            columns={footerItems}
            onChange={setFooterItems}
            pages={pages}
          />
        )}

        {/* Tab 3: Footer Branding & Socials */}
        {activeTab === 'footer-branding' && (
          <FooterBrandingManager
            settings={footerSettings}
            onChange={setFooterSettings}
          />
        )}
      </div>

      {/* Floating Status Toast */}
      {toast && (
        <MenuToast
          message={toast.message}
          type={toast.type}
          onDismiss={() => {
            setToast(null);
          }}
        />
      )}
    </main>
  );
}

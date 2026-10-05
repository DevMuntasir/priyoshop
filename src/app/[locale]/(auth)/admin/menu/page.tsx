'use client';

import { useState, useEffect } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSpinner } from '@/components/admin/AdminSpinner';
import { FooterSettingsEditor } from '@/components/admin/builder/FooterSettingsEditor';
import { MenuBuilder } from '@/components/admin/builder/MenuBuilder';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { defaultFooterSettings } from '@/libs/builder/FooterMenuDefaults';
import type { FooterSettings, MenuItem } from '@/libs/builder/Types';

export default function MenuPage() {
  const [activeMenu, setActiveMenu] = useState<'header' | 'footer'>('header');
  const [headerItems, setHeaderItems] = useState<MenuItem[]>([]);
  const [footerItems, setFooterItems] = useState<MenuItem[]>([]);
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(defaultFooterSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const [headerResponse, footerResponse] = await Promise.all([
          adminFetch('/api/admin/menu'),
          adminFetch('/api/admin/footer-menu'),
        ]);
        const headerData = (await headerResponse.json()) as { menu: { items: MenuItem[] } };
        const footerData = (await footerResponse.json()) as {
          menu: { items: MenuItem[]; settings?: FooterSettings };
        };
        setHeaderItems(headerData.menu.items);
        setFooterItems(footerData.menu.items);
        setFooterSettings(footerData.menu.settings ?? defaultFooterSettings);
      } catch (error) {
        console.error('Failed to load menu:', error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadMenu();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const items = activeMenu === 'header' ? headerItems : footerItems;
      const response = await adminFetch(
        activeMenu === 'header' ? '/api/admin/menu' : '/api/admin/footer-menu',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            activeMenu === 'footer' ? { items, settings: footerSettings } : { items }
          ),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      // eslint-disable-next-line no-alert
      alert(`${activeMenu === 'header' ? 'Header menu' : 'Footer'} saved successfully!`);
    } catch (error) {
      console.error('Save failed:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to save menu');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <AdminSpinner fullHeight label="Loading menus…" />;
  }

  const items = activeMenu === 'header' ? headerItems : footerItems;
  const setItems = activeMenu === 'header' ? setHeaderItems : setFooterItems;

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title="Menu Builder"
        description="Manage the links shown in the public header and footer."
        backHref="/admin"
      />

      <div
        className="flex w-fit gap-1 rounded-full bg-ps-grey-100 p-1"
        role="tablist"
        aria-label="Menu location"
      >
        {(['header', 'footer'] as const).map((menu) => (
          <button
            key={menu}
            type="button"
            role="tab"
            aria-selected={activeMenu === menu}
            className={`min-h-10 rounded-full px-5 font-body text-sm font-semibold capitalize transition-colors ${
              activeMenu === menu ? 'bg-black text-white' : 'text-ps-ink-700 hover:bg-white'
            }`}
            onClick={() => setActiveMenu(menu)}
          >
            {menu}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            void handleSave();
          }}
          disabled={isSaving}
        >
          {isSaving ? (
            <span className="inline-flex items-center gap-2">
              <AdminSpinner size="sm" tone="white" />
              Saving…
            </span>
          ) : (
            activeMenu === 'header' ? 'Save header menu' : 'Save footer'
          )}
        </Button>
        <Text size="sm" className="text-ps-ink-600">
          {items.length} {activeMenu === 'footer' ? 'columns' : 'items'}
        </Text>
      </div>

      {activeMenu === 'footer' && (
        <FooterSettingsEditor settings={footerSettings} onSettingsChange={setFooterSettings} />
      )}

      <div className="space-y-4">
        {activeMenu === 'footer' && (
          <div>
            <h2 className="font-body text-lg font-semibold text-ps-ink-900">Footer columns</h2>
            <Text size="sm" className="text-ps-ink-600">
              Manage the link groups displayed beside the footer logo.
            </Text>
          </div>
        )}
        <MenuBuilder
          key={activeMenu}
          items={items}
          onItemsChange={setItems}
          mode={activeMenu === 'footer' ? 'footer' : 'navigation'}
        />
      </div>
    </main>
  );
}

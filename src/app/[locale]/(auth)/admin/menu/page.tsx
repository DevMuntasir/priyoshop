'use client';

import { useState, useEffect } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { MenuBuilder } from '@/components/admin/builder/MenuBuilder';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { MenuItem } from '@/libs/builder/Types';

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const response = await adminFetch('/api/admin/menu');
        const data = (await response.json()) as { menu: { items: MenuItem[] } };
        setItems(data.menu.items);
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
      const response = await adminFetch('/api/admin/menu', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Failed to save');
      }

      // eslint-disable-next-line no-alert
      alert('Menu saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      // eslint-disable-next-line no-alert
      alert('Failed to save menu');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <main className="space-y-6">
      <AdminPageHeader
        title="Menu Builder"
        description="Manage your site's navigation menu"
      />

      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            void handleSave();
          }}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Menu'}
        </Button>
        <Text size="sm" className="text-ps-ink-600">
          {items.length} items
        </Text>
      </div>

      <MenuBuilder items={items} onItemsChange={setItems} />
    </main>
  );
}

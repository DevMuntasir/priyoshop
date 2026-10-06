'use client';

import { useState, useEffect } from 'react';
import { HeaderMenuManager } from '@/components/admin/menu/HeaderMenuManager';
import { FooterColumnsManager } from '@/components/admin/menu/FooterColumnsManager';
import { adminFetch } from '@/libs/auth/AdminFetch';
import type { BuilderPageDoc, MenuItem } from '@/libs/builder/Types';

export type MenuBuilderProps = {
  items: MenuItem[];
  onItemsChange: (items: MenuItem[]) => void;
  mode?: 'navigation' | 'footer';
};

export function MenuBuilder(props: MenuBuilderProps) {
  const [pages, setPages] = useState<BuilderPageDoc[]>([]);

  useEffect(() => {
    const loadPages = async () => {
      try {
        const response = await adminFetch('/api/admin/builder-pages');
        const data = (await response.json()) as { pages: BuilderPageDoc[] };
        const publishedPages = (data.pages ?? []).filter((p) => p.status === 'published');
        setPages(publishedPages);
      } catch (error) {
        console.error('Failed to load pages:', error);
      }
    };

    void loadPages();
  }, []);

  if (props.mode === 'footer') {
    return (
      <FooterColumnsManager
        columns={props.items}
        onChange={props.onItemsChange}
        pages={pages}
      />
    );
  }

  return (
    <HeaderMenuManager
      items={props.items}
      onChange={props.onItemsChange}
      pages={pages}
    />
  );
}

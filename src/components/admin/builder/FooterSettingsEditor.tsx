'use client';

import { FooterBrandingManager } from '@/components/admin/menu/FooterBrandingManager';
import type { FooterSettings } from '@/libs/builder/Types';

export function FooterSettingsEditor(props: {
  settings: FooterSettings;
  onSettingsChange: (settings: FooterSettings) => void;
}) {
  return (
    <FooterBrandingManager
      settings={props.settings}
      onChange={props.onSettingsChange}
    />
  );
}

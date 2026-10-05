'use client';

import { MediaInput } from '@/components/admin/assets/MediaInput';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Text } from '@/components/ui/Text';
import type { FooterSettings, FooterSocialLink } from '@/libs/builder/Types';

const platformOptions: { label: string; value: FooterSocialLink['platform'] }[] = [
  { label: 'X', value: 'x' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Facebook', value: 'facebook' },
];

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

function isSocialPlatform(value: string): value is FooterSocialLink['platform'] {
  return platformOptions.some((option) => option.value === value);
}

export function FooterSettingsEditor(props: {
  settings: FooterSettings;
  onSettingsChange: (settings: FooterSettings) => void;
}) {
  const updateSocialLink = (id: string, updates: Partial<FooterSocialLink>) => {
    props.onSettingsChange({
      ...props.settings,
      socialLinks: props.settings.socialLinks.map((link) =>
        link.id === id ? { ...link, ...updates } : link
      ),
    });
  };

  const addSocialLink = () => {
    props.onSettingsChange({
      ...props.settings,
      socialLinks: [
        ...props.settings.socialLinks,
        { id: generateId(), platform: 'x', label: 'X', href: '' },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <Card padding="md" border>
        <div className="space-y-4">
          <div>
            <Text weight="semibold">Footer logo</Text>
            <Text size="sm" className="text-ps-ink-600">
              Leave the image empty to use the built-in PriyoShop logo.
            </Text>
          </div>
          <MediaInput
            label="Logo image"
            value={props.settings.logoUrl}
            onChange={(logoUrl) => props.onSettingsChange({ ...props.settings, logoUrl })}
            defaultFolder="footer"
          />
          <Input
            label="Logo alternative text"
            type="text"
            value={props.settings.logoAlt}
            onChange={(event) =>
              props.onSettingsChange({ ...props.settings, logoAlt: event.target.value })
            }
            placeholder="Logo alternative text"
          />
        </div>
      </Card>

      <Card padding="md" border>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Text weight="semibold">Social links</Text>
              <Text size="sm" className="text-ps-ink-600">
                Add the profiles that should appear beside the footer logo.
              </Text>
            </div>
            <Button size="sm" onClick={addSocialLink}>
              Add Social Link
            </Button>
          </div>

          {props.settings.socialLinks.length === 0 ? (
            <Text size="sm" className="text-ps-ink-600">
              No social links added.
            </Text>
          ) : (
            <div className="space-y-3">
              {props.settings.socialLinks.map((link) => (
                <div
                  key={link.id}
                  className="grid gap-3 rounded-ps-md border border-ps-grey-200 p-4 lg:grid-cols-[10rem_1fr_2fr_auto] lg:items-end"
                >
                  <label className="space-y-1">
                    <span className="block text-xs font-semibold text-ps-ink-700">Platform</span>
                    <select
                      value={link.platform}
                      onChange={(event) => {
                        const platform = event.target.value;
                        if (!isSocialPlatform(platform)) {
                          return;
                        }
                        const label = platformOptions.find((option) => option.value === platform)?.label;
                        updateSocialLink(link.id, { platform, label: label ?? link.label });
                      }}
                      className="min-h-11 w-full rounded-ps-sm border border-ps-grey-300 bg-white px-3 font-body text-sm"
                    >
                      {platformOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <Input
                    label="Accessible label"
                    type="text"
                    value={link.label}
                    onChange={(event) => updateSocialLink(link.id, { label: event.target.value })}
                    placeholder="Accessible label"
                  />
                  <Input
                    label="Profile URL"
                    type="url"
                    value={link.href}
                    onChange={(event) => updateSocialLink(link.id, { href: event.target.value })}
                    placeholder="https://example.com/profile"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    tone="dark"
                    onClick={() =>
                      props.onSettingsChange({
                        ...props.settings,
                        socialLinks: props.settings.socialLinks.filter((item) => item.id !== link.id),
                      })
                    }
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

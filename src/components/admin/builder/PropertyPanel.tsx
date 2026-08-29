'use client';

import { COMPONENT_REGISTRY } from '@/libs/builder/ComponentRegistry';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import { Stack } from '@/components/ui/Grid';
import { Input } from '@/components/ui/Input';
import type { Block } from '@/libs/builder/Types';

export type PropertyPanelProps = {
  block: Block | null;
  onPropsChange: (props: Record<string, unknown>) => void;
};

export function PropertyPanel({ block, onPropsChange }: PropertyPanelProps) {
  if (!block) {
    return (
      <div className="h-full bg-ps-grey-100 p-4 flex items-center justify-center">
        <Text size="sm" className="text-ps-ink-600">
          Select a block to edit
        </Text>
      </div>
    );
  }

  const entry = COMPONENT_REGISTRY[block.type];
  if (!entry) {
    return (
      <div className="h-full bg-ps-grey-100 p-4">
        <Text size="sm" className="text-ps-red-500">
          Unknown component type: {block.type}
        </Text>
      </div>
    );
  }

  const handlePropChange = (key: string, value: unknown) => {
    onPropsChange({
      ...block.props,
      [key]: value,
    });
  };

  return (
    <div className="h-full overflow-y-auto bg-ps-grey-100 p-4 space-y-4">
      <div>
        <Text size="sm" weight="bold">
          {block.type}
        </Text>
        <Text size="xs" className="text-ps-ink-600">
          {block.id}
        </Text>
      </div>

      <Card padding="md">
        <Stack gap="md">
          {Object.entries(entry.fields).map(([key, field]) => (
            <div key={key}>
              <label className="block text-ps-sm font-semibold mb-2">
                {field.label}
              </label>

              {field.type === 'text' && (
                <Input
                  type="text"
                  value={String(block.props[key] ?? '')}
                  onChange={(e) => {
                    handlePropChange(key, e.target.value);
                  }}
                  placeholder={field.label}
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  className="w-full p-2 border border-ps-grey-300 rounded-ps-sm font-body text-ps-body"
                  value={String(block.props[key] ?? '')}
                  onChange={(e) => {
                    handlePropChange(key, e.target.value);
                  }}
                  placeholder={field.label}
                  rows={3}
                />
              )}

              {field.type === 'number' && (
                <Input
                  type="number"
                  value={Number(block.props[key] ?? 0)}
                  onChange={(e) => {
                    handlePropChange(key, parseInt(e.target.value, 10));
                  }}
                />
              )}

              {field.type === 'boolean' && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(block.props[key])}
                    onChange={(e) => {
                      handlePropChange(key, e.target.checked);
                    }}
                  />
                  <span>{field.label}</span>
                </label>
              )}

              {field.type === 'select' && field.options && (
                <select
                  className="w-full p-2 border border-ps-grey-300 rounded-ps-sm font-body text-ps-body"
                  value={String(block.props[key] ?? '')}
                  onChange={(e) => {
                    handlePropChange(key, e.target.value);
                  }}
                >
                  <option value="">Select...</option>
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'image' && (
                <Input
                  type="text"
                  value={String(block.props[key] ?? '')}
                  onChange={(e) => {
                    handlePropChange(key, e.target.value);
                  }}
                  placeholder="Image URL"
                />
              )}
            </div>
          ))}
        </Stack>
      </Card>
    </div>
  );
}

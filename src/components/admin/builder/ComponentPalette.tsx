'use client';

import { COMPONENT_REGISTRY } from '@/libs/builder/ComponentRegistry';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';

export type ComponentPaletteProps = {
  onDragStart: (type: string) => void;
};

const CATEGORIES = {
  Layout: ['Container', 'Grid', 'Stack'],
  Content: ['Heading', 'Text', 'Image', 'Card'],
  Components: ['Button', 'Badge', 'Icon', 'IconButton', 'Logo', 'StoreButton'],
  Advanced: ['SectionHeading', 'MetricStat', 'RollingNumber', 'MediaCard'],
};

export function ComponentPalette({ onDragStart }: ComponentPaletteProps) {
  return (
    <div className="h-full overflow-y-auto bg-ps-grey-100 p-4 space-y-4">
      <div>
        <Text size="sm" weight="bold" className="mb-2 px-2">
          Components
        </Text>
      </div>

      {Object.entries(CATEGORIES).map(([category, types]) => (
        <div key={category}>
          <Text
            size="xs"
            weight="semibold"
            className="mb-2 px-2 text-ps-ink-600"
          >
            {category}
          </Text>
          <div className="space-y-2">
            {types.map((type) => {
              const entry = COMPONENT_REGISTRY[type];
              if (!entry) return null;

              return (
                <Card
                  key={type}
                  padding="sm"
                  border
                  shadow={false}
                  className="bg-ps-white cursor-move hover:shadow-md transition-shadow"
                  draggable
                  onDragStart={() => onDragStart(type)}
                >
                  <Text size="sm" weight="semibold">
                    {type}
                  </Text>
                  {entry.isContainer && (
                    <Text size="xs" className="text-ps-ink-500">
                      Container
                    </Text>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

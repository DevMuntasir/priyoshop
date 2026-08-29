import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import { IconButton } from '@/components/ui/IconButton';
import { Logo } from '@/components/ui/Logo';
import { StoreButton } from '@/components/ui/StoreButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MetricStat } from '@/components/ui/MetricStat';
import { RollingNumber } from '@/components/ui/RollingNumber';
import { MediaCard } from '@/components/ui/MediaCard';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Grid, Stack } from '@/components/ui/Grid';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Image } from '@/components/ui/Image';

export type FieldType = 'text' | 'textarea' | 'image' | 'select' | 'boolean' | 'number';

export type FieldSchema = {
  label: string;
  type: FieldType;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  defaultValue?: unknown;
};

export type ComponentEntry = {
  component: React.ComponentType<any>;
  fields: Record<string, FieldSchema>;
  isContainer: boolean;
  allowedChildren?: string[];
  defaultProps: Record<string, unknown>;
};

export const COMPONENT_REGISTRY: Record<string, ComponentEntry> = {
  Container: {
    component: Container,
    isContainer: true,
    defaultProps: {
      bg: 'ps-white',
      paddingY: 'md',
      maxWidth: 'xl',
    },
    fields: {
      bg: {
        label: 'Background Color',
        type: 'select',
        options: [
          { label: 'White', value: 'ps-white' },
          { label: 'Grey 100', value: 'ps-grey-100' },
          { label: 'Black', value: 'ps-black' },
          { label: 'Cream', value: 'ps-cream' },
          { label: 'Warm White', value: 'ps-warm-white' },
        ],
      },
      paddingY: {
        label: 'Vertical Padding',
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
          { label: 'XL', value: 'xl' },
        ],
      },
      maxWidth: {
        label: 'Max Width',
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
          { label: 'XL', value: 'xl' },
          { label: 'Full', value: 'full' },
        ],
      },
    },
  },

  Grid: {
    component: Grid,
    isContainer: true,
    defaultProps: {
      columns: 2,
      gap: 'md',
    },
    fields: {
      columns: {
        label: 'Columns',
        type: 'select',
        options: [
          { label: '1', value: '1' },
          { label: '2', value: '2' },
          { label: '3', value: '3' },
          { label: '4', value: '4' },
          { label: '6', value: '6' },
        ],
      },
      gap: {
        label: 'Gap',
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
    },
  },

  Stack: {
    component: Stack,
    isContainer: true,
    defaultProps: {
      direction: 'column',
      align: 'start',
      gap: 'md',
      wrap: false,
    },
    fields: {
      direction: {
        label: 'Direction',
        type: 'select',
        options: [
          { label: 'Row', value: 'row' },
          { label: 'Column', value: 'column' },
        ],
      },
      align: {
        label: 'Alignment',
        type: 'select',
        options: [
          { label: 'Start', value: 'start' },
          { label: 'Center', value: 'center' },
          { label: 'End', value: 'end' },
          { label: 'Stretch', value: 'stretch' },
        ],
      },
      gap: {
        label: 'Gap',
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
      wrap: {
        label: 'Wrap',
        type: 'boolean',
      },
    },
  },

  Heading: {
    component: Heading,
    isContainer: false,
    defaultProps: {
      level: 1,
      align: 'left',
      color: 'ps-black',
      children: 'Heading',
    },
    fields: {
      children: {
        label: 'Text',
        type: 'text',
      },
      level: {
        label: 'Level',
        type: 'select',
        options: [
          { label: 'H1', value: '1' },
          { label: 'H2', value: '2' },
          { label: 'H3', value: '3' },
          { label: 'H4', value: '4' },
          { label: 'H5', value: '5' },
          { label: 'H6', value: '6' },
        ],
      },
      align: {
        label: 'Alignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },
      color: {
        label: 'Color',
        type: 'select',
        options: [
          { label: 'Black', value: 'ps-black' },
          { label: 'Ink 900', value: 'ps-ink-900' },
          { label: 'White', value: 'ps-white' },
          { label: 'Red 500', value: 'ps-red-500' },
        ],
      },
    },
  },

  Text: {
    component: Text,
    isContainer: false,
    defaultProps: {
      size: 'body',
      color: 'ps-ink-600',
      align: 'left',
      weight: 'normal',
      children: 'Text content',
    },
    fields: {
      children: {
        label: 'Text',
        type: 'textarea',
      },
      size: {
        label: 'Size',
        type: 'select',
        options: [
          { label: 'XS', value: 'xs' },
          { label: 'Small', value: 'sm' },
          { label: 'Body', value: 'body' },
          { label: 'Lead', value: 'lead' },
        ],
      },
      color: {
        label: 'Color',
        type: 'select',
        options: [
          { label: 'Black', value: 'ps-black' },
          { label: 'Ink 600', value: 'ps-ink-600' },
          { label: 'Ink 900', value: 'ps-ink-900' },
          { label: 'White', value: 'ps-white' },
          { label: 'Red 500', value: 'ps-red-500' },
        ],
      },
      align: {
        label: 'Alignment',
        type: 'select',
        options: [
          { label: 'Left', value: 'left' },
          { label: 'Center', value: 'center' },
          { label: 'Right', value: 'right' },
        ],
      },
      weight: {
        label: 'Weight',
        type: 'select',
        options: [
          { label: 'Normal', value: 'normal' },
          { label: 'Semibold', value: 'semibold' },
          { label: 'Bold', value: 'bold' },
        ],
      },
    },
  },

  Image: {
    component: Image,
    isContainer: false,
    defaultProps: {
      src: '',
      alt: 'Image',
      rounded: 'md',
      objectFit: 'cover',
    },
    fields: {
      src: {
        label: 'Image URL',
        type: 'image',
        required: true,
      },
      alt: {
        label: 'Alt Text',
        type: 'text',
      },
      rounded: {
        label: 'Border Radius',
        type: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
          { label: 'Full', value: 'full' },
        ],
      },
      objectFit: {
        label: 'Object Fit',
        type: 'select',
        options: [
          { label: 'Cover', value: 'cover' },
          { label: 'Contain', value: 'contain' },
          { label: 'Fill', value: 'fill' },
          { label: 'Scale Down', value: 'scale-down' },
        ],
      },
    },
  },

  Card: {
    component: Card,
    isContainer: true,
    defaultProps: {
      padding: 'md',
      bg: 'ps-white',
      border: false,
      shadow: true,
      rounded: 'md',
    },
    fields: {
      padding: {
        label: 'Padding',
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
      bg: {
        label: 'Background',
        type: 'select',
        options: [
          { label: 'White', value: 'ps-white' },
          { label: 'Grey 100', value: 'ps-grey-100' },
          { label: 'Cream', value: 'ps-cream' },
          { label: 'Warm White', value: 'ps-warm-white' },
        ],
      },
      border: {
        label: 'Show Border',
        type: 'boolean',
      },
      shadow: {
        label: 'Show Shadow',
        type: 'boolean',
      },
      rounded: {
        label: 'Border Radius',
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
    },
  },

  Button: {
    component: Button,
    isContainer: false,
    defaultProps: {
      children: 'Click me',
      variant: 'filled',
      tone: 'dark',
      size: 'md',
    },
    fields: {
      children: {
        label: 'Label',
        type: 'text',
      },
      variant: {
        label: 'Variant',
        type: 'select',
        options: [
          { label: 'Filled', value: 'filled' },
          { label: 'Outlined', value: 'outlined' },
          { label: 'Ghost', value: 'ghost' },
        ],
      },
      tone: {
        label: 'Tone',
        type: 'select',
        options: [
          { label: 'Dark', value: 'dark' },
          { label: 'Light', value: 'light' },
          { label: 'Brand', value: 'brand' },
        ],
      },
      size: {
        label: 'Size',
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
    },
  },

  Badge: {
    component: Badge,
    isContainer: false,
    defaultProps: {
      children: 'Badge',
      variant: 'filled',
      tone: 'light',
    },
    fields: {
      children: {
        label: 'Text',
        type: 'text',
      },
      variant: {
        label: 'Variant',
        type: 'select',
        options: [
          { label: 'Filled', value: 'filled' },
          { label: 'Outlined', value: 'outlined' },
        ],
      },
      tone: {
        label: 'Tone',
        type: 'select',
        options: [
          { label: 'Dark', value: 'dark' },
          { label: 'Light', value: 'light' },
          { label: 'Brand', value: 'brand' },
        ],
      },
    },
  },

  Icon: {
    component: Icon,
    isContainer: false,
    defaultProps: {
      name: 'star',
      size: 'md',
    },
    fields: {
      name: {
        label: 'Icon Name',
        type: 'text',
      },
      size: {
        label: 'Size',
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
    },
  },

  IconButton: {
    component: IconButton,
    isContainer: false,
    defaultProps: {
      icon: 'menu',
      size: 'md',
    },
    fields: {
      icon: {
        label: 'Icon Name',
        type: 'text',
      },
      size: {
        label: 'Size',
        type: 'select',
        options: [
          { label: 'Small', value: 'sm' },
          { label: 'Medium', value: 'md' },
          { label: 'Large', value: 'lg' },
        ],
      },
    },
  },

  Logo: {
    component: Logo,
    isContainer: false,
    defaultProps: {
      width: 140,
      tone: 'default',
    },
    fields: {
      width: {
        label: 'Width',
        type: 'number',
      },
      tone: {
        label: 'Tone',
        type: 'select',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Light', value: 'light' },
        ],
      },
    },
  },

  StoreButton: {
    component: StoreButton,
    isContainer: false,
    defaultProps: {
      children: 'Visit Store',
      href: '#',
    },
    fields: {
      children: {
        label: 'Label',
        type: 'text',
      },
      href: {
        label: 'URL',
        type: 'text',
      },
    },
  },

  SectionHeading: {
    component: SectionHeading,
    isContainer: false,
    defaultProps: {
      children: 'Section Heading',
    },
    fields: {
      children: {
        label: 'Text',
        type: 'textarea',
      },
    },
  },

  MetricStat: {
    component: MetricStat,
    isContainer: false,
    defaultProps: {
      label: 'Metric',
      value: '100',
    },
    fields: {
      label: {
        label: 'Label',
        type: 'text',
      },
      value: {
        label: 'Value',
        type: 'text',
      },
    },
  },

  RollingNumber: {
    component: RollingNumber,
    isContainer: false,
    defaultProps: {
      value: 100,
      suffix: '',
    },
    fields: {
      value: {
        label: 'Value',
        type: 'number',
      },
      suffix: {
        label: 'Suffix',
        type: 'text',
      },
    },
  },

  MediaCard: {
    component: MediaCard,
    isContainer: false,
    defaultProps: {
      src: '',
      title: 'Media Card',
      description: 'Description',
    },
    fields: {
      src: {
        label: 'Image URL',
        type: 'image',
      },
      title: {
        label: 'Title',
        type: 'text',
      },
      description: {
        label: 'Description',
        type: 'textarea',
      },
    },
  },
};

export const CONTAINER_TYPES = Object.entries(COMPONENT_REGISTRY)
  .filter(([_, entry]) => entry.isContainer)
  .map(([key]) => key);

export const LEAF_TYPES = Object.entries(COMPONENT_REGISTRY)
  .filter(([_, entry]) => !entry.isContainer)
  .map(([key]) => key);

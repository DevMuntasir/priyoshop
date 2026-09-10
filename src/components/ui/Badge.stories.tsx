import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Badge } from './Badge';

const meta = {
  component: Badge,
  tags: ['ai-generated'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {
  args: { children: 'Ecosystem at a Glance' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Ecosystem at a Glance')).toBeVisible();
  },
};

export const Soft: Story = { args: { children: 'New', variant: 'soft', tone: 'gold' } };
export const Small: Story = { args: { children: 'Small', size: 'sm' } };

// Badge brand/solid uses var(--ps-red-500, #EE2F47) as its background — proves the
// shared preview actually loads styles and resolves the fallback color.
export const CssCheck: Story = {
  args: { children: 'Brand', variant: 'solid', tone: 'brand' },
  play: async ({ canvas }) => {
    const badge = canvas.getByText('Brand');
    await expect(getComputedStyle(badge).backgroundColor).toBe('rgb(238, 47, 71)');
  },
};

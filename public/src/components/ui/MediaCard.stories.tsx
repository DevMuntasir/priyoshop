import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { MediaCard } from './MediaCard';

const meta = {
  component: MediaCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    source: 'TechCrunch',
    title: 'PriyoShop expands distribution network',
    date: 'Jan 2026',
    href: '#',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /priyoshop expands/iu })).toBeVisible();
  },
};

export const DarkTone: Story = { args: { ...Default.args, tone: 'dark' } };
export const NoMeta: Story = { args: { title: 'A headline without source or date', href: '#' } };

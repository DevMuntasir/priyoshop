import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { MetricStat } from './MetricStat';

const meta = {
  component: MetricStat,
  tags: ['ai-generated'],
} satisfies Meta<typeof MetricStat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: '296', label: 'Brands' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('296')).toBeVisible();
    await expect(canvas.getByText('Brands')).toBeVisible();
  },
};

export const Centered: Story = { args: { value: '100K+', label: 'MSMEs', align: 'center' } };
export const Small: Story = { args: { value: '1428', label: 'Route Coverage', size: 'sm' } };

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { StoreButton } from './StoreButton';

const meta = {
  component: StoreButton,
  tags: ['ai-generated'],
} satisfies Meta<typeof StoreButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Apple: Story = {
  args: { store: 'apple', href: '#' },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('App Store')).toBeVisible();
  },
};

export const Google: Story = { args: { store: 'google', href: '#' } };
export const LightTheme: Story = { args: { store: 'apple', theme: 'light', href: '#' } };

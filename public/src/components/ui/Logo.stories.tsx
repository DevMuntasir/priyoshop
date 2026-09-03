import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Logo } from './Logo';

const meta = {
  component: Logo,
  tags: ['ai-generated'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'PriyoShop' })).toBeVisible();
  },
};

export const MarkOnly: Story = { args: { mark: true } };
export const LightTone: Story = { args: { tone: 'light' } };

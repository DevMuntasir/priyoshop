import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { NavBar } from './NavBar';

const meta = {
  component: NavBar,
  parameters: { layout: 'fullscreen' },
  tags: ['ai-generated'],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'PriyoShop' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /join us/iu })).toBeVisible();
  },
};

export const ActiveItem: Story = { args: { active: 'Business' } };
export const Flat: Story = { args: { floating: false } };

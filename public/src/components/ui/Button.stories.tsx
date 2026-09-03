import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Button } from './Button';

const meta = {
  component: Button,
  tags: ['ai-generated'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: 'Join Us', variant: 'filled', tone: 'dark' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: /join us/iu })).toBeVisible();
  },
};

export const Outlined: Story = {
  args: { children: 'Watch Our Story', variant: 'outlined', tone: 'dark' },
};
export const Brand: Story = { args: { children: 'Get the App', variant: 'filled', tone: 'brand' } };
export const Disabled: Story = { args: { children: 'Join Us', disabled: true } };
export const AsLink: Story = {
  args: { children: 'Learn More', href: '#' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /learn more/iu })).toHaveAttribute('href', '#');
  },
};

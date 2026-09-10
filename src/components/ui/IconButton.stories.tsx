import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

const meta = {
  component: IconButton,
  tags: ['ai-generated'],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = {
  args: { children: <Icon name="arrow-right" />, ariaLabel: 'Next' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Next' })).toBeVisible();
  },
};

export const Filled: Story = {
  args: { children: <Icon name="arrow-left" />, ariaLabel: 'Previous', variant: 'filled' },
};
export const Large: Story = {
  args: { children: <Icon name="plus" />, ariaLabel: 'Add', size: 'lg' },
};
export const Disabled: Story = {
  args: { children: <Icon name="close" />, ariaLabel: 'Close', disabled: true },
};

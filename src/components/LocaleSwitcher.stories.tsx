import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { LocaleSwitcher } from './LocaleSwitcher';

const meta = {
  component: LocaleSwitcher,
  tags: ['ai-generated'],
} satisfies Meta<typeof LocaleSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const select = canvas.getByRole('combobox', { name: /change language/iu });
    await expect(select).toHaveValue('en');
  },
};

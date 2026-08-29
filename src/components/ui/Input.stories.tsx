import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { Input } from './Input';

const meta = {
  component: Input,
  tags: ['ai-generated'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Email', placeholder: 'you@example.com' },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Email')).toBeVisible();
  },
};

export const WithHint: Story = { args: { label: 'Phone', hint: "We'll never share this" } };
export const WithError: Story = { args: { label: 'Phone', error: 'Invalid phone number' } };
export const Disabled: Story = { args: { label: 'Email', disabled: true } };

export const FilledInput: Story = {
  args: { label: 'Email' },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Email');
    await userEvent.type(input, 'a@b.com');
    await expect(input).toHaveValue('a@b.com');
  },
};

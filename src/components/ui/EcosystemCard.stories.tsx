import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { EcosystemCard } from './EcosystemCard';

const meta = {
  component: EcosystemCard,
  tags: ['ai-generated'],
} satisfies Meta<typeof EcosystemCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Retail Business',
    body: 'A connected network of distribution partners across the country.',
    href: '#',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /retail business/iu })).toBeVisible();
  },
};

export const Reversed: Story = { args: { ...Default.args, reverse: true } };

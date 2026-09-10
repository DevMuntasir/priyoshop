import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect } from 'storybook/test';
import { SectionHeading } from './SectionHeading';

const meta = {
  component: SectionHeading,
  tags: ['ai-generated'],
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Centered: Story = {
  args: {
    eyebrow: 'Ecosystem at a Glance',
    title: 'Built for every Distribution Partner',
    description: 'A connected network from sourcing to last-mile delivery.',
    accentWords: 'Distribution Partner',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: /distribution partner/iu })).toBeVisible();
  },
};

export const LeftAligned: Story = { args: { ...Centered.args, align: 'left' } };
export const NoDescription: Story = { args: { title: 'The Impact', eyebrow: 'Numbers' } };

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon } from './Icon';

const meta = {
  component: Icon,
  tags: ['ai-generated'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArrowRight: Story = { args: { name: 'arrow-right' } };
export const Search: Story = { args: { name: 'search' } };
export const Menu: Story = { args: { name: 'menu' } };

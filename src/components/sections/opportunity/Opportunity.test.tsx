import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';
import { page } from 'vitest/browser';
import type { ResolvedSection } from '@/libs/cms/Sections';
import { Opportunity } from './Opportunity';

describe('Opportunity section', () => {
  it('uses the admin align value for the section heading wrapper', async () => {
    const section: ResolvedSection = {
      key: 'opportunity',
      enabled: true,
      order: 20,
      style: {
        base: {
          align: 'left',
          bgColor: 'default',
          textColor: 'default',
          paddingY: 'none',
          paddingX: 'none',
          marginY: 'none',
          titleSize: 'default',
          fontFamily: 'default',
          fontWeight: 'default',
          radius: 'none',
          shadow: 'none',
          columns: '1',
          gap: 'none',
          visibility: 'show',
        },
      },
      heading: {
        title: 'Opportunities in Bangladesh',
        description: 'One B2B Platform for All Your Retail Business Needs',
      },
      items: [{ value: '5M', name: 'MSMEs' }],
    };

    await render(<Opportunity data={section} />);

    const heading = page.getByRole('heading', { name: 'Opportunities in Bangladesh' }).element();
    const wrapper = heading.parentElement;

    expect(wrapper?.className).toContain('items-start');
    expect(wrapper?.className).not.toContain('items-center');
  });
});

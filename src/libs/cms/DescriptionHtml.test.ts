import { describe, expect, it } from 'vitest';
import { toDescriptionHtml } from './DescriptionHtml';

describe(toDescriptionHtml, () => {
  it('Preserves plain text line breaks without creating lists', () => {
    expect(toDescriptionHtml('Retailers & communities\nGrowth < 10')).toBe(
      '<p>Retailers &amp; communities<br>Growth &lt; 10</p>',
    );
    expect(toDescriptionHtml('')).toBe('');
  });

  it('Preserves rich text formatting', () => {
    const html = '<p><strong>Impact</strong></p><ul><li>Communities</li></ul>';
    expect(toDescriptionHtml(html)).toBe(html);
  });

  it('Removes executable markup from descriptions', () => {
    expect(toDescriptionHtml('<script>alert(1)</script><p onclick="alert(1)">Impact</p>')).toBe(
      '<p>Impact</p>',
    );
  });
});

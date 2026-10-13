import { describe, expect, it } from 'vitest';
import { toStepBodyHtml } from './StepBodyHtml';

describe(toStepBodyHtml, () => {
  it('Preserves legacy multiline descriptions as lists', () => {
    expect(toStepBodyHtml('- First\r\n• Second\n3. Third')).toBe(
      '<ul><li>First</li><li>Second</li><li>Third</li></ul>',
    );
  });

  it('Escapes plain text descriptions', () => {
    expect(toStepBodyHtml('Stock < 5 & orders > 2')).toBe(
      '<p>Stock &lt; 5 &amp; orders &gt; 2</p>',
    );
    expect(toStepBodyHtml('')).toBe('');
  });

  it('Preserves editor paragraphs and numbered lists', () => {
    const html =
      '<p><strong>First</strong></p><p><em>Second</em></p><ol><li><p>Third</p></li></ol>';
    expect(toStepBodyHtml(html)).toBe(html);
  });

  it('Removes executable markup and unsafe links from previews', () => {
    expect(
      toStepBodyHtml(
        '<script>alert(1)</script><p onclick="alert(1)">Safe</p><a href="javascript:alert(1)">Link</a>',
      ),
    ).toBe('<p>Safe</p><a rel="noopener noreferrer">Link</a>');
  });
});

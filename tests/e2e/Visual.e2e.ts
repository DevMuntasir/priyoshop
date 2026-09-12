import { expect, takeSnapshot, test } from '@chromatic-com/playwright';

test.describe('Visual testing', () => {
  test.describe('Static pages', () => {
    test('captures the homepage', async ({ browserName, page }, testInfo) => {
      test.skip(browserName !== 'chromium', 'Chromium owns the visual baseline');
      await page.goto('/');
      await expect(page.locator('h1').first()).toBeVisible();
      await takeSnapshot(page, testInfo);
    });

    test('captures the mobile about page', async ({ browserName, page }, testInfo) => {
      test.skip(browserName !== 'chromium', 'Chromium owns the visual baseline');
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/about');
      await expect(page.locator('h1').first()).toBeVisible();
      await takeSnapshot(page, testInfo);
    });

    test('captures the Bengali sign-in page', async ({ browserName, page }, testInfo) => {
      test.skip(browserName !== 'chromium', 'Chromium owns the visual baseline');
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto('/bn/sign-in');
      await expect(page.getByRole('heading', { name: 'সাইন ইন' })).toBeVisible();
      await takeSnapshot(page, testInfo);
    });
  });
});
